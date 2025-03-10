<template>
  <div class="contactLandingContainer">
    <div class="contactGrid">
      <div class="contactInfo">
        <h1 class="title" ref="titleElement">Get In Touch</h1>
        <h2 class="subtitle" ref="subtitleElement">We're Here To Help</h2>
        
        <div class="infoSection" ref="infoElement">
          <div class="infoItem">
            <div class="icon">📞</div>
            <div class="text">
              <h3>Call Us</h3>
              <p>(555) 123-4567</p>
            </div>
          </div>
          
          <div class="infoItem">
            <div class="icon">✉️</div>
            <div class="text">
              <h3>Email Us</h3>
              <p>info@keepupthebeat.com</p>
            </div>
          </div>
          
          <div class="infoItem">
            <div class="icon">📍</div>
            <div class="text">
              <h3>Visit Us</h3>
              <p>123 Heartbeat Avenue<br>Lifesaver City, LS 12345</p>
            </div>
          </div>
          
          <div class="infoItem">
            <div class="icon">🕒</div>
            <div class="text">
              <h3>Hours</h3>
              <p>Monday - Friday: 9am - 5pm<br>Saturday: 10am - 2pm</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="contactForm" ref="formContainer">
        <div class="formWrapper">
          <h2 class="formTitle">Send Us A Message</h2>
          
          <form @submit.prevent="submitForm">
            <div class="formGroup">
              <label for="name">Full Name</label>
              <input type="text" id="name" v-model="form.name" required>
            </div>
            
            <div class="formGroup">
              <label for="email">Email Address</label>
              <input type="email" id="email" v-model="form.email" required>
            </div>
            
            <div class="formGroup">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" v-model="form.phone">
            </div>
            
            <div class="formGroup">
              <label for="subject">Subject</label>
              <select id="subject" v-model="form.subject" required>
                <option value="" disabled selected>Select a subject</option>
                <option value="training">Training Information</option>
                <option value="quote">Request a Quote</option>
                <option value="aed">AED Information</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="formGroup">
              <label for="message">Your Message</label>
              <textarea id="message" v-model="form.message" rows="5" required></textarea>
            </div>
            
            <button type="submit" class="submitBtn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    
    <div class="imageContainer" ref="imageElement">
      <img src="~/assets/content/images/homePage/home_1_1.png" alt="CPR Training" class="contactImage">
      <div class="imageOverlay"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const titleElement = ref(null);
const subtitleElement = ref(null);
const infoElement = ref(null);
const formContainer = ref(null);
const imageElement = ref(null);

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

function submitForm() {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value);
  alert('Thank you for your message! We will get back to you soon.');
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
}

onMounted(() => {
  setTimeout(() => {
    // Animate title and subtitle
    gsap.from(titleElement.value, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    gsap.from(subtitleElement.value, {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out'
    });
    
    // Animate info items
    gsap.from(infoElement.value.children, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.5,
      ease: 'power2.out'
    });
    
    // Animate form
    gsap.from(formContainer.value, {
      x: 50,
      opacity: 0,
      duration: 1,
      delay: 0.7,
      ease: 'power2.out'
    });
    
    // Animate image
    gsap.from(imageElement.value, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.9,
      ease: 'power2.out'
    });
  }, 150);
});
</script>

<style scoped>
.contactLandingContainer {
  width: 100%;
  padding: 120px 0 80px;
  background-color: #fdf2f5;
  position: relative;
}

.contactGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  width: 85%;
  max-width: 1400px;
  margin: 0 auto;
}

.contactInfo {
  padding: 20px;
}

.title {
  font-size: 3.5rem;
  font-weight: 900;
  color: #8a0d2e;
  margin-bottom: 10px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  color: #333;
  margin-bottom: 40px;
}

.infoSection {
  margin-top: 40px;
}

.infoItem {
  display: flex;
  margin-bottom: 30px;
  align-items: flex-start;
}

.icon {
  font-size: 2rem;
  margin-right: 20px;
  color: #8a0d2e;
  min-width: 40px;
  text-align: center;
}

.text h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
}

.text p {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.5;
}

.contactForm {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.formWrapper {
  padding: 40px;
}

.formTitle {
  font-size: 1.8rem;
  font-weight: 700;
  color: #8a0d2e;
  margin-bottom: 30px;
  text-align: center;
}

.formGroup {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
}

input, select, textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #8a0d2e;
}

.submitBtn {
  background-color: #8a0d2e;
  color: white;
  border: none;
  padding: 14px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
}

.submitBtn:hover {
  background-color: #6d0923;
}

.imageContainer {
  width: 100%;
  max-width: 1000px;
  margin: 60px auto 0;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  height: 400px;
}

.contactImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.imageOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(138, 13, 46, 0.7), rgba(138, 13, 46, 0.2));
}

@media (max-width: 1024px) {
  .contactGrid {
    grid-template-columns: 1fr;
    width: 90%;
  }
  
  .contactInfo {
    padding: 0;
  }
  
  .title {
    font-size: 2.8rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .imageContainer {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .contactLandingContainer {
    padding: 100px 0 60px;
  }
  
  .title {
    font-size: 2.3rem;
  }
  
  .formWrapper {
    padding: 30px 20px;
  }
}
</style>
