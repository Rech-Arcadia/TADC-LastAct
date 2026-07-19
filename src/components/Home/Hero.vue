<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

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

    // Fase 2 — con el scroll, la oración se completa letra por letra
    gsap.to(splitText.chars, {
      opacity: 1,
      ease: 'none',
      stagger: 0.2,
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: '+=700',
        scrub: true,
        pin: true,
        // #app es display:flex y ScrollTrigger desactiva el pin-spacing en padres flex
        pinSpacing: true,
      },
    })
  })
})

onUnmounted(() => {
  ctx?.revert()
})

//min-h-screen
</script>

<template>
  <main class="relative min-h-screen w-screen overflow-hidden" id="hero">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-10%,--alpha(var(--color-accent-200)/25%),transparent)]"
      aria-hidden="true"
    >
      <div class="mx-auto flex h-full w-full items-center justify-center">
        <h1 class="text-10xl sm:text-6xl lg:text-[200px] uppercase" id="hero-title">
          The Last Act
        </h1>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
