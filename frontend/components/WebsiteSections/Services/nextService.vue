<template>
  <div class="next-service-container" ref="containerRef">
    <div class="content-wrapper">
      <h2 class="title">Explore Our Other Services</h2>
      <p class="subtitle">Discover how we can help you with more specialized training</p>
      
      <div class="service-preview" ref="previewRef">
        <div class="service-card">
          <div class="service-icon">
            <slot name="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
              </svg>
            </slot>
          </div>
          <div class="service-info">
            <h3>{{ nextServiceTitle || 'First Aid Training' }}</h3>
            <p>{{ nextServiceDescription || 'Comprehensive training for emergency response and life-saving techniques.' }}</p>
          </div>

          </div>

          <button class="next-btn" @click="navigateToNextService">
        View Next Service
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </button>

      </div>
      

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  next_info: {
    type: Object,
    default: () => ({
      title: 'First Aid Training',
      description: 'Comprehensive training for emergency response and life-saving techniques.',
      path: '/services/all_services'
    })
  }
});

const containerRef = ref(null);
const previewRef = ref(null);

const navigateToNextService = () => {
  navigateTo(props.next_info.path);
};

onMounted(() => {
  setTimeout(() => {

    
    // Animate the service preview card
    gsap.from(previewRef.value, {
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
      }
    });
  }, 1000);
});
</script>

<style scoped>
.next-service-container {
  width: 100%;
  min-height: 60vh;
  background-color: #fdf2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  transition: background-color 0.5s ease;
  margin-top: 20vh
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 3.5rem;
  color: #8a0d2e;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 3rem;
  max-width: 700px;
  width: 60%;
  text-align: center;
}

.service-preview {
  margin-bottom: 3rem;
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
}

.service-card {
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
}

.service-preview:hover {
  transform: translateY(-15px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.service-icon {
  background-color: #8a0d2e;
  color: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  flex-shrink: 0;
}

.service-info {
  text-align: left;
}

.service-info h3 {
  font-size: 1.8rem;
  color: #8a0d2e;
  margin-bottom: 0.5rem;
}

.service-info p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
}

.next-btn {
  background-color: #8a0d2e;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
}

.next-btn:hover {
  background-color: #49161b;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .service-card {
    flex-direction: column;
    text-align: center;
  }
  
  .service-icon {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
  
  .service-info {
    text-align: center;
  }
}
</style>
