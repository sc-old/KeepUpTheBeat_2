<template>
  <div>
    <div class="downward_dome"></div>
    <div class="dome_overlay"></div>
    <div class="black_circle"></div>
    <div class="white_circle"></div>

    <div class="menu_overlay">
      <div class="horizontal_menu_line" :class="{ transition_width: burger_active }"></div>
      <div class="fixed_grid" :class="{ transition_height: burger_active }">
        <div class="grid_line_left_1"></div>
        <div class="grid_line_left_2"></div>
        <div class="grid_line_left_3"></div>
        <div class="grid_line_left_4"></div>
        <div class="grid_line_left_5"></div>
        <div class="grid_line_left_6"></div>
      </div>
      <div ref="ballRef" class="ball"></div>
      <div class="flex_it">
        <div class="menu_grid">
          <NuxtLink to="/" @mouseover="move_ball(ball_move_item_1)" @mouseleave="reset_ball()"
            class="menu_button cursor_hover">Home</NuxtLink>
          <NuxtLink to="/about" @mouseover="move_ball(ball_move_item_2)" @mouseleave="reset_ball()"
            class="menu_button cursor_hover">About</NuxtLink>
          <NuxtLink to="/services" @mouseover="move_ball(ball_move_item_3)" @mouseleave="reset_ball()"
            class="menu_button cursor_hover">Services</NuxtLink>
          <NuxtLink to="/labs" @mouseover="move_ball(ball_move_item_4)" @mouseleave="reset_ball()"
            class="menu_button cursor_hover">Labs</NuxtLink>
          <NuxtLink to="/contact" @mouseover="move_ball(ball_move_item_5)" @mouseleave="reset_ball()"
            class="menu_button cursor_hover">Contact</NuxtLink>
        </div>

        <div class="menu_grid_1">
          <div class="service_title">All Services</div>
          <NuxtLink to="/services#softwareAnchor" class="service_item">Software Development</NuxtLink>
          <NuxtLink to="/services#cyberor" class="service_item">Data Management</NuxtLink>
          <NuxtLink to="/services#cyberAnchor" class="service_item">CyberSecurity</NuxtLink>
        </div>

        <div @click="toggleCustomCursor()" class="cursor_toggle cursor_hover">
          <span class="cursor_span">⦿</span> Toggle Cursor
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { gsap } from 'gsap'
import { useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()


const burger_active = ref(false);

const props = defineProps(['is_open'])


const menu_modal_open = useCookie('menu_modal_open', { default: () => false, watch: true, maxAge: 1800 })
const fixed_grid_height = ref('1px');

watch(() => props.is_open, (oldValue, newValue) => {
  burger_active.value = props.is_open;
  burger_click()

});


const header_opacity = ref(0)



const tl_1 = gsap.timeline();
const tl_2 = gsap.timeline();
const tl_3 = gsap.timeline();
const tl_4 = gsap.timeline();
const tl_5 = gsap.timeline();


onMounted(() => {

  burger_active.value = false;

  if (width.value < 576) {
    ball_move_item_1.value = '82px';
    ball_move_item_2.value = '122px';
    ball_move_item_3.value = '162px';
    ball_move_item_4.value = '205px';
    ball_move_item_5.value = '245px';
    ball_move_item_6.value = '287px';
    ball_move_item_7.value = '328px';
    reset_ball();
  }

  tl_1.to(".downward_dome", { duration: 1.4, yPercent: 100, ease: "power2.in" })
    .to(".dome_overlay", { duration: 1.5, autoAlpha: 0, ease: "power4.in" }, "<")
    .to(".downward_dome", { delay: 1.5, autoAlpha: 0 })

  if (menu_modal_open.value == true) {
    tl_5.to(".menu_overlay", { delay: 0, duration: 0, yPercent: 150, autoAlpha: 0 });

    header_opacity.value = 1;
    cube_modal.value = (-90);

  } else {
    tl_5.to(".menu_overlay", { delay: 0, duration: 0, yPercent: 150, autoAlpha: 1 });
  }

  // if (!String(route_to.current_page_to).includes('fund_pages')){
  if (!String('shaun').includes('fund_pages')) {
    header_opacity.value = 1;

  }
  else {
    tl_1.to(".downward_dome", { delay: 1.5, duration: 1, autoAlpha: 0 })
    menu_modal_open.value = false;
    sleep(1400).then(() => { header_opacity.value = 1; })
  }

})



// Determine if the current device is a mobile
function isMobile() {
  return typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent);
}


const ball_move_item_1 = ref('93px');
const ball_move_item_2 = ref('160px');
const ball_move_item_3 = ref('225px');
const ball_move_item_4 = ref('290px');
const ball_move_item_5 = ref('355px');
const ball_move_item_6 = ref('420px');
const ball_move_item_7 = ref('485px');

