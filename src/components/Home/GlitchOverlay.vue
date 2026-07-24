<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { gsap } from 'gsap'

const props = withDefaults(
  defineProps<{
    text?: string
    /** Bandas horizontales de desplazamiento */
    sliceCount?: number
    /** Bloques de color tipo cartoon */
    blockCount?: number
  }>(),
  { text: 'No deberias amarme', sliceCount: 9, blockCount: 6 },
)

const rootEl = useTemplateRef<HTMLElement>('rootEl')
const tintEl = useTemplateRef<HTMLElement>('tintEl')
const baseEl = useTemplateRef<HTMLElement>('baseEl')
const cyanEl = useTemplateRef<HTMLElement>('cyanEl')
const magentaEl = useTemplateRef<HTMLElement>('magentaEl')
const violetEl = useTemplateRef<HTMLElement>('violetEl')
const slicesEl = useTemplateRef<HTMLElement>('slicesEl')
const blocksEl = useTemplateRef<HTMLElement>('blocksEl')
const scanEl = useTemplateRef<HTMLElement>('scanEl')
const noiseEl = useTemplateRef<HTMLElement>('noiseEl')
const flashEl = useTemplateRef<HTMLElement>('flashEl')

const rnd = gsap.utils.random

function build(): gsap.core.Timeline {
  const tl = gsap.timeline()

  const chans = [cyanEl.value, magentaEl.value, violetEl.value].filter(Boolean) as HTMLElement[]
  const slices = slicesEl.value
    ? (gsap.utils.toArray('.glitch-slice', slicesEl.value) as HTMLElement[])
    : []
  const blocks = blocksEl.value
    ? (gsap.utils.toArray('.glitch-block', blocksEl.value) as HTMLElement[])
    : []

  // Estado inicial: todo apagado
  tl.set(rootEl.value, { autoAlpha: 1 })
    .set(tintEl.value, { opacity: 0 })
    .set([baseEl.value, ...chans], { opacity: 0 })
    .set(chans, { xPercent: 0, yPercent: 0 })
    .set(slices, { opacity: 0, xPercent: 0 })
    .set(blocks, { opacity: 0 })
    .set([scanEl.value, noiseEl.value, flashEl.value], { opacity: 0 })

  // ── Fase A · Encendido (parpadeo de arranque) ──────────────────────────
  tl.to(tintEl.value, { opacity: 0.9, duration: 0.12, ease: 'steps(3)' }, 0)
    .to(
      flashEl.value,
      { opacity: 0.85, duration: 0.06, ease: 'steps(1)', yoyo: true, repeat: 3 },
      0,
    )
    .to([baseEl.value, ...chans], { opacity: 1, duration: 0.08, ease: 'steps(1)' }, 0.06)
    .to([scanEl.value, noiseEl.value], { opacity: 1, duration: 0.1, ease: 'steps(2)' }, 0.06)

  // ── Fase B · Pico de glitch ────────────────────────────────────────────
  // Aberración cromática: cada canal salta en direcciones opuestas.
  const jitter = (el: HTMLElement, dir: number) =>
    tl.to(
      el,
      {
        keyframes: {
          xPercent: [0, dir * 3, dir * -2, dir * 4, dir * -1, 0],
          yPercent: [0, -1, 1.5, -0.5, 0.8, 0],
          easeEach: 'steps(1)',
        },
        duration: 1.1,
      },
      0.18,
    )
  if (cyanEl.value) jitter(cyanEl.value, -1)
  if (magentaEl.value) jitter(magentaEl.value, 1)
  if (violetEl.value) jitter(violetEl.value, -1.6)

  // Bandas horizontales que se desplazan a saltos.
  slices.forEach((s, i) => {
    tl.to(
      s,
      {
        opacity: rnd(0.5, 1),
        xPercent: rnd(-14, 14),
        duration: rnd(0.08, 0.18),
        ease: 'steps(1)',
        repeat: rnd(2, 5, 1),
        yoyo: true,
      },
      0.18 + i * 0.03,
    )
  })

  // Bloques cartoon que aparecen y desaparecen de golpe.
  blocks.forEach((b, i) => {
    tl.to(
      b,
      {
        opacity: rnd(0.7, 1),
        duration: rnd(0.06, 0.12),
        ease: 'steps(1)',
        repeat: rnd(1, 4, 1),
        yoyo: true,
      },
      0.2 + i * 0.05,
    )
  })

  // Parpadeo del propio contenedor: sensación de señal inestable.
  tl.to(
    rootEl.value,
    { opacity: 0.72, duration: 0.05, ease: 'steps(1)', yoyo: true, repeat: 5 },
    0.35,
  )
    .to(scanEl.value, { yPercent: 6, duration: 1, ease: 'none' }, 0.18)
    .to(
      noiseEl.value,
      { opacity: 0.55, duration: 0.08, ease: 'steps(1)', yoyo: true, repeat: 6 },
      0.3,
    )

  // ── Fase C · Estallido final + apagado ─────────────────────────────────
  tl.to(flashEl.value, { opacity: 1, duration: 0.08, ease: 'steps(1)' }, 1.35)
    .to(chans, { xPercent: 0, yPercent: 0, duration: 0.25, ease: 'steps(2)' }, 1.4)
    .to(flashEl.value, { opacity: 0, duration: 0.2, ease: 'power1.out' }, 1.5)
    .to(
      [slices, blocks, scanEl.value, noiseEl.value].flat(),
      { opacity: 0, duration: 0.2, ease: 'steps(2)' },
      1.55,
    )
    .to(
      [tintEl.value, baseEl.value, ...chans],
      { opacity: 0, duration: 0.3, ease: 'power2.out' },
      1.7,
    )
    .set(rootEl.value, { autoAlpha: 0 })

  return tl
}

