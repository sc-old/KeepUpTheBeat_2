<template>
  <div
    class="heart"
    @mousedown="setPressed(true)"
    ref="heartRef"
    :style="{
      '--lightness': `${love * 80 + 20}%`,
      '--scale': 0.5 + love * 0.2
    }"
  >
    <div class="inner-wrapper">
      <svg viewBox="0 0 500 430" class="splash">
        <HeartPath v-for="item in items" :key="item.id" />
      </svg>
      
      <HeartSVG
        v-for="(_, i) in Array(LAYERS)"
        :key="i"
        class="heart-layer"
        :rotate="{ x, y }"
        :translateZ="i * LAYER_GAP"
        :scale="Math.sin(i / LAYERS * Math.PI) / 10 + 1"
      />
      
      <HeartSVG
        class="heart-stroke"
        :rotate="{ x, y }"
        :translateZ="(LAYERS + 1) * LAYER_GAP"
        :strokeDashoffset="offset"
        :scale="0.9"
      />
      
      <ShineSVG
        :x="y / 50 + 0.5"
        :opacity="x / 200 + 0.5"
        :rotate="{ x, y }"
        :translateZ="(LAYERS + 1) * LAYER_GAP"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue';
import { nanoid } from 'nanoid';

const PATH_LENGTH = 1506;
const LAYERS = 25;
const LAYER_GAP = 1; // In pixels

const clamp = (min, max, n) => Math.min(max, Math.max(min, n));

// Heart path component
const HeartPath = defineComponent({
  setup() {
    return () => h('path', { 
      d: "M500 143.64C500 286.45 321.49 322.15 250.08 429.26C178.68 322.15 0.17 286.45 0.17 143.64C0.17 72.24 53.72 0.83 142.98 0.83C214.38 0.83 250.08 72.24 250.08 72.24C250.08 72.24 285.79 0.83 357.19 0.83C446.45 0.83 500 72.24 500 143.64Z" 
    });
  }
});

// Shine SVG component
const ShineSVG = defineComponent({
  props: {
    x: Number,
    opacity: Number,
    rotate: Object,
    translateZ: Number
  },
  setup(props) {
    return () => h('svg', {
      viewBox: "0 0 500 430",
      style: {
        transform: `rotateX(${props.rotate.x}deg) rotateY(${props.rotate.y}deg) translateZ(${props.translateZ}px) scale(0.9)`,
        overflow: "hidden"
      },
      class: "heart-shine"
    }, [
      h('defs', null, [
        h('clipPath', { id: "heart-clip" }, [
          h(HeartPath)
        ])
      ]),
      h('rect', {
        x: 500 - props.x * 700,
        y: "0",
        width: "200",
        height: "430",
        fill: `rgba(255,255,255,${props.opacity})`,
        clipPath: "url(#heart-clip)"
      })
    ]);
  }
});

// Heart SVG component
const HeartSVG = defineComponent({
  props: {
    rotate: Object,
    translateZ: Number,
    strokeDashoffset: Number,
    scale: {
      type: Number,
      default: 1
    },
    className: String
  },
  setup(props) {
    return () => h('svg', {
      class: props.className,
      viewBox: "0 0 500 430",
      style: {
        transform: `rotateX(${props.rotate.x}deg) rotateY(${props.rotate.y}deg) translateZ(${props.translateZ}px) scale(${props.scale})`,
        strokeDashoffset: props.strokeDashoffset
      }
    }, [
      h(HeartPath)
    ]);
  }
});

// Main component setup
const heartRef = ref(null);
const love = ref(1);
const pressed = ref(false);
const items = ref([]);
const timeouts = ref({});
const x = ref(-25);
const y = ref(25);

// Computed offset based on x and y
const offset = computed(() => 
  Math.atan2(y.value, x.value) / Math.PI * (PATH_LENGTH / 2) + PATH_LENGTH / 2
);

// Add perishable item
const add = (delay, data = {}) => {
  const id = nanoid();
  items.value.push({ id, data });
  
  timeouts.value[id] = setTimeout(() => {
    items.value = items.value.filter(item => item.id !== id);
    delete timeouts.value[id];
  }, delay);
};

// Set pressed state
const setPressed = (value) => {
  pressed.value = value;
};

// Handle cursor tilt
const handleMouseMove = (e) => {
  requestAnimationFrame(() => {
    if (!heartRef.value) return;
    
    const bounds = 50;
    const { left, top, width, height } = heartRef.value.getBoundingClientRect();
    const [mouseX, mouseY] = [e.clientX, e.clientY];
    
    const rect = {
      top: top - bounds,
      left: left - bounds,
      width: width + bounds * 2,
      height: height + bounds * 2
    };

    y.value = -(clamp(0, rect.height, mouseY - rect.top) - rect.height / 2) / rect.height * 50;
    x.value = (clamp(0, rect.width, mouseX - rect.left) - rect.width / 2) / rect.width * 50;
  });
};

// Handle mouse up
const handleMouseUp = () => {
  if (pressed.value) {
    pressed.value = false;
    
    if (love.value >= 1) {
      love.value = 0;
    } else {
      add(1000);
      love.value += 0.3;
    }
  }
};

// Setup event listeners
onMounted(() => {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

// Cleanup event listeners and timeouts
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  
  // Clear all timeouts
  Object.values(timeouts.value).forEach(clearTimeout);
});
</script>

<style scoped>
.heart {
  perspective: 1000px;
  width: 50px;
  height: 50px;
  position: relative;
  cursor: pointer;
  margin-left:0px;
}
.heart::after {
  content: "";
  position: absolute;
  border-radius: 100%;
  left: 10%;
  bottom: 15%;
  width: 80%;
  height: 20%;
  background-color: rgba(179, 77, 121, 0.2);
  filter: blur(5px);
  transform: scale(var(--scale));
}
.heart svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.heart .inner-wrapper {
  width: 100%;
  height: 100%;
  transform: scale(var(--scale));
  transition: 0.1s ease-out;
}
.heart .splash {
  width: 100%;
  height: 100%;
}
.heart .splash path {
  stroke: #ebadc8;
  stroke-width: 0;
  fill: none;
  transform-origin: center;
  animation-timing-function: linear;
  animation-duration: 0.5s;
  animation-name: splash;
}
.heart .heart-stroke {
  fill: none;
  stroke: white;
  stroke-width: 20px;
  stroke-dasharray: 300 1206;
  stroke-linecap: round;
}
.heart .heart-layer {
  transition: fill 0.3s ease-out;
  fill: hsl(334deg, var(--lightness), 50%);
  stroke: hsl(334deg, var(--lightness), 35%);
  stroke-width: 10px;
}
.heart .heart-shine {
  filter: blur(10px);
}

@keyframes splash {
  0% {
    transform: scale(0.5);
    stroke-width: 10;
  }
  50% {
    transform: scale(1.5);
    stroke-width: 100;
  }
  100% {
    transform: scale(2.5);
    stroke-width: 1;
  }
}
</style>