<template>
    <div class="section_three_container">
        <div class="info_grid">
            <div class="info_grid_item_left" ref="item1">
                <div class="content">
                    <h2 class="title">Service One</h2>
                    <h3 class="subtitle">Professional Solutions</h3>
                    <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                </div>
            </div>
            <div class="info_grid_item_right" ref="item2">
                <div class="content">
                    <h2 class="title">Service Two</h2>
                    <h3 class="subtitle">Expert Consultation</h3>
                    <p class="description">Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor.</p>
                </div>
            </div>
            <div class="info_grid_item_left" ref="item3">
                <div class="content">
                    <h2 class="title">Service Three</h2>
                    <h3 class="subtitle">Custom Development</h3>
                    <p class="description">Fusce aliquet pede non pede. Suspendisse dapibus lorem pellentesque magna. Integer nulla. Donec blandit feugiat ligula. Donec hendrerit, felis et imperdiet euismod, purus ipsum pretium metus.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Create refs for the elements
const item1 = ref(null);
const item2 = ref(null);
const item3 = ref(null);

// Function to animate an item
const animateItem = (element, startX, startY) => {
    gsap.to(element, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play reverse restart reverse",
            markers: false
        }
    });
};

onMounted(() => {
   setTimeout(() => {
    
    // Initial state - items are invisible and offset
    gsap.set([item1.value, item3.value], { 
        x: -150, 
        y: 100,
        opacity: 0.25 
    });
    
    gsap.set(item2.value, { 
        x: 150, 
        y: 100,
        opacity: 0.25 
    });
    
    // Animate items when they enter viewport
    animateItem(item1.value, -150, 100);
    animateItem(item2.value, 150, 100);
    animateItem(item3.value, -150, 100);
}, 1000);
});

</script>

<style scoped>
.section_three_container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fdf2f5;
    padding-top: 10vh;
    z-index: 0
}

.info_grid {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 2rem;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
}

.info_grid_item_left, .info_grid_item_right {
    width: 80%;
    height: 100%;
    background-color: #8a0d2e;
    min-height: 300px;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
}

.info_grid_item_right {
    margin-left: auto;
}

.content {
    color: white;
    max-width: 90%;
}

.title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.subtitle {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 500;
    opacity: 0.9;
}

.description {
    font-size: 1rem;
    line-height: 1.6;
}
</style>