<template>
    <div class="section-three-container" ref="sectionThreeRef">
      <div class="grid-container">
        <!-- Row 1 -->
        <div class="card" ref="card1Ref" @click="navigateTo('/services/cpr_aed')">
          <div class="card-inner">
            <div class="card-front">
              <h3>CPR Training</h3>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
            </div>
            <div class="card-back">
              <p>Our comprehensive CPR training equips you with life-saving skills. Learn proper chest compression techniques, rescue breathing, and how to respond confidently in emergency situations.</p>
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
        
        <div class="empty-cell"></div>
        
        <div class="card" ref="card2Ref" @click="navigateTo('/services/blood_borne_pathogens')">
          <div class="card-inner">
            <div class="card-front">
              <h3>Blood Borne PathogensTraining</h3>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
            </div>
            <div class="card-back">
              <p>Learn about blood borne pathogens and how to protect yourself and others.</p>
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
        
        <!-- Row 2 -->
        <div class="empty-cell"></div>
        
        <div class="card" ref="card3Ref" @click="navigateTo('/services/cpr_aed')">
          <div class="card-inner">
            <div class="card-front">
              <h3>First Aid Training</h3>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
            </div>
            <div class="card-back">
              <p>Our first aid training covers wound care, bleeding control, fracture management, and more. Gain practical skills to handle common injuries and medical emergencies.</p>
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>
        
        <div class="empty-cell"></div>
        
        <!-- Row 3 -->
        <div class="empty-cell"></div>
        
        <div class="empty-cell"></div>
        
        <div class="card" ref="card4Ref"  @click="navigateTo('/services/aed_training')">
          <div class="card-inner">
            <div class="card-front">
              <h3>Workplace Safety</h3>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            </div>
            <div class="card-back">
              <p>Ensure your workplace meets safety standards with our comprehensive training. Learn hazard identification, emergency protocols, and preventative measures for a safer work environment.</p>
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>


        <!-- Row 4 -->        
        <div class="card" ref="card5Ref" @click="navigateTo('/services/cpr_aed')">
          <div class="card-inner">
            <div class="card-front">
              <h3>Active Shooter Training</h3>
              <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
            </div>
            <div class="card-back">
              <p>Prepare for active shooter situations with our specialized training. Learn how to protect yourself and others, navigate through chaos, and respond effectively in critical moments.</p>
              <button class="learn-more-btn">Learn More</button>
            </div>
          </div>
        </div>

        <div class="empty-cell"></div>
        
        <div class="empty-cell"></div>




      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  gsap.registerPlugin(ScrollTrigger);
  
  const sectionThreeRef = ref(null);
  const card1Ref = ref(null);
  const card2Ref = ref(null);
  const card3Ref = ref(null);
  const card4Ref = ref(null);
  const card5Ref = ref(null);
  
  onMounted(() => {
    // Allow DOM to fully render
    setTimeout(() => {
      // Animate section title
      gsap.from('.section-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionThreeRef.value,
          start: 'top 80%',
        }
      });
  
      // Staggered card entrance
      gsap.from([card1Ref.value, card2Ref.value, card3Ref.value, card4Ref.value, card5Ref.value], {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.grid-container',
          start: 'top 75%',
        }
      });
  
      // Card hover animations
      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card.querySelector('.card-inner'), {
            rotationY: 180,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card.querySelector('.card-inner'), {
            rotationY: 0,
            duration: 0.3,
            ease: 'power1.out'
          });
        });
      });
  
  
    }, 500);
  });
  </script>
  
  <style scoped>
  .section-three-container {
    min-height: 100%;
    background-color: #fdf2f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10% 0
  }
  
  .section-title {
    font-size: 3.5rem;
    font-weight: 600;
    color: #49161b;
    margin-bottom: 5rem;
    text-align: center;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, auto);
    gap: 3%;
    width: 90%;
  }
  
  .empty-cell {
    min-height: 200px;
  }
  
  .cards-container {
    display: none; /* Hide the old container */
  }
  
  .card {
    width: 100%;
    height: 400px;
    perspective: 1000px;
    cursor: pointer;
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(73, 22, 27, 0.1);
  }
  
  .card-front {
    background-color: white;
    color: #49161b;
  }
  
  .card-back {
    background-color: #49161b;
    color: white;
    transform: rotateY(180deg);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .card h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }
  
  .card p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
  
  .icon {
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #fdf2f5;
    margin-top: 1rem;
  }
  
  .icon svg {
    width: 40px;
    height: 40px;
    color: #49161b;
  }
  
  .learn-more-btn {
    background-color: white;
    color: #49161b;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto;
  }
  
  .learn-more-btn:hover {
    background-color: #fdf2f5;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 1100px) {
    .grid-container {
      gap: 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .section-title {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }
    
    .grid-container {
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      gap: 1.5rem;
    }
    
    .empty-cell {
      display: none;
    }
    
    .card {
      width: 90%;
      max-width: 350px;
      margin: 0 auto 1.5rem;
    }
  }
  </style>
  