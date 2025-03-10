<template>
  <section class="cloneable">
    <div data-tabs="wrapper" class="tab-layout">
      <div class="tab-layout-col">
        <div class="tab-layout-container">
          <div class="tab-container">
            <div class="tab-container-top">
              <h1 class="tab-layout-heading">{{ serviceInfo.landing.title }}</h1>
              <div data-flip-button="wrap" data-tabs="nav" class="filter-bar">
                <button v-for="(tab, index) in serviceInfo.tabs" :key="index" 
                        @click="switchTab(index)"
                        class="filter-button" :class="{ active: index === activeTabIndex }">
                  <div class="filter-button__p">{{ tab.title }}</div>
                  <div v-if="index === activeTabIndex" data-flip-button="bg" class="tab-button__bg"></div>
                </button>
              </div>
            </div>
            <div class="tab-container-bottom">
              <div data-tabs="content-wrap" class="tab-content-wrap">
                <div v-for="(tab, index) in serviceInfo.tabs" :key="index"
                     data-tabs="content-item" class="tab-content-item" 
                     :class="{ active: index === activeTabIndex }">
                  <h2 data-tabs-fade="" class="tab-content__heading">{{ tab.heading }}</h2>
                  <p data-tabs-fade="" class="content-p opacity--80">{{ tab.description }}</p>
                </div>
              </div>
              <!-- <NuxtLink :to="serviceInfo.landing.button_link" class="tab-content__button w-inline-block">
                <p class="content-p">{{ serviceInfo.landing.primaryButtonText }}</p>
                <div class="content-button__bg"></div>
              </NuxtLink> -->
              <div class="button-container">
                <ButtonsHeartButtonTwo data-speed="0.90" button_text="Get Started" page_link="/contact" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-layout-col">
        <div data-tabs="visual-wrap" class="tab-visual-wrap">
          <div v-for="(tab, index) in serviceInfo.tabs" :key="index"
               data-tabs="visual-item" class="tab-visual-item" 
               :class="{ active: index === activeTabIndex }">
            <img :src="tab.image" :alt="tab.heading" class="tab-image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { gsap } from 'gsap';

// Define props for the component
const props = defineProps({
  serviceInfo: {
    type: Object,
    default: () => ({
      landing: {
        title: 'Explore the Layers of Abstract Design and Depth',
        primaryButtonText: 'Learn More',
        button_link: '/contact',
      },
      tabs: [
        {
          title: 'Shapes',
          heading: 'Shifting Perspectives',
          description: 'A dynamic exploration of structure, balance, and creative symmetry.',
          image: 'https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e14dd4dbca1d8e5930_philip-oroni-IANBrm46bF0-unsplash%20(2).avif'
        },
        {
          title: 'Depth',
          heading: 'Fragments of Motion',
          description: 'Where design meets depth—an abstract dance of light and form.',
          image: 'https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e19e4d013c6a4c5a1b_philip-oroni-Zx_G3LpNnV4-unsplash%20(1).avif'
        },
        {
          title: 'Layers',
          heading: 'Echoes in Orange',
          description: 'A journey through layered geometry and endless possibilities.',
          image: 'https://cdn.prod.website-files.com/67726722d415dc401ae23cf6/677289e1c88b5b4c14d1e6fd_philip-oroni-h9N7bm-HRCo-unsplash.avif'
        }
      ]
    })
  }
});

const activeTabIndex = ref(0);
let isAnimating = ref(false);
let autoRotateInterval = null;

// Function to handle tab switching
const switchTab = (index) => {
  if (index === activeTabIndex.value || isAnimating.value) return;
  
  // Reset auto-rotation timer when user manually changes tab
  resetAutoRotation();
  
  const oldIndex = activeTabIndex.value;
  activeTabIndex.value = index;
  
  // Get DOM elements
  const contentItems = document.querySelectorAll('[data-tabs="content-item"]');
  const visualItems = document.querySelectorAll('[data-tabs="visual-item"]');
  
  if (!contentItems.length || !visualItems.length) return;
  
  isAnimating.value = true;
  
  const outgoingContent = contentItems[oldIndex];
  const incomingContent = contentItems[index];
  const outgoingVisual = visualItems[oldIndex];
  const incomingVisual = visualItems[index];
  
  let outgoingLines = outgoingContent.querySelectorAll("[data-tabs-fade]") || [];
  let incomingLines = incomingContent.querySelectorAll("[data-tabs-fade]");
  
  const timeline = gsap.timeline({
    defaults: {
      ease: "power3.inOut"
    },
    onComplete: () => {
      isAnimating.value = false;
    },
  });
  
  timeline
    .to(outgoingLines, { y: "-2em", autoAlpha: 0 }, 0)
    .to(outgoingVisual, { autoAlpha: 0, xPercent: 3 }, 0)
    .fromTo(incomingLines, { y: "2em", autoAlpha: 0 }, { y: "0em", autoAlpha: 1, stagger: 0.075 }, 0.4)
    .fromTo(incomingVisual, { autoAlpha: 0, xPercent: 3 }, { autoAlpha: 1, xPercent: 0 }, "<");
};

