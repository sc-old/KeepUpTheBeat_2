<template>

    <div>
    

    
    <div ref="top_line" class="top_line"></div>
    
        <div class="contact_img_container">
    <img ref="contact_image" class="contact_img" src="~/assets/content/images/contact/map_1.webp">
    </div>
    
    
    
    <div class="form_container_desktop">
    <div class="grid_container">
    
        <div class="col_1">
            <h4 class="content_title">Contact</h4>

            <div class="contact_info">
         <p class="contact_elm">404-513-3348</p>
        <br>
        <p class="contact_elm">22 Westedge St Suite 700, Charleston, SC 29403</p>
        <br>
        <p class="contact_elm">shaun@gravitylabs.lol</p>
    </div>
        </div>
        <div class="col_2">
            <h6 class="form_title">Talk to Us. We Can Help.</h6>
    
            <div class="form_input_container">
                <div class="input_wrap">
                <input v-model="full_name" class="form_input" placeholder=' ' required/>
                <label class="input_label">Full Name</label>
         </div>
         <div class="input_wrap">
                <input v-model="contact_email" class="form_input" placeholder=' ' required/>
                <label class="input_label">Email</label>
         </div>
        </div>
        </div>
        <div class="col_3">

            <div class="quote_box">
            <ModalsSideModal> 
            <template v-slot:button>
                <div class="quote_button">Get A Quote</div>
            </template>
            <template v-slot:content>
                <FormsGetQuote />
            </template>
        </ModalsSideModal>
        </div>
    
            <div class="form_input_container">
                <div class="input_wrap">
                <input ref="phone_focused" @keyup="remove_chrs" @keypress="onPhoneKeyPress" maxlength="17"  type="text" class="form_input" v-model="phone" placeholder=" " required />
                <label class="input_label">Phone Number</label>
         </div>
            <div>
                <div class="input_wrap">
                <input v-model="website" class="form_input" placeholder=' ' required/>
                <label class="input_label">Website</label>
         </div>
            </div>
        </div>
    
            <div class="left_box_line"></div>
    
    </div>
    
    
        <div class="col_4">
    
        </div>
    </div>
    
    <textarea class="form_input_area" placeholder="Message" v-model="message" ></textarea>
    
    <button @click="submit_contact_message" class="submit_button">Submit</button>
    
    </div>
    
    
    
    
    <div class="mobile_grid">
    
        <h3 class="content_title">Contact</h3>
    
    
            <p class="form_title">Talk to Us. We Can Help.</p>
    
         
        <div class="mobile_form_background">
    
            <div class="form_input_container">
                <div class="input_wrap">
                <input v-model="full_name" class="form_input" placeholder=''/>
                <label class="input_label">Full Name</label>
         </div>
         <div class="input_wrap">
                <input v-model="contact_email" class="form_input" placeholder=' ' />
                <label class="input_label">Email</label>
         </div>
         <div class="input_wrap">
                <input ref="phone_focused" @keyup="remove_chrs" @keypress="onPhoneKeyPress" maxlength="17"  type="text" class="form_input" v-model="phone" placeholder=" " />
                <label class="input_label">Phone Number</label>
         </div>
         <div class="input_wrap">
                <input v-model="website" class="form_input" placeholder=' ' />
                <label class="input_label">Website</label>
         </div>
           
            <textarea class="form_input_area" placeholder="Message" v-model="message" ></textarea>
    
            <button @click="submit_contact_message" class="submit_button">Submit</button>
        </div>
    
        <div class="contact_info">
        <p class="contact_elm">404-513-3348</p>
        <br>
        <p class="contact_elm">22 Westedge St Suite 700, Charleston, SC 29403</p>
        <br>
        <p class="contact_elm">shaun@gravitylabs.lol</p>
        </div>
    
    
    
    
        </div>
    
    
    </div>
    
    
    
    
    
    
    

    
    
    
    
    <div class="body_video">
        <h1 class="contact_message">Elevate Your Buisiness</h1>
        <div class="video_overlay"></div>
        <video class="contact_video" autoplay muted playsinline loop>
                    <source src="~/assets/content/images/about/lab_orb.mp4" type="video/mp4">
                </video>
    </div>
    


    
    </div>
    
    </template>
    
    
    <script setup>
 import gsap from 'gsap';
 import ScrollTrigger from 'gsap/ScrollTrigger';
    
            const config = useRuntimeConfig()
            

    
            const full_name = ref('')
            const contact_email = ref('')
            const phone = ref('')
            const website = ref('')
            const message = ref('')
    
    
            function submit_contact_message (){
    
                if (first_name.value == '' || last_name.value == '' || contact_email.value == '' || phone.value == '' || message.value == ''){
                    alert('Please fill out all fields')
                    return
                }
    
    
                fetch(`${config.flask_url}/api/contact_and_subscribe/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({first_name:first_name.value, last_name:last_name.value, contact_email:contact_email.value, phone:phone.value, message:message.value})
        })
        .then((response) => response.json())
        .then((data) => {
    
    
            if (data.status == 'success_contact_sent') {
                alert(data.message)
            } else {
                alert(data.message)
            }
    
        })
        .catch(error => {
            alert('Error')
            start_loader.value = false;
            console.error('There was an error!', error);
        });
    
    
    
            }
    
    
    
    
    
    
            function onPhoneKeyPress(e) {
        const key = e.keyCode || e.charCode;
        const len_phone = phone.value.length
    
    }
    
    
    
    
    
    function remove_chrs() {
        phone.value = phone.value.toString().replace(/[^0-9-()-+ ]/g, '');
    }
    
    
    
    
    
    


    onMounted(() => {
        setTimeout(() => {
        
            ScrollTrigger.create({
        trigger: ".contact_img",
        start: "top top", 
        end:"+=300%",
        pin: ".contact_img",
        
      });


    

      ScrollTrigger.create({
        trigger: ".top_line",
        start: "top top", 
        end: "bottom -15px",
        pin: ".top_line",
      });
      
  


    }, 400);
    });
    
        
          
    
    </script>
    
    
    
    
    <style scoped>
    
    
    
    .grid_container{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-areas: 
        "col_1 col_2 col_3 col_4"
        "col_1 col_2 col_3 col_4"
        "col_1 col_2 col_3 col_4"
        "col_1 col_2 col_3 col_4";
        width: 100vw;
        z-index:10;
        position:absolute;
        top:0
    
    }
    
    .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:144vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:120vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:132vh
    }
    
    .col_4{
        grid-area: col_4;
        background-color: #18181800;
    }
    
    .left_box_line{
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:12vh;
        border-right:rgba(255, 255, 255, 0) solid 1px;
        border-top:rgba(255, 255, 255, 0) solid 1px;
        border-bottom:rgba(255, 255, 255, 0) solid 1px;
        position:absolute;
        bottom:12vh
    }
    
    .contact_img_container{
      position: absolute;
     height: 100vh;
     width: 100%;
     object-fit: cover;
     top:0;
     z-index:-1
    }
    .contact_img{
      position: absolute;
      height: 100vh;
      top:0;
      object-fit: cover;
      object-position: center;
      z-index:-1
    }
    
    .top_line{
        height:120px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:10
    }
    
    .content_title{
        margin-top:12.5%;
        margin-left:2.5%;
        position:absolute;
        font-size:250%;
        color:#fff
    }
    
    .form_title{
        margin-top:22%;
        margin-left:2%;
        position:absolute;
        font-size:170%;
        color:#fff;
        padding-bottom:10%
    }
    

    
    .form_input_container{
        margin-top:140%;
        position:relative;
    }
    
    .form_input_area{
        border-bottom:#fff solid 1px;
        margin-top:27%;
        color:#fff;
        padding:10px;
        margin-left:27%;
        background-color: #18181800;
        width:45%;
        height:75px;
        position:absolute;
        border:none;
        border-bottom:#fff solid 1px;
        z-index:10;
    }
    
    .submit_button{
        background-color: #fff;
        border-bottom:#fff solid 1px;
        margin-top:40%;
        color:rgb(0, 0, 0);
        padding:10px;
        margin-left:27.5%;
        font-size:25px;
        background-color: #18181800;
        width:45%;
        height:100px;
        position:absolute;
        border:none;
        border-bottom:#fff solid 1px;
        background-color: #fff;
        cursor:pointer;
        z-index:10
    }
    
    .submit_button:hover{
        color:#fff;
        border: #fff solid 1px;
        background-color: #181818;
        transition: all 0.5s ease;
    }
    
    .body_video{
        height:100vh;
        background-color: rgb(0, 0, 0);
        margin-top:180%;
        z-index:100;
        position:relative;
        width:100%;
        overflow:hidden;
    
    }
    
    
    .map_button{
        height:80px;
        background-color: rgb(35, 161, 245);
        margin-top:-52%;
        z-index:100;
        position:absolute;
        width:80px;
        margin-left:49%;
        border-radius:100%;
        z-index:-1;
    }
    
    
    
    .contact_video{
        width:55%;
        margin-left:22.5%;
        margin-top:7.5%
    }
    
    .video_overlay{
        width:100%;
        height:100vh;
        margin-top:0%;
        background-color: rgb(0, 0, 0);
        opacity:0.85;
        position:absolute;
        z-index:10;
        top:0;
        left:0
    }
    
    .contact_message{
        margin-top:35%;
        font-size:7vw;
        position:absolute;
        color:#fff;
        z-index:100;
        text-align: center;
        width:100%
    }
    
    .contact_info{
        margin-top:400px;
        width:75%;
        margin-left:12.5%;
        color:#fff;
        line-height:1.5;
        padding-top:10%
        }
    
    
    
    .scrub_container{
        margin-top:20%
    }
    
    
    
    
    
    
    
    
    
    
    
    @media only screen and (min-width: 0px) and (max-width: 576px) {
    
    
    
        .grid_container{
            display:none
        }
    
        .form_container_desktop{
            display:none
        }
    
    
    .map_button{
        height:50px;
        width:50px;
        margin-left:50%;
    }
    
    .mobile_form_background{
        background-color: #181818;
        height: 80vh;
        min-height: 510px;
        position: absolute;
        top:0;
        width:60%;
        z-index:1
    }
    
    .top_line{
        height:70px;
        background-color: #181818;
        z-index:50
    }
    
    .scrub_container{
        margin-top:40%;
        z-index:0
    }
    
    .content_title{
        margin-top:-25px;
        margin-left:30px;
        font-size:25px;
        position:absolute;
        z-index:10
    }
    
    .form_title{
        margin-top:20px;
        margin-left:30px;
        z-index:2;
        font-size:14px
    }
    
    .form_input_container{
        margin-top:195px;
        position:relative;
        z-index:2;
    }
    
    
    .form_input{
        margin-top:20px;
        padding:10px;
        margin-left:25px;
        font-size:10px;
        width:70%
    }
    
    .form_input_area{
        margin-top:70px;
        margin-left:-87.5%;
        font-size:10px;
        width:70%;
        height:20px;
    }
    
    
    .submit_button{
        margin-top:150px;
        margin-left:-85%;
        font-size:11px;
        width:40%;
        height:30px;
        border-radius:50px
    }
    
    .contact_info{
        margin-top:-190px;
        width:50%;
        margin-left:110%;
        }
    
    
    .contact_elm{
        font-size:12px
    }
    
    
    .body_video{
        height:50vh;
    
    }
    
    .contact_video{
        margin-top:5%
    }
    
    
    .contact_message{
        margin-top:130px;
    }
    
    }
    
    @media only screen and (min-width: 0px) and (max-width: 390px) {
    .form_input_area{
        margin-top:50px;
        margin-left:10%;
        font-size:10px;
        width:70%;
        height:20px;
    }
    
    .submit_button{
        margin-top:120px;
        margin-left:10%;
        font-size:11px;
        width:40%;
        height:30px;
        border-radius:50px
    }
    
    
    
    }
    
    @media only screen and (min-width: 576px) and (max-width: 675px) {
    .form_input_area{
        margin-top:70px;
        margin-left:-82.5%;
        font-size:10px;
        width:70%;
        height:20px;
    }
    
    }
    
    @media only screen and (min-width: 675px) and (max-width: 768px) {
    .form_input_area{
        margin-top:70px;
        margin-left:-80%;
        font-size:10px;
        width:70%;
        height:20px;
    }
    
    }
    
    @media only screen and (min-width: 576px) and (max-width: 768px) {
      
     
    
        .grid_container{
            display:none
        }
    
        .form_container_desktop{
            display:none
        }
    
    
    .map_button{
        height:50px;
        width:50px;
        margin-left:57%;
    }
    
    .mobile_form_background{
        background-color: #181818;
        height: 80vh;
        min-height: 530px;
        position: absolute;
        top:0;
        width:60%;
        z-index:1
    }
    
    .top_line{
        height:70px;
        background-color: #181818;
        z-index:50
    }
    
    .scrub_container{
        margin-top:40%;
        z-index:0
    }
    
    .content_title{
        margin-top:-35px;
        margin-left:30px;
        font-size:25px;
        position:absolute;
        z-index:10
    }
    
    .form_title{
        margin-top:25px;
        margin-left:30px;
        z-index:2;
        font-size:14px
    }
    
    .form_input_container{
        margin-top:215px;
        position:relative;
        z-index:2;
    }
    
    
    .form_input{
        margin-top:20px;
        padding:10px;
        margin-left:30px;
        font-size:10px;
        width:70%
    }
    
    
    
    .submit_button{
        margin-top:140px;
        margin-left:-83%;
        font-size:11px;
        width:40%;
        height:30px;
        border-radius:50px
    }
    
    .contact_info{
        margin-top:-200px;
        width:50%;
        margin-left:110%;
        }
    
    
    .contact_elm{
        font-size:20px
    }
    
    
    .body_video{
        height:50vh;
    
    }
    
    .contact_video{
        margin-top:5%
    }
    
    
    .contact_message{
        margin-top:130px;
    }
    }
    
    @media only screen and (min-width: 768px) and (max-width: 905px) {

    }
    
    @media only screen and (min-width: 992px) and (max-width: 1062px) {
  

    }
    
    
    @media only screen and (min-width: 768px) and (max-width: 992px) {
    
    
    
        .mobile_grid{
            display:none
        }
    
        .top_line{
        height:90px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:10
    }
    
    .content_title{
        margin-top:20%;
        margin-left:2.5%;
        position:absolute;
        font-size:250%
    }
    
    .form_title{
        margin-top:30%;
        margin-left:15px;
        position:absolute;
    }
    
    
    .form_input_container{
        margin-top:145%;
    }
    
    .form_input{
        border-bottom:#fff solid 1px;
        margin-top:40px;
        padding:10px;
        margin-left:10%;
        font-size:15px;
        width:70%
    }
    
    
    
    .form_input_area{
        margin-top:5%;
        padding:10px;
        margin-left:27%;
        font-size:15px;
        width:42.5%;
        height:50px;
    }
    
    
    .submit_button{
        margin-top:50%;
        padding:10px;
        margin-left:27.5%;
        font-size:15px;
        width:45%;
        height:50px;
    }
    
    
    
    
    .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:129vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:105vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:117vh
    }
    
    .col_4{
        grid-area: col_4;
        background-color: #18181800;
    }
    
    .contact_info{
        margin-top:130%;
        margin-left:10%;
        }
    
        .contact_elm{
        font-size:18px
    }
    
    .scrub_container{
        margin-top:40%;
        z-index:0
    }
    
    
    .map_button{
        height:80px;
        width:80px;
        margin-left:45%;
    }
    
    .contact_video{
        margin-top:5%
    }
    
    
    .contact_message{
        margin-top:25%;
    }
    
    
    .body_video{
        height:80vh;
        margin-top:100%;
    }
    
    
    
    }
    
    @media only screen and (min-width: 992px) and (max-width: 1200px) {
        .mobile_grid{
            display:none
        }
    
        .form_input_area{
        margin-top:35%;
        padding:10px;
        margin-left:27%;
        width:42.5%;
        height:75px;
    }
    
    .submit_button{
        margin-top:40%;
        padding:10px;
        margin-left:27.5%;
        font-size:25px;
        background-color: #18181800;
        width:45%;
        height:80px;
        background-color: #fff;
    }
    
    .scrub_container{
        margin-top:40%;
        z-index:0
    }
    
    
    
    .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:129vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:105vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:117vh
    }
    
    .col_4{
        grid-area: col_4;
        background-color: #18181800;
    }
    
    
    
    }
    
    @media only screen and (min-width: 1200px) and (max-width: 1400px) {
        .mobile_grid{
            display:none
        }
    
    
    .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:154vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:130vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:142vh
    }
    
    .form_input_area{
        margin-top:29%;
        padding:10px;
        margin-left:27%;
        width:45%;
        height:75px;
    }
    
    .submit_button{
        margin-top:45%;
        padding:10px;
        margin-left:27.5%;
        font-size:25px;
        background-color: #18181800;
        width:45%;
        height:80px;
        background-color: #fff;
    }
    
    
    .contact_video{
        width:55%;
        margin-left:22.5%;
        margin-top:0%
    }
    
    .contact_message{
        margin-top:25%;
    }
    
    
    
    }
    
    @media only screen and (min-width: 1400px) and (max-width: 1600px) {
        .mobile_grid{
            display:none
        }
    
        .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:159vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:135vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:147vh
    }
    
    
    }
    
    @media only screen and (min-width: 1600px) and (max-width: 5600px) {
        .mobile_grid{
            display:none
        }
    
        .col_1{
        grid-area: col_1;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:169vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:145vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #181818;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:157vh
    }
    
    .form_input_area{
        margin-top:29.5%;
        padding:10px;
        margin-left:27%;
        width:42.5%;
        height:75px;
    }
    
    
    .contact_video{
        width:45%;
        margin-left:27.5%;
        margin-top:0%
    }
    
    .contact_message{
        margin-top:20%;
    }
    
    
    }
    
    
    
    
    

input{
    border:0px;
    border-radius: 0;
}

input:focus {
    outline: none;
}
*:focus {
outline: none;
}


input:focus::placeholder {
    color: transparent;
  }

  ::placeholder {
    font-size: 1.25vw;
    color: #8c8c8c;
    font-weight: 400;
}


    
    
    .input_wrap {
  position: relative;
  margin-top: 5vw;
  z-index: 1;
}

.input_wrap .form_input,
.input_wrap .select_white {
  display: block;
  width: 80%;
  margin-left: 10%;
  height: 2.5vw;
  border-bottom: 1px solid rgb(255, 255, 255);
  background-color: #181818;
  color: #fff;
  padding-left: 1vw;
  font-size: 1.5vw;
}

.input_wrap .input_label {
  position: absolute;
  color: rgb(140, 140, 140);
  font-size: 1.25vw;
  font-weight: normal;
  pointer-events: none;
  left: 3vw;
  top: 0.75vw;
  transition: 300ms ease all;
}

.input_wrap .form_input:focus ~ .input_label,
.input_wrap .form_input:valid ~ .input_label,
.input_wrap .select_white:focus ~ .input_label,
.input_wrap .select_white:valid ~ .input_label {
  top: -1.75vw;
  left: 3vw;
  font-size: 1vw;
  color: #1b91eb;
}

.input_wrap .form_input:not(:focus):not(:placeholder-shown):not(:valid) ~ .input_label {
  top: 21.75vw;
  left: 2vw;
  font-size: 1.25vw;
  color: #8c8c8c
}

.input_wrap .input_date:not(:focus):not(:placeholder-shown):invalid ~ .input_label {
  color: rgb(140, 140, 140);
  top: -1.75vw;
  left: 3vw;
  font-size: 1.15vw;
}

.input_wrap .form_input[type=date]:focus::-webkit-datetime-edit {
  color: black !important;
}

.input_wrap .form_input_checkbox {
  display: none;
}

.input_label_checkbox:before {
  content: "";
  -webkit-appearance: none;
  background-color: transparent;
  border: 3px solid #0079bf;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
              inset 0 -15px 10px -12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
  position: relative;
}

.form_input_checkbox:checked + .input_label_checkbox:after {
  content: "";
  display: block;
  position: absolute;
  top: -65px;
  left: -10px;
  width: 70px;
  height: 30px;
  border: 20px solid #0079bf;
  border-width: 0 0 10px 10px;
  transform: rotate(-58deg);
}

    .quote_box{
        position: relative;
        z-index:10;
        cursor: pointer; 
    }
    
.quote_button{
    background-color: #0079bf;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    width: 60%;
    margin-left:30%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-top: 10px;
    position: absolute;
        top:0;
        left:0;
        z-index:1;
        margin-top:50%
}
    
    
    
    </style>