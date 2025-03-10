<template>
  <div>
    <div class="header_background">
      <NuxtLink to="/" style="z-index: 2000;">
        <div class="logo_container">
          <img src="~/assets/content/images/logos/logo_8.png" alt="Logo" class="logo" />
          <h1 class="logo_text">Keep Up The Beat</h1>
        </div>
      </NuxtLink>

      <div class="flex_it">
        <NuxtLink to="/about" class="item">About</NuxtLink>
        <NuxtLink to="/services/all_services" class="item">Services</NuxtLink>
        <!-- <div class="appointment">Get A Quote</div> -->
        
        <div class="quoteModal">
          <NuxtLink to="/contact" class="slider_button">Contact</NuxtLink>
        </div>

        <div class="burgBut" @click="toggle_burg">
          <ButtonsAnimatedBurger/>
        </div>
      </div>

      <div style="z-index:100">
        <div ref="headerMenuOverlay" class="header_menu_overlay" :class="{ 'is-active': is_overlay_active }"></div>
        <div ref="headerMenu" class="header_menu">
          <div class="mobile_menu_container">
            <NuxtLink to="/" class="mobile_menu_item">
              <div class="menu_text">Home</div>
            </NuxtLink>
            <NuxtLink to="/about" class="mobile_menu_item">
              <div class="menu_text">About</div>
            </NuxtLink>
            <NuxtLink to="/services/all_services" class="mobile_menu_item">
              <div class="menu_text">Services</div>
            </NuxtLink>
            <NuxtLink to="/contact" class="mobile_menu_item">
              <div class="menu_text">Contact</div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { gsap } from 'gsap'
import { ref, onMounted, onUnmounted, watch } from 'vue'

const is_active = ref(false)
const headerMenu = ref(null)
const headerMenuOverlay = ref(null)
const gradientAngle = ref(45)
const noiseTexture = ref('https://i.gyazo.com/a26366e538851a5c569ff648e99b7fd4.png')
const addSlinky = ref(false)
const is_overlay_active = ref(false)
const lastScrollPosition = ref(0)