// Function to automatically rotate tabs
const autoRotateTabs = () => {
  const nextIndex = (activeTabIndex.value + 1) % props.serviceInfo.tabs.length;
  switchTab(nextIndex);
};

// Function to start auto-rotation
const startAutoRotation = () => {
  if (autoRotateInterval) clearInterval(autoRotateInterval);
  autoRotateInterval = setInterval(autoRotateTabs, 20000); // 20 seconds
};

// Function to reset auto-rotation timer
const resetAutoRotation = () => {
  if (autoRotateInterval) clearInterval(autoRotateInterval);
  startAutoRotation();
};

onMounted(() => {
  // Start auto-rotation when component mounts
  startAutoRotation();
  
  // Initialize GSAP animations
  if (typeof gsap !== 'undefined') {
    // Register plugins if they exist in the global scope
    if (window.CustomEase && window.Flip) {
      gsap.registerPlugin(window.CustomEase, window.Flip);
      
      // Create custom ease
      window.CustomEase.create("osmo-ease", "0.625, 0.05, 0, 1");
      
      // Set defaults
      gsap.defaults({
        ease: "osmo-ease",
        duration: 0.8,
      });
      
      // Initialize flip buttons
      initFlipButtons();
    }
  }
});

// Clean up interval when component is unmounted
onUnmounted(() => {
  if (autoRotateInterval) clearInterval(autoRotateInterval);
});

function initFlipButtons() {
  let wrappers = document.querySelectorAll('[data-flip-button="wrap"]');
  
  wrappers.forEach((wrapper) => {
    let buttons = wrapper.querySelectorAll('[data-flip-button="button"]');
    let bg = wrapper.querySelector('[data-flip-button="bg"]');
    
    if (!bg) return;
    
    buttons.forEach(function (button) {
      // Handle mouse enter
      button.addEventListener("mouseenter", function () {
        if (!window.Flip) return;
        const state = window.Flip.getState(bg);
        this.appendChild(bg);
        window.Flip.from(state, {
          duration: 0.4,
        });
      });

      // Handle focus for keyboard navigation
      button.addEventListener("focus", function () {
        if (!window.Flip) return;
        const state = window.Flip.getState(bg);
        this.appendChild(bg);
        window.Flip.from(state, {
          duration: 0.4,
        });
      });

      // Handle mouse leave
      button.addEventListener("mouseleave", function () {
        if (!window.Flip) return;
        const state = window.Flip.getState(bg);
        const activeLink = wrapper.querySelector(".active");
        if (activeLink) {
          activeLink.appendChild(bg);
          window.Flip.from(state, {
            duration: 0.4,
          });
        }
      });

      // Handle blur to reset background for keyboard navigation
      button.addEventListener("blur", function () {
        if (!window.Flip) return;
        const state = window.Flip.getState(bg);
        const activeLink = wrapper.querySelector(".active");
        if (activeLink) {
          activeLink.appendChild(bg);
          window.Flip.from(state, {
            duration: 0.4,
          });
        }
      });
    });
  });
}
</script>

<style scoped>

.cloneable {
  padding: 2rem;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  display: flex;
  position: relative;
  font-size: 1.1vw;
}

.tab-container {
  grid-column-gap: 3em;
  grid-row-gap: 3em;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 2.5em;
  display: flex;
}

.tab-layout-container {
  width: 100%;
  max-width: 36em;
  height: 100%;
  margin-left: auto;
  margin-right: 0;
  padding-top: 1em;
  padding-bottom: 2em;
}

.tab-container-bottom {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
  margin-top: 25%;
}

.tab-container-top {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  display: flex;
}

.tab-layout-col {
  width: 50%;
}

.tab-content-wrap {
  width: 100%;
  min-width: 24em;
  position: relative;
}

.content-button__bg {
  z-index: -1;
  background-color: #8a0d2e;
  border-radius: 15px;
  position: absolute;
  inset: 0%;
}

.content-p {
  margin: 0;
  font-size: 1.25em;
  line-height: 1.4;
}

.tab-button__bg {
  z-index: 0;
  background-color: rgba(239, 238, 236, 0.06);
  border: 1px solid rgba(239, 238, 236, 0.08);
  border-radius: .25em;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0%;
}

.tab-content-item {
  z-index: 1;
  grid-column-gap: 1.25em;
  grid-row-gap: 1.25em;
  visibility: hidden;
  flex-flow: column;
  display: flex;
  position: absolute;
  inset: auto 0% 0%;
}

