<template>
    

<div class="formBox">

    <h1 class="title">Let’s build an awesome project together.</h1>

<h6 class="subtitle">Describe your project and leave us your contact info, we’ll get back to you within 24 hours.</h6>

<h1 class="titleTwo">What do you need?</h1>


<div class="checkbox_container">
              <WebsiteSectionsFormsInputElementsCheckBox
                v-for="service in services"
                :key="service.id"
                v-model="service.checked"
                :title="service.title"
                :id="service.id"
                fontSize="10px"
                width="150px"
                height="40px"
              />
</div>

<div class="inputGrid">

    <WebsiteSectionsFormsInputElementsText 
      label="First Name" 
      v-model="first_name" 
      :lineColor="'#1781e4'"
      :textColor="'#000'"
    />
    <WebsiteSectionsFormsInputElementsText 
      label="Last Name" 
      v-model="last_name" 
      :lineColor="'#1781e4'"
      :textColor="'#000'"
    />
    <WebsiteSectionsFormsInputElementsEmail 
      label="Email" 
      v-model="email" 
      :lineColor="'#1781e4'"
      :textColor="'#000'"
    />
    <WebsiteSectionsFormsInputElementsPhone 
      label="Phone Number" 
      v-model="phone_number"
      :lineColor="'#1781e4'"
      :textColor="'#000'"
    />

</div>

<div class="areaBox">
<WebsiteSectionsFormsInputElementsTextArea 
      label="Tell us about your project" 
      v-model="project_desc" 
      :lineColor="'#1781e4'"
      :textColor="'#000'"
    />
    </div>


    <h1 class="titleTwo">Budget estimation</h1>


    <div class="checkbox_container">
              <WebsiteSectionsFormsInputElementsCheckBox
                v-for="budget in budgets"
                :key="budget.id"
                v-model="budget.checked"
                :title="budget.title"
                :id="budget.id"
                fontSize="10px"
                width="150px"
                height="40px"
              />
            </div>


    
            <div v-if="isSending == 'sent'">
            <div class="sent_button" >Sent</div>
            <h2 class="thank_you">Thank you for your submission. We will reach out to you in the next 24 hours</h2>
            </div>

            <div v-else-if="isSending == 'sending'">
            <div class="sending_button" >Sending</div>
            <span class="loader"></span>
            </div>

            <div v-else @click="submitForm" class="submit_button" >Submit</div>
          

</div>


</template>



<script setup>
import { useSessionStorage, useStorage } from '@vueuse/core'
const config = useRuntimeConfig()

const project_desc = ref('')
const email = ref('')
const first_name = ref('')
const last_name = ref('')
const phone_number = ref('')


const services = ref([
      { id: 'web_software', title: 'Web & Software Development', checked: false },
      { id: 'Mobile_Development', title: 'Mobile Application development', checked:false },
      { id: 'backend/frontend', title: 'backend/frontend development', checked: false },
      { id: 'ai_ml', title: 'AI & Data Science', checked: false },
      { id: 'IOT', title: 'Iot Services', checked: false },
      { id: 'Design', title: 'Design', checked: false },
      { id: 'E_commerce', title: 'E-Commerce Optimization', checked: false },
      { id: 'Consultaion', title: 'Consultaion services', checked: false },
      { id: 'Cloud_compute', title: 'Cloud computing & management', checked: false },
      { id: 'Networking_cyberSecurity', title: 'Networking & cyberSecurity', checked: false },
      { id: 'other_service', title: 'Other', checked: false },
    ]);

const budgets = ref([
  { id: '5k-10k', title: '5k - 10k USD', checked: false },
  { id: '10k-25k', title: '10k - 25k USD', checked: false },
  { id: '25k-50k', title: '25k - 50k USD', checked: false },
  { id: '50k-100k', title: '50k - 100k USD', checked: false },
  { id: '100k-plus', title: '100k+ USD', checked: false },
  { id: 'other_budget', title: 'Other / Custom', checked: false },
]);

const selectedServices = computed(() => 
  services.value.filter(service => service.checked)
);

