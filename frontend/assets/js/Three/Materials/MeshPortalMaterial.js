import * as THREE from 'three';
import { FullScreenQuad } from 'three-stdlib'







// const shaderMat2 = new THREE.ShaderMaterial({
//   uniforms: {
//     map: { value: renderTarget.texture },
//     resolution: { value: new THREE.Vector2(1024, 1024) },
//     cornerRadius: { value: 0.09 },
//     size: { value: 1.0 },
//     sdf: { value: null },
//     blend: { value: 0.0 },
//     blur: { value: 0.0 },
//   },
//   vertexShader: `
//   varying vec2 vUv;
//   void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     vUv = uv;
//   }
// `,
// fragmentShader: `
// uniform sampler2D sdf;
// uniform sampler2D map;
// uniform float blur;
// uniform float size;
// uniform vec2 resolution;
// uniform float cornerRadius;  // Uniform for corner radius
// varying vec2 vUv;
// #include <packing>
// void main() {
//   // Calculate aspect ratio and scale the UVs accordingly
//   vec2 aspectRatio = vec2(resolution.x / resolution.y, 1.0);
//   vec2 uvAdjusted = vUv * aspectRatio;

//   // Calculate the distance from the center, adjusting for aspect ratio
//   vec2 center = vec2(0.5, 0.5) * aspectRatio;
//   vec2 dist = abs(uvAdjusted - center);

//   // Adjust the radius for aspect ratio
//   float adjustedRadius = cornerRadius / max(aspectRatio.x, aspectRatio.y);

//   // Determine if the fragment is within the rounded corner region
//   float cornerMask = smoothstep(adjustedRadius - 0.01, adjustedRadius, length(max(dist - vec2(0.5 - adjustedRadius), 0.0)));

//   // Sample the map and sdf textures
//   vec2 uv = gl_FragCoord.xy / resolution.xy;
//   vec4 t = texture2D(map, uv);
//   float d = texture2D(sdf, vUv).r / size;

//   // Apply blur and rounded corners
//   float k = blur;
//   float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d / k + 1.0, 0.0, 1.0));
//   alpha *= (1.0 - cornerMask);  // Apply corner mask

//   // Set the final color with alpha adjustment
//   gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);

//   // Tone mapping and color space correction
//   #include <tonemapping_fragment>
//   #include <colorspace_fragment>
// }    `,
//   side: THREE.DoubleSide, // Render both sides of the material
//   transparent: true, // Enable transparency
// });






