<template>
    <div>
      
      <div v-show="transition_display" class="transition_overlay" :style="{opacity: overlay_opacity, 'backdrop-filter': `blur(${blur_amount})`}"></div>

      <div 
        v-show="transition_open_display" 
        class="transition_panel" 
        :class="{ 'transition_open': transition_open }"
      ></div>

      <div 
        v-show="transition_close_display" 
        class="transition_panel" 
        :class="{ 'transition_close': transition_close }"
      ></div>

    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect, onBeforeMount, onMounted, } from 'vue';
  import gsap from 'gsap'
  
  function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  const transition_open = ref(false)
  const transition_close = ref(true)
  const transition_open_display = ref(false)
  const transition_close_display = ref(true)
  const overlay_opacity = ref(0)
  const blur_amount = ref('0px')
  const transition_display = ref(false)
  
  watchEffect(() => {
    if (transition_open.value) {
      transition_open_display.value = true
      transition_close_display.value = false
    } else if (transition_close.value) {
      transition_open_display.value = false
      transition_close_display.value = true
    }
  })
  
  function animation_and_route(route_to){
    transition_display.value = true
    transition_open_display.value = true
    
    gsap.fromTo('.transition_panel', {
        y: '-100vh',
        borderRadius: '5%',
        scale: 1
    }, {
        y: 0,
        borderRadius: '100%',
        scale: 1.5,
        duration: 1,
        ease: 'power2.inOut',
        onStart: () => {
            transition_open.value = true
        }
    })
    
    overlay_opacity.value = 1
    blur_amount.value = '0px'
    const currentRoute = useRoute();

    if(currentRoute.path === route_to){
        close_transition()
    } else {
        sleep(850).then(() => {
            close_transition()
            sleep(750).then(() => {
                navigateTo(route_to)
            })
        })
    }
  }
  
  function close_transition() {
    const currentRoute = useRoute();
    const instant = (currentRoute.path === '/portal');

    transition_display.value = true
    overlay_opacity.value = 1

    if (instant) {
        transition_open.value = false
        transition_close.value = true
        blur_amount.value = '0px'
        transition_close_display.value = false
        overlay_opacity.value = 0
        transition_display.value = false
    } else {
        transition_close.value = true
        transition_open.value = false
        
        gsap.to('.transition_panel', {
            y: '100vh',
            duration: 0.75,
            ease: 'power2.inOut',
            borderRadius: '50%',
            scale: 1,
            onComplete: () => {
                transition_close.value = false
                blur_amount.value = '0px'
            }
        })
        
        sleep(10).then(() => { overlay_opacity.value = 0 })
        sleep(800).then(() => { transition_display.value = false })
        sleep(1500).then(() => { transition_close_display.value = false })
    }
}




  
  onBeforeMount(() => {
    close_transition()
  })
  
  onMounted(() => {
    close_transition()
  })
  
  defineExpose({
      animation_and_route
  })
  
  </script>
  
  
  
  <style scoped>

  .transition_panel {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #8a0d2e;
    border-top: 1px solid var(--transition_border);
    border-bottom: 1px solid var(--transition_border);
    z-index: 10000;
  }

  .menu_paper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .5;
    background-size: 35%;
    background-repeat: repeat;
    background-image: url("");
    mix-blend-mode: multiply;
    pointer-events: none;
  }
  
  .transition_overlay {
    width: 100vw;
    height: 200vh;
    background-color: rgba(0, 35, 59, 0.1);
    z-index: 950;
    position: fixed;
    bottom: 0;
    left: 0;
    transition: all .8s ease-in-out;
  }















  
  </style>