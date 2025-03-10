<template>
    

<div class="big_container">
<div class="container" data-speed="1.3">


<h1 class="title">Contact Form</h1>

<div class="grid">

        <div class="col-3 input-effect">
        	<input v-model="first_name"
            class="effect-18"
            type="text"
            >
            <label :class="{ 'active_label': first_name }">First name</label>
            <span class="focus-border"></span>
        </div>

        <div class="col-3 input-effect">
        	<input v-model="last_name"
            class="effect-18"
            type="text"
            >
            <label :class="{ 'active_label': last_name }">Last Name</label>
            <span class="focus-border"></span>
        </div>

        <div class="col-3 input-effect">
        	<input v-model="email"
            class="effect-18"
            type="text"
            >
            <label :class="{ 'active_label': email }">Email</label>
            <span class="focus-border"></span>
        </div>

        <div class="col-3 input-effect">
        	<input v-model="phone"
            class="effect-18"
            type="text"
            >
            <label :class="{ 'active_label': phone }">Phone</label>
            <span class="focus-border"></span>
        </div>

        <!-- <div class="col-3 input-effect">
        	<input v-model="preffered"
            class="effect-18"
            type="text"
            >
            <label class="appt_label" :class="{ 'active_label_appt': preffered }">Preffered Day/Time of Appt.</label>
            <span class="focus-border"></span>
        </div> -->


    </div>
    

    <div class="col-3 input-effect textarea">
        <textarea v-model="message" class="effect-18"></textarea>
                    <label :class="{ 'active_label': message }">Message</label>
                    <span class="focus-border"></span>
        </div>


        <div class="submit_button" @click="submitForm">Submit</div>

</div>
</div>


</template>

<script setup>

const first_name = ref('')
const last_name = ref('')
const email = ref('')
const phone = ref('')
const preffered = ref('')
const message = ref('')



const { $mail } = useNuxtApp()

const submitForm = async () => {
  // Form validation logic here (if necessary)

  try {
    await $mail.send({
      subject: `New Contact Form Submission`,
      html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${first_name.value} ${last_name.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Phone:</strong> ${phone.value}</p>
        <p><strong>Message:</strong> ${message.value}</p>
      `,
    });
    alert('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
    alert('Failed to send email. Please try again later.');
  }
};

</script>
<style scoped>
.big_container {
    padding-bottom: 15vh;
    padding-top:10vh;
    z-index:3;
    position: relative;
}

.container {
    width: 85vw;
    height: 100%;
    overflow: hidden;
    position: relative;
    background-color: #f7f7f6;
    border-radius: 10px;
    z-index:3;
    padding-bottom:10%
}

.title {
    font-size: 5vw;
    color: #000;
    position: relative;
    z-index: 1;
    font-weight: 100;
    letter-spacing: 6px;
    line-height: 1.2;
    text-align: center;
    margin-top: 8%;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, auto); /* Adjusted for three rows */
    grid-column-gap: 10%;
    grid-row-gap: 60px; /* Adjusted spacing between rows */
    z-index: 1;
    margin-top: 10%;
    position: relative;
}

.input-effect {
    width: 90%; 
    margin: 0 auto; /* Centering the input fields */
    position: relative;
}

input[type="text"],
textarea {
    font: 15px/24px 'Muli', sans-serif; 
    color: #333; 
    background-color: transparent;
    width: 100%; 
    box-sizing: border-box; 
    letter-spacing: 1px;
    border-bottom: 1px solid grey;
    padding: 3px;
    position: relative;
            z-index: 2;
}

textarea {

    height: 50px; /* Initial height of the textarea */
    border:none;
    width:100%;
}

.textarea{
    margin-top:50px;
    border:none;
    width:95%;
}

:focus {
    outline: none;
}

.effect-18 ~ .focus-border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    z-index: 99;
    background-color: grey; /* Added background color */
}

.effect-18:focus ~ .focus-border {
    background-color: #d61616; /* Added background color */
}

.effect-18 ~ label {
    position: absolute;
    left: 5px;
    top: 9px;
    color: grey;
    transition: 0.3s;
    z-index: -1;
    letter-spacing: 0.5px;
}

.effect-18:focus ~ label, .has-content .effect-18 ~ label{top: -16px; left:0; font-size: 12px; color: #d61616; transition: 0.3s;}

.active_label{
    top: -16px !important;
    left:0;
    font-size: 12px;
    color: #cd990d;
    transition: 0.3s;
}

.active_label_appt{
    top: -16px !important;
    left:0;
    font-size: 12px;
    color: #cd990d;
    transition: 0.3s;
}



.submit_button {
    padding: 10px 15px;
    font-size: 12px;
    background-color: #cd9a0d00;
    text-align: center;
    width: 60%;
    margin-left: 20%;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 80px;
    color: #d61616;
    border: 1px solid #d61616;
    box-shadow: 0px 5px 12px rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease-in-out;
    position: relative;
            z-index: 5 !important;
}

.submit_button:hover {
    background-color: #d61616;
    color: #fff;
    box-shadow: 0px 10px 15px rgba(205, 154, 13, 0.25);
    transform: translateY(-3px);
    transition: all 0.2s ease-in-out;
}

        

@media only screen and (min-width: 0px) and (max-width: 376px) {

    input[type="text"],
textarea {
    font: 12px/22px 'Muli', sans-serif; 
}

.effect-18 ~ label {
    font-size:12px;
    top: 12px;
}

.effect-18 ~ .appt_label{
    top:0px;
    font-size: 11px;
    width:110%
}

.effect-18:focus ~ label, .has-content .effect-18 ~ label{top: -16px; left:0; font-size: 10px; color: #cd990d; transition: 0.3s;}

.active_label_appt{
    top: -32px !important;
}

}

@media only screen and (min-width: 376px) and (max-width: 576px) {

    input[type="text"],
textarea {
    font: 12px/22px 'Muli', sans-serif; 
}

.effect-18 ~ label {
    font-size:12px;
    top: 12px;
}

.effect-18 ~ .appt_label{
    top:0px
}

.effect-18:focus ~ label, .has-content .effect-18 ~ label{top: -16px; left:0; font-size: 10px; color: #cd990d; transition: 0.3s;}

.active_label_appt{
    top: -26px !important;
}

}

@media only screen and (min-width: 576px) and (max-width: 768px) {
}

@media only screen and (min-width: 768px) and (max-width: 992px) {
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {
}

@media only screen and (min-width: 1600px) and (max-width: 5600px) {
}

</style>
