<template>
  <div class="main_container">
    <div class="card_container">
  <WebsiteSectionsHomepageThreedHoverCard :cardInfo="cardInfo_1" />
  <WebsiteSectionsHomepageThreedHoverCard :cardInfo="cardInfo_2" />
  </div>
  <h1 class="title">Hearts Are Our Passion, We Make Them Beat</h1>
  <WebsiteSectionsHomepageBeatingHeart />

  <div class="text_grid">
    <p class="text" data-speed="1.1">Great training makes all the difference in an emergency. KUB guarantees engaging, interactive courses that employees love and remember. If you're not satisfied, we'll go the extra mile until you are.</p>
    <p class="text middle_text" data-speed="0.9">Since 2000, Keep Up The Beat (KUB) has delivered engaging, high-quality CPR, AED, and safety training. Our flexible, on-site programs keep employees prepared and confident in emergencies. Partnered with LifeServers AED, we're committed to saving lives through education and public access to defibrillators.</p>
    <p class="text" data-speed="1.1">From CPR and First Aid to Active Shooter and Stop the Bleed, KUB offers top-tier safety training. Led by experts, our courses follow national safety standards and use the latest technology for hands-on learning.</p>
  </div>

  </div>
</template>

<script setup>
import image_1 from '~/assets/content/images/homepage/home_1_4.png';
import image_2 from '~/assets/content/images/homepage/home_1_2.png';
import image_3 from '~/assets/content/images/homepage/home_1_3.png';

const cardInfo_1 = ref({
  title: 'HeartBeat',
      description: 'Hover over this card to unleash the power of CSS perspective',
      imageUrl: image_1,
      imageAlt: 'thumbnail',
      tryButtonText: 'Try now →',
      signupButtonText: 'Sign up',
      titleZ: 60,
      imageZ: 120,
      imageRotateX: 15,
      imageRotateZ: -15,
      tryButtonZ: 30,
      tryButtonTranslateX: -60,
      signupButtonZ: 30,
      signupButtonTranslateX: 60
})

const cardInfo_2 = ref({
  title: 'HeartBeat_2',
      description: 'Hover over this card to unleash the power of CSS perspective',
      imageUrl: image_2,
      imageAlt: 'thumbnail',
      tryButtonText: 'Try now →',
      signupButtonText: 'Sign up',
      titleZ: 60,
      imageZ: 120,
      imageRotateX: 15,
      imageRotateZ: 10,
      tryButtonZ: 30,
      tryButtonTranslateX: -60,
      signupButtonZ: 30,
      signupButtonTranslateX: 60
})


</script>

<style scoped>
.main_container {
  padding: 10% 5%;
  background-color: #49161b;
  padding-bottom: 20%;
}

.card_container {
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.sectionGrid{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.title{
  color: #fff;
  font-size: 400%;
  text-align: center;
  margin-top: 20%;
  position: relative;
  z-index: 2;
}

.text_grid{
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 8vw;
  margin-top: -25%;
}

.text{
  color: #fff;
  font-size: 115%;
  position: relative;
  z-index: 0;
  line-height: 1.25;
  text-align: justify;
}

.middle_text{
  margin-top: 60%;
  text-align: center;
}


</style>