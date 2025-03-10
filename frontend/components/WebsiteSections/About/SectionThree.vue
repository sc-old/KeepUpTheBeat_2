<template>

<div class="sectionThreeContainer" ref="sectionThreeRef">

    <div class="companyContainer" ref="companyContainerRef">
        <WebsiteSectionsAboutCompanyList />
    </div>

    <div class="imageSliderContainer">
        <h1 class="imageSliderTitle">See Us In Action</h1>
        <WebsiteSectionsAboutImageSlider :images="images_1" :title="''" :direction="direction_1"/>
        <WebsiteSectionsAboutImageSlider :images="images_1" :title="''" :direction="direction_2" />
    </div>


</div>


</template>


<script setup>
import image_1 from '~/assets/content/images/homepage/home_1_1.png'
import image_2 from '~/assets/content/images/homepage/home_1_2.png'
import image_3 from '~/assets/content/images/homepage/home_1_3.png'
import image_4 from '~/assets/content/images/homepage/home_1_4.png'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue'

const images_1 = [image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4]

const direction_1 = ref(1)
const direction_2 = ref(-1)
const sectionThreeRef = ref(null)
const companyContainerRef = ref(null)
const faqsContainerRef = ref(null)


onMounted(() => {
    setTimeout(() => {
  
  // Create the color change animation
  gsap.to(sectionThreeRef.value, {
    backgroundColor: '#49161b', 
    scrollTrigger: {
      trigger: companyContainerRef.value,
      start: 'top 80%', // Start when the top of the section is 80% from the top of the viewport
      end: 'top 60%', // End when the bottom of the section is 20% from the top of the viewport
      scrub: true, // Smooth animation that ties to the scrollbar position
    }
  })


  // Also change text color to white for better visibility on dark background
  gsap.to('.imageSliderTitle', {
    color: '#ffffff',
    scrollTrigger: {
      trigger: sectionThreeRef.value,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    }
  })
    }, 1000)
})

</script>

<style scoped>

.sectionThreeContainer{
    width: 100%;
    height: 100%;
    background-color: #fdf2f5;
    min-height: 100vh;
    padding-bottom: 15vh;
    padding-top: 85vh;
    margin-top: -85vh;
}

.imageSliderTitle{
    font-size: 500%;
    font-weight: 600;
    color: #fdf2f5;
    margin-bottom: 3%;
    margin-left: 10%;
    padding-top: 10%;
}


</style>