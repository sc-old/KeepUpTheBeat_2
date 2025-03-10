<template>
  <div>

      <div @click="openModal">
      <slot name="button"></slot>
      </div>

      <Teleport to="body">
          <div v-show="isModalVisible">
              <div class="modal_container" ref="modalContainer"></div>
              <div class="popup_container">
                  <div class="modal_popup" ref="modalPopup">
                      <div @click="closeModal" class="modal_exit">
                          <div class="horizontal_line"></div>
                          <div class="vertical_line"></div>
                      </div>
                      <slot name="content"></slot>
                  </div>
              </div>
          </div>
      </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const isScrollPaused = useState('isScrollPaused')

const isModalVisible = ref(false);
const modalContainer = ref(null);
const modalPopup = ref(null);
const popupContainer = ref(null)

onMounted(() => {
  setTimeout(() => {
      gsap.set(modalContainer.value, { autoAlpha: 0, opacity: 0.5, backdropFilter: 'blur(0px)' });
      gsap.set(modalPopup.value, { xPercent: 100, autoAlpha: 0.95, opacity: 1 });
  }, 100);
});

function openModal() {
  isModalVisible.value = true;
  popupContainer.value = 
  gsap.to(modalContainer.value, {
      duration: 0.65,
      autoAlpha: 1,
      opacity: 1,
      backdropFilter: 'blur(8px)',
      ease: 'power2.out',
  });
  gsap.to(modalPopup.value, {
      duration: 0.5,
      xPercent: 0,
      autoAlpha: 1,
      opacity: 1,
      ease: 'power2.out',
      delay: 0.2
  });
  isScrollPaused.value = true
}

function closeModal() {
  gsap.to(modalPopup.value, {
      duration: 0.5,
      xPercent: 100,
      autoAlpha: 0.85,
      opacity: 1,
      ease: 'power2.in',
  });
  gsap.to(modalContainer.value, {
      duration: 1,
      autoAlpha: 0,
      opacity: 0.5,
      backdropFilter: 'blur(0px)',
      ease: 'power2.in',
      onComplete: () => {
          setTimeout(() => {
              isModalVisible.value = false;
          }, 1000);

          isScrollPaused.value = false
      }
  });
}







</script>

<style scoped>
.modal_container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  justify-content: right;
  align-items: center;
}

.popup_container {
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  display: flex;
  justify-content: right;
  align-items: center;
}

.modal_popup {
  width: 60vw;
  height: 100vh;
  background-color: #fff;
  z-index: 210;
  margin-top: 0px;
  border: 1px solid rgb(6, 100, 162);
  overflow-y: scroll;
  overflow-x: hidden;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  z-index: 2001;
  position: fixed;
}

.modal_popup::-webkit-scrollbar {
  width: 5px !important;
  border-radius: 10px !important;
}

.modal_popup::-webkit-scrollbar-thumb {
  background: rgba(0, 149, 255, 1) !important;
  border-radius: 10px !important;
}

.modal_exit {
  margin-top: 5px;
  margin-left: 5px;
  cursor: pointer;
  z-index: 10;
  position: fixed;
  width: 50px;
  height: 50px;
  color: #000;
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
  background-color: rgb(0, 0, 0);
  top: 25px;
  left: 10px;
  transform: rotate(45deg);
  z-index: 1000;
  position: fixed;
}

.vertical_line {
  width: 1px;
  height: 30px;
  top: 11px;
  left: 25px;
  background-color: #000000;
  transform: rotate(45deg);
  position: fixed;
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

  .slider_button {
      font-size: 10px;
  }

  .slider_button {
      left: 40px;
  }
}
</style>
