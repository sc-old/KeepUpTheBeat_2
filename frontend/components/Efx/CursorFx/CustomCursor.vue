<template>
  <Teleport to="body">
    <div class="custom_cursor" :class="color_theme ? 'secondary_theme' : 'main_theme'">
      <div id="cursor_small" class="custom_cursor_ball custom_cursor_ball_small"></div>
    </div>
  </Teleport>
</template>

<script setup>
import { gsap } from 'gsap'
import { set, useWindowSize } from '@vueuse/core'

const { width, height } = useWindowSize()

const props = defineProps(['color_theme'])

const hoverClass = 'cursor_hover'
const hoverPointerClass = 'cursor_hover_pointer';
const hoverLearnClass = 'cursor_hover_learn';
const hoverPlayClass = 'cursor_hover_play';
const hoverHideClass = 'cursor_hover_hide';
const isCustomCursorEnabled = useCookie('isCustomCursorEnabled', {default:()=> 'true', watch:true})
const cursor_display = useCookie('cursor_display', {default:()=> 'block', watch:true})
const cursor_style = useCookie('cursor_style')
const cursor_pointer = useCookie('cursor_pointer', {default:()=> 'none', watch:true})
const color_theme = useCookie('color_theme', {default:()=> true, watch:true})



  let accentColor = ref('#e769e3');
  let secondaryColor = ref('#cd990d');

  watch(() => props.color_theme, (oldValue, newValue) => {
    if (newValue == true){
          accentColor.value = '#72797b95' //silver
          secondaryColor.value = '#1781e4' //blue
    } else {
          accentColor.value = '#f2be45' //orange
          secondaryColor.value = '#1090c6' //blue
    }
    onMouseHoverOut()
    });


// Determine if the current device is a mobile
function isMobile() {
  return typeof window !== 'undefined' && /Mobi|Android/i.test(window.navigator.userAgent);
}


let cursorSmall = null
let withHover = [];
let withHoverPointer = [];
let withHoverLearn = [];
let withHoverPlay = [];
let withHoverHide = [];
let isDragging = false;
let previous_cursor_style_function = null;
let playText = 'UNMUTE';

onMounted (() => {
  cursorSmall = document.getElementById('cursor_small')

  if (props.color_theme == false){
          accentColor.value = '#72797b95'
          secondaryColor.value = '#1781e4'
    } else {
          accentColor.value = '#1781e4' // orange
          secondaryColor.value = '#1090c6' //blue
    }


    if(isMobile() || width.value < 992){
      cursor_display.value = 'none'
    } else {
      cursor_display.value = 'block'
      onMouseHoverOut()
      init()
    }

})
onBeforeUnmount(destroy)
onUpdated(() => {
  destroy()
  if(!isMobile()){
  init()
  }
})

function init() {
  setTimeout(() => {
    withHover = [...document.getElementsByTagName('a'), ...document.getElementsByClassName(hoverClass)]
    withHoverPointer = [...document.getElementsByClassName(hoverPointerClass)];
    withHoverLearn = [...document.getElementsByClassName(hoverLearnClass)];
    withHoverPlay = [...document.getElementsByClassName(hoverPlayClass)];
    withHoverHide = [...document.getElementsByClassName(hoverHideClass)];


  

    withHover.forEach((element) => {
      element.addEventListener('mouseover', onMouseHover)
      element.addEventListener('mouseout', onMouseHoverOut)
    })

    withHoverPointer.forEach((element) => {
      element.addEventListener('mouseover', onMouseHoverPointer);
      element.addEventListener('mouseout', onMouseHoverOutPointer);
    });

    withHoverLearn.forEach((element) => {
      element.addEventListener('mouseover', onMouseHoverLearn);
      element.addEventListener('mouseout', onMouseHoverOutLearn);
    });

    withHoverPlay.forEach((element) => {
      element.addEventListener('mouseover', onMouseHoverPlay);
      element.addEventListener('mouseout', onMouseHoverOutPlay);
    });

    withHoverHide.forEach((element) => {
      element.addEventListener('mouseover', onMouseHoverHide);
      element.addEventListener('mouseout', onMouseHoverOutHide);
    });

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', ResetMouse)
    // document.addEventListener('mouseup', onMouseHoverOut)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    // document.addEventListener('click', onClick)
  }, 100)
}


function destroy() {
  withHover.forEach((element) => {
    element.removeEventListener('mouseover', onMouseHover)
    element.removeEventListener('mouseout', onMouseHoverOut)
  })
  
  withHoverPointer.forEach((element) => {
    element.removeEventListener('mouseover', onMouseHoverPointer);
    element.removeEventListener('mouseout', onMouseHoverOutPointer);
  });

  withHoverLearn.forEach((element) => {
    element.removeEventListener('mouseover', onMouseHoverLearn);
    element.removeEventListener('mouseout', onMouseHoverOutLearn);
  });

  withHoverPlay.forEach((element) => {
    element.removeEventListener('mouseover', onMouseHoverPlay);
    element.removeEventListener('mouseout', onMouseHoverOutPlay);
  });

  withHoverHide.forEach((element) => {
    element.removeEventListener('mouseover', onMouseHoverHide);
    element.removeEventListener('mouseout', onMouseHoverOutHide);
  });

  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mousedown', onMouseHover)
  document.removeEventListener('mouseup', onMouseHoverOut)
  document.removeEventListener('mouseenter', onMouseEnter)
  document.removeEventListener('mouseleave', onMouseLeave)

}



