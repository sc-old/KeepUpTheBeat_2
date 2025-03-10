import { gsap } from 'gsap';


export const useCursor = () => {

const cursorStyle = ref('');
let secondaryColor = ref('#72797b95'); //silver
let accentColor = ref('#1781e4'); //blue
const cursor_pointer = useCookie('cursor_pointer', {default:()=> 'none', watch:true})

  
  function setCursor(type, item) {



    if (type == 'emoji') {


        document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="45" width="45"><text y="45" font-size="45">${item}</text></svg>'), auto !important`;
  cursorStyle.value = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"  height="45" width="45"><text y="40" font-size="42">${item}</text></svg>'), auto !important`;

            // clear default cursor
        gsap.to("#cursor_small", 0.3, {
        scale: 0,
            overwrite: true
      })
      } else if (type == 'image'){

        document.body.style.cursor = 'none';
        cursorStyle.value = 'none'
        gsap.set("#cursor_small", {
            backgroundImage: `url('${item}')`,
            backdropFilter: "blur(0px)",
            backgroundColor: '#ffffff00',
            overwrite: true
      })
      gsap.to("#cursor_small", 0.3, {
        scale: 25,
            overwrite: true
      })


      }



  

  
  gsap.to("#cursor_big", 0.3, {
    scale: 0,
    opacity:0

  })
  
  }
  
  function clearCursor(type) {

    if(type == 'image') {
    document.body.style.cursor = cursor_pointer.value;
    cursorStyle.value = cursor_pointer.value;

    gsap.set("#cursor_small", {
        overwrite: true,
        backgroundImage: '',
        backgroundColor: accentColor.value,
        backdropFilter: "blur(2px)",
        scale: 1,
  })
    } else if (type == 'emoji') {
  
    //set back default cursor
    gsap.to('#cursor_small', 0.3, {
        scale: 1,
        overwrite: true
        })

      } else {
        gsap.set("#cursor_small", {
            opacity: 1,
          overwrite: true,
          backgroundImage: '',
          backgroundColor: accentColor.value,
          backdropFilter: "blur(2px)",
          scale: 1,
    })
      }
  
  gsap.to("#cursor_big", 0.3, {
  scale: 1,
  opacity: 1,
  overwrite: true
  })


  }


  function noCursor(){

    document.body.style.cursor = 'none';

                // clear default cursor
                gsap.to("#cursor_small", 0.05, {
                  scale: 0,
                  opacity: 0,
                      overwrite: true
                })

                gsap.to("#cursor_big", 0.05, {
                  scale: 0,
                  opacity: 0,
                  overwrite: true
                  })
  }


  function fmkCursor() {
    gsap.set("#cursor_small", {
      opacity: 1,
      overwrite: true,
      background: 'linear-gradient(45deg, rgba(106, 210, 196, 0.8), rgba(156, 103, 189, 0.8), rgba(235, 113, 156, 0.8), rgba(255, 181, 98, 0.8))',
      backdropFilter: "blur(0px)",
      scale: 0.4,
      borderRadius: '50%',
      width: '60px',  // Adjust this value as needed
      height: '60px', // Adjust this value as needed
    });
  
    gsap.to("#cursor_big", {
      duration: 0,
      delay:0,
      scale: 3,
      opacity: 0,
      overwrite: true,
    });
  }


  return {
    setCursor,
    clearCursor,
    cursorStyle,
    noCursor,
    fmkCursor
  };

}
  