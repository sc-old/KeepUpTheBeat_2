<template>

    <div>
    

    
    <div ref="top_line" class="top_line"></div>
    
        <div class="contact_img_container">
    <img ref="contact_image" class="contact_img" src="~/assets/content/images/contact/map_1.webp">
    </div>
    
    
    
    <div class="form_container">


    <div class="grid_container isDesktop">
        <div class="col_1">
            <h4 class="content_title">Contact</h4>

            <div class="quote_box">
            <ModalsSideModal> 
            <template v-slot:button>
                <div class="quote_button">Get A Quote</div>
            </template>
            <template v-slot:content>
                <WebsiteSectionsFormsGetQuote />
            </template>
        </ModalsSideModal>
        </div>

    <div class="contact_info">
        <p class="contact_elm">22 Westedge St Suite 700, Charleston, SC 29403</p>
            <br>
        <p class="contact_elm">shaun@gravitylabs.lol</p>
        <br>
        <p class="contact_elm">404-513-3348</p>
    </div>
    </div>
        <div class="col_2"></div>
        <div class="col_3"></div>
        <div class="col_4"></div>
    </div>

    <div class="mobileBox">
        <h4 class="content_title">Contact</h4>
        <div class="quote_box">
                <NuxtLink to="getQuote"> <div class="quote_button">Get A Quote</div></NuxtLink>
        </div>

        <div class="contact_info">
        <p class="contact_elm">22 Westedge St Suite 700, Charleston, SC 29403</p>
            <br>
        <p class="contact_elm">shaun@gravitylabs.lol</p>
        <br>
        <p class="contact_elm">404-513-3348</p>
    </div>
    </div>
    

    <div class="left_box_line"></div>



    <div class="contactFormBox">
        <h1 class="formTitle">Talk to Us.<br>Communication Matters.</h1>
    <div class="contactInputGrid">
    <WebsiteSectionsFormsInputElementsText 
      label="First Name" 
      v-model="first_name" 
      :lineColor="'#fff'"
      :textColor="'#fff'"
    />
    <WebsiteSectionsFormsInputElementsText 
      label="Last Name" 
      v-model="last_name"
      :lineColor="'#fff'"
      :textColor="'#fff'"
    />
    <WebsiteSectionsFormsInputElementsEmail 
      label="Email" 
      v-model="email"
     :lineColor="'#fff'"
      :textColor="'#fff'"
    />
    <WebsiteSectionsFormsInputElementsPhone 
      label="Phone Number" 
      v-model="phone_number"
     :lineColor="'#fff'"
      :textColor="'#fff'"
    />

</div>

<div class="contactAreaBox">
<WebsiteSectionsFormsInputElementsTextArea 
      label="Tell us about your project" 
      v-model="contact_desc"
      :lineColor="'#fff'"
      :textColor="'#fff'"
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
 
    
          
 const contact_desc = ref('')
    const email = ref('')
    const first_name = ref('')
    const last_name = ref('')
    const phone_number = ref('')
    
    


    const isSending = ref(null)
    
    
    const { $mail } = useNuxtApp()
    
    const submitForm = async () => {
      try {
        isSending.value = 'sending'
        await $mail.send({
          subject: `New Contact Form Submission`,
          html: `
            <h1>Contact Form Submission</h1>
            <p><strong>Name:</strong> ${first_name.value} ${last_name.value}</p>
            <p><strong>Email:</strong> ${email.value}</p>
            <p><strong>Phone:</strong> ${phone_number.value}</p>
            <p><strong>Contact Description:</strong> ${contact_desc.value}</p>
          `,
        });
        isSending.value = 'sent'
      } catch (error) {
        console.error('Failed to send email:', error);
        isSending.value = null
        alert('Failed to send email. Please try again later.');
      }
    };
    


 


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
        pinSpacing: false,
      });
      
    }, 100);
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
        background-color: #111111;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:129vh;
    }
    
    .col_2{
        grid-area: col_2;
        background-color: #111111;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        height:105vh;
        border-right:0;
        border-left:0
    }
    
    .col_3{
        grid-area: col_3;
        background-color: #111111;
        border:rgba(255, 255, 255, 0.15) solid 1px;
        border-left: 0px;
        height:118vh
    }
    
    .col_4{
        grid-area: col_4;
        background-color: #11111100;
    }


    .mobileBox{
        background-color: #111111;
        width: 85vw;
        height:150vh;
        position: absolute;
        top:0;
        left:0;
        z-index:10;
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
        height:150px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:100
    }
    
    .content_title{
        margin-top:95px;
        margin-left:2.5%;
        position:absolute;
        font-size:280%;
        color:#fff
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
        margin-top:40px;
        width:75%;
        margin-left:12.5%;
        color:#fff;
        line-height:1.5;
        }
    
    
    
    
    .quote_box{
        position: relative;
        z-index:10;
        cursor: pointer; 
        margin-top: 250px;
    }
    