const opacity = ref(0);
function burger_click() {

  opacity.value = 0;


  //animate buttons
  if (burger_active.value == true) {

    opacity.value = 1;


    setTimeout(() => {
      const menuOverlay = document.querySelector('.menu_grid_1');
      const height = menuOverlay.clientHeight;
      fixed_grid_height.value = (height + 100) + 'px';
    }, 3500);


    // Set elements to block to ensure they are visible for animation
    gsap.set(".black_circle", { display: 'block', yPercent: 0, xPercent: 0, scale: .5 });
    gsap.set(".white_circle", { display: 'block', yPercent: 0, xPercent: 0, scale: .5 });
    gsap.set(".dome_overlay", { display: 'block' });

    tl_2.fromTo(".black_circle", { yPercent: 0, xPercent: 0, scale: .5 }, { duration: 2.5, yPercent: -100, xPercent: 100, scale: 2.5, ease: "power2.out" })
      .fromTo(".white_circle", { yPercent: 0, xPercent: 0, scale: .5 }, { duration: 2.5, yPercent: 50, xPercent: -100, scale: 2.5, ease: "power2.out" }, "<")
      .fromTo(".dome_overlay", { opacity: 0 }, { duration: 1, opacity: 1 }, "<");



    tl_5.fromTo(".menu_overlay", { delay: 0.7, duration: 0.8, yPercent: 20, autoAlpha: 0 }, { delay: .5, duration: 0.2, yPercent: 0, autoAlpha: 1 });



    gsap.from('.menu_button', {
      opacity: 1,
      x: -300,
      duration: .5,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 1.95,
      autoAlpha: 0
    });

    gsap.from('.title_text', {
      opacity: 0,
      x: -150,
      duration: .8,
      ease: 'power2.out',
      delay: .3
    });


    gsap.from('.close_text', {
      opacity: 0,
      y: 50,
      duration: .5,
      ease: 'power2.out',
      delay: .5
    });

    gsap.from('.contact_text', {
      opacity: 0,
      y: 50,
      duration: .5,
      ease: 'power2.out',
      delay: .7
    });

    gsap.from('.service_item', {
      opacity: 0,
      y: 10,
      duration: 0.3,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 2.25
    });

    gsap.from(ballRef.value, {
      scale: 0,
      duration: .8,
      ease: 'power2.out',
      delay: 1

    });


  } else {


    tl_1.restart();
    // tl_2.progress(0).pause();
    tl_2.to(".black_circle", { duration: 0, yPercent: 0, xPercent: 0, scale: .5, onComplete: () => gsap.set(".black_circle", { display: 'none' }) })
      .to(".white_circle", { duration: 0, yPercent: 0, xPercent: 0, scale: .5, onComplete: () => gsap.set(".white_circle", { display: 'none' }) }, "<")
      .to(".dome_overlay", { duration: 1, opacity: 0, onComplete: () => gsap.set(".dome_overlay", { display: 'none' }) }, "<");



    tl_5.to(".menu_overlay", { delay: 0.4, duration: 0.4, yPercent: 60, autoAlpha: 0 });

    fixed_grid_height.value = '1px';
    sleep(1500).then(() => { tl_3.progress(0).pause(); })

  }

}






function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


const ballRef = ref(null);
const is_menu_hover = ref(false);
const new_height = ref('12px');
const last_top = ref('95px');
function move_ball(top) {
  // Convert the 'px' values to integers
  const lastTopValue = parseInt(last_top.value);
  const topValue = parseInt(top);
  // Calculate the new height
  new_height.value = Math.abs(lastTopValue - topValue) + 'px';
  last_top.value = top;

  is_menu_hover.value = true;
  gsap.to(ballRef.value, {
    height: new_height.value,
    duration: .7,
    ease: 'power2.out'
  });
  gsap.to(ballRef.value, {
    height: 12,
    top: top,
    duration: .7,
    delay: .3,
    ease: 'power2.out'
  });
}

function reset_ball() {
  is_menu_hover.value = false;
  sleep(400).then(() => {
    if (is_menu_hover.value == false) {
      last_top.value = '95px';
      gsap.to(ballRef.value, {
        top: ball_move_item_1.value,
        duration: 1,
        ease: 'power2.out',
      });
    };
  });
}





