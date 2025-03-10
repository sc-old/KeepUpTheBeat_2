<template>

<div class="sectionTwoContainer">

    <div class="bigImageContainer">
        <img src="~/assets/content/images/homepage/home_1_1.png" alt="KUP Training" class="bigImage">
    </div>

    <div class="gridCardsContainer">
        <WebsiteSectionsAboutGridCards/>
    </div>


</div>


</template>



<style scoped>

.sectionTwoContainer{
    width: 100%;
    height: 100%;
    background-color: #fdf2f5;
    min-height: 100vh;
}

.bigImageContainer{
    width: 95%;
    height: 80vh;
    margin-left: 2.5%;
    border-radius: 20px;
    overflow: hidden;
}

.bigImage{
    width: 100%;
    height: 100%;
    object-fit: cover;
}



</style>