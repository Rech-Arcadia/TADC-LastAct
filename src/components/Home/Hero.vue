<script>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(SplitText)

const split = new SplitText('#hero-title', { type: 'lines, words, chars' })

SplitText.create('#hero-title', {
  type: 'lines, words',
  mask: 'lines',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.words, {
      duration: 1,
      y: 100,
      autoAlpha: 0,
      stagger: 0.05,
    })
  },
})
</script>

<template>
  <main class="relative min-h-screen w-full overflow-hidden">
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_-10%,--alpha(var(--color-accent-200)/25%),transparent)]"
      aria-hidden="true"
    >
      <div class="flex h-full w-full items-center justify-center">
        <h1 class="text-10xl sm:text-6xl lg:text-7xl" id="hero-title">The Last Act</h1>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
