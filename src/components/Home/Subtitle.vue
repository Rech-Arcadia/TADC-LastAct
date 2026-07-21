<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { subtitle } from '@/data/Home/subtitle'
import Button from '@/components/common/button.vue'

const rootEl = useTemplateRef('rootEl')
const eyebrowLineEl = useTemplateRef('eyebrowLineEl')
const eyebrowTextEl = useTemplateRef('eyebrowTextEl')
const titleEl = useTemplateRef('titleEl')
const phraseEl = useTemplateRef('phraseEl')
const actionsEl = useTemplateRef('actionsEl')

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const root = rootEl.value
    const eyebrowLine = eyebrowLineEl.value
    const eyebrowText = eyebrowTextEl.value
    const title = titleEl.value
    const phrase = phraseEl.value
    const actions = actionsEl.value?.querySelectorAll('a') ?? []

    if (!root || !eyebrowLine || !eyebrowText || !title || !phrase || !actions.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set(eyebrowLine, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set([eyebrowText, phrase, ...actions], { opacity: 0 })
    gsap.set(title, { opacity: 0, y: reduced ? 0 : 28, filter: reduced ? 'none' : 'blur(10px)' })
    if (!reduced) {
      gsap.set(phrase, { y: 14 })
      gsap.set(actions, { y: 14, scale: 0.94 })
    }

    const tl = gsap.timeline({ delay: reduced ? 0.2 : 0.15 })

    // La línea se "enciende" como una luz antes de revelar nada más
    tl.to(eyebrowLine, { scaleX: 1, duration: reduced ? 0.3 : 0.5, ease: 'power2.inOut' }).to(
      eyebrowText,
      { opacity: 1, duration: 0.15 },
      '<0.1',
    )

    if (reduced) {
      tl.to([title, phrase, ...actions], { opacity: 1, duration: 0.4 })
      return
    }

    tl
      // Parpadeo breve, como una luz de circo encendiéndose, antes del titular
      .to(eyebrowText, { opacity: 0.2, duration: 0.08, yoyo: true, repeat: 1 })
      // El titular entra enfocándose, como si emergiera de la penumbra
      .to(
        title,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out' },
        '+=0.4',
      )
      .to(phrase, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
      .to(
        actions,
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.35',
      )
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div
    ref="rootEl"
    class="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 px-6 pb-10 sm:inset-x-auto sm:left-10 sm:max-w-sm sm:px-0 sm:pb-16 lg:left-16 lg:max-w-md xl:max-w-lg"
  >
    <div class="flex items-center gap-3 text-[#dfd368]">
      <span ref="eyebrowLineEl" class="h-0.5 w-6 shrink-0 bg-[#dfd368] sm:w-8"></span>
      <span ref="eyebrowTextEl" class="text-xs font-semibold tracking-[0.2em] uppercase">
        {{ subtitle.subtitle }}
      </span>
    </div>

    <h2 ref="titleEl" class="font-semibold text-white">
      {{ subtitle.title }}
    </h2>

    <p ref="phraseEl" class="max-w-xs text-sm font-light text-gray-300 sm:max-w-sm sm:text-base">
      {{ subtitle.phrase }}
    </p>

    <div ref="actionsEl" class="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
      <Button href="#" variant="primary">
        {{ subtitle.ctaPrimary }}
        <template #icon>
          <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
            <path
              d="M5 12h14m0 0-6-6m6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </Button>

      <Button href="https://youtu.be/AjFk1cY265I?si=L-xRPwVQgWoS1HUb" variant="secondary">
        <template #icon>
          <svg viewBox="0 0 24 24" fill="currentColor" class="ml-0.5 h-3.5 w-3.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </template>
        {{ subtitle.ctaSecondary }}
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
