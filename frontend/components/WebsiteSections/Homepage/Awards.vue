<template>
    

    <div class="container">

    <div class="info_container">
    <h1 class="title animate_title">
        Our<span data-highlight='{"duration": 1, "delay": 0, "start": "top 85%"}'>Awards & Clients</span>
        <br>Speak For Our Quality</h1>

    <NuxtLink to="/about" class="technical">Learn More →</NuxtLink>
    </div>

    <div class="image_flex">

        <img src="https://static.vecteezy.com/system/resources/previews/026/135/317/non_2x/meta-social-media-logo-symbol-with-name-black-design-illustration-free-vector.jpg" alt="" class="image meta_image">
            <img src="https://www.lrsm.upenn.edu/wp-content/uploads/1960/05/dod-logo.png" alt="" class="image dod_image">
            <img src="https://www.condorcapital.com/wp-content/uploads/2021/05/OurCustodians_Charles-Schwab_.svg" alt="" class="image">
            <img src="https://cdn.worldvectorlogo.com/logos/quilted-northern.svg" alt="" class="image">

    </div>


    </div>
</template>


<script setup>

    const { splitText, highlightElements, underlineElements, circleElements, doubleUnderlineElements } = useAnimations()



</script>
    




<style scoped>

.container{
    padding-top:25%;
    padding-bottom:35%;
}

.info_container{
    width: 40%;
    margin-left:50%;
    margin-right:10%;
    position: relative;
    height:14vh;
}

.title{
    font-size: 2.7vw;
    color: var(--text_color);
    position: absolute;
    z-index:1;
    font-weight: 100;
    letter-spacing: 6px;
    line-height: 1.2;
    text-align: left;
    right:0;
    top:0;
    white-space: nowrap;
}

.technical{
    font-size: 80%;
    color: var(--text_color);
    position: absolute;
    z-index:1;
    text-align: right;
    margin-top:2%;
    right:0;
    bottom:0;
    text-decoration: underline;
    cursor: pointer;
    text-decoration-color: rgba(100, 100, 100, 0.5);
    text-decoration-thickness: 2px;
    text-underline-offset: 5px;
}


.image_flex{
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    margin-top:5%;
    margin-left:10%;
    margin-right:10%;

}
.image{
    width:15%;
    height: 100%;
    filter:invert(1)
}

.dod_image{
    width:12%;
    margin-top:1.5%
}

.meta_image{
    width:20%;
    margin-top:-1%
}



@media only screen and (min-width: 0px) and (max-width: 376px) {

    .image{
    width:55px;
}
.container{
    margin-top:30%;
    margin-bottom:50%
}

.info_container{
    width: 80%;
    margin-left:10%;
    margin-right:10%;
    margin-bottom:7%
}

.container{
    padding-top:15%;
    padding-bottom:10%;
}

.technical{
    font-size: 55%;
    bottom:10%;
}

.title{
    font-size: 3.75vw;
    line-height: 1.75;
}


}



  



@media only screen and (min-width: 376px) and (max-width: 576px) {
    .image{
    width:55px;
}
.container{
    margin-top:-15%;
    margin-bottom:50%
}

.info_container{
    width: 80%;
    margin-left:10%;
    margin-right:10%;
    margin-bottom:7%
}

.container{
    padding-top:15%;
    padding-bottom:10%;
}

.technical{
    font-size: 55%;
    bottom:10%;
}

.title{
    font-size: 3.75vw;
    line-height: 1.75;
}


}

@media only screen and (min-width: 576px) and (max-width: 768px) {

    .image{
    width:55px;
}
.container{
    margin-top:-15%;
    margin-bottom:50%
}

.info_container{
    width: 80%;
    margin-left:10%;
    margin-right:10%;
    margin-bottom:7%
}

.container{
    padding-top:15%;
    padding-bottom:10%;
}

.technical{
    font-size: 55%;
    bottom:10%;
}

.title{
    font-size: 3.75vw;
    line-height: 1.75;
}

}

@media only screen and (min-width: 768px) and (max-width: 992px) {
    .container{
    margin-top:20%;
    margin-bottom:35%
}

.info_container{
    width: 70%;
    margin-left:35%;
    margin-right:50%;
    margin-bottom:15%
}
.image{
    width:155px;
}
}

@media only screen and (min-width: 992px) and (max-width: 1200px) {
    .image{
    width:125px;
    margin-top:60px
}

.container{
    margin-top:15%;
    margin-bottom:25%
}

}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
}

@media only screen and (min-width: 1400px) and (max-width: 1600px) {
}

@media only screen and (min-width: 1600px) and (max-width: 5600px) {
}

</style>