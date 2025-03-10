<template>
    <div class="card-container" ref="container">
      <div class="card-body" ref="cardBody">
        <div class="title_container">
        <div class="card-item title">
          {{ cardInfo.title }}
        </div>
        <div class="card-item description">
          {{ cardInfo.description }}
        </div>
        </div>
        <div class="card-item image-container">
          <img
            :src="cardInfo.imageUrl"
            class="card-image"
            :alt="cardInfo.imageAlt || 'thumbnail'"
          />
        </div>
        <div class="button-container">
          <button class="card-item try-button">
            {{ cardInfo.tryButtonText || 'Try now →' }}
          </button>
          <button class="card-item signup-button">
            {{ cardInfo.signupButtonText || 'Sign up' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  
  // Define props for card information
  const props = defineProps({
    cardInfo: {
      type: Object,
      default: () => ({
        title: 'Make things float in air',
        description: 'Hover over this card to unleash the power of CSS perspective',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        imageAlt: 'thumbnail',
        tryButtonText: 'Try now →',
        signupButtonText: 'Sign up',
        maxRotation: 10,
        perspective: 1000,
        transformSpeed: 0.3,
        
        // 3D transform values for elements
        titleZ: 50,
        descriptionZ: 60,
        imageZ: 100,
        imageRotateX: 20,
        imageRotateZ: -10,
        tryButtonZ: 20,
        tryButtonTranslateX: -40,
        signupButtonZ: 20,
        signupButtonTranslateX: 40
      })
    }
  });
  
  const container = ref(null);
  const cardBody = ref(null);
  
  // Calculate transition style based on cardInfo
  const transitionStyle = computed(() => {
    const speed = props.cardInfo.transformSpeed || 0.3;
    return `transform ${speed}s ease, box-shadow ${speed}s ease`;
  });
  
  // Get perspective value with fallback
  const perspectiveValue = computed(() => {
    return (props.cardInfo.perspective || 1000) + 'px';
  });
  
  // Get transform speed with fallback
  const transformSpeed = computed(() => {
    return props.cardInfo.transformSpeed || 0.3;
  });
  
  // Get max rotation with fallback
  const maxRotation = computed(() => {
    return props.cardInfo.maxRotation || 10;
  });
  
  // Track mouse position for 3D effect
  const handleMouseMove = (e) => {
    if (!cardBody.value) return;
    
    const rect = cardBody.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * maxRotation.value; 
    const rotateX = ((centerY - y) / centerY) * maxRotation.value;
    
    cardBody.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    // Reset all card items to their default transform
    const cardItems = cardBody.value.querySelectorAll('.card-item');
    cardItems.forEach(item => {
      const z = item.dataset.z || 0;
      const rx = item.dataset.rotateX || 0;
      const rz = item.dataset.rotateZ || 0;
      const tx = item.dataset.translateX || 0;
      
      item.style.transform = `translateZ(${z}px) rotateX(${rx}deg) rotateZ(${rz}deg) translateX(${tx}px)`;
    });
  };
  
  const handleMouseLeave = () => {
    if (cardBody.value) {
      cardBody.value.style.transform = 'rotateX(0deg) rotateY(0deg)';
      
      // Reset all card items
      const cardItems = cardBody.value.querySelectorAll('.card-item');
      cardItems.forEach(item => {
        item.style.transform = 'translateZ(0)';
      });
    }
  };
  
  onMounted(() => {
    // Set data attributes for 3D transforms
    if (cardBody.value) {
      const title = cardBody.value.querySelector('.title');
      if (title) title.dataset.z = props.cardInfo.titleZ || 50;
      
      const description = cardBody.value.querySelector('.description');
      if (description) description.dataset.z = props.cardInfo.descriptionZ || 60;
      
      const imageContainer = cardBody.value.querySelector('.image-container');
      if (imageContainer) {
        imageContainer.dataset.z = props.cardInfo.imageZ || 100;
        imageContainer.dataset.rotateX = props.cardInfo.imageRotateX || 20;
        imageContainer.dataset.rotateZ = props.cardInfo.imageRotateZ || -10;
      }
      
      const tryButton = cardBody.value.querySelector('.try-button');
      if (tryButton) {
        tryButton.dataset.z = props.cardInfo.tryButtonZ || 20;
        tryButton.dataset.translateX = props.cardInfo.tryButtonTranslateX || -40;
      }
      
      const signupButton = cardBody.value.querySelector('.signup-button');
      if (signupButton) {
        signupButton.dataset.z = props.cardInfo.signupButtonZ || 20;
        signupButton.dataset.translateX = props.cardInfo.signupButtonTranslateX || 40;
      }
      
      cardBody.value.addEventListener('mousemove', handleMouseMove);
      cardBody.value.addEventListener('mouseleave', handleMouseLeave);
    }
  });
  
  onUnmounted(() => {
    if (cardBody.value) {
      cardBody.value.removeEventListener('mousemove', handleMouseMove);
      cardBody.value.removeEventListener('mouseleave', handleMouseLeave);
    }
  });
  </script>
  
  <style scoped>
  .card-container {
    perspective: v-bind('perspectiveValue');
    font-family: var(--font-family, sans-serif);
    margin: 0 auto;
  }
  
  .card-body {
    background-color: #fdf2f5;
    position: relative;
    width: 40vw;
    height: auto;
    border-radius: 0.75rem;
    padding: 1.5rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: v-bind('transitionStyle');
    transform-style: preserve-3d;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  
  @media (max-width: 768px) {
    .card-body {
      width: 90vw;
      padding: 1rem;
    }
  }
  
  .card-body:hover {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .card-item {
    transform-style: preserve-3d;
    transition: v-bind('`transform ${transformSpeed}s ease`');
    width: 80%;
  }

  .title_container{
    margin-top: 1rem;
  }
  
  .title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #8a0d2e;
  }
  
  @media (max-width: 768px) {
    .title {
      font-size: 1.1rem;
    }
  }
  
  .description {
    color: #8a0d2e;
    font-size: 0.875rem;
    max-width: 24rem;
    margin-top: 0.5rem;
  }
  
  @media (max-width: 768px) {
    .description {
      font-size: 0.8rem;
      max-width: 100%;
    }
  }
  
  .image-container {
    width: 100%;
    margin-top: 2.25rem;
  }
  
  @media (max-width: 768px) {
    .image-container {
      margin-top: 1.5rem;
    }
  }
  
  .card-image {
    height: 15rem;
    width: 100%;
    object-fit: cover;
    border-radius: 0.75rem;
    transition: box-shadow 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .card-image {
      height: 12rem;
    }
  }
  
  .card-body:hover .card-image {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
  }
  
  @media (max-width: 768px) {
    .button-container {
      margin-top: 2rem;
      flex-direction: column;
      gap: 1rem;
    }
    
    .try-button, .signup-button {
      width: 100%;
      padding: 0.75rem 1rem;
    }
  }
  
  .try-button {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.75rem;
    font-weight: 400;
    color: #8a0d2e;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .signup-button {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    background-color: #fff;
    color: #8a0d2e;
    font-size: 0.75rem;
    font-weight: 700;
    border: none;
    cursor: pointer;
  }
  

  
  </style>
  