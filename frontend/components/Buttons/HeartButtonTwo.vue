<template>
    <div>

<NuxtLink :to="page_link">
    <button ref="target" class="slide_button" :class="{ slide_anim: disabled }" >
        <div class="heart_container">
            <EfxHeart />
        </div>
        <p :class="{ text_anim: disabled }" class="slide_button_text">{{ button_text }}</p>
    </button>
</NuxtLink>
</div>

</template>



<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps(['button_text', 'page_link'])


const target = ref(null)
const targetIsVisible = ref(false)
const disabled = ref(false)

    const { stop } = useIntersectionObserver( target,
      ([{ isIntersecting }], observerElement) => {
        targetIsVisible.value = isIntersecting
        if (targetIsVisible.value == true){
          disabled.value = true
        } else{
          disabled.value = false
        }
      },
    )




</script>




<style scoped>





.slide_button{
            background-color: #000 !important;
            border-radius:50px/50px;
            width:0px;
            height:50px;
            padding:0px;
            margin-top:6%;
            opacity:0;
            cursor:pointer;
        }

        .heart_container{
            transition: all 400ms ease !important;
            margin-top:-18px;
            padding-left:0px;
            border-radius:50px/50px;
        }
        
        .slide_button_text{
            color:rgb(255, 255, 255);
            margin-left:60px;
            margin-top: -34px;
            font-size:13px;
            transition: all 400ms ease !important;
            opacity:0
        
        }
        
        .slide_button:hover .heart_container{
            margin-left:126px;
            transition: all 400ms ease !important;
        }
        
        .slide_button:hover .slide_button_text{
            margin-left:-72px;
            transition: all 400ms ease !important;
        }

        .slide_anim {
          transition: all 600ms ease 200ms;
          width:185px;
          padding:3px;
          opacity:1;
}

      
        .text_anim{
            opacity:1
        }

</style>