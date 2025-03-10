<template>
<div class="heart_button" ref="heartButton" @mousemove="handleMouseMove" @mouseleave="resetTilt">
    <div class="heart_button_inner">
        <EfxHeart />
    </div>
    <div class="heart_button_text">
        <h1 class="heart_button_text_title" ref="textTitle">Learn More</h1>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { gsap } from 'gsap';

const heartButton = ref(null);
const textTitle = ref(null);

const tiltSettings = {
    maxTilt: 15, // maximum tilt in degrees
};

const handleMouseMove = (e) => {
    if (!heartButton.value || !textTitle.value) return;
    
    const rect = heartButton.value.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the button
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate tilt based on mouse position
    const tiltX = ((e.clientY - centerY) / (rect.height / 2)) * tiltSettings.maxTilt;
    const tiltY = -((e.clientX - centerX) / (rect.width / 2)) * tiltSettings.maxTilt;
    
    // Apply tilt with GSAP
    gsap.to(textTitle.value, {
        duration: 0.3,
        rotationX: tiltX,
        rotationY: tiltY,
        transformPerspective: 500,
        ease: "power2.out"
    });
};

const resetTilt = () => {
    // Reset tilt when mouse leaves the button
    gsap.to(textTitle.value, {
        duration: 0.5,
        rotationX: 0,
        rotationY: 0,
        ease: "power3.out"
    });
};
</script>

<style scoped>
.heart_button{
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width:150px;
    height:150px;
    background-color:#9e284777;
    border-radius:100%;
    margin-top:10%;
    cursor: pointer;
    perspective: 1000px;
    transition:0.3s ease-in-out;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
}

.heart_button:hover{
    background-color:#9e2847;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    transition:0.3s ease-in-out;
}

.heart_button:hover .heart_button_text_title{
    color:#fff;
    transition:0.3s ease-in-out;
}

.heart_button_inner{
margin-top:-20%;
}

.heart_button_text_title{
    font-size:100%;
    text-align:center;
    margin-top:-18%;
    transform-style: preserve-3d;
    transition:0.3s ease-in-out;
}
</style>