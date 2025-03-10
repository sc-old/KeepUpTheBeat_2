<template>
    <div>
      <input
        :id="id"
        :checked="modelValue"
        class="checkbox_input"
        type="checkbox"
        :name="id"
        @change="$emit('update:modelValue', $event.target.checked)"
      >
      <label :for="id" class="checkbox_label" :style="labelStyle">{{ title }}</label>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps(['modelValue', 'id', 'title', 'fontSize', 'width', 'height'])
  
  const emit = defineEmits(['update:modelValue']);
  
  const shadowSize = computed(() => {
    const height = parseInt(props.height) || 50;
    const width = parseInt(props.width) || 100;
    const size = Math.min(height, width);
    return {
      normal: `0 ${size * 0.08}px ${size * 0.16}px 0 rgba(0, 0, 0, 0.2)`,
      hover: `0 ${size * 0.22}px ${size * 0.26}px 0 rgba(0, 0, 0, 0.2)`,
      checked: `0 ${size * 0.1}px ${size * 0.16}px 0 rgba(0, 0, 0, 0.6)`,
      checkedHover: `0 ${size * 0.15}px ${size * 0.16}px 0 rgba(0, 0, 0, 0.3)`,
    };
  });
  
  const labelStyle = computed(() => ({
    fontSize: props.fontSize || '18px',
    width: props.width || 'auto',
    height: props.height || '50px',
    minHeight: props.height || '50px',
    transition: 'box-shadow 0.3s ease-in-out, background-color 0.15s ease-in-out'
  }));
  
  </script>
  
  <style scoped>
  [type="checkbox"]:checked,
  [type="checkbox"]:not(:checked),
  [type="radio"]:checked,
  [type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
    width: 0;
    height: 0;
    visibility: hidden;
  }
  
  .checkbox_input:checked + .checkbox_label,
  .checkbox_input:not(:checked) + .checkbox_label {
    position: relative;
    display: flex;
    padding: 15px;
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 10px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    text-transform: uppercase;
    color: #1976D2;
    vertical-align: middle !important;
    text-align: center !important;
    align-items: center;
    align-content: center;
    justify-content: center;
  }
  

  .checkbox_input:checked + .checkbox_label::before,
  .checkbox_input:not(:checked) + .checkbox_label::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: -1;
  }



  .checkbox_input:checked + .checkbox_label {
  color: #fff;
  background-color: #1976D2;
  box-shadow: v-bind(shadowSize.checked);
}




.checkbox_input:checked + .checkbox_label:hover {
  box-shadow: v-bind(shadowSize.checkedHover);
}

.checkbox_input:not(:checked) + .checkbox_label {
  box-shadow: v-bind(shadowSize.normal);
}

.checkbox_input:not(:checked) + .checkbox_label:hover {
  box-shadow: v-bind(shadowSize.hover);
}

  </style>