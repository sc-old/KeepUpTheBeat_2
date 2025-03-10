
import {EventDispatcher} from 'three';
import * as THREE from 'three';



 // ==================== Proxy ====================
  // ==================== Proxy ====================
 // ==================== Proxy ====================

 function noop() {}

 // ElementProxyReceiver class definition
 class ElementProxyReceiver extends EventDispatcher {
     constructor() {
         super();
         // OrbitControls try to set style.touchAction;
         this.style = {};
     }
 
     get clientWidth() {
         return this.width;
     }
 
     get clientHeight() {
         return this.height;
     }
 
     // OrbitControls call these as of r132. Maybe we should implement them
     setPointerCapture() {}
     releasePointerCapture() {}
 
     getBoundingClientRect() {
         return {
             left: this.left,
             top: this.top,
             width: this.width,
             height: this.height,
             right: this.left + this.width,
             bottom: this.top + this.height,
         };
     }
 
     handleEvent(data) {
         if (data.type === 'size') {
             this.left = data.left;
             this.top = data.top;
             this.width = data.width;
             this.height = data.height;
             return;
         }

 
         data.preventDefault = noop;
         data.stopPropagation = noop;
         this.dispatchEvent(data);
     }
 
     focus() {
         // no-op
     }
 }
 
 // ProxyManager class definition
 class ProxyManager {
     constructor() {
         this.targets = {};
         this.handleEvent = this.handleEvent.bind(this);
     }
 
     makeProxy(data) {
         const { id } = data;
         const proxy = new ElementProxyReceiver();
         console.log('makeProxy', id, proxy);
         this.targets[id] = proxy;
     }
 
     getProxy(id) {
         return this.targets[id];
     }
 
     handleEvent(data) {
         this.targets[data.id].handleEvent(data.data);
     }
 }
 
 // ProxyManager instance
 const proxyManager = new ProxyManager();
 
 // Function to create a proxy
 function makeProxy(data) {
     proxyManager.makeProxy(data);
 }

 

 export { makeProxy, proxyManager };






