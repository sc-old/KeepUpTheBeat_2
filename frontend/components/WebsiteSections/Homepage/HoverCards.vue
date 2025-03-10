<template>

<div class="grid_container">
    <div class="left_column">
      <h2 class="section_title">Our Services</h2>
      <p class="section_subtitle">We provide comprehensive solutions across multiple domains to help businesses thrive in the digital age.</p>
    </div>
    <div class="right_column">
      <div class="services_grid">
        <div class="service_item" @mouseenter="animateTextIn" @mouseleave="animateTextOut">
          <div class="service_item_inner">
            <div class="service_item_text">
          <h3 class="service_title">Consulting & Assessments</h3>
          <p class="service_subtitle">Strategic guidance and thorough evaluations to optimize your business operations</p>
            </div>
          <div class="arrow_svg"></div>
          </div>
        </div>
        <div class="service_item" @mouseenter="animateTextIn" @mouseleave="animateTextOut">
          <div class="service_item_inner">
            <div class="service_item_text">
          <h3 class="service_title">Corporate & Technology</h3>
          <p class="service_subtitle">Innovative solutions to drive your digital transformation journey</p>
            </div>
          <div class="arrow_svg"></div>
          </div>
        </div>
        <div class="service_item" @mouseenter="animateTextIn" @mouseleave="animateTextOut">
          <div class="service_item_inner">
            <div class="service_item_text">
          <h3 class="service_title">Cyber & Data Privacy</h3>
          <p class="service_subtitle">Robust security measures to protect your valuable data assets</p>
            </div>
          <div class="arrow_svg"></div>
          </div>
        </div>
        <div class="service_item" @mouseenter="animateTextIn" @mouseleave="animateTextOut">
          <div class="service_item_inner">
            <div class="service_item_text">
            <h3 class="service_title">Artificial Intelligence</h3>
          <p class="service_subtitle">Cutting-edge AI solutions to enhance decision-making and automation</p>
            </div>
          <div class="arrow_svg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>
import { gsap } from "gsap";

function animateTextIn(event) {
  gsap.to(event.currentTarget.querySelector('.service_item_text'), {
    x: '4%',
    duration: 0.4,
    ease: "power3.out"
  });
}

function animateTextOut(event) {
  gsap.to(event.currentTarget.querySelector('.service_item_text'), {
    x: '0%',
    duration: 0.4,
    ease: "power3.in",
  });
}
</script>


<style scoped>
.grid_container {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 2%;
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 95%;
  margin-left: 2.5%;
}

.left_column {
  padding: 2rem;
  border-top: 1px solid #95B4CC;
}

.section_title {
  font-size: 100%;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #062236;
  margin-top: -3%;
}

.section_subtitle {
  font-size: 120%;
  line-height: 1.5;
  color: #4a5568;
  font-weight: 400;
}

.services_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2%;
}

.service_item {
  position: relative;
  border-top: 1px solid #95B4CC;
}

.service_item:hover {
  border-top: 1px solid #95b4cc00;
  border-bottom: 1px solid #95b4cc00;
}

.services_grid .service_item:nth-child(n+3) {
  border-bottom: 1px solid #95B4CC;
}

.services_grid .service_item:nth-child(3):hover {
  border-top: 1px solid #95b4cc00;
  border-bottom: 1px solid #95b4cc00;
}

.services_grid .service_item:nth-child(4):hover {
  border-top: 1px solid #95b4cc00;
  border-bottom: 1px solid #95b4cc00;
}

.services_grid .service_item:nth-child(1):hover ~ .service_item:nth-child(3),
.services_grid .service_item:nth-child(3):hover ~ .service_item:nth-child(1) {
  border-top: 1px solid #95b4cc00;
  border-bottom: 1px solid #95b4cc00;
}

.services_grid .service_item:nth-child(2):hover ~ .service_item:nth-child(4),
.services_grid .service_item:nth-child(4):hover ~ .service_item:nth-child(2) {
  border-top: 1px solid #95b4cc00;
  border-bottom: 1px solid #95b4cc00;
}

.service_item_inner{
  padding: 5%;
  border-radius: 10px;
  transition: all 0.15s ease 0.3s;
  padding-bottom: 15%;
  height: 20vh;
}

.service_item_inner:hover {
  background: #95B4CC;
  transition: all 0.2s ease;
}

.service_title {
  font-size: 165%;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #062236;
}

.service_subtitle {
  font-size: 100%;
  line-height: 1.25;
  color: #4a5568;
  width: 90%;
  padding-top: 2%;
}

.arrow_svg {
  position: absolute;
  bottom: 10px;
  right: 25px;
  border: 1px solid #000;
  border-radius: 100%;
  padding: 7px;
  width: 32px;
  height: 32px;
  object-position: center;
  content: url('~/assets/content/images/icons/right_arrow.svg');
  background-color: #fff;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateX(-30%);
}

.service_item:hover .arrow_svg {
  opacity: 1;
  transform: translateX(30%);
  transition: all 0.6s ease 0.1s;
}

.service_item_text {
  transition: none;
}


@media (max-width: 768px) {
  .grid_container {
    grid-template-columns: 1fr;
  }
  
  .services_grid {
    grid-template-columns: 1fr;
  }
}
</style>
