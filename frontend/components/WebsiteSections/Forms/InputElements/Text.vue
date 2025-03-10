<template>
    <div class="inputContainer">
      <div class="inputBox">
        <input 
          class="inputClass" 
          type="text" 
          v-model="inputValue" 
          @input="emitValue" 
          required
        />
        <label class="labelClass">{{ label }}</label>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  </script>
  
  <style scoped>
  .inputContainer {
    position: relative; 
  }
  
  .inputBox{
    position: relative;
    margin-bottom:50px
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
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: grey;
    pointer-events: none;
    transition: 0.5s;
  }
  
  .inputClass:focus ~ .labelClass,
  .inputClass:valid ~ .labelClass {
    top: -20px;
    left: 0;
    color: v-bind(lineColor);
    font-size: 12px;
    background-color: transparent;
  }
  
  </style>
  