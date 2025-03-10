<template>
    <div>
    
    <WebsiteSectionsHeaderBar/>
        <NuxtLayout :name="layout">
    
            <div class="background">
           <WebsiteSectionsServicesLanding 
             :service-info="serviceInfo"
           />
      

          <WebsiteSectionsServicesSectionTwo/>

          <div class="section_slider_container">
          <WebsiteSectionsAboutImageSlider :images="images_1" :title="''" :direction="direction_1"/>
          </div>

          <WebsiteSectionsServicesSectionThree/>

          <WebsiteSectionsServicesNextService :next_info="next_info"/>

        </div>
      
        <WebsiteSectionsFooter/>
    
    
    
    
    
    </NuxtLayout>
    </div>
    
    </template>
    
    <script setup>
        // Import images
        import image_1 from '~/assets/content/images/homepage/home_1_5.png';
import image_2 from '~/assets/content/images/homepage/home_1_6.png';
import image_3 from '~/assets/content/images/homepage/home_1_7.png';
import image_4 from '~/assets/content/images/homepage/home_1_3.png';
    const layout = "public";
    
    
   const next_info = {
    title: 'CPR & AED Training',
    description: 'Comprehensive training for emergency response and life-saving techniques.',
    path: '/services/cpr_aed'
   }

   const section_2_info = {
    title: 'Blood Borne Pathogens Training',
    description_1: 'Learn about blood borne pathogens and how to protect yourself and others.',
    description_2: 'Our comprehensive blood borne pathogens training programs are designed to equip you with the confidence and skills needed to respond effectively in emergency situations. Learn from certified instructors with real-world experience in a hands-on, interactive environment.',
    description_3: 'The American Heart Association (AHA) is a leading organization in the field of CPR and AED training. We are proud to be an AHA Training Center, which means we are authorized to provide high-quality training courses that meet the standards set by the AHA.'
   }



const images_1 = [image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4]

const direction_1 = ref(1)

// Define combined service info for the service landing component
const serviceInfo = {
  landing: {
    title: "Blood Borne Pathogens Training",
    subtitle: "Learn about blood borne pathogens and how to protect yourself and others.",
    description: "Our comprehensive blood borne pathogens training programs are designed to equip you with the confidence and skills needed to respond effectively in emergency situations. Learn from certified instructors with real-world experience in a hands-on, interactive environment.",
    primaryButtonText: "Schedule Training",
    button_link: "/contact",
    image1: image_1,
    image2: image_2,
    image3: image_3
  },
  tabs:[
  {
    title: 'Pathogens',
    heading: 'Understanding Bloodborne Pathogens',
    description: 'Learn about common bloodborne pathogens, their transmission routes, and associated risks.',
    image: image_1,
    // Replace with your image
  },
  {
    title: 'Exposure',
    heading: 'Implementing Exposure Control',
    description: 'Understand and apply your organization\'s Exposure Control Plan to minimize risks and ensure safety.',
    image: image_2,
    // Replace with your image
  },
  {
    title: 'PPE',
    heading: 'Using PPE Effectively',
    description: 'Master the proper use of PPE, including gloves, masks, and eye protection, to prevent exposure.',
    image: image_3,
    // Replace with your image
  },
]
}

// Define tabs for the service landing component
const serviceTabs = [
  {
    title: 'CPR',
    heading: 'Cardiopulmonary Resuscitation',
    description: 'Learn proper CPR techniques to help save lives during cardiac emergencies.',
    image: image_1
  },
  {
    title: 'AED',
    heading: 'Automated External Defibrillator',
    description: 'Master the use of AED devices to restore normal heart rhythm during sudden cardiac arrest.',
    image: image_2
  },
  {
    title: 'First Aid',
    heading: 'Emergency First Aid',
    description: 'Develop essential first aid skills to respond confidently to various emergency situations.',
    image: image_3
  }
];
    
    </script>
    
    <style scoped>
    
    .background{
        background-color: #fdf2f5;
        position: relative;
        padding-bottom:15vh
    }

    .section_slider_container{
        width: 100%;
        height: 70vh;
        position: relative;
        background-color: #fdf2f5;
    }



    @media (max-width: 750px) {
        .section_slider_container{
            height: 50vh;
            padding-top: 0;
            margin-top: -10%;
        }
    }

    @media (max-width: 480px) {
        .section_slider_container{
            height: 50vh;
            padding-top: 0;
            margin-top: 10%;
            margin-bottom: -35%
        }
    }
    
    
    
    </style>