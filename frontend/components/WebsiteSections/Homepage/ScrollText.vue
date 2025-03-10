<template>
    <div class="services_backgorund">
      <div class="content_container">
        
  
            <div class="wrap">
              <div class="wrap-container">
                <div class="scrollElements" ref="scrollElements1">
                    Britt Law offers practical legal support tailored to help your business protect your operations and data while meeting regulatory requirements. Our clients benefit from clear, actionable guidance on issues like data breaches, privacy laws, and technology contracts, ensuring your interests are safeguarded and your growth remains uninterrupted.
                  <span class="overlayText">
                    Britt Law offers practical legal support tailored to help your business protect your operations and data while meeting regulatory requirements. Our clients benefit from clear, actionable guidance on issues like data breaches, privacy laws, and technology contracts, ensuring your interests are safeguarded and your growth remains uninterrupted.
                  </span>
                </div>
              </div>
            </div>
      
      </div>
    </div>
  </template>
  
  <script setup>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { useWindowSize } from '@vueuse/core'
  import { onBeforeMount, onMounted, ref } from 'vue'
  import { SplitText } from 'gsap/SplitText'
  
  gsap.registerPlugin(ScrollTrigger, SplitText)
  
  
  const { width, height } = useWindowSize()
  
  let scrollElements1 = ref(null)
  
  onMounted(() => {
    setTimeout(() => {
  
  
  
 

    
      const elements = [scrollElements1.value]
    
    elements.forEach((element) => {
      let split = new SplitText(element, {type:"chars,words,lines"});
  
      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          scrub: 1,
          start: "top 65%",
          end: "bottom -20%",
        }
      }).to(split.chars, {
        clipPath: "inset(0% 0% 0% 0%)", 
        color: '#16273F', 
        duration: 10, 
        ease: 'none',
        stagger:1.5 // adjust for stagger effect on each letter
      })
    })
  
  
    }, 1000);
  });
  </script>
  
  <style scoped>
  
  
  .services_backgorund{

  }
  
  .content_container{
    overflow: hidden;
    height:50vh;
    position: relative;
    margin-top:5%;
    margin-bottom: 15%;
  }
  
  
  .wrap {
    margin-top: 10%;
    margin-left: 0px;
    margin-bottom:15%
  }
  
  .wrap-container {
    width: 80%;
    margin-left:10%;
  }
  
  .scrollElements {
    position: relative;
    font-size: 2.5vw;
    font-weight: 500;
    margin-left:10%;
    width:80%;
    color:#ebe9e9;
    white-space: normal;
    text-align:center;
    line-height: 1.5;
  }
  
  .overlayText {
    position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      clip-path: inset(0% 100% 0% 0%);
      white-space: normal;
      text-align:center
  }
  
  
  
  
  @media only screen and (min-width: 0px) and (max-width: 376px) {
  }
    
  @media only screen and (min-width: 376px) and (max-width: 576px) {
    .services_backgorund{
    margin-top:55%;
  }
  
  .scrollElements {
    font-size: 140%;
  }
  }
  
  @media only screen and (min-width: 576px) and (max-width: 768px) {
  }
  
  @media only screen and (min-width: 768px) and (max-width: 992px) {
  }
  
  @media only screen and (min-width: 992px) and (max-width: 1200px) {
  }
  
  @media only screen and (min-width: 1200px) and (max-width: 1400px) {
  }
  
  @media only screen and (min-width: 1400px) and (max-width: 1600px) {
  }
  
  @media only screen and (min-width: 1600px) and (max-width: 2000px) {
  }
  
  @media only screen and (min-width: 2000px) and (max-width: 2500px) {
  }
  
  @media only screen and (min-width: 2500px) and (max-width: 5600px) {
  }
  
  </style>