const isCustomCursorEnabled = useCookie('isCustomCursorEnabled')
const cursor_display = useCookie('cursor_display')
const cursor_pointer = useCookie('cursor_pointer')
const cursor_style = useCookie('cursor_style')
const pointer_events = useCookie('pointer_events')
function toggleCustomCursor() {
  if (isCustomCursorEnabled.value) {
    cursor_display.value = "none"
    cursor_style.value = "auto"
    cursor_pointer.value = "pointer"
    pointer_events.value = "none"
  } else {
    cursor_display.value = "block"
    cursor_style.value = "none"
    cursor_pointer.value = "none"
    pointer_events.value = "auto"
  }
  isCustomCursorEnabled.value = !isCustomCursorEnabled.value;
  location.reload();
}




</script>


<style scoped>
/* .custom_cursor{
  z-index: 1000000000000 !important;
  display: v-bind(cursor_display);
} */

.menu_overlay {
  position: fixed;
  top: 75px;
  left: 0px;
  height: 100vh;
  z-index: 1000;
  width: 100vw;
  transition: all .3s ease-in-out;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.menu_overlay::-webkit-scrollbar {
  display: none;
  background: transparent;
}

.menu_overlay::-webkit-scrollbar-thumb {
  display: none;
  background: transparent;
}

.menu_grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 25px;
  margin-top: 80px;
  margin-left: 13%;
  width: 35%;
  height: 100%;
}

.menu_grid_1 {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 20px;
  margin-top: 70px;
  margin-left: 13%;
  width: 35%;
  height: 100%;
  padding-bottom: 20vh;
  opacity: v-bind(opacity);
  transition: opacity .3s ease .4s;
}

.logo_vid {
  width: 200px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px
}

.dahboard_logo {
  width: 150px;
  margin-left: 30px;
  margin-top: 25px;
  z-index: 100;
  opacity: v-bind(burger_active ? 1 : 0);
  transition: all .5s ease-in-out 1.2s;
}









.fixed_grid {
  position: fixed;
  top: -100px;
  left: 10%;
  width: 100%;
  height: v-bind(fixed_grid_height);
  z-index: 1000;
  pointer-events: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  opacity: v-bind(opacity);
  transition: all .1s ease-in-out .325s;
}

.grid_line_left_1 {
  width: 1px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 15%
}

.grid_line_left_2 {
  width: 1px;
  height: 100%;
  /* border-right: 1px solid rgba(255, 255, 255, 0.15); */
  margin-left: 30%
}


.grid_line_left_3 {
  width: 1px;
  height: 100%;
  /* border-right: 1px solid rgba(255, 255, 255, 0.15); */
  margin-left: 45%
}

.grid_line_left_4 {
  width: 1px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 60%
}

.grid_line_left_5 {
  width: 1px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 75%
}

.grid_line_left_6 {
  width: 1px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 90%
}


.horizontal_menu_line {
  width: 1%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.15);
  top: 0px;
  left: 0;
  z-index: 1000;
  transition: width 1.5s ease;
}

.transition_width {
  width: 100% !important;
  transition: width 1.5s ease 1.15s;
}

.transition_height {
  height: 100% !important;
  transition: height 2.5s ease 1.15s;
}

.title_text {
  position: absolute;
  color: #fff;
  font-size: 20px;
  top: -41px;
  left: 5%;
  z-index: 1000;
}

.close_text {
  position: absolute;
  color: #fff;
  font-size: 13px;
  top: -41px;
  left: 67%;
}

.contact_text {
  position: absolute;
  color: #fff;
  font-size: 13px;
  top: -41px;
  right: 120px;
}

/* ------- burger animation ----------- */
/* ------- burger animation ----------- */
/* ------- burger animation ----------- */



.burger_container_menu {
  margin-top: 0px;
  margin-right: 0px;
  margin-left: -35%;
  margin-top: 10%;
  padding: 15px 10px 10px 20px;
  z-index: 350
}


.croix span {
  width: 100%;
  height: 4px;
  border-radius: 12px;
  display: block;
}

.croix span::before,
.croix span::after {
  content: "";
  width: 30px;
  background-color: black;
  display: block;
  border-radius: 12px;
  height: 4px;
}

.croix span::before {
  transform: translateY(-10px);
  transform: rotate(45deg);
}

.croix span::after {
  transform: translateY(10px);
  transform: rotate(-45deg);
  margin-top: -4px;
}

/*===============================*/

.burger {
  width: 32px;
  height: 24px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto
}

.burger span {
  width: 100%;
  height: 2px;
  margin: auto;
  background-color: black;
  border-radius: 12px;
  display: block;
  transition: all 0.5s ease-in-out;
}

.burger span::before,
.burger span::after {
  content: "";
  width: 100%;
  background-color: black;
  display: block;
  transition: all 0.5s ease-in-out;
  border-radius: 12px;
  height: 2px;
}

.burger span::before {
  transform: translateY(-10px);
}

.burger span::after {
  transform: translateY(10px);
  margin-top: -2px;
}

.burger_not_active:hover>span {
  width: 110%;
  transition: width 0.5s ease;
}

