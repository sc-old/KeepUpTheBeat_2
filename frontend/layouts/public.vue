<template>
  <div>
    <EfxTransitionsMainTransition ref="main_transition"/>
    <EfxCursorFxGSAPScrollSmoother>
      <div class="inner_scroll_body"></div>
      <slot></slot>
    </EfxCursorFxGSAPScrollSmoother>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSessionStorage } from '@vueuse/core'
import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const modalExitAnim = ref(true)
const modalExitDisplay = ref(true)
const sitePassword = ref('')
const sitePasswordSesh = useSessionStorage('site_password_sesh', false)
const plaidBlur = ref(false)

const route = useRoute()
const refresh_it = ref(false)

const main_transition = ref(null)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  ScrollTrigger.refresh()
}

function openModal() {
  modalExitDisplay.value = false
  setTimeout(() => {
    modalExitAnim.value = false
  }, 100)
}

function modalLeave() {
  if (sitePassword.value === 'rize_vampire_secret') {
    sitePasswordSesh.value = true
    modalExitAnim.value = true
    setTimeout(() => {
      modalExitDisplay.value = true
      plaidBlur.value = false
    }, 1100)
  } else {
    alert('Incorrect Password')
  }
}

onBeforeRouteLeave((to, from, next) => {
  refresh_it.value = !refresh_it.value
  if (to.path !== '/portal') {
    transition_and_route(to.path)
    setTimeout(next, 850)
  } else {
    next()
  }
})

function transition_and_route(to) {
  main_transition.value.animation_and_route(to)
}
</script>



<style>
.cursor_hover {
  cursor: auto !important;
}

.input_wrap_edit_1 {
  margin-top: 13% !important;
  width: 60% !important;
  margin-left: 20% !important;
}

.input_edit_1, .label_move_1 {
  color: #fff !important;
}

/* Modal styles */
.modal_hide_anim {
  transition: all 1s ease-in-out !important;
  opacity: 0 !important;
}

.modal_bix_hide_anim {
  transition: all .6s ease-in-out !important;
  transform: scale(0) !important;
}

.modal_hide_disp {
  display: none !important;
}

.modal_container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: all 1s ease-in-out;
  opacity: 1;
}

.modal_popup {
  width: 60%;
  height: 40vh;
  background-color: rgb(6, 100, 162);
  z-index: 210;
  border-radius: 20px;
  margin-top: 10%;
  border: #fff solid 2px;
  transition: all 1s ease-in-out;
  overflow-y: scroll;
  overflow-x: hidden;
}

.modal_popup::-webkit-scrollbar {
  width: 5px !important;
  border-radius: 10px !important;
}

.modal_popup::-webkit-scrollbar-thumb {
  background: rgba(0, 149, 255, 1) !important;
  border-radius: 10px !important;
}

.modal_info {
  font-size: 30px;
  font-weight: 600;
  color: #fff;
  margin-left: 10%;
  margin-top: 3%;
  width: 80%;
  text-align: center;
}

.modual_buttons, .select_button {
  width: 40%;
  height: 35px;
  background-color: rgb(25, 120, 237);
  margin-left: 30%;
  border-radius: 100px;
  border: #fff solid 0px;
  font-size: 12px;
  color: #fff;
  box-shadow: 0px 7px 10px rgb(25, 120, 237, .3);
  transition: outline 12s ease 1s;
}

.modual_buttons:hover, .select_button:hover {
  box-shadow: 0px 10px 15px rgb(25, 120, 237, .5);
  transform: translateY(-3px);
  outline: 3px solid rgba(19, 218, 218, 0.6);
}

.modal_submit_button {
  width: 50%;
  height: 40px;
  background-color: #deae00df;
  margin-left: 25%;
  margin-top: 10%;
  border-radius: 100px;
  border: #fff solid 0px;
  font-size: 25px;
  line-height: 40px;
  color: #fff;
  box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
  outline: 0px solid rgba(19, 218, 218, 0.6);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  text-align: center;
}

.modal_submit_button:hover {
  box-shadow: 0px 10px 15px rgb(25, 120, 237, .5);
  transform: translateY(-3px);
  outline: 3px solid rgba(19, 218, 218, 0.6);
}

.back_arrow {
  font-size: 50px;
  color: #fff;
  position: relative;
  top: -60px;
  left: 20px;
  margin-bottom: -7%;
  cursor: pointer;
}

.modal_exit {
  margin-top: 0px;
  margin-left: 93%;
  z-index: 10;
  position: relative;
  width: 50px;
  height: 50px;
}

.modal_exit:hover .horizontal_line {
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;
}

.modal_exit:hover .vertical_line {
  transform: rotate(-90deg);
  transition: all 0.5s ease-in-out;
}

.horizontal_line {
  height: 1px;
  width: 30px;
  background-color: rgb(255, 255, 255);
  top: 25px;
  left: 10px;
  transform: rotate(45deg);
  z-index: 1000;
  position: absolute;
}

.vertical_line {
  width: 1px;
  height: 30px;
  top: 11px;
  left: 25px;
  background-color: #fff;
  transform: rotate(45deg);
  position: absolute;
}

.modal_text {
  font-size: 140%;
  color: #fff;
  margin-left: 5%;
  margin-top: 5%;
  width: 90%;
  text-align: center;
  line-height: 1.3;
}

@media only screen and (min-width: 0px) and (max-width: 576px) {
  .modal_popup {
    width: 350px;
    height: 400px;
  }

  .modal_exit {
    margin-top: 10px;
    margin-left: 290px;
    width: 40px;
    height: 40px;
  }
}
</style>