const selectedBudgets = computed(() => 
budgets.value.filter(budget => budget.checked)
);





const isSending = ref(null)


const { $mail } = useNuxtApp()

const submitForm = async () => {
  try {
    isSending.value = 'sending'
    await $mail.send({
      subject: `New Quote Form Submission`,
      html: `
        <h1>Quote Form Submission</h1>
        <p><strong>Name:</strong> ${first_name.value} ${last_name.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Phone:</strong> ${phone_number.value}</p>
        <p><strong>Project Description:</strong> ${project_desc.value}</p>
        <p><strong>Selected Services:</strong> ${selectedServices.value.map(service => service.id).join(', ')}</p>
        <p><strong>Budget Estimation:</strong> ${selectedBudgets.value.map(budget => budget.id).join(', ')}</p>
      `,
    });
    isSending.value = 'sent'
  } catch (error) {
    console.error('Failed to send email:', error);
    isSending.value = null
    alert('Failed to send email. Please try again later.');
  }
};


</script>





<style scoped>

.formBox{
margin-top:15%;
width:80%;
margin-left:10%
}

.title{
    font-size:150%;
    color:#1781e4
}

.subtitle{
    font-size:80%;
    color:#111111;
    margin-top:2%;
    font-weight:400;
    width:80%;
    line-height:1.25
}

.titleTwo{
    font-size:120%;
    color:#848484;
    margin-top:10%;
    margin-bottom:5%
}

.checkbox_container{
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
width:95%;
margin-left:2.5%;
margin-bottom:10%
}


.inputGrid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    width:90%;
    margin-left:5%;
    gap:10%;
    margin-top:15%
}

.areaBox{
    width:90%;
    margin-left:5%;
    margin-bottom:15%
}



.submit_button{
    width:80%;
    padding: 5px 0px;
    background-color:#1976D2;
    margin-left: 15%;
    margin-top:5%;
    margin-bottom:35%;
    border-radius:100px;
    border:#fff solid 0px;
    cursor:pointer;
    font-size:100%;
    font-weight: 100;
    line-height:40px;
    color:#fff;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
    outline: 0px solid rgba(19, 218, 218, 0.6);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    text-align: center;
}


.submit_button:hover{
  box-shadow: 0px 10px 15px rgb(25, 120, 237, .5);
  transform: translateY(-3px);
  outline: 3px solid rgba(19, 218, 218, 0.6);
  transition: outline 12s ease 1s;
} 


.sending_button{
    width:80%;
    padding: 5px 0px;
    background-color:#e88504;
    margin-left: 15%;
    margin-top:5%;
    margin-bottom:5%;
    border-radius:100px;
    border:#fff solid 0px;
    cursor:pointer;
    font-size:100%;
    font-weight: 100;
    line-height:40px;
    color:#fff;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
    outline: 0px solid rgba(19, 218, 218, 0.6);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    text-align: center;
}


.sending_button:hover{
  box-shadow: 0px 10px 15px #e88504;
  transform: translateY(-3px);
  outline: 3px solid rgba(19, 218, 218, 0.6);
  transition: outline 12s ease 1s;
} 


.sent_button{
  width:80%;
    padding: 5px 0px;
    background-color:green;
    margin-left: 15%;
    margin-top:5%;
    border-radius:100px;
    border:#fff solid 0px;
    cursor:pointer;
    font-size:100%;
    font-weight: 100;
    line-height:40px;
    color:#fff;
    box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.2);
    outline: 0px solid rgba(19, 218, 218, 0.6);
    transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
    text-align: center;
}


.sent_button:hover{
  box-shadow: 0px 10px 15px rgba(0, 128, 0, 0.393);
  transform: translateY(-3px);
  outline: 3px solid rgba(19, 218, 218, 0.6);
  transition: outline 12s ease 1s;
} 


.thank_you{
  margin-bottom:35%;
  margin-top:5%;
  margin-left:5%;
}





.loader {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 2px solid #1976D2;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
  margin-bottom:35%;
  margin-left:calc(50% - 25px)
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 10px;
  top:10px;
  border: 2px solid #e88504;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
    
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 

</style>