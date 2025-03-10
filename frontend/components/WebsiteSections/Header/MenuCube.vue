<template>
    

    <div style="cursor: pointer;" class="cube_container_modal" @mouseenter="startTurning_modal" @mouseleave="stopTurning_modal">
    <div class="cube_modal" :style="{ transform: `rotateY(${cube_modal}deg)` }">
      <div class="face_modal front_modal"><img class="header_logo_modal" src="~/assets/content/images/icons/burger.webp" alt=""></div>
      <div class="face_modal back_modal">X</div>
      <div class="face_modal top_modal"></div>
      <div class="face_modal bottom_modal">X</div>
      <div class="face_modal left_modal">X</div>
      <div class="face_modal right_modal"><img class="header_logo_modal" src="~/assets/content/images/icons/burger.webp" alt=""></div>
    </div>
  </div>





</template>


<script setup>
// import { from_header_menu } from "../../stores/menu_transition.js"
// import { page_to } from "../../stores/page_to.js"

const props = defineProps(['rotation_val'])

const header_opacity = ref(0)

const cube_modal = ref(props.rotation_val);
const cube_not_reset_modal = ref(true);

// const menu_store = from_header_menu()

// console.log('IS MENU OPEN?' )
// console.log(menu_store.menu_clicked_open )
// if (menu_store.menu_clicked_open == true){
//     cube_modal.value = (-180);
// }
// else{
//     cube_modal.value = (-90);
// }


function startTurning_modal() {

if (props.nav_modal_open == true){
    cube_modal.value = (-180);
}else{
    cube_modal.value = (-90);
}
}

function stopTurning_modal() {

if (props.nav_modal_open == true){
    cube_modal.value = (-270);
}else{
    cube_modal.value = 0;
}
cube_not_reset_modal.value = false;

}


// const route_to = page_to()

// const nuxtApp = useNuxtApp()
// nuxtApp.hook('page:finish', () => {
//   header_opacity.value = 1;
//   startTurning()
//   if (String(route_to.current_page_to).includes('fund_pages')){
//   sleep(1600).then(() => { stopTurning()})
//   } else if (String(route_to.current_page_to) == '/'){
//     sleep(2700).then(() => { stopTurning()})
//   }
//   else{
//     sleep(1000).then(() => { stopTurning()})
//   }

// })

// onBeforeRouteLeave(() => {

// if (String(route_to.current_page_to).includes('fund_pages')){
//   header_opacity.value = 0;
// } else {
//   header_opacity.value = 1;
// }
// })



</script>






<style scoped>





.cube_container_modal {
    width: 100px;
    height: 70px;
    perspective: 1000px;
    z-index: 1000;
    /* mix-blend-mode: difference; */
    /* opacity:v-bind(header_opacity); */
  }

  .cube_modal {
    width: 50px;
    height: 50px;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(0deg);
    transition: transform 0.5s;
    margin-top:15px;
    margin-left:27px;
    margin-top:10px;
    /* opacity:v-bind(header_opacity); */
  }


  .face_modal {
    position: absolute;
    width: 50px;
    height: 50px;
    text-align: center;
    font-size: 30px;
    color: #000;
    background-color: #fff;
    border: #000 1px solid;
    line-height: 50px;
  }

  .front_modal {
    transform: translateZ(25px);;
  }
  

  .back_modal {
    transform: rotateY(180deg) translateZ(25px);
  }

  .top_modal {
    transform: rotateX(90deg) translateZ(25px);
  }

  .bottom_modal {
    transform: rotateX(-90deg) translateZ(25px);
  }

  .left_modal {
    transform: rotateY(-90deg) translateZ(25px);
  }

  .right_modal {
    transform: rotateY(90deg) translateZ(25px);
  }

  .header_logo_modal{
    width:45px;
    height:35px;
    mix-blend-mode: difference;
    filter: invert(1);
    margin-top:6px;
    margin-left:2px
}








@media only screen and (min-width: 0px) and (max-width: 576px) {



  .face_modal {
    position: absolute;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 15px;
    line-height: 40px; 
    margin-top:-3px;
    margin-left:30px
}

.front_modal {
    transform: translateZ(20px); /* Half of 40px to align in the middle */
}

.back_modal {
    transform: rotateY(180deg) translateZ(20px); /* Half of 40px */
}

.top_modal {
    transform: rotateX(90deg) translateZ(20px); /* Half of 40px */
}

.bottom_modal {
    transform: rotateX(-90deg) translateZ(20px); /* Half of 40px */
}

.left_modal {
    transform: rotateY(-90deg) translateZ(20px); /* Half of 40px */
}

.right_modal {
    transform: rotateY(90deg) translateZ(20px); /* Half of 40px */
}

.header_logo_modal {
    width: 20px; /* Adjusted width to 20px to fit within 40px container */
    mix-blend-mode: difference;
    filter: invert(1);
    margin-top: 2px; /* Centered within 40px height */
    margin-left:7.5px
}

}





@media only screen and (min-width: 576px) and (max-width: 768px) {


  .face_modal {
    position: absolute;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 15px;
    line-height: 40px; 
    margin-top:-3px;
    margin-left:30px
}

.front_modal {
    transform: translateZ(20px); /* Half of 40px to align in the middle */
}

.back_modal {
    transform: rotateY(180deg) translateZ(20px); /* Half of 40px */
}

.top_modal {
    transform: rotateX(90deg) translateZ(20px); /* Half of 40px */
}

.bottom_modal {
    transform: rotateX(-90deg) translateZ(20px); /* Half of 40px */
}

.left_modal {
    transform: rotateY(-90deg) translateZ(20px); /* Half of 40px */
}

.right_modal {
    transform: rotateY(90deg) translateZ(20px); /* Half of 40px */
}

.header_logo_modal {
    width: 20px; /* Adjusted width to 20px to fit within 40px container */
    mix-blend-mode: difference;
    filter: invert(1);
    margin-top: 2px; /* Centered within 40px height */
    margin-left:7.5px
}


}






@media only screen and (min-width: 768px) and (max-width: 992px) {


.face_modal {
position: absolute;
width: 35px;
height: 35px;
text-align: center;
font-size: 15px;
line-height: 35px;
}

.front_modal {
transform: translateZ(17.5px);;
}


.back_modal {
transform: rotateY(180deg) translateZ(17.5px);
}

.top_modal {
transform: rotateX(90deg) translateZ(17.5px);
}

.bottom_modal {
transform: rotateX(-90deg) translateZ(17.5px);
}

.left_modal {
transform: rotateY(-90deg) translateZ(17.5px);
}

.right_modal {
transform: rotateY(90deg) translateZ(17.5px);
}


.header_logo_modal{
width:25px;
mix-blend-mode: difference;
filter: invert(1);
margin-top: 5px;
}




}





</style>