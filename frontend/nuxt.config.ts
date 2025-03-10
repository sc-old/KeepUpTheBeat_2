import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    }
  },

  css: [
    '~/assets/css/main.css',
  ],

  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    'nuxt-particles',
    ['nuxt-mail', {
      message: {
        from: 'shaun@gravitylabs.lol', // Ensure this field is set
        to: ['shaun@gravitylabs.lol', 'aaron@gravitylabs.lol'],
      },
      smtp: {
        host: "mail.spacemail.com",
        port: 465,
        auth: {
          user: 'shaun@gravitylabs.lol',
          pass: '',
        },
      },
    }],
  ],

  build: {
    transpile: ['gsap', 'swiper'],
  },

  nitro: {
    preset: 'node-server',
  },

  runtimeConfig: {
    public: {
      flask_url: process.env.FLASK_URL,
      threePath: process.env.THREEPATH
    }
  },

  plugins: ['~/plugins/smoothScroller.js'],

  devServer: {
    port: 3000,
    host: '127.0.0.1',
  },

  particles: {
    mode: 'full', // 'full' | 'slim' | 'basic' | 'custom'
    lazy: true
  },

  vite: {
    plugins: [
      wasm(),
      topLevelAwait()
    ],
    worker: {
      format: 'es', // Switch to the es format
      plugins: () => [wasm(), topLevelAwait()],
    },
    build: {
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
      rollupOptions: {
        output: {
          format: 'es', // Ensure using the "es" module format
        },
      },
    },
    server: {
      fs: {
        strict: false // prevents this error ------>> The request url "index.mjs" is outside of Vite serving allow list.
      },
    },
    optimizeDeps: {
      exclude: [
        'three', // to prevent Vite's code chunking which causes an error
      ],
      esbuildOptions: {
        target: 'esnext', // Three.js uses top-level await
      },
    },
  },

  compatibilityDate: '2024-08-09',

  image: {
    formats: ['webp', 'avif', 'png', 'jpg'], // Specify supported formats
    screens: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  }
});
