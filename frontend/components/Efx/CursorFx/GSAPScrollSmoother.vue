<!-- components/SmoothScroll.vue -->
<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (process.client && window.$smoothScroll) {
      window.$smoothScroll.init();
    }
  },
  unmounted() {
    if (process.client && window.$smoothScroll) {
      const smoothy = window.$smoothScroll.getSmoothy();
      if (smoothy && document.body.classList.contains('v-leave-to')) {
        smoothy.kill();
      }
    }
  }
}
</script>

<style scoped>
#smooth-content {
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}
</style>