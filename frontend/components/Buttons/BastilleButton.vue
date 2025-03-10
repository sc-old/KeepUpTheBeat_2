<template>
  <div class="button_container">
    <div class="pill_button" ref="pillButton" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <span class="button_text">our awarded collection</span>
      <Vue3Lottie
        ref="lottieRef"
        class="arrow"
        :animationData="arrowAnimation"
        :speed="1.5"
        :loop="false"
        :autoplay="false"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import arrowAnimation from '@/assets/content/lotties/arrow.json'

gsap.registerPlugin(ScrollTrigger)

const pillButton = ref(null)
const lottieRef = ref(null)

const handleMouseEnter = () => {
  lottieRef.value.stop()
  lottieRef.value.play()
    gsap.to(pillButton.value, {
      width: "35vw",
      duration: 0.3,
      ease: "power2.out"
    })
}

const handleMouseLeave = () => {
  gsap.to(pillButton.value, {
    width: "30vw",
    duration: 0.3,
    ease: "power2.out"
  })
}

onMounted(() => {
  setTimeout(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: pillButton.value,
      start: "top 90%",
      toggleActions: "play none none reverse",
      delay: 1
    }
  })

  tl.to(pillButton.value, {
    width: "30vw",
    opacity: 1,
    duration: 0.5,
    delay: 0.2,
    ease: "power2.out"
  })
  .from(".button_text", {
    opacity: 0,
    duration: 0.5,
    delay: 0.,
    ease: "power2.out"
  }, "-=0.4")
  .from(".arrow", {
    x: -10,
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    onStart: () => {
      lottieRef.value.play()
    }
  }, "-=0.4")
  }, 100)
})
</script>

<style scoped>
.button_container {
  display: flex;
  align-items: center;
  padding: 20px;
  position: relative;
  z-index: 2;
}

.pill_button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: white;
  border: 2px solid rgba(255, 187, 30, 0.7);
  border-radius: 50px;
  padding: 12px 24px;
  cursor: pointer;
  width: 0px;
  opacity: 0;
  transition: all 0.3s ease;
}

.pill_button:hover {
  background: rgba(255, 187, 30, 0.1);
  width: 45vw;
}

.button_text {
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;
  width: 100%;
  color: #082a42
}

.arrow {
  width: 45px;
  height: 45px;
  transform: rotate(-90deg);
}
</style>
