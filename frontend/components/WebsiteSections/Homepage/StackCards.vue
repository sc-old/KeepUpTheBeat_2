<template>
    <div class="stackContainer">


      <div class="threeOuterContianer">


            <div class="sectionScrollContainer">
            <h1 class="sectionTitle">We Audit so You Can Focus</h1>
            <p class="sectionSubtitle">Our comprehensive audit services provide a detailed analysis of your business operations, identifying areas for improvement and ensuring compliance with industry standards.</p>
            </div>

            <div class="sectionScrollContainer">
            <h1 class="sectionTitle">We Strategize so You Can Win</h1>
            <p class="sectionSubtitle">Our solutions are designed to align with your business objectives, ensuring that your technology investments drive growth and enhance operational efficiency.</p>
            </div>

            <div class="sectionScrollContainer">
            <h1 class="sectionTitle">We Implement so You Can Grow</h1>
            <p class="sectionSubtitle">Our implementation services ensure that your technology solutions are deployed effectively, delivering tangible benefits and driving competitive advantage.</p>
            </div>

            <div class="sectionScrollContainer">
            <h1 class="sectionTitle">We Support so You Can Thrive</h1>
            <p class="sectionSubtitle">Our comprehensive support services ensure that your technology solutions are deployed effectively, delivering tangible benefits and driving competitive advantage.</p>
            </div>

    </div>


        <div>
      <div
        v-for="(content, index) in contentElements"
        :key="index"
        class="content__sticky"
        ref="contentRefs"
      >
      <div class="paperOverlay"></div>
      <div v-if="index === contentElements.length - 1" class="end_trigger"></div>
        <!-- <img class="content__img content__img--small" :src="content.imgSrc" /> -->
        <h2 class="content__title eikoFont"><i> {{ content.title }}</i></h2>
        <div class="center_it">
        <div v-if="content.type == 'bullets'" class="bulletBox">
          <div v-for="(bullet, bulletIndex) in content.bullets" :key="bulletIndex" class="flex_it">
              <div class="bullet">•</div>
              <div class="bulletItem">{{ bullet }}</div>
            </div>
        </div>
        <div v-else>
            <p class="content__text text-meta md_primer">{{ content.description }}</p>
        </div>
        <div class="imageBox">
            <div class="paperOverlay"></div>
          <img class="image" :src="content.imgSrc" :alt="content.title">
        </div>
      </div>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import briggs_1 from '~/assets/content/images/homepage/home_9.png'
  import briggs_2 from  '~/assets/content/images/homepage/home_12.png'
  import briggs_3 from  '~/assets/content/images/homepage/home_13.png'
  import briggs_4 from  '~/assets/content/images/homepage/home_11.png'
  
  gsap.registerPlugin(ScrollTrigger);
  
  const contentRefs = ref([]);
  
  const contentElements = [
    {
      imgSrc: briggs_1,
      title: 'Consulting & Assessments',
      type: 'bullets',
      description: "",
      bullets: [
        'Strategic guidance and thorough evaluations to optimize your business operations',
        'Comprehensive business analysis and roadmap development for sustainable growth'
      ]
    },
    {
        imgSrc: briggs_2,
      title: 'Corporate & Technology',
      type: 'bullets',
      description: '',
      bullets: [
        "Innovative solutions to drive your digital transformation journey",
        "Enterprise-level technology integration and modernization strategies"
      ]
    },
    {
        imgSrc: briggs_3,
      title: 'Cyber & Data Privacy',
      type: 'bullets',
      description: '',
      bullets: [
        "Robust security measures to protect your valuable data assets",
        "Compliance frameworks and risk management solutions for data protection"
      ]
    },
    {
        imgSrc: briggs_4,
      title: 'Artificial Intelligence',
      type: 'bullets',
      description: '',
      bullets: [
        'Cutting-edge AI solutions to enhance decision-making and automation',
        'Custom machine learning models and AI-driven process optimization'
      ]
    }
  ];
  
  const scroll = () => {
  contentRefs.value.forEach((el, index) => {
    const isLastIndex = index === contentRefs.value.length - 1;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 17.5%',
          endTrigger: ".end_trigger",
          scrub: true,
          pin: true,
          pinSpacing: false,
          onEnter: () => {
          }
        },
      })
      .to(el, {
        scale: isLastIndex ? 1 : 0.9 + index / 100,
        yPercent: isLastIndex ? -20 + index * 4 : -20 + index * 2,
        zIndex: -10,
        filter: isLastIndex ? 'none' : 'blur(1px)',
      });
  });


};




const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 767;
};

  
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  setTimeout(() => {
    scroll();
  }, 100);

  // Clean up the event listener when the component is unmounted
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
  });
});




  </script>
  
  <style scoped>

.stackContainer{
    display: flex;
    gap:7.5%;
    padding-top:10vh
}

.threeOuterContianer{
  position: relative;
  width:45%;
}


  .content__sticky {
    margin-bottom: 20vh; /* This creates space between sticky elements */
    position: relative;
    transform: translateY(0);
    text-align: center;
    padding: 20px;
    z-index: 1;
    background-color:#082a42;
    width:40vw;
    height:75vh;
    margin-left:0%;
    border-radius:10px;
    border:3px solid rgba(20, 120, 196, 0.1);
    box-shadow: 2px 3px 8px rgba(0, 0, 0, 0.3);
    overflow: hidden;
  }
  
  .content__img--small {
    max-width: 200px;
    margin-bottom: 20px;
  }
  
  .content__title {
    font-size: 200%;
    margin-bottom: 10px;
    color:#fff;
    text-decoration: underline;
    text-decoration-color: #95B4CC;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
    margin-top:3%
  }
  
  .content__text {
    font-size: 120%;
    color:#fff;
    width:80%;
    font-weight:400;
    margin-left:10%;
    text-align: justify;
    margin-top:10%;
    line-height:1.5
  }



  .paperOverlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: .55;
    background-size: 100%;
    background-repeat: repeat;
    background-image: url("~/assets/content/images/paper_overlay_3.webp");
    mix-blend-mode: multiply;
    pointer-events: none;
    z-index: 0;
  }

      
  .threeContainer{
    width:100%;
    height:100vh
}

