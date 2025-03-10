<template>
    
<div class="aboutLandingContainer">
<div class="title_container">
    <h1 ref="titleEst" class="title">EST</h1>
    <h1 ref="title2012" class="title">2000</h1>
    <img ref="heartLogo" class="image" src="~/assets/content/images/logos/logo_8.png" alt="heart_logo">
</div>

<div class="subTitleContainer">
    <h1 class="subTitle">Learning Critical Skills,</h1>
    <h1 class="subTitle boldIt">While Having Serious Fun</h1>
</div>

<div class="textContainer">

    <p class="landing_text" data-split-text='{"start": "top 80%", "duration": 1.2, }'>
  At KUP <span class="boldItText">Training shouldn’t be boring</span> Since 1999, we've delivered training that’s hands-on, interactive, and dare we say - <span class="boldIt">fun.</span>  
</p>

<p class="landing_text" data-split-text='{"start": "top 80%", "duration": 1.2, }'>
  We are <span class="boldItText">educators on a mission</span> to make sure training sticks. From small businesses to large corporations, we provide <span class="boldItText">high-energy, effective instruction</span> wherever you need it. Plus, through our partnership with LifeServers AED, Inc. we’re <span class="boldItText">expanding access</span> to Automated External Defibrillators (AEDs) across the U.S.  
</p>

<p class="landing_text" data-split-text='{"start": "top 80%", "duration": 1.2, }'>
  A <span class="boldItText">great trainer makes all the difference</span>, and our instructors use real-world scenarios, interactive exercises, and even humor to keep learning engaging. Your team will leave <span class="boldItText">confident, prepared, and maybe even entertained</span>—and if you don’t think our training is top-notch, we’ll make it right. <span class="boldItText">Your safety is what matters most.</span>  
</p>

<div class="buttonContainer">
<ButtonsHeartButtonTwo data-speed="0.90" button_text="Get Started" page_link="/contact" />
</div>

</div>

</div>




</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';


const { highlightElements, splitText } = useAnimations()

const heartLogo = ref(null);
const titleEst = ref(null);
const title2012 = ref(null);

onMounted(() => {
    setTimeout(() => {
  // Set initial positions and states
  gsap.set(heartLogo.value, { y: -500, opacity: 0 });
  gsap.set(titleEst.value, { 
    rotationX: -90, 
    opacity: 0,
    transformOrigin: "center center",
    scale: 0.8
  });

  gsap.set(title2012.value, { 
    rotationX: -90, 
    opacity: 0,
    transformOrigin: "top center",
    scale: 0.8
  });
  
  // Animate the text elements with staggered rotation
  gsap.to([titleEst.value, title2012.value], {
    rotationX: 0,
    scale: 1,
    opacity: 1,
    duration: 1.5,
    stagger: 0.5,
    ease: "power2.out",
    delay: 0.4
  });
  
  // Animate the logo falling down to its position
  gsap.to(heartLogo.value, {
    onStart: () => {
        gsap.set(heartLogo.value, { opacity: 0.5 });
    },
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "bounce.out",
    delay: 0.9
})

    }, 150);
});
</script>

<style scoped>

.aboutLandingContainer{
    width: 100%;
    height: 100%;
    background-color: #fdf2f5;
    padding-top: 10%;
    padding-bottom: 10%;
}

.title_container{
    position: relative;
    width: 80%;
    margin-left: 10%;
}

.title{
    font-size: 30vw;
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: 0.055em;
    /* font-family: "Funkis_B", sans-serif; */
}

.image{
    width: 11vw;
    position: absolute;
    top: 17vw;
    right: 13.5vw;
}

.subTitleContainer{
    margin-top: 10%;
}

.subTitle{
    font-size: 225%;
    text-align: center;
    line-height: 1.35;
}

.boldIt{
    font-weight: 900;
}

.boldItText{
    font-weight: 900;
    color: #8a0d2e;
}

.textContainer{
    width: 65%;
    margin-left: 17.5%;
    margin-top: 10%;
}

.landing_text{
    font-size: 125%;
    line-height: 1.5;
    margin-bottom: 5%;
    text-align: center;
    text-wrap: pretty;
    max-width: 100%;
}

.buttonContainer{
    margin-top: 5%;
    display: flex;
    justify-content: center;
}

</style>
