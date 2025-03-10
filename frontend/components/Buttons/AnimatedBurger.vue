<template>
    <div>
      <div class="menu" @click="toggleMenu">
        <span :class="['menu-global', 'menu-top', { 'menu-top-click': isMenuActive }]"></span>
        <span :class="['menu-global', 'menu-middle', { 'menu-middle-click': isMenuActive }]"></span>
        <span :class="['menu-global', 'menu-bottom', { 'menu-bottom-click': isMenuActive }]"></span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isMenuActive = ref(false)
  
  const toggleMenu = () => {
    isMenuActive.value = !isMenuActive.value
  }
  </script>
  
  <style scoped>

  .menu {
    cursor: pointer;
    margin: 3px auto;
    padding-left: 1em;
    position: relative;
    width: 30px;
    height: 30px;
  }
  
  .menu-global {
    backface-visibility: hidden;
    position: absolute;
    left: 0;
    border-top: 3px solid #082a42;
    width: 100%;
    transition: 0.55s;
  }
  
  .menu-top {
    top: 0;
  }
  
  .menu-middle {
    top: 8px;
    border-color: #1478c4;
  }
  
  .menu-bottom {
    top: 16px;
  }
  
  .menu-top-click {
    backface-visibility: hidden;
    top: 12px;
    transform: rotate(50deg);
    transition: 0.55s 0.1s;
  }
  
  .menu-middle-click {
    opacity: 0;
  }
  
  .menu-bottom-click {
    backface-visibility: hidden;
    top: 12px;
    transform: rotate(-410deg);
    transition: 0.55s 0.1s;
  }
  </style>