import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';



// ==================== Resize ====================
// ==================== Resize ====================
// ==================== Resize ====================


function resizeRendererToDisplaySize( renderer, composer, camera, width, height) {
    const canvas = renderer.domElement;

    const needResize = canvas.width !== width || canvas.height !== height;
    if ( needResize ) {
      renderer.setSize( width, height, false );
      try{
        composer.setSize(width, height);
      } catch {
        console.log('no composer to resize')
      }

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        ('--------- RESIZED ----------')
    }
    return needResize;
  }


// ==================== Post Processing ====================
// ==================== Post Processing ====================
// ==================== Post Processing ====================


function setupPostProcessing(renderer, scene, camera, width, height) {

    const outlinePass = new OutlinePass(new THREE.Vector2(width, height), scene, camera);
    outlinePass.edgeStrength = 30.0;
    outlinePass.edgeGlow = 0.0;
    outlinePass.edgeThickness = 10.0;
    outlinePass.pulsePeriod = 0;
    outlinePass.usePatternTexture = false;
    outlinePass.visibleEdgeColor.set('#000000');
    outlinePass.hiddenEdgeColor.set('#000000');
    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(outlinePass);
  
    return composer;
  }





// ==================== Dispose ====================
// ==================== Dispose ====================
// ==================== Dispose ====================


function dispose_three(renderer, scene, camera, controls, physics) {
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');
    console.log('Disposing resources...');



    
    if (typeof animationFrameId !== 'undefined') {
      cancelAnimationFrame(animationFrameId); // Stop the animation loop
    }
  
    console.log('SCENE ---- >', scene)
  
    // Recursively dispose of all children in the scene
  
      try {
        scene.traverse(object => {
          if (object.geometry) {
            object.geometry.dispose();
            console.log('Disposed geometry', object.geometry);
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
              console.log('Disposed materials each', object.material);
            } else {
              object.material.dispose();
              console.log('Disposed material', object.material);
            }
          }
        });
      } catch (error) {
        console.error('Failed to dispose of scene objects:', error);
      }
      
      // scene.clear(); // Another method to ensure all objects are removed
  
    if (renderer) {
      renderer.dispose();
    }
  
    if (controls) {
      controls.dispose();
    }
  
    // Dispose of physics
    if (physics) {
      physics = null;
      console.log('Disposed physics');
    }
  









// 	engineParameters.scene.remove(node)
// 	sceneTraverse(node,dO0=>{
// 		if(dO0.geometry)dO0.geometry.dispose()
// 		if(dO0.material){
// 			if(dO0.material.length){
// 				for(processMemory.hD0=0;processMemory.hD0<dO0.material.length;++processMemory.hD0)disposeResources(dO0.material[processMemory.hD0])
// 			}else disposeResources(dO0.material)
// 		}
// 		dO0=undefined
// 	})
// 	engineParameters.renderer.renderLists.dispose()
// 	node=undefined
// }
// // Scene traverse
// const sceneTraverse=(obj,fn)=>{
// 	if(!obj)return
// 	fn(obj)
// 	if(obj.children&&obj.children.length>0){
// 		obj.children.forEach(o=>{
// 			sceneTraverse(o,fn)
// 		})
// 	}
// 	obj=fn=undefined
// }
// // Dispose resources
// function disposeResources(mtrl){
// 	if(mtrl.alphaMap){
// 		mtrl.alphaMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.alphaMap.source.uuid))
// 	}
// 	if(mtrl.aoMap){
// 		mtrl.aoMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.aoMap.source.uuid))
// 	}
// 	if(mtrl.blendDstAlpha){
// 		mtrl.blendDstAlpha.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.blendDstAlpha.source.uuid))
// 	}
// 	if(mtrl.blendEquationAlpha){
// 		mtrl.blendEquationAlpha.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.blendEquationAlpha.source.uuid))
// 	}
// 	if(mtrl.blendSrcAlpha){
// 		mtrl.blendSrcAlpha.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.blendSrcAlpha.source.uuid))
// 	}
// 	if(mtrl.bumpMap){
// 		mtrl.bumpMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.bumpMap.source.uuid))
// 	}
// 	if(mtrl.displacementMap){
// 		mtrl.displacementMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.displacementMap.source.uuid))
// 	}
// 	if(mtrl.emissiveMap){
// 		mtrl.emissiveMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.emissiveMap.source.uuid))
// 	}
// 	if(mtrl.envMap){
// 		mtrl.envMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.envMap.source.uuid))
// 	}
// 	if(mtrl.lightMap){
// 		mtrl.lightMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.lightMap.source.uuid))
// 	}
// 	if(mtrl.map){
// 		mtrl.map.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.map.source.uuid))
// 	}
// 	if(mtrl.metalnessMap){
// 		mtrl.metalnessMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.metalnessMap.source.uuid))
// 	}
// 	if(mtrl.normalMap){
// 		mtrl.normalMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.normalMap.source.uuid))
// 	}
// 	if(mtrl.roughnessMap){
// 		mtrl.roughnessMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.roughnessMap.source.uuid))
// 	}
// 	if(mtrl.specularMap){
// 		mtrl.specularMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.specularMap.source.uuid))
// 	}
// 	if(mtrl.gradientMap){
// 		mtrl.gradientMap.dispose()
// 		engineParameters.scene.remove(engineParameters.scene.getObjectById(mtrl.gradientMap.source.uuid))
// 	}
// 	mtrl.dispose()
// 	mtrl=undefined

  




    console.log('Disposed all resources');
  }
  
  




  export { resizeRendererToDisplaySize, setupPostProcessing, dispose_three }; 







