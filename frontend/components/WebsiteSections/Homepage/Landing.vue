<template>
  <div class="background">


    <div class="landingGrid">
      <div class="landingGridItem_1">
        <h1 class="landingTitle">Keep Up The Beat</h1>
        <h1 class="landingSubtitle">Don't miss a beat! We're making AEDs the life of the party.</h1>
        <p class="landingText" data-speed="0.95">
          Keep up the Beat is dedicated to saving lives and
          being the leading educator and provider of Automated External Defibrillators
          (AEDs) to the commercial market throughout the United States. Public
          education and access of portable defibrillators is our main mission.
          </p>
  
      <ButtonsHeartButtonTwo data-speed="0.90" button_text="Get Started" page_link="/contact" />
</div>
      <div class="landingGridItem">
        <div ref="imageBox1" class="image_box_1" data-speed="0.8">
          <img data-speed="clamp(auto)" class="image_1" src="~/assets/content/images/homepage/home_1_1.png" alt="">
        </div>

        <div ref="imageBox2" class="image_box_2" data-speed="1.25">
          <img class="image_1" src="~/assets/content/images/homepage/home_1_2.png" alt="">
        </div>

        <div ref="imageBox3" class="image_box_3" data-speed="0.95">
          <img data-speed="clamp(auto)" class="image_1" src="~/assets/content/images/homepage/home_1_3.png" alt="">
        </div>

      </div>
    </div>

    <!-- <div class="client_section_container">
    <WebsiteSectionsHomepageLogoLanding :direction="1" :images="images_casinos" :title="title_casinos" />
    </div> -->
  </div>
</template>


<script setup>
import image1 from '~/assets/content/images/logos/logo_1.png';
import image2 from '~/assets/content/images/logos/logo_2.png';
import image3 from '~/assets/content/images/logos/logo_3.png';
import image4 from '~/assets/content/images/logos/logo_4.png';
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const images_casinos = [image1, image2, image3, image4, image1, image2, image3, image4, image1, image2, image3, image4, image1, image2, image3, image4];
const title_casinos = 'Our Experince Speaks For Our Quality';

// Create refs for the image boxes
const imageBox1 = ref(null);
const imageBox2 = ref(null);
const imageBox3 = ref(null);

onMounted(() => {
  setTimeout(() => {
    // Set different initial states for each image box
    gsap.set(imageBox1.value, {
      opacity: 0,
      y: 60,
      x: -40,
      rotation: -8,
      scale: 0.7
    });
    
    gsap.set(imageBox2.value, {
      opacity: 0,
      y: 30,
      x: -15,
      rotation: 5,
      scale: 0.8
    });
    
    gsap.set(imageBox3.value, {
      opacity: 0,
      y: 45,
      x: -25,
      rotation: -30,
      scale: 0.25
    });
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // Add animations to timeline with staggered timing and rotation
    tl.to(imageBox1.value, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 0.85,
      duration: 0.85,
      delay: 0.5,
      ease: "power3.out"
    })
    .to(imageBox2.value, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 0.85,
      duration: 0.65,
      delay: 0.5,
      ease: "power3.out"
    }, "-=0.8")
    .to(imageBox3.value, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 0.85,
      duration: 1.1,
      delay: 0.5,
      ease: "elastic.out(1,0.8)",
    }, "-=0.8");
  }, 10); // Short delay before starting animations
});
</script>

<style scoped>
.background {
  height: 108vh;
  background-color: #fdf2f5;
  position: relative;
  z-index: 1
}

.landingGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 25vh;
  width: 85%;
  margin: 0 auto;
  gap: 2%;
}

.landingGridItem_1{
    padding-top: 5%;
}

.landingGridItem{
  margin-top: -6%;
}

.landingTitle {
  font-size: 150%;
  font-weight: 700;
  color: #0a7acb
}

.landingSubtitle {
  font-size: 220%;
  color: #8a0d2e;
  margin-top: 2%;
  line-height: 1.25;
  width: 95%;
}

