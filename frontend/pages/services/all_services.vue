<template>
    <div>
    
    <WebsiteSectionsHeaderBar/>
        <NuxtLayout :name="layout">
    
            <div class="background">

                <h2 class="services_title">Our Training Services</h2>

                <div class="landing_image">
                    <img class="landing_image_img" src="~/assets/content/images/homepage/home_1_1.png" alt="Landing Image">
                </div>
 
     

          <WebsiteSectionsServicesListCards/>

          <WebsiteSectionsServicesServiceContact/>

          </div>
      
        <WebsiteSectionsFooter/>
    
    
    
    
    
    </NuxtLayout>
    </div>
    
    </template>
    
    <script setup>


const layout = "public";

onMounted(() => {
    // Allow DOM to fully render
    setTimeout(() => {
      // Animate section title
      gsap.from('.services_title', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.services_title',
          start: 'top 80%',
        }
      });

    }, 500);
  });
    </script>
    
    <style scoped>
    
    .background{
        background-color: #fdf2f5;
        position: relative;
        padding-bottom:20vh;
        padding-top: 20vh;
    }

    .section_three_container{
        width: 100%;
        height: 100vh;
        position: relative;
        background-color: #fdf2f5;
    }

    .landing_image{
        width: 90%;
        height: 60vh;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
    }

    .landing_image_img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    
    .services_title{
        font-size: 3rem;
        font-weight: 600;
        color: #49161b;
        margin-bottom: 5rem;
        text-align: center;
    }
    
    </style>