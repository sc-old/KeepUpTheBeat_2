<template>
    <div class="container_scroll">
      <div class="background"></div>
      <!-- <div class="long_image_container">
        <img class="long_image" src="https://plus.unsplash.com/premium_photo-1675813862776-d78fb89707e7?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
      </div> -->

      <h1 class="main_title animate_title_contact">SAY HELLO</h1>

      <div class="section" data-type="horizontal">
  <div class="section__cards">
    <div class="section__card">
      <h1 class="section__title">Contact</h1>
      <p class="section__text text_1"><b>Phone:</b> (678) 795-0331 <br><br> <b>Email:</b> premierautorepair@gmail.com </p>
    </div>
    <div class="section__card">
      <h1 class="section__title">Hours</h1>
      <p class="section__text text_1">
        <b>Monday:</b> 08:00am - 05:00pm
        <br><br>
        <b>Tursday:</b> 08:00am - 05:00pm
        <br><br>
        <b>Wednesday:</b> 08:00am - 05:00pm
        <br><br>
        <b>Thursday:</b> 08:00am - 05:00pm
        <br><br>
        <b>Friday:</b> 08:00am - 05:00pm
        <br><br>
        <b>Saturday:</b> Closed
        <br><br>
        <b>Sunday:</b> Closed
      </p>
    </div>
    <div class="section__card">
      <h1 class="section__title">Address</h1>
      <p class="section__text text_1"><b>Premier Auto Repairg</b>
          <br><br>
          1177 Alpharetta Street
          <br><br>
          Roswell, GA 30075</p>
    </div>
  </div>
</div>
    </div>
  </template>
  
  <script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


onMounted(() => {
  setTimeout(() => {

  const sections = document.querySelectorAll(".section");

  // Section Pinning
  sections.forEach(section => {
    // Check if section has horizontal scrolling
    const cards = section.querySelector(".section__cards");
    const card = section.querySelectorAll(".section__card");
    
    gsap.to('.container_scroll', {
      scrollTrigger: {
        trigger: '.container_scroll',
        start: 'top top',
        end: '+=55%',
        pin: true,
        pinSpacing: true  
      }
    });


    gsap.set(cards, {
      x: '125%'
    })

    gsap.to(cards, {
      x: '-80%',
      scrollTrigger: {
        trigger: '.section__cards',
        start: 'center center',
        end: '+=80%',
        scrub: 1      } 
    });
  

    
  });



  }, 300);


});
</script>


<style scoped>

.container_scroll{
  width:100vw;
  height:100vh;
  background-color: var(--background_color);
  position: relative;

}

.background{
  position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity:.85;
    background-size: 35%;
    background-repeat: repeat;
    background-image: url();
    mix-blend-mode: multiply;
    pointer-events: none;
    z-index: -1;
}

.long_image_container{
  width:25vw;
  height:75vh;
  position: absolute;
  top:17vh;
  left:10%;
  z-index: -1;
}

.long_image{
  width:100%;
  height:100%;
  object-fit: cover;
}

.section__cards{
  /* margin-left:112%; */
  width:120vw;
  display:flex;
  padding-top:20vh
}

.section__card {
  width: 650px; /* Adjust card width as needed */
  height: 60vh; /* Adjust card height as needed */
  margin: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  border:#cd9a0d45 solid 1px;
  backdrop-filter: blur(30px);
}

.section__card{
  display:flex;
  flex-direction: column;
}

.section__title{
  font-size: 30px;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:15%;
  line-height: 1;
}

.section__text{
  color: #fff;
  text-align: center;
  margin-top:12%;
  line-height: 1;
  width:70%;
  margin-left:15%
}

.main_title{
  font-size: 12vw;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:42.5%;
  line-height: 1;
  position:absolute;
  width: 100vw;
}


@media only screen and (min-width: 0px) and (max-width: 376px) {
  .main_title{
    font-size: 12vw;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:48vh;
  line-height: 1;
  margin-left:5%;
  position:absolute
}

.section__cards{
  /* margin-left:112%; */
  width:200vw;
  display:flex;
  padding-top:20vh
}

.section__card {
  height: 60vh;
  margin: 20px;
}
}


@media only screen and (min-width: 376px) and (max-width: 576px) {
  .main_title{
    font-size: 12vw;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:45vh;
  line-height: 1;
  margin-left:5%;
  position:absolute
}

.section__cards{
  /* margin-left:112%; */
  width:200vw;
  display:flex;
  padding-top:25vh
}

.section__card {
  height: 40vh;
  margin: 20px;
}


}

