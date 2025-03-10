<template>
   <div >

    <div class="mobile_footer_container">


        <div class="mobile_content_container">
          <!-- <MoveText/> -->

      <div class="footer_title_container">
    
        <img class="mobile_logo" src="~/assets/content/images/logos/logo_6.png">
        <p class="place_holder">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
        </div>

<div class="grid_1_mobile">
                            <div class="">
                            <div class="info_title">Email</div>
                            <div class="info_content">shaun@gravitylabs.lol</div>
                            </div>
                            <div class="info_item">
                            <div class="info_title">Phone</div>
                            <div class="info_content">(404) 513-3348</div>
                            </div>
                            <div class="info_item">
                            <div class="info_title">Social</div>
                            <div class="social_links">
                              <a href="#" class="social_link">Facebook</a>
                              <a href="#" class="social_link">Instagram</a>
                              <a href="#" class="social_link">Twitter</a>
                            </div>
                            </div>

                    </div>


</div>

    </div>




    <div class="desktop_footer_container"  style="background-color: var(--background_color_two)">
     <div class="desktop_footer">
      
         
            
      <img class="logo" src="~/assets/content/images/logos/logo_6.png">

      <div class="footer_content_container">

        <div class="footer_content_item">
          <div class="contact_info">
            <h3 class="contact_title">Contact Us</h3>
            <div class="contact_item">
              <div class="info_title">Email</div>
              <div class="info_content">shaun@gravitylabs.lol</div>
            </div>
            <div class="contact_item">
              <div class="info_title">Phone</div>
              <div class="info_content">(404) 513-3348</div>
            </div>
            <div class="contact_item">
              <div class="info_title">Social</div>
              <div class="social_links">
                <a href="#" class="social_link">Facebook</a>
                <a href="#" class="social_link">Instagram</a>
                <a href="#" class="social_link">Twitter</a>
              </div>
            </div>
          </div>
        </div>

      </div>







 
             <!-- <div class="marbleOverlay" style="opacity:.6; transform: rotate(180deg);"></div> -->
     </div>
   </div>
   <div class="made_by">
    Made By GravityLabs
   </div>
   </div>
 </template>
 
 <script setup>
 import { onMounted } from 'vue';
 import gsap from 'gsap';
 import { ScrollTrigger } from 'gsap/ScrollTrigger';


onMounted(() => {
  setTimeout(() => {
  gsap.fromTo(".made_by", 
    { y: 100 }, // Starting state: y is 30px
    {
      y: 0, // Ending state: Move up by 30px
      duration: .8, // Animation duration in seconds
      delay: 4, // Delay before the animation starts in seconds
      scrollTrigger: {
        trigger: "footer",
        start: "center bottom", // Start the animation when the center of the footer is at the bottom of the viewport
        toggleActions: "restart none none reset" // Restart on enter, do nothing on leave, and reset when the trigger isn't in the viewport
      }
    }
  );



     // Footer ScrollTrigger
     ScrollTrigger.create({
      trigger: ".desktop_footer_container",
      start: "bottom bottom",
      pin: ".desktop_footer_container",
      pinSpacing: true,
    });



}, 100);
});

 </script>
 
 <style scoped>
.made_by {
  position: fixed;
  color: #fff;
  background-color: #000;
  font-size: 8px;
  padding: 8px;
  z-index: 0;
  width: 100vw;
  bottom: 0;
  font-weight: 400;
}

.desktop_footer_container {
  z-index: -5;
  bottom: 0;
  margin-top: calc(-1 * (100vh - 501px));
}

.desktop_footer {
  background-color: #49161b;
  height: 500px;
  width: 100%;
  border-top: 2px solid #cd9a0d45;
  position: fixed;
  bottom: 0px;
  margin-top: -100vh;
  z-index: -5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10%;
}

.footer_title_container {
  width: 55%;
  border-right: var(--text_color_three) solid 1px;
  padding: 10px 0;
}

.place_holder {
  color: var(--text_color_three);
  width: 80%;
  line-height: 1.25;
}

.info_title {
  color: var(--text_color_three);
  font-size: 80%;
}

.info_content {
  color: var(--text_color_three);
  margin-top: 10px;
  font-size: 120%;
}

.logo {
  width: 25%;
  margin-bottom: 20px;
  margin-left: 10%;
}

.footer_content_container {
  display: flex;
  justify-content: flex-start;
  width: 40%;
  margin-right: 5%;
}

.footer_content_item {
  margin-right: 40px;
}

.contact_info {
  color: var(--text_color_three);
}

.contact_title {
  font-size: 200%;
  margin-bottom: 40px;
  font-weight: 400;
  letter-spacing: 1px;
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}

.contact_item {
  margin-bottom: 35px;
}

.social_links {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.social_link {
  color: var(--text_color_three);
  text-decoration: none;
  transition: color 0.3s ease;
}

.social_link:hover {
  color: #cd9a0d;
}

/* Mobile Styles */
@media only screen and (min-width: 0px) and (max-width: 576px) {
  .desktop_footer_container {
    display: none;
  }
  
  .mobile_footer_container {
    background-color: #49161b;
    width: 100%;
    height: 100%;
    padding-bottom: 20vh;
  }

  .mobile_content_container {
    width: 80%;
    margin-left: 10%;
  }

  .footer_title_container {
    width: 80%;
    border-right: none;
    border-bottom: var(--text_color_three) solid 1px;
    padding-bottom: 40px;
    margin-left: 10%;
    padding-top: 20%;
  }

  .mobile_title {
    font-size: 6vw;
    color: var(--text_color_three);
  }
  
  .place_holder {
    width: 100%;
    margin-top: 10%;
  }

  .grid_1_mobile {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 40px;
    margin-left: 10%;
    margin-top: 20%;
  }
}

/* Tablet Styles */
@media only screen and (min-width: 576px) and (max-width: 769px) {
  .desktop_footer_container {
    display: none;
  }
  
  .mobile_footer_container {
    background-color: #49161b;
    width: 100%;
    height: 100%;
    padding-bottom: 20vh;
  }

  .mobile_content_container {
    width: 80%;
    margin-left: 10%;
  }

  .footer_title_container {
    width: 80%;
    border-right: none;
    border-bottom: var(--text_color_three) solid 1px;
    padding-bottom: 40px;
    margin-left: 10%;
    padding-top: 20%;
  }

  .mobile_title {
    font-size: 6vw;
    color: var(--text_color_three);
  }
  
  .place_holder {
    width: 100%;
    margin-top: 10%;
  }

  .grid_1_mobile {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 40px;
    margin-left: 10%;
    margin-top: 20%;
  }
}

/* Desktop Styles */
@media only screen and (min-width: 769px) {
  .mobile_footer_container {
    display: none;
  }
}
</style>