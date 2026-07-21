<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import pomniHand from '@/images/pomniHand1.webp'
import jaxHand from '@/images/jaxHands1.webp'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const hero = document.getElementById('hero')
    const title = document.getElementById('hero-title')

    const splitText = new SplitText(title, {
      type: 'chars',
    })

    // Estado base: las letras quedan atenuadas hasta que el scroll las complete
    gsap.set(splitText.chars, { opacity: 0.15 })

    // Fase 1 — entrada: las letras suben a su sitio al cargar el hero
    gsap.from(splitText.chars, {
      y: 60,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
    })

    gsap.from('#hero-image-jax', {
      yPercent: 100,
      ease: 'power3.out',
      duration: 2.5,
    })

    // Fase 2 — timeline ligado al scroll: se completa la oración y luego baja la imagen
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=1000',
        scrub: true,
        pin: true,
        // #app es display:flex y ScrollTrigger desactiva el pin-spacing en padres flex
        pinSpacing: true,
      },
    })

    tl.to(splitText.chars, {
      opacity: 1,
      ease: 'none',
      stagger: 0.2,
    }).from('#hero-image', {
      yPercent: -100,
      ease: 'power2.inOut',
      duration: 1.5,
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})

//min-h-screen
</script>

<template>
  <main class="relative min-h-dvh w-full overflow-hidden" id="hero">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-10%,--alpha(var(--color-accent-200)/25%),transparent)]"
      aria-hidden="true"
    >
      <div class="mx-auto flex h-full w-full items-center justify-center">
        <h1
          class="text-center text-[clamp(3rem,10.5vw,200px)] font-semibold uppercase leading-none text-white [text-shadow:0_0_2px_rgba(255,255,255,1),0_0_4px_rgba(255,255,255,.8),0_0_16px_rgba(255,255,255,.55)]"
          id="hero-title"
        >
          <span class="block">The Last</span>
          <span class="-mt-[0.15em] block">Act</span>
        </h1>
      </div>
    </div>
    <img
      :src="pomniHand"
      alt=""
      id="hero-image"
      class="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[52vw]"
    />
    <img
      :src="jaxHand"
      alt=""
      id="hero-image-jax"
      class="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto w-[61vw]"
    />
  </main>
</template>

<style scoped></style>
