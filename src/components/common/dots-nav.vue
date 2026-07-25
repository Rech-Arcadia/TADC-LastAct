<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

type Section = {
  id: string
  label: string
}

const props = withDefaults(
  defineProps<{
    sections?: Section[]
    side?: 'left' | 'right'
  }>(),
  {
    sections: () => [
      { id: 'hero', label: 'The Last Act' },
      { id: 'jax-void', label: 'El vacío' },
    ],
    side: 'right',
  },
)

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const activeIndex = ref(0)
const progressEl = useTemplateRef<HTMLElement>('progressEl')

let ctx: gsap.Context

let anchors: ScrollTrigger[] = []

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  ctx = gsap.context(() => {
    anchors = props.sections.map((section, i) =>
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: 'top top',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) activeIndex.value = i
        },
      }),
    )

    gsap.fromTo(
      progressEl.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      },
    )
  })
})

onUnmounted(() => {
  ctx?.revert()
  anchors = []
})

function goTo(index: number) {
  const anchor = anchors[index]
  if (!anchor) return

  gsap.to(window, {
    scrollTo: { y: anchor.start, autoKill: true },
    duration: prefersReducedMotion() ? 0 : 1.1,
    ease: 'power2.inOut',
    overwrite: true,
  })
}
</script>

<template>
  <nav
    class="dots-nav fixed top-1/2 z-50 -translate-y-1/2"
    :class="side === 'right' ? 'right-3 sm:right-6' : 'left-3 sm:left-6'"
    aria-label="Navegación de secciones"
  >
    <div
      class="pointer-events-none absolute inset-y-5 left-1/2 w-px -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      <div class="absolute inset-0 bg-white/10"></div>
      <div ref="progressEl" class="dots-nav__progress absolute inset-0 origin-top"></div>
    </div>

    <ul class="relative flex flex-col items-center">
      <li v-for="(section, i) in sections" :key="section.id">
        <button
          type="button"
          class="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          :aria-label="`Ir a ${section.label}`"
          :aria-current="activeIndex === i ? 'true' : undefined"
          @click="goTo(i)"
        >
          <!-- Halo que respira detrás del punto activo -->
          <span
            class="dots-nav__halo absolute h-8 w-8 rounded-full"
            :class="{ 'is-active': activeIndex === i }"
            aria-hidden="true"
          ></span>

          <span
            class="dots-nav__dot relative rounded-full"
            :class="{ 'is-active': activeIndex === i }"
            aria-hidden="true"
          ></span>

          <!-- Etiqueta: entra deslizándose hacia el punto -->
          <span
            class="dots-nav__label pointer-events-none absolute rounded-full border border-white/10 bg-gray-950/80 px-3 py-1 text-[0.6875rem] font-medium tracking-wide whitespace-nowrap text-gray-200 backdrop-blur-sm"
            :class="
              side === 'right' ? 'right-full mr-1 origin-right' : 'left-full ml-1 origin-left'
            "
            :data-side="side"
          >
            {{ section.label }}
          </span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.dots-nav {
  --dot-core: #fcd34d; /* amber-300 */
  --dot-glow: #fbbf24; /* amber-400 */
}

.dots-nav__progress {
  background: linear-gradient(to bottom, #fde68a, var(--dot-glow) 60%, transparent);
}

/* ── Punto ──────────────────────────────────────────────────────────────── */
.dots-nav__dot {
  height: 0.375rem;
  width: 0.375rem;
  background: --alpha(#ffffff / 30%);
  transition:
    height 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    width 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.45s ease,
    box-shadow 0.45s ease;
}

.group:hover .dots-nav__dot:not(.is-active),
.group:focus-visible .dots-nav__dot:not(.is-active) {
  height: 0.5rem;
  width: 0.5rem;
  background: --alpha(#ffffff / 75%);
}

.dots-nav__dot.is-active {
  height: 0.625rem;
  width: 0.625rem;
  background: var(--dot-core);
  box-shadow:
    0 0 0 1px --alpha(#fde68a / 55%),
    0 0 10px 2px --alpha(var(--dot-glow) / 65%),
    0 0 28px 8px --alpha(#f59e0b / 30%);
}

/* ── Halo ───────────────────────────────────────────────────────────────── */
.dots-nav__halo {
  background: radial-gradient(circle, --alpha(var(--dot-glow) / 26%) 0%, transparent 70%);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.dots-nav__halo.is-active {
  opacity: 1;
  animation: dot-breathe 3s ease-in-out infinite;
}

@keyframes dot-breathe {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

/* ── Etiqueta ───────────────────────────────────────────────────────────── */
.dots-nav__label {
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.dots-nav__label[data-side='right'] {
  transform: translateX(0.5rem) scale(0.96);
}

.dots-nav__label[data-side='left'] {
  transform: translateX(-0.5rem) scale(0.96);
}

.group:hover .dots-nav__label,
.group:focus-visible .dots-nav__label {
  opacity: 1;
  transform: translateX(0) scale(1);
}

/* ── Menos movimiento ───────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .dots-nav__dot,
  .dots-nav__halo,
  .dots-nav__label {
    transition-duration: 0.01ms;
  }

  .dots-nav__halo.is-active {
    animation: none;
  }
}
</style>
