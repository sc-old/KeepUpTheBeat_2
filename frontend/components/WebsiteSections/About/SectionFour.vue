<template>

    <div class="sectionFourContainer" ref="sectionFourRef">
    
        <div class="faqsContainer" ref="faqsContainerRef">
            <WebsiteSectionsAboutFAQs />
        </div>
    </div>
    
    
    </template>
    
    
    <script setup>

    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
 
    const sectionFourRef = ref(null)
    const faqsContainerRef = ref(null)
    
    
    onMounted(() => {
        setTimeout(() => {
      
   
    
        // Create the color change animation
        gsap.to(sectionFourRef.value, {
        backgroundColor: '#fdf2f5', 
        scrollTrigger: {
          trigger: faqsContainerRef.value,
          start: 'top 80%', // Start when the top of the section is 80% from the top of the viewport
          end: 'top 60%', // End when the bottom of the section is 20% from the top of the viewport
          scrub: true, // Smooth animation that ties to the scrollbar position
          toggleActions: 'play reverse play reverse',
        }
      })
      

        }, 1000)
    })
    
    </script>
    
    <style scoped>
    
    .sectionFourContainer{
        width: 100%;
        height: 100%;
        background-color: #49161b;
        min-height: 100vh;
        padding-bottom: 15vh;
        padding-top: 85vh;
        margin-top: -85vh;
    }
    
  
    
    </style>