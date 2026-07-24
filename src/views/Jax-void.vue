<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JaxFalling from '@/images/JaxFalling.webp'

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  const hero = document.getElementById('hero')
  const jaxFalling = document.querySelector<HTMLImageElement>('#hero img')

  if (!hero || !jaxFalling) return

  gsap.from('#img-jax-fall', {
    startAt: { yPercent: 80 },
    yPercent: -900,
    ease: 'power3.out',
    duration: 8.5,
  })
})
</script>

<template>
  <main class="relative min-h-dvh w-full overflow-hidden" id="hero">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_15%_85%_at_50%_10%,--alpha(var(--color-accent-200)/25%),transparent)]"
      aria-hidden="true"
    >
      <img
        :src="JaxFalling"
        alt="Jax Falling"
        class="pointer-events-none absolute inset-x-0 mx-auto w-[21vw] opacity-50"
        id="img-jax-fall"
      />
    </div>
  </main>
</template>

<style scoped></style>