.tab-content-item.active {
  visibility: visible;
}

.tab-layout {
  z-index: 1;
  grid-row-gap: 3em;
  flex-flow: wrap;
  width: 100%;
  min-height: 37em;
  display: flex;
  position: relative;
}

.filter-bar {
  background-color: rgba(239, 238, 236, 0.06);
  border: 1px solid rgba(239, 238, 236, 0.08);
  border-radius: .5em;
  padding: .5em;
  display: flex;
}

.filter-button {
  background-color: transparent;
  border: 1px solid transparent;
  padding: 1.125em 1.5em;
  transition: all 0.3s ease;
  position: relative;
  border-radius: .25em;
  cursor: pointer;
  border: 1px solid #8a0d2e;
  border-color: rgba(224, 224, 224, 0.9);
  margin-right: 10px;
}

.filter-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
}

.filter-button.active {
  border-color: #8a0d2e;
  border-radius: 8px;
}

.filter-button__p {
  z-index: 1;
  font-size: 1.125em;
  position: relative;
  color: #000;
  transition: color 0.3s ease;
}

.filter-button:hover .filter-button__p {
  color: #8a0d2e;
}

.tab-visual-wrap {
  border-radius: .5em;
  width: 90%;
  height: 42em;
  max-height: 80vh;
  position: relative;
  overflow: hidden;
}

.tab-visual-item {
  visibility: hidden;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
}

.tab-visual-item.active {
  visibility: visible;
}

.tab-image {
  object-fit: cover;
  border-radius: .5em;
  width: 100%;
  max-width: none;
  height: 100%;
}

.tab-content__heading {
  letter-spacing: -.02em;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.75em;
  font-weight: 500;
  line-height: 1;
}

.tab-layout-heading {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 4em;
  font-weight: 500;
  line-height: 1;
}

.tab-content__button {
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 4em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  text-decoration: none;
  display: flex;
  position: relative;
  border-radius: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-content__button:hover {
  background-color: #fdf2f5;
  color: #8a0d2e;
}

.tab-content__button:hover .content-button__bg {
  background-color: #fdf2f5;
  border: 1px solid #8a0d2e;
}

.opacity--80 {
  opacity: 0.8;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .cloneable {
    font-size: 16px;
    padding: 1rem;
    min-height: auto;
    padding-top: 15vh;
  }

  .tab-layout {
    flex-direction: column-reverse;
    min-height: auto;
  }

  .tab-layout-col {
    width: 100%;
  }

  .tab-layout-container {
    max-width: 100%;
    padding: 1em 0;
  }

  .tab-container {
    padding-right: 0;
  }

  .tab-layout-heading {
    font-size: 2.5em;
    text-align: center;
  }

  .tab-content-wrap {
    min-width: auto;
  }

  .tab-visual-wrap {
    height: 50vh;
    margin-top: 0;
    width: 100%;
  }

  

  .filter-bar {
    width: 100%;
    overflow-x: auto;
    justify-content: center;
    padding: 0.75em;
    margin: 1em auto;
  }

  .filter-button {
    padding: 0.8em 1em;
    white-space: nowrap;
    margin-right: 8px;
    font-size: 0.9em;
  }
  
  .filter-button:last-child {
    margin-right: 0;
  }
  
  .tab-container-bottom {
    margin-top: 10%;
    width: 100%;
    position: relative;
  }
  
  .tab-content-item {
    position: absolute;
    text-align: center;
    align-items: center;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .content-p {
    font-size: 1.1em;
  }
  
  .tab-content__heading {
    font-size: 1.5em;
  }

  .tab-container-top {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
}
    

}


  @media (max-width: 700px) {
    .tab-layout-heading {
      font-size: 2em;
    }
    
    .filter-button {
      padding: 0.6em 0.8em;
      font-size: 0.85em;
    }

  .filter-bar {
    width: 100%;
    overflow-x: auto;
    justify-content: center;
    padding: 0.75em;
    margin: 1em auto;
  }

  .tab-container-top {
  grid-column-gap: 2em;
  grid-row-gap: 2em;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
}
    
    .tab-visual-wrap {
      height: 40vh;
    }

    .tab-container-bottom {
    margin-top: 13%;
    width: 100%;
    position: relative;
  }
  
  .tab-content-item {
    position: absolute;
    text-align: center;
    align-items: center;
  }

  .button-container {
    margin-top: 10%;
  }

  }

  
  /* Add a smaller breakpoint for very small devices */
  @media (max-width: 480px) {
    .tab-layout-heading {
      font-size: 2em;
    }
    
    .filter-button {
      padding: 0.6em 0.8em;
      font-size: 0.85em;
    }
    
    .tab-visual-wrap {
      height: 40vh;
    }

    .tab-container-bottom {
      margin-top: 25%;
    }
  }

</style>