let moveTimeout;
function onMouseMove(e) {
  if (!isCustomCursorEnabled.value || !cursorSmall) return;  

  // Clear the timeout if it exists
  if (moveTimeout) clearTimeout(moveTimeout);

  // Simply update position, keep opacity at 1
  gsap.to(cursorSmall, 0, {
    x: e.clientX,
    y: e.clientY,
    opacity: 1
  });
  
  // Remove the timeout that was scaling the cursor to 0
  // moveTimeout = setTimeout(function() {
  //   gsap.to(cursorSmall, 3, {
  //     scale: 0,
  //   });
  // }, 0);
}

function onMouseEnter() {

  if (!isCustomCursorEnabled.value) return; 
  // cursorBig.style.opacity = 1
  // cursorSmall.style.opacity = 1
}

function onMouseLeave() {
  // cursorBig.style.opacity = 0
  // cursorSmall.style.opacity = 0
  gsap.to(cursorSmall, 0.2, {
    opacity:1
  })
}

// function onMouseMove(e) {
//   cursorSmall.style.opacity = 1
//   gsap.to(cursorBig, 1, {
//     x: e.clientX - 3.5,
//     y: e.clientY - 3.5,
//     scale: 5
//   })
//   gsap.to(cursorSmall, 0.1, {
//     x: e.clientX,
//     y: e.clientY
//   })
// }

function onMouseHover() {
  previous_cursor_style_function = 'onMouseHover'
  gsap.to(cursorSmall, 0.3, {
    width: 20,
    height: 20,
    left: -10,
    top:-10,
    opacity: 0.5
  })
}

function onMouseHoverOut() {
  previous_cursor_style_function = 'onMouseHoverOut'
  gsap.to(cursorSmall, 0.3, {
    width: 10,
    height: 10,
    left: 0,
    top:0,
    opacity: 1,
    borderColor: '#ffffff00',
    backgroundColor: secondaryColor.value,
    overwrite: true
  })
}


function ResetMouse(){
  gsap.to(cursorSmall, 0.3, {
    width: 10,
    height: 10,
    left: 0,
    top:0,
    opacity: 1,
    borderColor: '#ffffff00',
    backgroundColor: secondaryColor.value,
    overwrite: true,
    backgroundImage: '',
        backdropFilter: "blur(2px)",
        scale: 1,
  })
}



// function onClick() {
//   // gsap.to(cursorBig, 0.4, {
//   //   width: 80,
//   //   height: 80,
//   //   left: -30,
//   //   top:-30
//   // })
//   // gsap.to(cursorBig, 0.3, {
//   //   width: 15,
//   //   height: 15,
//   //   left: 0,
//   //   top:0,
//   //   delay: 0.2,
//   //   overwrite: true
//   // })

//   // gsap.set(cursorBig, {
//   //   opacity:1,
//   //   overwrite: true
//   // })

 
//   cursorSmall.textContent = '';
//   console.log(previous_cursor_style_function)

//   if (previous_cursor_style_function == 'onMouseHover'){
//     onMouseHover()
//   } else if (previous_cursor_style_function == 'onMouseHoverOut'){
//     onMouseHoverOut()
//   } else if (previous_cursor_style_function == 'onMouseHoverPointer'){
//     onMouseHoverPointer()
//   } else if (previous_cursor_style_function == 'onMouseHoverOutPointer'){
//     onMouseHoverOutPointer()
//   } else if (previous_cursor_style_function == 'onMouseHoverLearn'){
//     onMouseHoverLearn()
//   } else if (previous_cursor_style_function == 'onMouseHoverOutLearn'){
//     onMouseHoverOutLearn()
//   } else if (previous_cursor_style_function == 'onMouseHoverPlay'){
//     if (playText == 'MUTE'){
//         playText = 'UNMUTE'
//       } else {
//         playText = 'MUTE'
//       }
//     onMouseHoverPlay()
//   } else if (previous_cursor_style_function == 'onMouseHoverOutPlay'){
//     onMouseHoverOutPlay()
//   }

  
// }


function onMouseHoverPointer() {
  // cursorBig.style.backgroundImage = `url('${''}')`;
  // cursorSmall.style.backgroundImage = `url('${''}')`;

  previous_cursor_style_function = 'onMouseHoverPointer'

  gsap.to(cursorSmall, 0.3, {
    width: 30,
    height: 30,
    left: -10,
    top:-10,
    borderColor: secondaryColor.value,
    backgroundColor: '#ffffff00',
  })
}