.flex_it{
  display:flex;
  gap:1%;
  margin-bottom: 25px;
}

.bullet{
  color: #95B4CC;
  font-size: 30px;
  line-height: 1;
}

.bulletItem{
  font-size: 125%;
    color:#fff;
    width:80%;
    font-weight:400;
    text-align: left;
    line-height:1.5;
    margin-left:12px
}

.bulletBox{
  margin-top:8%;
  margin-left:5%
}



.image{
  width:100%;
  height: auto;
  object-fit: cover;
}

.imageBox {
  height:30vh;
  width: 80%;
  margin-left: 10%;
  border-radius: 10px;
  overflow: hidden; 
  margin-top: 20px; 
  border: 2px solid rgba(149, 180, 204, 0.6);
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.75);
  position: position;
  bottom:5vh
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


.center_it{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  position: relative;
  height:62.5vh;
}


.sectionScrollContainer{
    width:85%;
    height:95vh;
    margin-left:15%;
    margin-top:0vh
}

.sectionScrollContainer:nth-child(1){
    margin-top:15vh
}

.sectionTitle{
    font-size: 350%;
    color:#000;
    text-decoration: underline;
    text-decoration-color: #95B4CC;
    text-decoration-thickness: 3px;
    text-underline-offset: 4px;
    margin-top:3%;
    line-height:1.25
}

.sectionSubtitle{
    font-size: 125%;
    color:#000;
    line-height:1.5;
    margin-top:5%
}





@media only screen and (min-width: 0px) and (max-width: 376px) {
  .stackContainer{
    display: flex;
    flex-direction: column;
    padding-top:10vh
}

.content__sticky {
    margin-top:90vh;
    margin-left:10vw;
    width:90vw;
    margin-left:5vw
  }


  
.bulletItem{
  font-size: 80%;
  width:95%
}

.center_it{
  display: flex;
  flex-direction: column;
  position: relative;
  height:50vw;
}

.content__title {
    font-size: 150%;
    line-height:1.5
  }

  .bullet{
  color: #95B4CC;
  font-size: 80px;
  line-height: 0.5;
}

.content__text {
    width:95%;
    margin-left:2.5%;
  }

  .bulletBox{
  margin-left:-5%
}

.imageBox{
  display: none;
}


}
  
@media only screen and (min-width: 376px) and (max-width: 576px) {

  .stackContainer{
    display: flex;
    flex-direction: column;
    padding-top:10vh
}

.content__sticky {
    margin-top:90vh;
    margin-left:10vw;
    width:90vw;
    margin-left:5vw
  }


  
.bulletItem{
  font-size: 80%;
  width:95%
}

.center_it{
  display: flex;
  flex-direction: column;
  position: relative;
  height:50vw;
}

.content__title {
    font-size: 150%;
    line-height:1.5
  }

  .bullet{
  color: #95B4CC;
  font-size: 80px;
  line-height: 0.5;
}

.content__text {
    width:90%;
    margin-left:5%;
  }

  .bulletBox{
  margin-left:-2.5%
}

.imageBox{
  display: none;
}



}

@media only screen and (min-width: 576px) and (max-width: 768px) {

  .stackContainer{
    display: flex;
    flex-direction: column;
    padding-top:10vh
}

.content__sticky {
    margin-top:90vh;
    margin-left:10vw;
    width:90vw;
    margin-left:5vw
  }


  
.bulletItem{
  font-size: 100%;
  width:95%
}

.center_it{
  display: flex;
  flex-direction: column;
  position: relative;
  height:50vw;
}

.content__title {
    font-size: 150%;
    line-height:1.5
  }

  .bullet{
  color: #95B4CC;
  font-size: 80px;
  line-height: 0.5;
}

.content__text {
    width:90%;
    margin-left:5%;
  }

  .bulletBox{
  margin-left:-2.5%
}

.imageBox{
  display: none;
}



}

@media only screen and (min-width: 768px) and (max-width: 992px) {

  .stackContainer{
    display: flex;
    flex-direction: column;
    padding-top:10vh
}

.content__sticky {
    margin-top:90vh;
    margin-left:10vw;
    width:90vw;
    margin-left:5vw
  }


  
.bulletItem{
  font-size: 100%;
  width:95%
}

.center_it{
  display: flex;
  flex-direction: column;
  position: relative;
  height:50vw;
}

.content__title {
    font-size: 150%;
    line-height:1.5
  }

  .bullet{
  color: #95B4CC;
  font-size: 80px;
  line-height: 0.5;
}

.content__text {
    width:80%;
    margin-left:10%;
  }

  .bulletBox{
  margin-left:0%
}

.imageBox{
  display: none;
}


}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .bulletItem{
  font-size: 100%;
  width:95%
}

.imageBox{
  display: none;
}


}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {
  .bulletItem{
  font-size: 100%;
}
}


@media only screen and (min-width: 1600px) and (max-width: 2000px) {
  .bulletItem{
  font-size: 100%;
}
}

@media only screen and (min-width: 2000px) and (max-width: 2500px) {
  .bulletItem{
  font-size: 100%;
}
}

@media only screen and (min-width: 2500px) and (max-width: 5600px) {
  .bulletItem{
  font-size: 100%;
}
}





  </style>
  