<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JaxFalling from '@/images/JaxFalling.webp'

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    // La caída arranca cuando la sección entra en viewport, no al montar
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
    >
      <img
        :src="JaxFalling"
        alt="Jax Falling"
        class="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[21vw] opacity-50"
        id="img-jax-fall"
      />
    </div>
  </main>
</template>

<style scoped></style>