onMounted(() => {
  setTimeout(() => {
    gsap.set('.logo_text', {
      letterSpacing: '-10px',
      opacity: 0,
    })

    gsap.to('.logo_text', {
      letterSpacing: '0px',
      opacity: 1,
      duration: 0.5,
      delay: 0.5,
      ease: 'power2.in'
    })

    gsap.set(headerMenu.value, {
      clipPath: 'circle(0% at top right)'
    })

    gsap.set(headerMenuOverlay.value, {
      opacity: 0
    })

    window.addEventListener('scroll', handleScroll)
  }, 0)
  
  // Animation for mobile menu items
  const menuItems = document.querySelectorAll('.mobile_menu_item')
  
  watch(() => is_active.value, (newValue) => {
    if (newValue) {
      // Animate menu items when menu is opened
      gsap.to(menuItems, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3
      })
    } else {
      // Reset menu items when menu is closed
      gsap.to(menuItems, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  if(is_active.value){return}
  const scrollPosition = window.pageYOffset
  const scrollDirection = scrollPosition < lastScrollPosition.value ? 'up' : 'down'
  lastScrollPosition.value = scrollPosition
  
  if (scrollDirection === 'up') {
    gsap.to('.logo_text', {
      letterSpacing: '0px',
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  } else {
    gsap.to('.logo_text', {
      letterSpacing: '-10px',
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })
  }
}

function toggle_burg() {
  is_active.value = !is_active.value
  
  if (is_active.value) {
    is_overlay_active.value = true
    
    gsap.to(headerMenu.value, {
      clipPath: 'circle(150% at top right)',
      duration: .8,
      ease: 'power2.out',
    })
    gsap.to(headerMenuOverlay.value, {
      opacity: 1,
      duration: .8,
      ease: 'power2.out'
    })
  } else {
    gsap.to(headerMenu.value, {
      clipPath: 'circle(0% at top right)',
      duration: .8,
      ease: 'power2.in'
    })
    gsap.to(headerMenuOverlay.value, {
      opacity: 0,
      duration: .8,
      ease: 'power2.in',
      onComplete: () => {
        is_overlay_active.value = false
      }
    })
  }
}
</script>

<style scoped>
/* Mobile menu styles */
.mobile_menu_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-top: 0vh;
}
.mobile_menu_item {
  margin: 15px 0;
  text-decoration: none;
  color: var(--primary_color, #6c1010);
  font-size: 2rem;
  font-weight: 600;
  opacity: 0;
  transform: translateY(20px);
}
.menu_text {
  position: relative;
  padding: 5px 10px;
}
.menu_text:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary_color, #6c1010);
  transition: width 0.3s ease;
}
.mobile_menu_item:hover .menu_text:after {
  width: 100%;
}

.header_background {
    height: 60px;
    width: 80vw;
    background-color: rgba(255, 241, 241, 0.7); /* Adjusted for glass effect */
    /* background-image: url('data:image/svg+xml;utf8,[Your URL-Encoded SVG Here]'); */
    background-blend-mode: normal; 
    position: fixed;
    top: 15px;
    left: 10vw;
    z-index: 400;
    border: 1px solid rgba(108, 16, 16, 0.25);
    backdrop-filter: blur(30px);
    display:flex;
    border-radius: 100px;
}

.logo_container{
  display:flex;
  flex-direction:row;
  align-items: center;
  text-decoration: none;
  position: relative;
  width: 37vw;
  height: 2vh;
  top: 17px;
}

.logo_text{
  font-size:18px;
  font-weight: 500;
  color: var(--primary_color);
  margin-left:10px;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: -10px;
  padding-top: 0px;
  position: absolute;
  left: 70px;
}

.logo{
    width:60px;
    height:auto;
    margin-top:0px;
    margin-left:10px;
    position: absolute;
    z-index: 1000;
}

.flex_it{
    display:flex;
    flex-direction:row;
    gap:40px;
    margin-top:20px;
    position:absolute;
    right:30px;
    align-items: center;
}

.nav_item{
    margin-top:6px
}

.item{
    font-weight: 500;
    font-size: 11px;
    color: var(--primary_color);
    text-transform: uppercase;
    cursor:pointer;
    display: inline-block;
    position: relative;
    padding-bottom: 5px;
    transition: all .5s ease;
    text-align: center;
    text-decoration: none;
    z-index:100
}

  .item::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #8a0d2e;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }
  .item:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }




.icon{
  cursor: pointer;
  margin-top:-9px;
  padding:30px 50px;
  padding-left:20px;
  display: relative;
    z-index: 1200;
}
.icon:hover .burger{
    width: 40px;
}

.burger{
  width: 30px;
  height: 5px;
  background-color: var(--accent_color);
  position: absolute;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.5s ease-in-out .05s;
  cursor: pointer;
  margin-left:-8px
}


.burger::before,
.burger::after{
  content: '';
  position: absolute;
  width: 40px;
  height: 5px;
  background:  var(--secondary_color);;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.5s ease-in-out .05s;
  border-radius:10px
}
.burger::before{
  top: -12px;
}
.burger::after{
  top: 12px;
}

.icon.active .burger{
  background: rgba(0,0,0,0);
  box-shadow: 0 2px 5px rgba(0,0,0,0);
}
.icon.active .burger::before{
  top: 0;
  transform: rotate(45deg);
}
.icon.active .burger::after{
  top: 0;
  transform: rotate(135deg);
}






/* button */

.item_toggle{
    font-weight: 400;
    font-size: 14px;
    color: var(--primary_color);
    text-transform: uppercase;
    cursor:pointer;
    display: inline-block;
    position: relative;
    padding-bottom: 6px;
    transition: all .5s ease;
    text-align: center;
}
.btn 
{
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
}

.btn input 
{ 
    opacity: 0;
    width: 0;
    height: 0;
}

.swipe 
{
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    
}

.swipe:before 
{
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked + .swipe  
{
    background-color: var(--secondary_color);
}

input:checked + .swipe:before 
{
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
}

.swipe.round 
{
    border-radius: 34px;
}

.swipe.round:before 
{
    border-radius: 50%;
}




.slider_button {
  font-weight: 400;
  font-size: 12px;
  border: 1px solid #fff;
  text-transform: uppercase;
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding-bottom: 6px;
  transition: all .5s ease;
  background-color: #8a0d2e;
  padding: 8px 15px;
  margin-top: -7px;
  border-radius: 15px;
  color: #fff;
  font-weight: 500;
  animation: pulsate 2s infinite;
}

.slider_button:hover {
  background-color: #fdf2f5;
  color: #8a0d2e;
  animation: none;
  border: 1px solid #8a0d2e;
}

.slider_button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 255 255 255 255 rgba(#8a0d2e, 0.7);
  animation: wave 2s infinite;
  pointer-events: none;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes wave {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--primary_color-rgb, 108, 16, 16), 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--primary_color-rgb, 108, 16, 16), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--primary_color-rgb, 108, 16, 16), 0);
  }
}






@media only screen and (min-width: 0px) and (max-width: 576px) {
    .item{
        display:none
    }


  .burger{
  margin-left:15px
}

.logo_container{
  width: 70vw;
}

.logo{
    width:auto;
    height:40px;
    margin-top:0px;
    margin-left:3px;
    top: -20px;
}

.logo_text{
  left: 50px;
  top: -10px;
}

  .quoteModal{
    display:none
  }

  .header_background {
    height: 60px;
    width: 90vw;
    left: 5vw;
}

  .burgBut {
    display: block;
    position: absolute;
    right: 0px;
    top: 0px;
    margin-top: -10px;
    margin-right: -25px;
  }
  .logo_text{
    font-size: 12px;
    margin-top: 13px;
  }

  .logo{
    width: 50px;
    height: auto;
    margin-top: 10px;
  }
}

@media only screen and (min-width: 576px) and (max-width: 768px) {

    .item{
        display:none
    }


  .burger{
  margin-left:15px
}

.logo{
    width:auto;
    height:40px;
    margin-top:-5px;
    margin-left:6px;
}

  .quoteModal{
    display:none
  }

  .header_background {
    height: 60px;
}

  .burgBut {
    display: block;
    margin-top: -10px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 992px) {

}


@media only screen and (min-width: 992px) and (max-width: 1200px) {

}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {

    .service_item{
        display:none
    }
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {

    .service_item{
        display:none
    }
}

@media only screen and (min-width: 1600px) and (max-width: 5600px) {

    .service_item{
        display:none
    }
}


















.burgBut {
  position: absolute;
  right: -75px;
  top: -10px;
  cursor: pointer;
  z-index: 1000;
  display: none;
}

.header_menu_overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 900;
  pointer-events: none;
  opacity: 0;
}

.header_menu {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(105vw + 1px);
  height: calc(105vh + 1px);
  background: linear-gradient(45deg, #fff, #fff, #fff, #fff);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 1300;
  transition: background 0.3s ease;
  top: -16px;
  left: -10vw;
}

.header_menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://i.gyazo.com/a26366e538851a5c569ff648e99b7fd4.png');
  opacity: 0.6;
  mix-blend-mode: overlay;
  pointer-events: none;
}


.slinkyBox{
  margin-left:45vw;
  margin-top:20vh;
  position: absolute;
}

@media only screen and (max-width: 768px) {
  .header_background {
    height: 60px;
  }

  .headerTitle {
    font-size: 400%;
    margin-left: 15px;
    margin-top: 20px;
  }

  .burgBut {
    right: 15px;
    top: 5px;
    display: block;
  }

  .header_menu {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(105vw + 1px);
    height: calc(105vh + 1px);
    background: linear-gradient(45deg, #fff, #fff, #fff, #fff);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    z-index: 1300;
    transition: background 0.3s ease;
    top: -16px;
    left: -10vw;
  }
}

@media (max-width: 500px) {
  .header_menu {
    left: -21px;
  }
}

.header_background a {  /* Target the NuxtLink directly */
  text-decoration: none;
}
</style>