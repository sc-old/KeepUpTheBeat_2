<template>
    <div>
    
    <WebsiteSectionsHeaderBar/>
        <NuxtLayout :name="layout">
    
            <div class="background">
                <WebsiteSectionsAboutLanding/>
                <WebsiteSectionsAboutSectionTwo/>
                <WebsiteSectionsAboutSectionThree/>
                <WebsiteSectionsAboutSectionFour/>
          </div>
      
        <WebsiteSectionsFooter/>
    
    
    
    
    
    </NuxtLayout>
    </div>
    
    </template>
    
    <script setup>
    
    const layout = "public";
    
    </script>
    
    <style scoped>
    
    .background{
        background-color: #fdf2f5;
        position: relative;
    }
    
    
    
    </style>