defineExpose({ build })
</script>

<template>
  <div
    ref="rootEl"
    class="glitch-overlay pointer-events-none fixed inset-0 z-[60] flex items-center justify-center overflow-hidden"
    style="visibility: hidden"
    aria-hidden="true"
  >
    <!-- Tinte de fondo: convierte el glitch en una toma a pantalla completa -->
    <div ref="tintEl" class="absolute inset-0 bg-background"></div>

    <!-- Bloques cartoon en la paleta de marca -->
    <div ref="blocksEl" class="absolute inset-0">
      <span
        class="glitch-block absolute left-[6%] top-[18%] h-[7%] w-[22%]"
        style="background: var(--color-accent-600)"
      ></span>
      <span
        class="glitch-block absolute right-[8%] top-[30%] h-[4%] w-[16%]"
        style="background: #dfd368"
      ></span>
      <span
        class="glitch-block absolute left-[12%] bottom-[22%] h-[5%] w-[28%]"
        style="background: #22e0ff"
      ></span>
      <span
        class="glitch-block absolute right-[14%] bottom-[16%] h-[9%] w-[12%]"
        style="background: var(--color-accent-400)"
      ></span>
      <span
        class="glitch-block absolute left-[40%] top-[8%] h-[3%] w-[20%]"
        style="background: #ff3ea5"
      ></span>
      <span
        class="glitch-block absolute right-[30%] bottom-[38%] h-[6%] w-[10%]"
        style="background: #dfd368"
      ></span>
    </div>

    <!-- Bandas horizontales de desplazamiento -->
    <div ref="slicesEl" class="absolute inset-0">
      <span
        v-for="i in props.sliceCount"
        :key="i"
        class="glitch-slice absolute left-0 w-full"
        :style="{
          top: `${(i - 1) * (100 / props.sliceCount)}%`,
          height: `${100 / props.sliceCount}%`,
          background:
            i % 2 === 0
              ? 'linear-gradient(90deg, transparent, --alpha(var(--color-accent-500) / 55%), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(34, 224, 255, 0.45), transparent)',
          mixBlendMode: 'screen',
        }"
      ></span>
    </div>

    <!-- Título con aberración cromática (cian / magenta / violeta + base) -->
    <div class="relative select-none">
      <span
        ref="baseEl"
        class="glitch-title text-white"
        style="text-shadow: 0 0 18px rgba(255, 255, 255, 0.35)"
        >{{ props.text }}</span
      >
      <span ref="cyanEl" class="glitch-title glitch-channel" style="color: #22e0ff">{{
        props.text
      }}</span>
      <span ref="magentaEl" class="glitch-title glitch-channel" style="color: #ff3ea5">{{
        props.text
      }}</span>
      <span
        ref="violetEl"
        class="glitch-title glitch-channel"
        style="color: var(--color-accent-400)"
        >{{ props.text }}</span
      >
    </div>

    <!-- Líneas de barrido tipo CRT -->
    <div ref="scanEl" class="glitch-scanlines absolute inset-0"></div>

    <!-- Ruido digital -->
    <div ref="noiseEl" class="glitch-noise absolute inset-0"></div>

    <!-- Destello a pantalla completa -->
    <div ref="flashEl" class="absolute inset-0 bg-white"></div>
  </div>
</template>

<style scoped>
.glitch-title {
  font-family: var(--font-heading, 'Fredoka', sans-serif);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 1;
  font-size: clamp(3rem, 12vw, 12rem);
  white-space: nowrap;
}

/* Los canales de color se apilan exactamente sobre la base */
.glitch-channel {
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
  will-change: transform, opacity;
}

.glitch-scanlines {
  background-image: repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0px,
    rgba(0, 0, 0, 0) 2px,
    rgba(0, 0, 0, 0.35) 3px,
    rgba(0, 0, 0, 0.35) 4px
  );
  mix-blend-mode: multiply;
  will-change: opacity, transform;
}

.glitch-noise {
  /* Ruido generado con SVG feTurbulence, embebido como data-URI */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  mix-blend-mode: overlay;
  will-change: opacity;
}

/* Respeta la preferencia de menos movimiento */
@media (prefers-reduced-motion: reduce) {
  .glitch-overlay {
    display: none;
  }
}
</style>