.quote_button{
    background-color: #0079bf;
    color: #fff;
    padding: 10px;
    font-size: 20px;
    width: 60%;
    margin-left:10%;
    text-align: center;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 5px;
    position: relative;
        z-index:1;
}
    

.contactFormBox{
    z-index:100;
    position: absolute;
    width:50%;
    margin-left:25%;
    margin-top:76px;
    padding-bottom:5%
}

.formTitle{
    color:#fff;
    margin-left:5%
}

    
.contactInputGrid{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;
        width:90%;
        margin-left:5%;
        gap:10%;
        margin-top:10%
    }
    
    .contactAreaBox{
        width:90%;
        margin-left:5%;
        margin-bottom:0%
    }
    





    
    .submit_button{
        width:80%;
        padding: 5px 0px;
        background-color:#1976D2;
        margin-left: 10%;
        margin-top:0%;
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
        height:50px
    }
    
    
    .submit_button:hover{
        color:#fff;
        border: #fff solid 1px;
        background-color: #181818;
        transition: all 0.5s ease;
    }
    
    .sending_button{
        width:80%;
        padding: 5px 0px;
        background-color:#e88504;
        margin-left: 10%;
        margin-top:0%;
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
        height:50px
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
        margin-left: 10%;
        margin-top:0%;
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
        height:50px
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
      color:#fff
    }
    



    @media only screen and (min-width: 0px) and (max-width: 376px) {
        .isDesktop{
            display:none
        }

        .body_video{
        margin-top:300vh;
        height:50vh;
    }

    .contactFormBox{
    width:85%;
    padding-left:5%;
    padding-right:10%;
    margin-left:0;
    margin-top:410px;
    background-color: #111111;
    padding-bottom:35%
}

.formTitle{
    font-size:100%
}

.content_title{
        margin-top:80px;
        margin-left:5%;
        font-size:250%;
    }

    .quote_box{
        position: relative;
        z-index:10;
        cursor: pointer; 
        margin-top: 200px;
    }
    
.quote_button{
    font-size: 15px;
    width: 80%;
    margin-left:10%;
}

.contact_elm{
    font-size:90%
}
       .top_line{
        height:100px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:100;
        top:30px
    }

    .mobileBox{

        width: 85vw;
        height:120vh;
    }

}
  
@media only screen and (min-width: 376px) and (max-width: 576px) {
    .isDesktop{
            display:none
        }

        .body_video{
        margin-top:300vh;
        height:50vh;
    }

    .contactFormBox{
    width:85%;
    padding-left:5%;
    padding-right:10%;
    margin-left:0;
    margin-top:410px;
    background-color: #111111;
    padding-bottom:35%
}

.formTitle{
    font-size:100%
}

.content_title{
        margin-top:80px;
        margin-left:5%;
        font-size:250%;
    }

    .quote_box{
        position: relative;
        z-index:10;
        cursor: pointer; 
        margin-top: 200px;
    }
    
.quote_button{
    font-size: 15px;
    width: 80%;
    margin-left:10%;
}

.contact_elm{
    font-size:90%
}



       .top_line{
        height:100px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:100;
        top:30px
    }

}

@media only screen and (min-width: 576px) and (max-width: 768px) {
    .isDesktop{
            display:none
        }

        .body_video{
        margin-top:300vh;
        height:50vh;
    }

    .contactFormBox{
    width:85%;
    padding-left:5%;
    padding-right:10%;
    margin-left:0;
    margin-top:410px;
    background-color: #111111;
    padding-bottom:25%
}

.formTitle{
    font-size:100%
}

.content_title{
        margin-top:80px;
        margin-left:5%;
        font-size:250%;
    }

    .quote_box{
        position: relative;
        z-index:10;
        cursor: pointer; 
        margin-top: 200px;
    }
    
.quote_button{
    font-size: 15px;
    width: 80%;
    margin-left:10%;
}

.contact_elm{
    font-size:90%
}



       .top_line{
        height:100px;
        border-bottom:rgba(255, 255, 255, 0.15) solid 1px;
        z-index:100;
        top:30px
    }

}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .mobileBox{
        display:none
    }
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
    .mobileBox{
        display:none
    }
}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
    .mobileBox{
        display:none
    }
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {
    .mobileBox{
        display:none
    }
}


@media only screen and (min-width: 1600px) and (max-width: 2000px) {
    .mobileBox{
        display:none
    }
}

@media only screen and (min-width: 2000px) and (max-width: 2500px) {
    .mobileBox{
        display:none
    }
}

@media only screen and (min-width: 2500px) and (max-width: 5600px) {
    .mobileBox{
        display:none
    }
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