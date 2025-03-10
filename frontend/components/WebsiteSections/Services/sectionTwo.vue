<template>
  <div class="section_two_container">
    <div class="background_circle"></div>

    <div class="section_two_content">
      <h1 class="section_two_heading" data-speed="1.1">{{ section_2_info.title }}</h1>
    </div>

    <div class="section_two_description_grid">
      <p class="section_two_description_1" data-speed="0.98">{{ section_2_info.description_1 }}</p>

      <div class="section_two_description_2_container">
        <p class="section_two_description_2">{{ section_2_info.description_2 }}</p>
        <p class="section_two_description_2">{{ section_2_info.description_3 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  section_2_info: {
    type: Object,
    default: () => ({
      title: 'CPR & AED Training',
      description_1: 'Our comprehensive CPR and AED training programs are designed to equip you with the confidence and skills needed to respond effectively in emergency situations. Learn from certified instructors with real-world experience in a hands-on, interactive environment.',
      description_2: 'We offer a range of CPR and AED training courses to suit your needs, from basic first aid to advanced life support. Our courses are designed to be interactive and hands-on, so you can put your skills into practice in a safe and supportive environment.',
      description_3: 'The American Heart Association (AHA) is a leading organization in the field of CPR and AED training. We are proud to be an AHA Training Center, which means we are authorized to provide high-quality training courses that meet the standards set by the AHA.'
    })
  }
});

onMounted(() => {
  setTimeout(() => {
  
  // Circle animation
  gsap.set('.background_circle', { scale: 0, opacity: 1 }); // Start with scale 0
  
  gsap.to('.background_circle', {
    scale: 1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_two_container',
      start: 'top 70%', // When the top of the section is 70% from the top of viewport
      toggleActions: 'play none none reverse', // play on enter, reverse on leave
      // markers: true, // Remove this in production
    }
  });
}, 300);
});
</script>

<style scoped>
.section_two_container {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #fdf2f5;
    position: relative;
    z-index: 1;
}

.background_circle {
    width: 80vw;
    height: 80vw;
    background-color: #8a0d2e;
    border-radius: 50%;
    position: absolute;
    top: 20%;
    left: 0%;
    transform: translate(-30%, -30%);
    z-index: 0;
    opacity: 0;
}

.section_two_content {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    position: relative;
    width: 90%; /* Control width */
}

.section_two_heading {
    font-size: 4rem;
    font-weight: 700;
    color: #db1d1d;
    z-index: 1;
    position: relative;
    text-align: center;
}

.section_two_description_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    z-index: 1;
    position: relative;
    margin-top: 15%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    gap: 10%;
}

.section_two_description_1 {
    font-size: 200%;
    font-weight: 400;
    color: #fff;
    z-index: 1;
    line-height: 1.2;
}

.section_two_description_2 {
    font-size: 110%;
    font-weight: 400;
    color: #000;
    z-index: 1;
    margin-left: 10%;
    width: 90%;
    margin-top: 10%;
    line-height: 1.5;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
    .section_two_container {
        height: auto;
        min-height: 100vh;
        padding: 2rem 0;
        margin-top: 35%;
    }
    
    .background_circle {
        width: 85vw;
        height: 85vw;
        top: 10%;
    }
    
    .section_two_content {
        top: 5%;
        width: 95%;
    }
    
    .section_two_heading {
        font-size: 2.5rem;
    }
    
    .section_two_description_grid {
        grid-template-columns: 1fr;
        margin-top: 5%;
        gap: 1rem;
    }
    
    .section_two_description_1 {
        font-size: 130%;
        padding: 0 1rem;
        width: 50%;
    }
    
    .section_two_description_2_container {
        margin-top: 2rem;
    }
    
    .section_two_description_2 {
        font-size: 100%;
        margin-left: 0;
        width: 100%;
        margin-top: 1rem;
        padding: 0 1rem;
    }
}

@media (max-width: 480px) {
  .section_two_description_1 {
        font-size: 110%;
        padding: 0 1rem;
        width: 85%;
    }

    .background_circle {
        width: 115vw;
        height: 115vw;
        top: 10%;
    }
    
}

</style>