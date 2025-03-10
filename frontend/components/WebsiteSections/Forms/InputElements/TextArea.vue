<template>
    <div class="inputContainer">
      <div class="inputBox">
        <textarea 
          class="inputClass" 
          v-model="inputValue" 
          @input="emitValue" 
          required
        ></textarea>
        <label :class="{'labelClass': true, 'hasText': inputValue}">{{ label }}</label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      required: true
    },
    lineColor:{
      type: String,
      required: true
    },
    textColor:{
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const inputValue = ref(props.modelValue);
  
  const emitValue = () => {
    emit('update:modelValue', inputValue.value);
  };
  
  // Optional: Watch for changes in props.modelValue to sync with inputValue
  watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
  });
  </script>
  
  <style scoped>
  .inputContainer {
    position: relative; 
  }
  
  .inputBox {
    position: relative;
    margin-bottom: 50px;
  }
  
  .inputClass {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: v-bind(textColor);
    border: none;
    border-bottom: 1px solid v-bind(lineColor);
    outline: none;
    background-color: transparent;
    resize: vertical; /* Allow vertical resizing */
    min-height: 100px; /* Adjust the minimum height as needed */
  }
  
  .labelClass {
    position: absolute;
    top: 10px;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: grey;
    pointer-events: none;
    transition: 0.5s;
  }
  
  .hasText,
  .inputClass:focus ~ .labelClass {
    top: -20px;
    left: 0;
    color: v-bind(lineColor);
    font-size: 12px;
    background-color: transparent;
  }
  </style>
  