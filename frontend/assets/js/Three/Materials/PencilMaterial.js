import { Pass, FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass'
import * as THREE from 'three'




// Vertex Shader
const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;



// Fragment Shader
const fragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D uNormals;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uAmount;
varying vec2 vUv;

vec2 grad(ivec2 z) {
    int n = z.x + z.y * 11111;
    n = (n << 13) ^ n;
    n = (n * (n * n * 15731 + 789221) + 1376312589) >> 16;
    n &= 7;
    vec2 gr = vec2(n & 1, n >> 1) * 2.0 - 1.0;
    return (n >= 6) ? vec2(0.0, gr.x) : 
           (n >= 4) ? vec2(gr.x, 0.0) :
                      gr;
}

float noise(in vec2 p) {
    ivec2 i = ivec2(floor(p));
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(dot(grad(i + ivec2(0,0)), f - vec2(0.0,0.0)),
            dot(grad(i + ivec2(1,0)), f - vec2(1.0,0.0)), u.x),
        mix(dot(grad(i + ivec2(0,1)), f - vec2(0.0,1.0)),
            dot(grad(i + ivec2(1,1)), f - vec2(1.0,1.0)), u.x),
        u.y
    );
}

float valueAtPoint(sampler2D image, vec2 coord, vec2 texel, vec2 point) {
    vec3 luma = vec3(0.299, 0.587, 0.114);
    return dot(texture2D(image, coord + texel * point).xyz, luma);
}

float diffuseValue(int x, int y) {
    float cutoff = 40.0;
    float offset = 0.5 / cutoff;
    float noiseValue = clamp(texture2D(uTexture, vUv).r, 0.0, cutoff) / cutoff - offset;
    return valueAtPoint(tDiffuse, vUv + noiseValue, vec2(1.0 / uResolution.x, 1.0 / uResolution.y), vec2(float(x), float(y))) * 0.6;
}

float normalValue(int x, int y) {
    float cutoff = 50.0;
    float offset = 0.5 / cutoff;
    float noiseValue = clamp(texture2D(uTexture, vUv).r, 0.0, cutoff) / cutoff - offset;
    return valueAtPoint(uNormals, vUv + noiseValue, vec2(1.0 / uResolution.x, 1.0 / uResolution.y), vec2(float(x), float(y))) * 0.3;
}

float getValue(int x, int y) {
    float noiseValue = noise(gl_FragCoord.xy);
    noiseValue = noiseValue * 2.0 - 1.0;
    noiseValue *= 10.0;
    return diffuseValue(x, y) + normalValue(x, y) * noiseValue;
}

float combinedSobelValue() {
    const mat3 Gx = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1);
    const mat3 Gy = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1);

    float tx0y0 = getValue(-1, -1);
    float tx0y1 = getValue(-1, 0);
    float tx0y2 = getValue(-1, 1);
    float tx1y0 = getValue(0, -1);
    float tx1y1 = getValue(0, 0);
    float tx1y2 = getValue(0, 1);
    float tx2y0 = getValue(1, -1);
    float tx2y1 = getValue(1, 0);
    float tx2y2 = getValue(1, 1);

    float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
                    Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
                    Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

    float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
                    Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
                    Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

    float G = (valueGx * valueGx) + (valueGy * valueGy);
    return clamp(G, 0.0, 1.0);
}

void main() {
    float sobelValue = combinedSobelValue();
    sobelValue = smoothstep(0.01, 0.3, sobelValue);

    vec4 lineColor = vec4(0.161, 0.196, 0.243, 0.85);  // Modify this line

    if (sobelValue > 0.1) {
        gl_FragColor = lineColor;
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}`;




export class PencilLinesMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                tDiffuse: { value: null },
                uNormals: { value: null },
                uTexture: { value: null },
                uResolution: { value: new THREE.Vector2(1, 1) },
                uAmount: { value: 1.0 }  // Add this line
            },
            fragmentShader,
            vertexShader
        });
    }
}

export class PencilLinesPass extends Pass {
    
    constructor({
        width,
        height,
        scene,
        camera,
        normalTexture,
        amount = 1.0
    }) {
        super();

        this.scene = scene;
        this.camera = camera;
        this.amount = amount;
        this.material = new PencilLinesMaterial();
        this.fsQuad = new FullScreenQuad(this.material);

        const normalBuffer = new THREE.WebGLRenderTarget(width, height);

        normalBuffer.texture.format = THREE.RGBAFormat;
        normalBuffer.texture.type = THREE.HalfFloatType;
        normalBuffer.texture.minFilter = THREE.NearestFilter;
        normalBuffer.texture.magFilter = THREE.NearestFilter;
        normalBuffer.texture.generateMipmaps = false;
        normalBuffer.stencilBuffer = false;
        this.normalBuffer = normalBuffer;

        this.normalMaterial = new THREE.MeshNormalMaterial()
        this.material.uniforms.uNormals.value = normalTexture;



        this.material.uniforms.uResolution.value = new THREE.Vector2(width, height);


        
        const loader = new THREE.ImageBitmapLoader();

        const loadTexture = (url) => {
            return new Promise((resolve, reject) => {
                loader.load(
                    url,
                    (imageBitmap) => {
                        const texture = new THREE.Texture(imageBitmap);
                        texture.needsUpdate = true;
                        this.material.uniforms.uTexture.value = texture;
                        console.log('Texture loaded:', texture);
                        resolve(texture);
                    },
                    undefined,
                    (error) => reject(error)
                );
            });
        };

   
        
    
    }

    

    dispose() {
        this.material.dispose();
        this.fsQuad.dispose();
    }


    render(renderer, writeBuffer, readBuffer) {


        // Render to normal buffer
        renderer.setRenderTarget(this.normalBuffer);
        const overrideMaterialValue = this.scene.overrideMaterial;

        this.scene.overrideMaterial = this.normalMaterial;
        renderer.render(this.scene, this.camera);
        this.scene.overrideMaterial = overrideMaterialValue;

        this.material.uniforms.uAmount.value = this.amount;

        // Set uniforms
        this.material.uniforms.uNormals.value = this.normalBuffer.texture;
        if (readBuffer && readBuffer.texture) {
            this.material.uniforms.tDiffuse.value = readBuffer.texture;
        } else {
            console.warn('readBuffer or its texture is undefined');
            return;
        }

        // Render the effect
        if (this.renderToScreen) {
			renderer.setRenderTarget(null)
			this.fsQuad.render(renderer)
		} else {
			renderer.setRenderTarget(writeBuffer)
			if (this.clear) renderer.clear()
			this.fsQuad.render(renderer)
		}

    }

    setRenderer(renderer, writeBuffer, readBuffer) {
    }



  // Add this method
  initialize(renderer, encoding, size) {

}



setSize(width, height) {
    this.normalBuffer.setSize(width, height);
    this.material.uniforms.uResolution.value.set(width, height);
}






}



