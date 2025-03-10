import { ref, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

export const useAnimations = () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const parseDataAttribute = (element, attr) => {
    const data = element.getAttribute(attr);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error('Error parsing data attribute:', error);
        return {};
      }
    }
    return {};
  };




  const splitText = () => {

    document.querySelectorAll('[data-split-title]').forEach(element => {
      const mySplitText = new SplitText(element, { 
        type: 'chars, words, lines',
        charsClass: "split-char",
        wordsClass: "split-word",
        linesClass: "split-line",
        position: "relative"
      });
      const { delay = 0, stagger = 0.03, start = 'top bottom', duration = 0.8, once = false, toggleActions = 'restart none none reset' } = parseDataAttribute(element, 'data-split-title');

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: start,
          end: 'bottom top',
          toggleActions: toggleActions,
          once: once,
        },
      }).from(mySplitText.chars, {
        delay: delay,
        duration: duration,
        scale: 0.6,
        autoAlpha: 0,
        rotationY: -90,
        rotationX: -15,
        transformOrigin: '100% 50%',
        ease: 'power2.inOut',
        stagger: stagger,
      });
    });

    document.querySelectorAll('[data-split-text]').forEach(element => {
      const mySplitTextText = new SplitText(element, { 
        type: 'lines',
        linesClass: "split-line",
        position: "relative",
        lineThreshold: 0.5
      });
      const { delay = 0, start = 'top bottom', duration = 1, stagger="0.1", once = false, toggleActions = 'restart none none reset' } = parseDataAttribute(element, 'data-split-text');

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: start,
          end: 'bottom top',
          toggleActions: toggleActions,
          once: once,
        },
      }).from(mySplitTextText.lines, {
        delay: delay,
        duration: duration,
        autoAlpha: 0,
        y: 40,
        transformOrigin: '100% 50%',
        stagger: stagger,
      });
    });
  };




  function autoAnimateSplitText() {
    document.querySelectorAll('[data-auto-split-text]').forEach(element => {
      const { delay = 0, duration = 1, stagger = 0.1, type = 'lines' } = parseDataAttribute(element, 'data-auto-split-text');
      
      let splitOptions = { 
        position: "relative"
      };
      
      if (type === 'lines') {
        splitOptions.type = 'lines';
        splitOptions.linesClass = "split-line";
      } else if (type === 'words') {
        splitOptions.type = 'words';
        splitOptions.wordsClass = "split-word";
      } else {
        splitOptions.type = 'chars';
        splitOptions.charsClass = "split-char";
      }
      
      const mySplitTextText = new SplitText(element, splitOptions);
      
      let splitType;
      if (type === 'lines') {
        splitType = mySplitTextText.lines;
      } else if (type === 'words') {
        splitType = mySplitTextText.words;
      } else {
        splitType = mySplitTextText.chars;
      }

      gsap.from(splitType, {
        delay: delay,
        duration: duration,
        autoAlpha: 0,
        y: 40,
        transformOrigin: '100% 50%',
        ease: 'power2.inOut',
        stagger: stagger,
      });
    });
  }




  function textScroll_1() {
    document.querySelectorAll('[data-text-scroll-1]').forEach((element) => {
      const mySplitText = new SplitText(element, { type: 'chars, words, lines' });
      const { start = 'top bottom',  toggleActions = 'restart none none reset' } = parseDataAttribute(element, 'data-text-scroll-1');
  
      const chars = mySplitText.chars;
      const charsTotal = chars.length;
  
      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 1000 }));
  
      gsap.fromTo(
        chars,
        {
          'will-change': 'transform',
          x: (position) => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return (charsTotal % 2 ? Math.abs(Math.ceil(charsTotal / 2) - 1 - factor) : Math.abs(Math.ceil(charsTotal / 2) - factor)) * 200 * (position < charsTotal / 2 ? -1 : 1);
          },
          y: (position) => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return factor * 60;
          },
          rotationY: -270,
          rotationZ: (position) => {
            const factor = position < Math.ceil(charsTotal / 2) ? position : Math.ceil(charsTotal / 2) - Math.abs(Math.floor(charsTotal / 2) - position) - 1;
            return position < charsTotal / 2 ? Math.abs(factor - charsTotal / 2) * 8 : -1 * Math.abs(factor - charsTotal / 2) * 8;
          },
        },
        {
          ease: 'power2.inOut',
          x: 0,
          y: 0,
          rotationZ: 0,
          rotationY: 0,
          scale: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom+=40%',
            end: 'top top+=15%',
            scrub: true,
          },
        }
      );
    });
  }






  function textScroll_2() {
    document.querySelectorAll('[data-text-scroll-2]').forEach((element) => {
      const mySplitText = new SplitText(element, { type: 'chars, words, lines' });
      const { start = 'top bottom', toggleActions = 'restart none none reset' } = parseDataAttribute(element, 'data-text-scroll-2');
  
      const chars = mySplitText.chars;
  
      chars.forEach((char) => gsap.set(char.parentNode, { perspective: 2000 }));
  
      gsap.fromTo(
        chars,
        {
          'will-change': 'opacity, transform',
          opacity: 0,
          y: (position, _, arr) => -40 * Math.abs(position - arr.length / 2),
          z: () => gsap.utils.random(-1500, -600),
          rotationX: () => gsap.utils.random(-500, -200),
        },
        {
          ease: 'power1.inOut',
          opacity: 1,
          y: 0,
          z: 0,
          rotationX: 0,
          stagger: {
            each: 0.06,
            from: 'center',
          },
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'top top+=15%',
            scrub: true,
          },
        }
      );
    });
  }






















  const highlightElements = () => {
    document.querySelectorAll('[data-highlight]').forEach(element => {
      const { delay = 0, start = 'top bottom', duration = 0.8, toggleActions = 'restart none none reverse' } = parseDataAttribute(element, 'data-highlight');

      gsap.fromTo(element,
        {
          backgroundSize: '0% 100%',
          borderColor: 'transparent',
        },
        {
          backgroundSize: '100% 100%',
          borderColor: 'rgba(100, 100, 100, 0.5)',
          duration: duration,
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: toggleActions,
          },
          ease: 'power2.out',
        }
      );
    });
  };





  const underlineElements = () => {
    document.querySelectorAll('[data-underline]').forEach(element => {
      const { delay = 0, start = 'top bottom', duration = 0.8, toggleActions = 'restart none none reverse'  } = parseDataAttribute(element, 'data-underline');
  
      gsap.fromTo(element,
        {
          backgroundSize: '0% 15%',
          borderColor: 'transparent',
        },
        {
          backgroundSize: '100% 15%',
          duration: duration,
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: toggleActions,
          },
          ease: 'power2.out',
        }
      );
    });

  };




  const doubleUnderlineElements = () => {
    document.querySelectorAll('[data-double-underline]').forEach(element => {
      const { 
        delay = 0, 
        start = 'top bottom', 
        duration = 0.8, 
        toggleActions = 'restart none none reverse', 
        backgroundImage = 'linear-gradient(to right, rgba(23, 129, 228, 0.7) 0%, rgba(23, 129, 228, 0.7) 100%), linear-gradient(to right, rgba(23, 129, 228, 0.7) 0%, rgba(23, 129, 228, 0.7) 100%)',
        backgroundSize = '100% 5%, 100% 5%',
        backgroundPosition = '0% 100%, 0% calc(100% - 6px)'
      } = parseDataAttribute(element, 'data-double-underline');
      
      gsap.fromTo(element,
        {
          backgroundSize: '0% 5%, 0% 5%',
          backgroundPosition: backgroundPosition,
          backgroundImage: backgroundImage,
          backgroundRepeat: 'no-repeat, no-repeat',
          borderColor: 'transparent',
        },
        {
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          borderColor: 'rgba(23, 129, 228, 0.7)',
          duration: duration,
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: toggleActions,
          },
          ease: 'power2.out',
        }
      );
    });
  };
  