function onMouseHoverOutPointer() {
  // cursorBig.style.backgroundImage = `url('${cursorImageUrl.value}')`;
  // cursorSmall.style.backgroundImage = `url('')`;

  previous_cursor_style_function = 'onMouseHoverOutPointer'

  gsap.to(cursorSmall, 0.3, {
    width: 10,
    height: 10,
    left: 0,
    top:0,
    opacity: 1,
    borderColor: '#ffffff00',
    backgroundColor: secondaryColor.value,
    overwrite: true
  })
}







function onMouseHoverLearn() {

  previous_cursor_style_function = 'onMouseHoverLearn'

  cursorSmall.style.backdropFilter = 'blur(7px)';
  // Style the text (optional)
cursorSmall.style.fontWeight = 'bold';
cursorSmall.style.textAlign = 'center';
cursorSmall.style.lineHeight = '150px'; // Adjust if necessary

  gsap.to(cursorSmall, 0.3, {
    width: 150,
    height: 150,
    left: -75,
    top:-75,
    borderColor: secondaryColor.value,
    backgroundColor: '#ffffff00',
    textContent: 'Learn More',
    color: accentColor.value,
  })
}

function onMouseHoverOutLearn() {

  previous_cursor_style_function = 'onMouseHoverOutLearn'

  cursorSmall.style.backdropFilter = 'none';

  gsap.to(cursorSmall, 0.3, {
    width: 10,
    height: 10,
    left: 0,
    top:0,
    opacity: 1,
    borderColor: '#ffffff00',
    backgroundColor: secondaryColor.value,
    overwrite: true,
    textContent: '',
    color: '#ffffff00',
  })
}






function onMouseHoverPlay() {

  previous_cursor_style_function = 'onMouseHoverPlay'

cursorSmall.style.backdropFilter = 'blur(7px)';
// Style the text (optional)
cursorSmall.style.fontWeight = 'bold';
cursorSmall.style.fontSize = '30px';
cursorSmall.style.textAlign = 'center';
cursorSmall.style.lineHeight = '150px'; // Adjust if necessary

gsap.to(cursorSmall, 0.3, {
width: 150,
height: 150,
left: -75,
top:-75,
borderColor: secondaryColor.value,
backgroundColor: '#ffffff00',
textContent: playText,
color: accentColor.value,
})

}



function onMouseHoverOutPlay() {

previous_cursor_style_function = 'onMouseHoverOutPlay'

cursorSmall.style.backdropFilter = 'none';
cursorSmall.style.fontSize = '20px';

gsap.to(cursorSmall, 0.3, {
width: 10,
height: 10,
left: 0,
top:0,
opacity: 1,
borderColor: '#ffffff00',
backgroundColor: secondaryColor.value,
overwrite: true,
textContent: '',
color: '#ffffff00',
})

}



function onMouseHoverHide() {

previous_cursor_style_function = 'onMouseHoverHide'


gsap.to(cursorSmall, 0.3, {
  scale: 0,
})

}



function onMouseHoverOutHide() {

previous_cursor_style_function = 'onMouseHoverOutHide'



// gsap.to(cursorSmall, 0.3, {
// scale: 1,
// overwrite: true
// })

// gsap.to(cursorBig, 0.1, {
// scale: 1,
// overwrite: true
// })

}





const route = useRoute()
const scale_size = ref(1)
const cursorImageUrl = computed(() => {

    scale_size.value = 8
    if(width.value < 992){
      scale_size.value = 3
    } else{
      scale_size.value = 3
    }
    return ''

})





function getColorFromClass(className, variableName) {
// Create a dummy element
var dummyElement = document.createElement('div');

// Add the class to the dummy element
dummyElement.classList.add(className);

// Append the dummy element to the body
document.body.appendChild(dummyElement);

// Get the computed style of the dummy element
var style = getComputedStyle(dummyElement);

// Get the value of the CSS variable
var value = style.getPropertyValue(variableName).trim();

// Remove the dummy element from the document
document.body.removeChild(dummyElement);

return value;
}




</script>

  <style>
    
.custom_cursor{
  z-index: 1000000000000 !important;
  display: v-bind(cursor_display)
}

.custom_cursor_ball {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index:1000 !important;
}

.custom_cursor_ball_small {
  content: "";
  width: 10px;
  height: 10px;
  background: v-bind(secondaryColor);
  border: 3px solid transparent;
  border-radius: 50%;
  opacity: 1;
  backdrop-filter: blur(2px);
  z-index: 2000000000000000 !important;
  margin-left: -6px;
  margin-top: -5px;
  color: transparent;
  white-space: nowrap;
  transition: color 0.15s ease 0s;
  background-image: none;
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
}

.cursor_hover{
  cursor: v-bind(cursor_pointer) !important;
}
  </style>