@media only screen and (min-width: 576px) and (max-width: 768px) {
  .main_title{
    font-size: 12vw;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:43vh;
  line-height: 1;
  margin-left:5%;
  position:absolute
}

.section__cards{
  /* margin-left:112%; */
  width:200vw;
  display:flex;
  padding-top:25vh
}

.section__card {
  height: 40vh;
  margin: 20px;
}

}

@media only screen and (min-width: 768px) and (max-width: 992px) {
  .main_title{
    font-size: 12vw;
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-top:43vh;
  line-height: 1;
  margin-left:5%;
  position:absolute
}

.section__cards{
  /* margin-left:112%; */
  width:200vw;
  display:flex;
  padding-top:25vh
}

.section__card {
  height: 40vh;
  margin: 20px;
}
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
  .section__card {
      height: 45vh;
      margin: 20px;
    }

    .section__cards{
        /* margin-left:112%; */
        width:150vw;
        display:flex;
        padding-top:27vh
      }

      .main_title{
  margin-top:43vh;
}
}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
  .section__card {
      height: 40vh;
      margin: 20px;
    }

    .section__cards{
        padding-top:35vh
      }
      .main_title{
        margin-top:47vh;
      }
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {
  .main_title{
    font-size: 12vw;
  margin-top:43vh;
}
.section__card {
      height: 40vh;
      margin: 20px;
    }
    .section__cards{
        padding-top:30vh
      }
}

@media only screen and (min-width: 1600px) and (max-width: 2000px) {
  .main_title{
  margin-top:43vh;
}


.section__card {
      height: 40vh;
      margin: 20px;
      width:1000px
    }
    .section__cards{
        /* margin-left:112%; */
        width:120vw;
        display:flex;
        padding-top:27vh
      }
      .section__text{
  margin-top:8%;
  font-size: 28px;
}



}

@media only screen and (min-width: 2000px) and (max-width: 2500px) {

  .section__card {
      height: 40vh;
      margin: 20px;
      width:1000px
    }
    .section__cards{
        /* margin-left:112%; */
        width:120vw;
        display:flex;
        padding-top:27vh
      }
      .section__text{
  margin-top:8%;
  font-size: 33px;
}
.main_title{
  margin-top:41vh;
}

}

@media only screen and (min-width: 2500px) and (max-width: 5600px) {

  .main_title{
  margin-top:41vh;
}


.section__card {
      height: 40vh;
      margin: 20px;
      width:1000px
    }
    .section__cards{
        /* margin-left:112%; */
        width:120vw;
        display:flex;
        padding-top:27vh
      }
      .section__text{
  margin-top:8%;
  font-size: 28px;
}

}




@media only screen and (max-height: 600px) and (min-width: 600px) {
  .section__card {
      height: 60vh;
      margin: 20px;
    }

    .section__title{
  font-size: 30px;
  margin-top:10%;
}

.section__text{
  margin-top:8%;
}

}

@media only screen and (min-height: 600px) and (max-height: 750px) {
  .section__card {
      height: 60vh;
      margin: 20px;
    }

    .section__title{
  font-size: 30px;
  margin-top:10%;
}

.section__text{
  margin-top:8%;
}

.section__cards{
  padding-top:20vh
}

}

@media only screen and (min-height: 750px) and (max-height: 900px) {
  .section__text{
  margin-top:8%;
  font-size: 15px;
}

.section__title{
  font-size: 30px;
  margin-top:8%;
}
.section__cards{
  padding-top:35vh
}
}

@media only screen and (min-height: 900px) and (max-height: 1000px) {
  .section__text{
  margin-top:8%;
  font-size: 18px;
}
.section__cards{
  padding-top:32vh;
  width:120vw;
}
.section__title{
  margin-top:8%;
}

}

@media only screen and (min-height: 1000px) and (max-height: 1100px) {
  .section__text{
  margin-top:8%;
  font-size: 20px;
}

.section__card {
  height: 42vh;
  margin: 20px;
}

.section__cards{
  padding-top:32vh;
  width:120vw;
}

.section__title{
  margin-top:8%;
}

}

@media only screen and (min-height: 1100px) and (max-height: 1250px) {
  .section__text{
  margin-top:8%;
  font-size: 20px;
}

.section__card {
  height: 42vh;
  margin: 20px;
}

.section__cards{
  padding-top:30vh;
  width:120vw;
}
}

@media only screen and (min-height: 1250px) and (max-height: 1500px) {
  .section__text{
  margin-top:8%;
  font-size: 20px;
}

.section__card {
  height: 38vh;
  margin: 20px;
}

.section__cards{
  padding-top:30vh;
  width:120vw;
}
}


</style>
