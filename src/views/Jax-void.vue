<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JaxFalling from '@/images/JaxFalling.webp'
import Memory1 from '@/images/Memories1.webp'

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('#light', {
      opacity: 0,
      duration: 1,
      scale: 1.8,
    })

    gsap.fromTo(
      '#img-jax-fall',
      {
        y: '-30vh',
      },
      {
        y: '30vh',
        duration: 3.5,
        scrollTrigger: {
          trigger: '#jax-void',
          start: 'top bottom',
          end: '+=1000',
        },
      },
    )

    gsap.to('.memory__frame', {
      yPercent: -3,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <main class="relative min-h-dvh w-full overflow-hidden" id="jax-void">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_15%_85%_at_50%_10%,--alpha(var(--color-accent-200)/25%),transparent)]"
      aria-hidden="true"
      id="light"
    >
      <img
        :src="JaxFalling"
        alt="Jax Falling"
        class="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[21vw] opacity-50"
        id="img-jax-fall"
      />
    </div>

    <figure
      class="memory pointer-events-none absolute top-[20vh] left-[10vw] w-[15vw]"
      id="img-memory-1"
      aria-hidden="true"
    >
      <div class="memory__frame">
        <img :src="Memory1" alt="" />
      </div>
    </figure>
  </main>
</template>

<style scoped>
.memory {
  filter: drop-shadow(0 0 1.6vw rgb(255 255 255 / 10%));
}

.memory__frame {
  position: relative;
  aspect-ratio: 1;
  -webkit-mask-image: radial-gradient(circle at 50% 42%, #000 36%, transparent 72%);
  mask-image: radial-gradient(circle at 50% 52%, #000 26%, transparent 72%);
}

/* Descolorido: casi gris, levantado y con poco contraste. El blur le quita el
   filo digital — los recuerdos no están enfocados. */
.memory__frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  filter: grayscale(0.82) brightness(1.2) contrast(0.75) blur(0.6px);
}

/* Sombra interna: hunde el borde en el color del fondo (#0B0A0D) en vez de
   dibujar un contorno. En un <img> el inset se pintaría por debajo. */
.memory__frame::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 3vw 1vw rgb(11 10 13 / 70%);
  background: radial-gradient(circle at 50% 42%, transparent 35%, rgb(11 10 13 / 65%));
}
</style>
