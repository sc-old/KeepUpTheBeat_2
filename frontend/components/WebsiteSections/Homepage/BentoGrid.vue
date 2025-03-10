<template>
  <div class="bento-grid">
    <div 
      v-for="(item, i) in items" 
      :key="i" 
      class="bento-grid-item"
      :class="{ 'span-two': i === 3 || i === 6 }"
    >
      <div class="bento-header">
        <div class="skeleton">
          <img :src="item.image" alt="Bento Grid Image" class="bento-image">
        </div>
      </div>
      <div class="bento-content">
        <h3 class="bento-title">{{ item.title }}</h3>
        <p class="bento-description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import image_1 from '~/assets/content/images/homepage/home_1_4.png';
import image_2 from '~/assets/content/images/homepage/home_1_2.png';
import image_3 from '~/assets/content/images/homepage/home_1_3.png';

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    image: image_1
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    image: image_2
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    image: image_3
  },
  {
    title: "The Power of Communication",
    description: "Understand the impact of effective communication in our lives.",
    image: image_1
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    image: image_2
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    image: image_3
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    image: image_1
  },
];
</script>

<style>
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  margin: 0 auto;
  width: 90%;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .span-two {
    grid-column: span 2;
  }
}

.bento-grid-item {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* .bento-grid-item:hover {
  transform: translateY(-2px);
} */

.bento-grid-item:hover .bento-content {
  transform: translateX(10px);
  transition: transform 0.5s ease;
}

.bento-header {
  width: 100%;
}

.skeleton {
  display: flex;
  flex: 1;
  width: 100%;
  height: 15rem;
  border-radius: 0.75rem 0.75rem 0 0;
  background: linear-gradient(to bottom right, #f1f1f1, #e0e0e0);
  overflow: hidden;
}

.bento-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dark .skeleton {
  background: linear-gradient(to bottom right, #262626, #1a1a1a);
}

.bento-content {
  padding: 1.5rem;
  transition: transform 0.5s ease;
}

.bento-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.bento-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.5;
}
</style>
