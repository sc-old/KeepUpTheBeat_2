<template>
  <div class="grids-container" ref="cardsContainer">
    <!-- First grid - three rows -->
    <div class="grid-three-rows">
        <div class="grid-two-columns">
        <div class="content">
          <h3 class="content__title">We are a team of<br>experienced safety professionals</h3>
          <p class="content__text">Teaching you how to save lives</p>
        </div>
      <div class="card card-blue">
        <div class="card-content">
          <h3 class="card_title">26</h3>
          <p class="card_text">That's how many years we've been in the business</p>
        </div>
      </div>
      </div>
    <!-- Second grid - two columns with middle row 2/3 and 1/3 split -->
    <div class="grid-middle-split">
      <div class="card card-purple">
        <div class="card-content">
            <h3 class="card_title_2">100% Remote</h3>
            <p class="card_text_2">We where you are, no matter where you are</p>
        </div>
      </div>
      <div class="card card-orange">
        <div class="card-content_3">
            <h3 class="card_title_3">1D</h3>
            <p class="card_text_3">Get your certification in one day or get qualified in a week</p>
        </div>
      </div>
    </div>
     <!-- Second grid - two columns with middle row 2/3 and 1/3 split -->
     <div class="grid-two-columns">
      <div class="card card-red">
        <div class="card-content_3">
            <h3 class="card_title_4">Many Courses, Real Instructors, Easy to understand, & A Lot of Fun</h3>
            <p class="card_text_4">... plus a few more perks</p>
        </div>
      </div>
      <div class="card card-black">
        <div class="card-content">
            <h3 class="card_title_5">Culture over everything</h3>
            <div class="card_text_5_container">
            <p class="card_text_5">Stale Courses</p>
            <p class="card_text_5">Boring Instructors</p>
            <p class="card_text_5">False Certifications</p>
            <p class="card_text_5">No Fun</p>
            </div>
        </div>
      </div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Reference to all cards
const cardsContainer = ref(null);

onMounted(() => {
    setTimeout(() => {
  // Set initial state - rotate cards out of view
  gsap.set('.card', { 
    rotationY: 90,
    opacity: 0,
    transformPerspective: 1000
  });
  
  // Create animations for each row
  const rows = [
    '.grid-two-columns:first-child .card',
    '.grid-middle-split .card',
    '.grid-two-columns:last-child .card'
  ];
  
  rows.forEach((rowSelector, index) => {
    const rowCards = document.querySelectorAll(rowSelector);
    if (rowCards.length) {
      const rowTl = gsap.timeline();
      rowTl.to(rowCards, {
        rotationY: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
      
      ScrollTrigger.create({
        trigger: rowCards[0].parentElement,
        start: "top 90%",
        end: "bottom top",
        toggleActions: 'play none none reset',
        animation: rowTl
      });
    }
  });
    }, 1000);
});
</script>

<style scoped>
.grids-container {
  width: 90%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20%;
}

/* First grid - three rows */
.grid-three-rows {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 20px;
}

/* Second grid - two columns with middle row having 2/3 and 1/3 split */
.grid-two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 20px;
}

.wide-card {
  grid-column: 1;
  grid-row: 2;
}

.narrow-card {
  grid-column: 2;
  grid-row: 2;
}

/* Make the middle row have 2/3 and 1/3 split */
.grid-middle-split {
  grid-template-columns: 2fr 1fr;
  display: grid;
  grid-template-rows: 1fr;
  gap: 20px;
}

.card {
  border-radius: 12px;
  padding: 20px;
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Card colors */
.card-red {
  background-color: #ffcdd2;
}

.card-blue {
  background-color: #bbdefb;
}

.card-green {
  background-color: #c8e6c9;
}

.card-purple {
  background-color: #e1bee7;
}

.card-orange {
  background-color: #ffe0b2;
}

.card-black {
  background-color: #000;
}

.content{
    margin-top: 8%;
    margin-left: 8%;
}
.content__title{
    font-size: 235%;
    font-weight: 600;
    color: #000;
    width: 80%;
}

.card-content, .card-content_3 {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-content_3 {
  align-items: center;
  justify-content: center;
}

.content__text{
    font-size: 120%;
    color: #000;
    margin-top: 8%;
}

.card_title{
    font-size: 1000%;
    font-weight: 600;
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
}

.card_title_2{
    font-size: 500%;
    font-weight: 600;
    color: #000;
    position: absolute;
    top: 0;
    left: 0;
}
.card_title_3{
    font-size: 1000%;
    font-weight: 600;
    color: #000;
    position: absolute;
    top: 0;
}
.card_title_4{
    font-size: 200%;
    font-style: italic;
    font-weight: 100;
    color: #000;
    position: absolute;
    top: 10%;
    text-align: center;
}
.card_title_5{
    font-size: 350%;
    font-weight: 600;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
}
.card_text{
    font-size: 120%;
    position: absolute;
    bottom: 2%;
    left: 2%;
    width: 60%;
    line-height: 1.5;
}
.card_text_2{
    font-size: 120%;
    position: absolute;
    bottom: 2%;
    left: 2%;
    width: 45%;
    line-height: 1.5;
}
.card_text_3{
    font-size: 120%;
    position: absolute;
    bottom: 2%;
    left: 2%;
    text-align: center;
    line-height: 1.5;
}
.card_text_4{
    font-size: 120%;
    position: absolute;
    bottom: 4%;
    font-style: italic;
}
.card_text_5{
    font-size: 120%;
    line-height: 1.5;
    color: #fff;
    text-decoration: line-through;
    text-decoration-thickness: 3px;
    text-decoration-color: #da0000;
}

.card_text_5_container{
    position: absolute;
    bottom: 2%;
    left: 2%;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .grids-container {
    width: 95%;
    margin-top: 10%;
    gap: 20px;
  }
  
  .grid-two-columns,
  .grid-middle-split {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
  
  .card {
    min-height: 250px;
  }
  
  .content__title {
    font-size: 180%;
    width: 100%;
  }
  
  .card_title {
    font-size: 600%;
  }
  
  .card_title_2 {
    font-size: 300%;
  }
  
  .card_title_3 {
    font-size: 600%;
  }
  
  .card_title_4 {
    font-size: 150%;
    top: 5%;
  }
  
  .card_title_5 {
    font-size: 250%;
  }
  
  .card_text,
  .card_text_2,
  .card_text_3 {
    width: 90%;
    font-size: 100%;
  }
}

/* Extra small devices */
@media (max-width: 480px) {
  .card_title {
    font-size: 400%;
  }
  
  .card_title_2 {
    font-size: 200%;
  }
  
  .card_title_3 {
    font-size: 400%;
  }
  
  .card_title_4 {
    font-size: 120%;
  }
  
  .card_title_5 {
    font-size: 180%;
  }
}
</style>
