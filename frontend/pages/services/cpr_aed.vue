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
        import image_1 from '~/assets/content/images/homepage/home_1_4.png';
import image_2 from '~/assets/content/images/homepage/home_1_2.png';
import image_3 from '~/assets/content/images/homepage/home_1_3.png';
import image_4 from '~/assets/content/images/homepage/home_1_1.png';
    
    const layout = "public";
    
    
   const next_info = {
    title: 'Blood Borne Pathogens Training',
    description: 'Learn about blood borne pathogens and how to protect yourself and others.',
    path: '/services/blood_borne_pathogens'
   }

   const section_2_info = {
    title: 'CPR & AED Training',
    description_1: 'Our comprehensive CPR and AED training programs are designed to equip you with the confidence and skills needed to respond effectively in emergency situations. Learn from certified instructors with real-world experience in a hands-on, interactive environment.',
    description_2: 'We offer a range of CPR and AED training courses to suit your needs, from basic first aid to advanced life support. Our courses are designed to be interactive and hands-on, so you can put your skills into practice in a safe and supportive environment.',
    description_3: 'You can choose from a range of courses, including CPR, AED, and first aid training. Our courses are designed to be interactive and hands-on, so you can put your skills into practice in a safe and supportive environment.'
   }



const images_1 = [image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4, image_1, image_2, image_3, image_4]

const direction_1 = ref(1)

// Define combined service info for the service landing component
const serviceInfo = {
  landing: {
    title: "CPR & AED TRAINING",
    subtitle: "Life-saving skills for individuals and organizations",
    description: "Our comprehensive CPR and AED training programs are designed to equip you with the confidence and skills needed to respond effectively in emergency situations. Learn from certified instructors with real-world experience in a hands-on, interactive environment.",
    primaryButtonText: "Schedule Training",
    button_link: "/contact",
    image1: image_1,
    image2: image_2,
    image3: image_3
  },
  tabs: [
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
        padding-top: 10vh;
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