.landingText {
  font-size: 105%;
  color: #8a0d2e;
  margin-top: 5%;
  line-height: 1.5;
  width: 80%;
}

.image_box_1{
    background-color:#EDEBE7;
    /* background-color:#041d2c; */
margin-left:23%;
border-radius:10px;
height:50vw;
width: 25vw;
margin-top:-11%;
overflow:hidden;
position: absolute;
border: 1px solid rgba(149, 180, 204, 0.65);
z-index:0;
transform: scale(.85);
box-shadow: inset 0 5px 6px 4px rgba(0,0,0,0.2), inset 0 3px 4px rgba(0,0,0,0.35), inset 0 -3px 4px rgba(48, 48, 48, 0.4); 
margin-bottom:0%
}

.image_box_2{
    background-color:#EDEBE7;
    /* background-color:#041d2c; */
margin-left:-1%;
border-radius:10px;
height:25vw;
width: 25vw;
margin-top:-2%;
overflow:hidden;
position: absolute;
border: 1px solid rgba(149, 180, 204, 0.65);
z-index:0;
transform: scale(.85);
box-shadow: inset 0 5px 6px 4px rgba(0,0,0,0.2), inset 0 3px 4px rgba(0,0,0,0.35), inset 0 -3px 4px rgba(48, 48, 48, 0.4); 
margin-bottom:0%
}


.image_box_3{
    background-color:#EDEBE7;
    /* background-color:#041d2c; */
margin-left:-20%;
border-radius:10px;
height:24vw;
width: 43vw;
margin-top:25%;
overflow:hidden;
position: absolute;
border: 1px solid rgba(149, 180, 204, 0.65);
z-index:0;
transform: scale(.85);
box-shadow: inset 0 5px 6px 4px rgba(0,0,0,0.2), inset 0 3px 4px rgba(0,0,0,0.35), inset 0 -3px 4px rgba(48, 48, 48, 0.4); 
margin-bottom:0%
}

.image_1{
    width: 100%;
    object-fit: cover;
    opacity: 0.9;
    margin-top: -6%;
    min-height: 110%;
}

.client_section_container{
    margin-top: 24%;
    opacity: 0.8;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .background {
    height: auto;
    min-height: 100vh;
    padding-bottom: 50px;
  }

  .landingGrid {
    grid-template-columns: 1fr;
    padding-top: 15vh;
    width: 90%;
    gap: 30px;
  }

  .landingGridItem_1 {
    padding-top: 0;
    order: 0;
  }

  .landingGridItem {
    order: 1;
    height: 70vh;
    position: relative;
    margin-bottom: 20px;
    margin-top: -10%;
    margin-left: -20%;
  }

  .landingTitle {
    font-size: 130%;
    text-align: center;
  }

  .landingSubtitle {
    font-size: 180%;
    width: 100%;
    text-align: center;
  }

  .landingText {
    font-size: 100%;
    width: 100%;
    text-align: center;
    margin-top: 5%;
    margin-bottom: 15%;
  }

  /* Adjust image boxes for mobile */
  .image_box_1 {
    margin-left: 0;
    height: 70vw;
    width: 60vw;
    margin-top: 0;
    position: relative;
    left: 50%;
    transform: translateX(-50%) scale(0.85);
  }

  .image_box_2 {
    margin-left: 0;
    height: 50vw;
    width: 50vw;
    margin-top: 10px;
    position: absolute;
    top: 55%;
    left: 10%;
    z-index: 1;
  }

  .image_box_3 {
    margin-left: 0;
    height: 40vw;
    width: 60vw;
    margin-top: 0;
    position: absolute;
    top: 40%;
    right: 5%;
    z-index: 2;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  .landingTitle {
    font-size: 120%;
  }

  .landingSubtitle {
    font-size: 150%;
  }

  .landingText {
    font-size: 95%;
  }

  .image_box_1 {
    height: 80vw;
    width: 70vw;
  }

  .image_box_2 {
    height: 55vw;
    width: 55vw;
    left: 5%;
  }

  .image_box_3 {
    height: 45vw;
    width: 65vw;
    right: 0;
  }
}
</style>