.burger.active span {
  background-color: transparent;
  border-radius: 12px;
}

.burger.active span::before {
  transform: rotateZ(45deg) translateY(0);
  border-radius: 12px;
  background-color: #fff;
}

.burger.active span::after {
  transform: rotateZ(-45deg) translateY(0);
  border-radius: 12px;
  background-color: #fff;
}

.burger.active {
  transition: all 0.25s ease;
}

.burger_container_menu .active:hover {
  transform: rotateZ(135deg) translateY(0);
}


.burger.active:hover span::before,
.burger.active:hover span::after {
  transition: all 0.5s ease;
  background-color: #2c7ad2;
}






.black_circle {
  width: 100vw;
  height: 100vw;
  border-radius: 100%;
  background-color: #000;
  border: 3px solid rgb(255, 255, 255, .1);
  z-index: 500;
  left: -101%;
  top: 100%;
  position: fixed;
}

.white_circle {
  width: 100vw;
  height: 100vw;
  border-radius: 100%;
  background-color: #fff;
  border: 3px solid rgb(0, 0, 0, .1);
  z-index: 500;
  left: 100%;
  top: -100%;
  position: fixed;
}

.downward_dome {
  width: 150vw;
  height: 120vh;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  background-color: #fff;
  border: 3px solid rgb(0, 0, 0, .1);
  z-index: 600;
  left: -25%;
  top: -125%;
  opacity: 1;
  position: fixed;
  transition: margin-top 1.5s ease-in;
}

.dome_overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(114, 114, 114, 0.3);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}






/* --------------------- arrow button -------------------------- */
/* --------------------- arrow button -------------------------- */
/* --------------------- arrow button -------------------------- */


.menu_button {
  font-size: 40px;
  width: 60%;
  transition: all ease 300ms;
  transition: color .2s ease;
  position: relative;
  color: #000;
  white-space: nowrap;
  margin-left: 15px;
  text-decoration: none;
  cursor: pointer !important
}


.menu_button:hover {
  color: var(--secondary_color)
}


.ball {
  width: 4px;
  height: 12px;
  background-color: var(--secondary_color);
  position: absolute;
  top: 95px;
  left: 11.2%;
  border-radius: 2px
}


.rize_lottie {
  width: 150px;
  margin-top: -33px;
  margin-left: -45px;
  z-index: 1000
}

.cursor_toggle {
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 83.25%;
  top: 65px
}

.cursor_toggle:hover {
  color: var(--secondary_color);
}

.cursor_span {
  color: var(--secondary_color);
}

.flex_it {
  display: flex;
  flex-direction: row;
}

.service_item {
  color: rgba(0, 0, 0, 0.95);
  font-size: 14px;
  opacity: 1;
  cursor: pointer;
  transition: color .2s ease;
}

.service_item:hover {
  color: var(--secondary_color);
  cursor: pointer;
}

.service_title {
  color: #000;
  font-size: 18px;
  font-weight: 300;
}


@media only screen and (min-width: 0px) and (max-width: 576px) {

  .menu_button {
    font-size: 300%;
    width: 100%;
    margin-left: 12px;
  }

  .cursor_toggle {
    display: none;
  }

  .grid_line_left_2 {
    border-right: 0px solid rgba(255, 255, 255, 0.15);
  }

  .grid_line_left_4 {
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    margin-left: 80%
  }

  .grid_line_left_3 {
    margin-left: 0%
  }

  .menu_grid_1 {
    margin-left: 4.5%;
    display: none
  }

  .service_title {
    color: #000;
    font-size: 16px;
    font-weight: 300;
  }

  .ball {
    display: none
  }




}

@media only screen and (min-width: 576px) and (max-width: 769px) {
  .menu_button {
    font-size: 38px;
    width: 100%;
    margin-left: 12px;
    font-size: 300%;
  }

  .cursor_toggle {
    display: none;
  }

  .grid_line_left_2 {
    border-right: 0px solid rgba(255, 255, 255, 0.15);
  }

  .grid_line_left_4 {
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    margin-left: 80%
  }

  .grid_line_left_3 {
    margin-left: 0%
  }

  .menu_grid_1 {
    margin-left: 4.5%;
    display: none
  }

  .service_title {
    color: #000;
    font-size: 22px;
    font-weight: 300;
  }

  .service_item {
    font-size: 22px;
  }

  .ball {
    display: none
  }

}

@media only screen and (min-width: 769px) and (max-width: 992px) {
  .cursor_toggle {
    font-size: 13px
  }

}

@media only screen and (min-width: 992px) and (max-width: 1200px) {}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {}

@media only screen and (min-width: 1600px) and (max-width: 5600px) {}
</style>