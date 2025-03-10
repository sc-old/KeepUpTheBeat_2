<template>
    <div class="content content--full">
      <div class="grid grid--spaced" data-grid-first>
        <div v-for="(img, index) in images" :key="index" :class="`grid__img pos-${index + 1}`" :style="{ backgroundImage: `url(${img})` }"></div>
      </div>
      <div class="content__title">
        <h2 class="content__title-main">Rawness</h2>
        <p class="type-tiny right end">Captured in every design</p>
      </div>
    </div>
</template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  
  gsap.registerPlugin(ScrollTrigger)
  
  const images = [
    'https://labastille.com/wp-content/uploads/2023/02/June_Cast-Brass-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2023/02/Christina_Copper_Render.jpg', 
    'https://labastille.com/wp-content/uploads/2022/12/June_Cast-Copper-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2022/12/June_Cast-Zinc.jpg', 
    'https://labastille.com/wp-content/uploads/2022/11/Lucianna-Scales_Cast-Brass-1.jpg',  
    'https://labastille.com/wp-content/uploads/2022/07/Kipp_Lake-Forest_1-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2022/07/0-1.jpg', 
    'https://labastille.com/wp-content/uploads/2022/12/Lucianna-Basketweave_Cast-Zinc-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2022/07/Kipp_Lake-Forest_2-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2022/07/Brown-Residence_Stamford_2_2019.jpg',
    'https://labastille.com/wp-content/uploads/2022/07/Roma-Cocktail-Lounge_Naples_3_2022-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2020/12/Royale_Calgary_Zinc-Bar-scaled.jpg', 
    'https://labastille.com/wp-content/uploads/2020/12/Fish-2-copy.jpg', 
    'https://labastille.com/wp-content/uploads/2020/12/IMG_3759.jpg', 
    'https://labastille.com/wp-content/uploads/2020/12/July-23.jpg', 
    'https://labastille.com/wp-content/uploads/2020/12/IMG_3750.jpg', 
    'https://labastille.com/wp-content/uploads/2017/09/backsplash-2.jpg', 
   
  ]
  
  onMounted(() => {
    setTimeout(() => {
        animateFirstGrid()
    }, 100)
  })
  
  const animateFirstGrid = () => {
    const grid = document.querySelector('[data-grid-first]')
    const gridImages = grid.querySelectorAll('.grid__img')
  
    gsap.timeline({
      defaults: { ease: 'sine' },
      scrollTrigger: {
        trigger: grid,
        start: 'center center',
        end: '+=250%',
        pin: grid.parentNode,
        scrub: 0.5,
        pinSpacing: true
      }
    })
    .from(gridImages, {
      stagger: 0.07,
      y: () => gsap.utils.random(window.innerHeight, window.innerHeight * 1.8)
    })
    .from(grid.parentNode.querySelector('.content__title'), {
      duration: 1.2,
      ease: 'power4',
      yPercent: 180,
      autoAlpha: 0
    }, 0.8)
  }
  </script>
  
  <style scoped>

  

  .content {
    min-height: 100vh;
    position: relative;
    margin-top: -40%;
    padding-bottom: 20vh;
    position: relative;
  }
  
  .content--full {
    display: grid;
    height: 80vh;
    place-items: center;
  }
  
  .grid {
    display: grid;
    width: 95%;
    height: 80%;
    gap: 5px;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  
  .grid__img {
    background-size: cover;
    background-position: 50% 50%;
    will-change: transform;
    aspect-ratio: 1 / 1.5; /* Ensures a 1:2 aspect ratio */
  }
  
  .content__title {
    position: absolute; /* Change from relative to absolute */
    top: 45%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust for centering */
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #fff;
    padding-bottom: 30px;
  }
  
  .content__title-main {
    font-size: clamp(2rem, 7vw, 4.5rem);
    line-height: 1;
    margin: 0.5rem 0 0;
    font-weight: 500;
  }
  
  .type-tiny {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 400;
    color: #ffbb1e;
    width: 50%;
    text-align: right;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  
  .pos-1 { grid-area: 1 / 1; }
  .pos-2 { grid-area: 1 / 3; }
  .pos-3 { grid-area: 1 / 4; }
  .pos-4 { grid-area: 1 / 5; }
  .pos-5 { grid-area: 1 / 7; }
  .pos-6 { grid-area: 2 / 1; }
  .pos-7 { grid-area: 2 / 3; }
  .pos-8 { grid-area: 2 / 4; }
  .pos-9 { grid-area: 2 / 6; }
  .pos-10 { grid-area: 2 / 7; }
  .pos-11 { grid-area: 2 / 8; }
  .pos-12 { grid-area: 3 / 1; }
  .pos-13 { grid-area: 3 / 2; }
  .pos-14 { grid-area: 3 / 4; }
  .pos-15 { grid-area: 3 / 5; }
  .pos-16 { grid-area: 3 / 7; }
  .pos-17 { grid-area: 3 / 8; }
  </style>
  