<template>
  <div class="faq-container">
    <h2 class="faq-title">Frequently Asked Questions</h2>
    <div class="faq-description">Find answers to our most commonly asked questions below</div>
    
    <div class="faq-list">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
        <div 
          class="faq-question" 
          :class="{ 'active': activeIndex === index }"
          @click="toggleFaq(index)"
        >
          <h3>{{ faq.question }}</h3>
          <div class="faq-icon">
            <span v-if="activeIndex === index">−</span>
            <span v-else>+</span>
          </div>
        </div>
        <div 
          class="faq-answer" 
          :class="{ 'active': activeIndex === index }"
          :style="{ maxHeight: activeIndex === index ? answerHeight + 'px' : '0px' }"
          ref="faqAnswers"
        >
          <p ref="answerText">{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import gsap from 'gsap';

const activeIndex = ref(null);
const faqAnswers = ref([]);
const answerText = ref([]);
const answerHeight = ref(0);

const toggleFaq = async (index) => {
  if (activeIndex.value === index) {
    // Close the FAQ
    gsap.to(answerText.value[index], {
      opacity: 0,
      y: -20,
      duration: 0.175,
      onComplete: () => {
        activeIndex.value = null;
      }
    });
  } else {
    // If another FAQ is open, animate its text out first
    if (activeIndex.value !== null) {
      gsap.to(answerText.value[activeIndex.value], {
        opacity: 0,
        y: -20,
        duration: 0.3
      });
    }
    
    // Open the new FAQ
    activeIndex.value = index;
    
    // Wait for the DOM to update
    await nextTick();
    
    // Calculate the height of the content
    answerHeight.value = faqAnswers.value[index].scrollHeight;
    
    // Animate the text in
    gsap.fromTo(answerText.value[index], 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.3 }
    );
  }
};

const faqs = ref([
  {
    question: "What makes your safety training different?",
    answer: "Our safety training stands out because we focus on engaging, interactive content delivered by real instructors with industry experience. We believe learning should be enjoyable and memorable, which is why our courses combine practical knowledge with a fun approach that keeps participants engaged throughout the entire process."
  },
  {
    question: "How long does it take to complete a certification?",
    answer: "Certification completion times vary depending on the specific course and your learning pace. Most of our certifications can be completed within 4-8 hours, with some specialized courses requiring additional time. Our platform allows you to learn at your own pace, pausing and resuming as needed."
  },
  {
    question: "Are your certifications recognized industry-wide?",
    answer: "Yes, our certifications are recognized across industries and comply with relevant safety standards and regulations. We regularly update our content to ensure it meets current industry requirements and best practices."
  },
  {
    question: "Do you offer corporate training packages?",
    answer: "Absolutely! We offer customized corporate training packages tailored to your organization's specific needs. Our team can work with you to develop a training program that addresses your unique safety challenges and requirements. Contact our sales team for more information on corporate packages and volume discounts."
  },
  {
    question: "How often should safety training be renewed?",
    answer: "Safety certification renewal requirements vary by industry and certification type. Generally, most safety certifications should be renewed every 1-3 years. Our platform sends automatic reminders when your certifications are approaching expiration, making it easy to stay compliant."
  }
]);
</script>

<style scoped>
.faq-container {
  width: 80%;
  margin: 15vh auto;
  padding: 40px 0;
  interpolate-size: allow-keywords;
}

.faq-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  color: #8a0d2e;
}

.faq-description {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 50px;
  color: #555;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.4s ease;
}

.faq-question h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.faq-question.active {
  background-color: #8a0d2e;
  color: #fdf2f5;
}

.faq-icon {
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform 0.3s ease;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, padding 0.5s ease-in-out, background-color 0.5s ease;
  background-color: #8a0d2e;
  padding: 0 20px;
}

.faq-answer.active {
  padding: 0 20px 20px;
  background-color: #8a0d2e;
  color: #fdf2f5;
  line-height: 1.6;
}

.faq-answer p {
  margin: 0;
  line-height: 1.6;
  color: #555;
}

.faq-answer.active p {
  color: #fdf2f5;
  padding-bottom: 30px;
}

@media (max-width: 768px) {
  .faq-container {
    width: 90%;
  }
  
  .faq-title {
    font-size: 2rem;
  }
  
  .faq-question h3 {
    font-size: 1rem;
  }
}
</style>