// Create a shader material using the defined shaders
const PortalMaterialShader = {
  uniforms: {
    blur: { value: 0 },
    map: { value: null },
    sdf: { value: null },
    blend: { value: 0 },
    size: { value: 0 },
    resolution: { value: new THREE.Vector2() },
    cornerRadius: { value: 0.0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
  uniform sampler2D sdf;
  uniform sampler2D map;
  uniform float blur;
  uniform float size;
  uniform vec2 resolution;
  uniform float cornerRadius;  // Uniform for corner radius
  varying vec2 vUv;
  #include <packing>
  void main() {
    // Calculate aspect ratio and scale the UVs accordingly
    vec2 aspectRatio = vec2(resolution.x / resolution.y, 1.0);
    vec2 uvAdjusted = vUv * aspectRatio;

    // Calculate the distance from the center, adjusting for aspect ratio
    vec2 center = vec2(0.5, 0.5) * aspectRatio;
    vec2 dist = abs(uvAdjusted - center);

    // Adjust the radius for aspect ratio
    float adjustedRadius = cornerRadius / max(aspectRatio.x, aspectRatio.y);

    // Determine if the fragment is within the rounded corner region
    float cornerMask = smoothstep(adjustedRadius - 0.01, adjustedRadius, length(max(dist - vec2(0.5 - adjustedRadius), 0.0)));

    // Sample the map and sdf textures
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 t = texture2D(map, uv);
    float d = texture2D(sdf, vUv).r / size;

    // Apply blur and rounded corners
    float k = blur;
    float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d / k + 1.0, 0.0, 1.0));
    alpha *= (1.0 - cornerMask);  // Apply corner mask

    // Set the final color with alpha adjustment
    gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);

    // Tone mapping and color space correction
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`
};


class MeshPortalMaterial extends THREE.ShaderMaterial {
  constructor({
    children,
    events = undefined,
    blur = 0,
    eventPriority = 0,
    renderPriority = 0,
    worldUnits = false,
    resolution = 1024,
    backgroundColor = new THREE.Color(0xffffff),
    cameraPosition = new THREE.Vector3(0, 0, 0),
    cameraLookAt = new THREE.Vector3(0, 0, 0),
    ...props
  }) {
    super({
      uniforms: {
        ...PortalMaterialShader.uniforms,
        map: { value: null },
        blur: { value: blur },
        size: { value: 0 },
        cornerRadius: { value: 0.09 } ,
        resolution: { value: new THREE.Vector2(resolution, resolution) }
      },
      vertexShader: PortalMaterialShader.vertexShader,
      fragmentShader: PortalMaterialShader.fragmentShader,
      side: THREE.DoubleSide, // Render both sides of the material
      transparent: true, // Enable transparency
      ...props
    });


    this.type = 'MeshPortalMaterial';
    this.blur = blur;
    this.blend = 0;
    this.resolution = resolution;
    this.renderPriority = renderPriority;
    this.eventPriority = eventPriority;
    this.worldUnits = worldUnits;

    this.maskRenderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter
    });
    this.sdf = null;
    this.size = 0;
    this.renderer = null;
    this.scene = new THREE.Scene();
    this.scene.background = backgroundColor;
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.camera.position.copy(cameraPosition);
    this.camera.lookAt(cameraLookAt);

    this.renderTarget = new THREE.WebGLRenderTarget(resolution, resolution, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    });

    this.visible = true;
    this.parent = null;

    console.log('MeshPortalMaterial initialized:', this);
    this.setChildren(children);
  }


  // setCameraPosition(position) {
  //   this.camera.position.copy(position);
  // }

  // setCameraLookAt(target) {
  //   this.camera.lookAt(target);
  // }


  setChildren(children, scale = 1) {
    this.scene.clear();
    if (Array.isArray(children)) {
      children.forEach(child => this.addScaledObject(child, scale));
    } else if (children) {
      this.addScaledObject(children, scale);
    }
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();
  }
  
  addScaledObject(object, scale) {
    const group = new THREE.Group();
    group.add(object.clone());
    group.scale.multiplyScalar(scale);
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.sub(center);
    this.scene.add(group);
  }


  // setParent(mesh, renderer) { // Pass renderer here
  //   this.parent = mesh;
  //   this.renderer = renderer; // Set the renderer

  //   if (this.blur && this.sdf === null) {
  //     this.createSDFMask();
  //   }
  // }

  createSDFMask() {
    console.log('Creating SDF mask for MeshPortalMaterial');
    const tempMesh = new THREE.Mesh(this.parent.geometry, new THREE.MeshBasicMaterial());
    const boundingBox = new THREE.Box3().setFromBufferAttribute(
      tempMesh.geometry.attributes.position
    );
    const orthoCam = new THREE.OrthographicCamera(
      boundingBox.min.x * (1 + 2 / this.resolution),
      boundingBox.max.x * (1 + 2 / this.resolution),
      boundingBox.max.y * (1 + 2 / this.resolution),
      boundingBox.min.y * (1 + 2 / this.resolution),
      0.1,
      1000
    );
    orthoCam.position.set(0, 0, 0);
    orthoCam.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setRenderTarget(this.maskRenderTarget);
    renderer.render(tempMesh, orthoCam);

    console.log('RenderTarget texture:', this.maskRenderTarget.texture); // Log the generated texture


    const sg = makeSDFGenerator(this.resolution, this.resolution, this.renderer);
    const sdf = sg(this.maskRenderTarget.texture);

    const readSdf = new Float32Array(this.resolution * this.resolution);
    renderer.readRenderTargetPixels(sdf, 0, 0, this.resolution, this.resolution, readSdf);

    let min = Infinity;
    for (let i = 0; i < readSdf.length; i++) {
      if (readSdf[i] < min) min = readSdf[i];
    }
    min = -min;
    this.size = min;
    this.sdf = sdf.texture;

    renderer.setRenderTarget(null);
    
    // Update uniforms
    this.uniforms.size.value = this.size;
    this.uniforms.sdf.value = this.sdf;

    console.log('SDF mask created with size:', this.size);
  }




  // startAnimationLoop() {
  //   console.log('starting animation loop xx')
  //   const animate = () => {
  //     this.update();
  //     this.animationFrameId = requestAnimationFrame(animate);
  //   };
  //   animate();
  // }

  // stopAnimationLoop() {
  //   console.log('stopping animation loop')
  //   if (this.animationFrameId !== null) {
  //     cancelAnimationFrame(this.animationFrameId);
  //   }
  // }

  // dispose() {
  //   this.stopAnimationLoop();
  //   this.maskRenderTarget.dispose();
  //   this.renderTarget.dispose();
  //   if (this.sdf) this.sdf.dispose();
  //   super.dispose();
  // }


  update(renderer) {
    if (this.scene && this.camera) {
      renderer.setRenderTarget(this.renderTarget);
      renderer.render(this.scene, this.camera);
      renderer.setRenderTarget(null);
      this.uniforms.map.value = this.renderTarget.texture;
    }
  }
}





function ManagePortalScene(options) {
}


// function ManagePortalScene(options) {
//   console.log('ManagePortalScene called with options:', options);

//   const {
//     events = undefined,
//     rootScene,
//     material,
//     priority,
//     worldUnits
//   } = options;

//   console.log('Material:', material);

//   const scene = new THREE.Scene();
//   const renderer = new THREE.WebGLRenderer();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//   const buffer1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
//   const buffer2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

//   scene.matrixAutoUpdate = false;

//   if (events !== undefined) {
//     console.log('Events handling would be implemented here');
//   }

//   const blend = { value: 0 };
//   const quad = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: {
//         a: { value: buffer1.texture },
//         b: { value: buffer2.texture },
//         blend: blend
//       },
//       vertexShader: /* glsl */ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /* glsl */ `
//         uniform sampler2D a;
//         uniform sampler2D b;
//         uniform float blend;
//         varying vec2 vUv;
//         void main() {
//           vec4 ta = texture2D(a, vUv);
//           vec4 tb = texture2D(b, vUv);
//           gl_FragColor = mix(tb, ta, blend);
//         }`,
//     })
//   );

//   let animationRunning = false;
//   let targetPosition = new THREE.Vector3();
//   let targetLookAt = new THREE.Vector3();
//   let lerpFactor = 0.1; // Lerp speed

//   function animate() {
//     if (animationRunning) {
//       requestAnimationFrame(animate);

//       // Lerp the camera position and look-at point
//       camera.position.lerp(targetPosition, lerpFactor);
//       camera.lookAt(targetLookAt);

//       if (material) {
//         let parent = material.parent;

//         if (parent) {
//           if (!worldUnits) {
//             if (priority && blend.value === 1) {
//               parent.updateWorldMatrix(true, false);
//             }
//             scene.matrixWorld.copy(parent.matrixWorld);
//           } else {
//             scene.matrixWorld.identity();
//           }

//           if (priority) {
//             if (blend.value < 1) {
//               blend.value += 0.01;
//               renderer.setRenderTarget(buffer1);
//               renderer.clear();
//               renderer.render(scene, camera);
//               renderer.setRenderTarget(buffer2);
//               renderer.clear();
//               renderer.render(rootScene, camera);
//               renderer.setRenderTarget(null);
//               renderer.clear();
//               renderer.render(quad, camera);
//             } else if (blend.value > 1) {
//               renderer.render(scene, camera);
//             }
//           }
//         }
//       }
//     }
//   }

//   this.startAnimationLoop = () => {
//     animationRunning = true;
//     animate();
//   };

//   this.stopAnimationLoop = () => {
//     animationRunning = false;
//   };

//   this.setTarget = (position, lookAt) => {
//     targetPosition.copy(position);
//     targetLookAt.copy(lookAt);
//   };

//   console.log('Starting animation loop', material);
// }

















// const makeSDFGenerator = (clientWidth, clientHeight, renderer) => {
//   console.log("makeSDFGenerator started with dimensions:", clientWidth, clientHeight);

//   let finalTarget = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.LinearMipmapLinearFilter,
//     magFilter: THREE.LinearFilter,
//     type: THREE.FloatType,
//     format: THREE.RedFormat,
//     generateMipmaps: true,
//   })
//   let outsideRenderTarget = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//   })
//   let insideRenderTarget = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//   })
//   let outsideRenderTarget2 = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//   })
//   let insideRenderTarget2 = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//   })
//   let outsideRenderTargetFinal = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//     type: THREE.FloatType,
//     format: THREE.RedFormat,
//   })
//   let insideRenderTargetFinal = new THREE.WebGLRenderTarget(clientWidth, clientHeight, {
//     minFilter: THREE.NearestFilter,
//     magFilter: THREE.NearestFilter,
//     type: THREE.FloatType,
//     format: THREE.RedFormat,
//   })
//   const uvRender = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: { tex: { value: null } },
//       vertexShader: /*glsl*/ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /*glsl*/ `
//         uniform sampler2D tex;
//         varying vec2 vUv;
//         #include <packing>
//         void main() {
//           gl_FragColor = pack2HalfToRGBA(vUv * (round(texture2D(tex, vUv).x)));
//         }`,
//     })
//   )
//   const uvRenderInside = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: { tex: { value: null } },
//       vertexShader: /*glsl*/ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /*glsl*/ `
//         uniform sampler2D tex;
//         varying vec2 vUv;
//         #include <packing>
//         void main() {
//           gl_FragColor = pack2HalfToRGBA(vUv * (1.0 - round(texture2D(tex, vUv).x)));
//         }`,
//     })
//   )
//   const jumpFloodRender = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: {
//         tex: { value: null },
//         offset: { value: 0.0 },
//         level: { value: 0.0 },
//         maxSteps: { value: 0.0 },
//       },
//       vertexShader: /*glsl*/ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /*glsl*/ `
//         varying vec2 vUv;
//         uniform sampler2D tex;
//         uniform float offset;
//         uniform float level;
//         uniform float maxSteps;
//         #include <packing>
//         void main() {
//           float closestDist = 9999999.9;
//           vec2 closestPos = vec2(0.0);
//           for (float x = -1.0; x <= 1.0; x += 1.0) {
//             for (float y = -1.0; y <= 1.0; y += 1.0) {
//               vec2 voffset = vUv;
//               voffset += vec2(x, y) * vec2(${1 / clientWidth}, ${1 / clientHeight}) * offset;
//               vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
//               float dist = distance(pos.xy, vUv);
//               if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
//                 closestDist = dist;
//                 closestPos = pos;
//               }
//             }
//           }
//           gl_FragColor = pack2HalfToRGBA(closestPos);
//         }`,
//     })
//   )
//   const distanceFieldRender = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: {
//         tex: { value: null },
//         size: { value: new THREE.Vector2(clientWidth, clientHeight) },
//       },
//       vertexShader: /*glsl*/ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /*glsl*/ `
//         varying vec2 vUv;
//         uniform sampler2D tex;
//         uniform vec2 size;
//         #include <packing>
//         void main() {
//           gl_FragColor = vec4(distance(size * unpackRGBATo2Half(texture2D(tex, vUv)), size * vUv), 0.0, 0.0, 0.0);
//         }`,
//     })
//   )
//   const compositeRender = new FullScreenQuad(
//     new THREE.ShaderMaterial({
//       uniforms: {
//         inside: { value: insideRenderTargetFinal.texture },
//         outside: { value: outsideRenderTargetFinal.texture },
//         tex: { value: null },
//       },
//       vertexShader: /*glsl*/ `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//         }`,
//       fragmentShader: /*glsl*/ `
//         varying vec2 vUv;
//         uniform sampler2D inside;
//         uniform sampler2D outside;
//         uniform sampler2D tex;
//         #include <packing>
//         void main() {
//           float i = texture2D(inside, vUv).x;
//           float o =texture2D(outside, vUv).x;
//           if (texture2D(tex, vUv).x == 0.0) {
//             gl_FragColor = vec4(o, 0.0, 0.0, 0.0);
//           } else {
//             gl_FragColor = vec4(-i, 0.0, 0.0, 0.0);
//           }
//         }`,
//     })
//   )

//   return (image) => {
//     console.log("SDF generation started for image:", image);
//     let ft = finalTarget
//     image.minFilter = THREE.NearestFilter
//     image.magFilter = THREE.NearestFilter
//     uvRender.material.uniforms.tex.value = image
//     renderer.setRenderTarget(outsideRenderTarget)
//     uvRender.render(renderer)

//     const passes = Math.ceil(Math.log(Math.max(clientWidth, clientHeight)) / Math.log(2.0))
//     console.log("Number of jump flood passes:", passes);
//     let lastTarget = outsideRenderTarget
//     let target = new THREE.WebGLRenderTarget();
//     for (let i = 0; i < passes; i++) {
//       const offset = Math.pow(2, passes - i - 1)
//       target = lastTarget === outsideRenderTarget ? outsideRenderTarget2 : outsideRenderTarget
//       jumpFloodRender.material.uniforms.level.value = i
//       jumpFloodRender.material.uniforms.maxSteps.value = passes
//       jumpFloodRender.material.uniforms.offset.value = offset
//       jumpFloodRender.material.uniforms.tex.value = lastTarget.texture
//       renderer.setRenderTarget(target)
//       jumpFloodRender.render(renderer)
//       lastTarget = target
//     }
//     renderer.setRenderTarget(outsideRenderTargetFinal)
//     console.log("Outside render target texture before distance field render:", target.texture);
//     distanceFieldRender.material.uniforms.tex.value = target.texture
//     distanceFieldRender.render(renderer)
//     console.log("Outside render target texture after distance field render:", outsideRenderTargetFinal.texture);
//     uvRenderInside.material.uniforms.tex.value = image
//     renderer.setRenderTarget(insideRenderTarget)
//     uvRenderInside.render(renderer)
//     lastTarget = insideRenderTarget

//     for (let i = 0; i < passes; i++) {
//       const offset = Math.pow(2, passes - i - 1)
//       target = lastTarget === insideRenderTarget ? insideRenderTarget2 : insideRenderTarget
//       jumpFloodRender.material.uniforms.level.value = i
//       jumpFloodRender.material.uniforms.maxSteps.value = passes
//       jumpFloodRender.material.uniforms.offset.value = offset
//       jumpFloodRender.material.uniforms.tex.value = lastTarget.texture
//       renderer.setRenderTarget(target)
//       jumpFloodRender.render(renderer)
//       lastTarget = target
//     }
//     renderer.setRenderTarget(insideRenderTargetFinal)
//     distanceFieldRender.material.uniforms.tex.value = target.texture
//     distanceFieldRender.render(renderer)
//     renderer.setRenderTarget(ft)
//     console.log("Compositing render targets...");
//     compositeRender.material.uniforms.tex.value = image
//     compositeRender.render(renderer)
//     console.log("SDF generation finished. Final target:", ft);
//     renderer.setRenderTarget(null)
//     return ft
//   }
// }





// Export the MeshPortalMaterial
export { MeshPortalMaterial, ManagePortalScene };