const circleElements = () => {
  document.querySelectorAll('[data-circle]').forEach(element => {
    const { scaleLen = 2, delay = 0, pathMulti = 1000, duration = 1, stroke='#1781e4', start = 'top bottom', toggleActions = 'restart none none reverse' } = parseDataAttribute(element, 'data-circle');

    const svgWidth = element.offsetWidth;
    const svgHeight = element.offsetHeight * 2;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
    svg.setAttribute('viewBox', '-1 -1 2 2');

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('pathLength', '100');
    path.setAttribute('vector-effect', 'non-scaling-stroke');

    svg.appendChild(path);
    element.appendChild(svg);

    gsap.set(svg, {
      position: 'absolute',
      left: 0,
      top: '-65%',
      right: 0,
      margin: 'auto',
      pointerEvents: 'none',
      width: svgWidth,
      height: svgHeight,
      transform: `scale(${(scaleLen * svgWidth) / svgHeight}, 1)`
    });

    const circlePath = (drMin, drMax, θ0Min, θ0Max, dθMin, dθMax) => {
      const c = 0.551915024494;
      const β = Math.atan(c);
      const d = Math.sqrt(c * c + 1);
      let r = 0.9;
      let θ = ((θ0Min + Math.random() * (θ0Max - θ0Min)) * Math.PI) / 180;
      let path = `M${r * Math.sin(θ)},${r * Math.cos(θ)}C${d * r * Math.sin(θ + β)},${d * r * Math.cos(θ + β)}`;

      for (let i = 0; i < 4; i++) {
        θ += (Math.PI / 2) * (1 + dθMin + Math.random() * (dθMax - dθMin));
        // θ += (Math.PI / 2) * (1 + dθMin * (dθMax - dθMin));
        r *= 1 + drMin + Math.random() * (drMax - drMin);
        path += ` ${i ? 'S' : ''}${d * r * Math.sin(θ - β)},${d * r * Math.cos(θ - β)} ${r * Math.sin(θ)},${r * Math.cos(θ)}`;
      }
      return path;
    };

    gsap.set(path, {
      attr: { d: circlePath(-0.15, 0.05, 150, 190, 0.05, 0.3) },
      strokeWidth: 2,
      stroke:stroke,
      fill: 'none',
      strokeLinecap: 'round'
    });

    const pathLength = path.getTotalLength() * pathMulti;

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      visibility: 'hidden'
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: start,
        toggleActions: toggleActions,
      }
    }).to(path, {
      strokeDashoffset: 0,
      visibility: 'visible',
      duration: parseFloat(duration),
      delay: parseFloat(delay),
      ease: 'linear'
    });
  });
};



onMounted(() => {
  setTimeout(() => {
    splitText();
    highlightElements();
    underlineElements();
    circleElements();
    doubleUnderlineElements();
    textScroll_1(),
    textScroll_2(),
    autoAnimateSplitText()
  }, 300);
});



  return {
    highlightElements,
    splitText,
    underlineElements,
    circleElements,
    doubleUnderlineElements,
    textScroll_1,
    textScroll_2,
    autoAnimateSplitText
  };
};
