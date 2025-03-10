// plugins/smooth-scroll.js

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

let smoothy = null;
const currentScrollPosition = ref(0);

// sleep time expects milliseconds
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function isSafari() {
  return typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
}

function isIPhone() {
  if (typeof window === 'undefined') return false;
  const iOS = /(iPhone|iPod|iPad)/i.test(window.navigator.userAgent);
  const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);
  const hasTouchScreen = 'maxTouchPoints' in navigator ? navigator.maxTouchPoints > 0 : false;
  return iOS && isMacLike && hasTouchScreen;
}

function isMobile() {
  if (typeof window === 'undefined') return false;
  return /Mobi|Android/i.test(window.navigator.userAgent);
}

const useSmoothScrollSafari = isMobile() && isIPhone();

function initSmoothScroll() {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    // Destroy previous instance if it exists
    if (smoothy) {
      smoothy.kill();
      smoothy = null;
    }

    document.addEventListener('scroll', function (e) {
      e.preventDefault();
    });

    sleep(10).then(() => {
      const smoothScrollConfig = isMobile() ? {
        smooth: 2,
        effects: true,
        smoothTouch: 0,
        normalizeScroll: false,
        allowNestedScroll: false,
        ignoreMobileResize: true,
        onUpdate: (self) => {
            currentScrollPosition.value = self.scrollTop();
          }
      } : {
        smooth: 2,
        effects: true,
        smoothTouch: 0.001,
        normalizeScroll: true,
        allowNestedScroll: true,
        onUpdate: (self) => {
            currentScrollPosition.value = self.scrollTop();
          }
      };

      smoothy = ScrollSmoother.create(smoothScrollConfig);
      smoothy.scrollTo(0, false);

    });
  }
}

function scrollToTop() {
  if (smoothy) {
    smoothy.scrollTo(0, true);
  }
}

function refreshSmoothy() {
  if (smoothy) {
    smoothy.refresh();
  }
}

function pauseSmoothy(isPaused) {
  if (smoothy) {
    smoothy.paused(isPaused);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Expose the functions globally
  if (process.client) {
    window.$smoothScroll = {
      init: initSmoothScroll,
      scrollToTop,
      refreshSmoothy,
      pauseSmoothy,
      useSmoothScrollSafari,
      getSmoothy: () => smoothy,
      getCurrentScrollPosition: () => currentScrollPosition.value
    }

    // Initialize on initial page load
    initSmoothScroll();

    // Reinitialize on route changes
    nuxtApp.hook('page:finish', () => {
      initSmoothScroll();
    });
  }
})