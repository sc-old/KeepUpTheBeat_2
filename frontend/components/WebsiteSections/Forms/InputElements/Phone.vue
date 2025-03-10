<template>
    <div class="inputContainer">
      <div class="inputBox">
        <input 
          class="inputClass" 
          type="text" 
          v-model="inputValue" 
          @input="formatPhoneNumber" 
          @keypress="onPhoneKeyPress"
          required
        />
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
  
  const formatPhoneNumber = () => {
    // Remove non-numeric characters except dashes, parentheses, and spaces
    inputValue.value = inputValue.value.replace(/[^0-9()-\s]/g, '');
    // Automatically add dashes at appropriate positions
    if (inputValue.value.length === 3 || inputValue.value.length === 7) {
      inputValue.value += '-';
    }
    emitValue();
  };
  
  const onPhoneKeyPress = (e) => {
    const key = e.keyCode || e.charCode;
    const lenPhone = inputValue.value.length;
  
    // Allow backspace and delete keys
    if (key !== 8 && key !== 46) {
      if (lenPhone === 3 || lenPhone === 7) {
        inputValue.value += '-';
      }
    }
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
  