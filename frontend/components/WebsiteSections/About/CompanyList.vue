<template>

<div class="companyListContainer">

<h1 class="companyListTitle">We've helped companies big and small to bring their saftey to the next level</h1>

<div class="companyListGrid">

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_1.png" alt="Company 1" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_2.png" alt="Company 2" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_3.png" alt="Company 3" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_4.png" alt="Company 4" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_1.png" alt="Company 5" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_1.png" alt="Company 1" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_2.png" alt="Company 2" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_3.png" alt="Company 3" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_4.png" alt="Company 4" class="companyListGridItemImage">
</div>

<div class="companyListGridItem">
    <img src="~assets/content/images/logos/logo_1.png" alt="Company 5" class="companyListGridItemImage">
</div>



</div>

</div>



</template>

<script setup>

</script>

<style scoped>

.companyListContainer{
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 20vh;
    margin-left: 10%;
    margin-bottom: 10%;
}

.companyListTitle{
    font-size: 120%;
    font-weight: 600;
    color: #fdf2f5;
    margin-bottom: 10%;
    width: 70%;
    text-align: center;
    line-height: 1.5;
}

.companyListGrid{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
}

.companyListGridItem{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.companyListGridItemImage{
    width: 70%;
    height: 70%;
    object-fit: contain;
    filter: brightness(0) invert(1);
}

</style>