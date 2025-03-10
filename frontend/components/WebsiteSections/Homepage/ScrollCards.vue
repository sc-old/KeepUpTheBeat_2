<template>

<div class="scroll_cards_container">
<div class="content">
				<div class="grid grid--columns" data-grid-second>
					<div class="grid__img_container">
            <img class="grid__img" src="https://labastille.com/wp-content/uploads/2023/02/Christina_Copper_Render.jpg" alt="Image 1">
            <div class="img_title">Tables</div>
          </div>
					<div class="grid__img_container">
            <img class="grid__img" src="https://labastille.com/wp-content/uploads/2020/12/Pewter-Res-4.jpg" alt="Image 2">
            <div class="img_title">Panels</div>
          </div>
					<div class="grid__img_container">
            <img class="grid__img" src="https://labastille.com/wp-content/uploads/2017/08/Coffee_Table.jpg" alt="Image 3">
            <div class="img_title">Range Hoods</div>
          </div>
					<div class="grid__img_container">
            <img class="grid__img" src="https://labastille.com/wp-content/uploads/2017/09/backsplash-2.jpg" alt="Image 4">
            <div class="img_title">Wall Panels</div>
          </div>
					<div class="grid__img_container">
            <img class="grid__img" src="https://labastille.com/wp-content/uploads/2018/09/Holts-Cafe-Vancouver-Bar-2016-1-copy.jpg" alt="Image 5">
            <div class="img_title">Custom</div>
          </div>
					<div class="grid__item pos-6">
              <h4 class="type-tiny">Vision</h4>
              <p class="scroll_cards_text">Unveiling the unseen</p>
          </div>
          <div class="grid__item pos-7">
              <h4 class="type-tiny">Focus</h4>
              <p class="scroll_cards_text">Where color meets form</p>
          </div>
          <div class="grid__item pos-18">
              <h4 class="type-tiny">Essence</h4>
              <p class="scroll_cards_text">Beauty in detail</p>
          </div>
				</div>
			</div>
</div>

</template>


<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    setTimeout(() => {
  const animateSecondGrid = () => {
    const grid = document.querySelector('[data-grid-second]');
    const gridImages = grid.querySelectorAll('.grid__img_container');
    const middleIndex = Math.floor(gridImages.length / 2);

    gsap.timeline({
      defaults: {
        ease: 'power3'
      },
      scrollTrigger: {
        trigger: grid,
        start: 'center center',
        end: '+=250%',
        pin: grid.parentNode,
        scrub: 0.5,
        pinSpacing: false
      }
    })
    .from(gridImages, {
      stagger: {
        amount: 0.3,
        from: 'center'
      },
      y: window.innerHeight,
      transformOrigin: '50% 0%',
      rotation: pos => {
        const distanceFromCenter = Math.abs(pos - middleIndex);
        return pos < middleIndex ? distanceFromCenter * 3 : distanceFromCenter * -3;
      },
    })
    .from(grid.querySelectorAll('.grid__item'), {
      stagger: {
        amount: 0.3,
        from: 'center'
      },
      yPercent: 100,
      autoAlpha: 0
    }, 0);
  };

  animateSecondGrid();
    }, 200);
});
</script>





<style scoped>

.scroll_cards_container{
    width: 100vw;
    height: 100vh;
    /* background-color: #082a42; */
    position: relative;
    z-index: 1;
    padding-bottom: 230%;
}

.unbutton {
	background: none;
	border: 0;
	padding: 0;
	margin: 0;
	font: inherit;
	cursor: pointer;
}

.unbutton:focus {
	outline: none;
}

.type-tiny,
.cdawrap {
	font-size: 11px;
	text-transform: uppercase;
	font-weight: 400;
	font-variation-settings: "wght" 400;
    color: #02598a;
    margin-top: 20px;
    text-decoration: underline;
    text-underline-offset: 1px;
    text-decoration-color: #ffbb1e;
    text-decoration-thickness: 1px;
    margin-bottom: 3px;
}

.scroll_cards_text{
    color: #082a42;
}

.content {
	position: relative;
	align-content: center;
    width: 95%;
    margin: 0 auto;
    margin-top: -35%;
}



.grid {
	display: grid;
	width: 100%;
	height: 100%;
    grid-template-columns: repeat(5,1fr);
	grid-template-rows: repeat(2,min-content);
  align-content: center;
  gap: 10px
}


.grid--columns {
  grid-template-columns: repeat(5,1fr);
	grid-template-rows: repeat(2,min-content);
  align-content: center;
}

.grid__img_container {
    position: relative;
    overflow: hidden;
    will-change: transform;
    transform: translateZ(0.1px);
}

.grid__img {
    width: 100%;
    height: auto;
    pointer-events: none;
    object-fit: cover;
    transition: filter 0.3s ease;
}

.grid__img_container:hover .grid__img {
    filter: blur(5px);
    transition: filter 0.3s ease;
}

.grid--columns .grid__img {
	height: min-content;
	aspect-ratio: 2 / 3;
}

.pos-6 { grid-area: 2 / 1; }
.pos-7 { grid-area: 2 / 3; }
.pos-18 { grid-area: 2 / 5; }

.img_title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5em;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.grid__img_container:hover .img_title {
  opacity: 1;
}

</style>