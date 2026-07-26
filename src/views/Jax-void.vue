<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import JaxFalling from '@/images/JaxVoid/JaxFalling.webp'
import Memory1 from '@/images/JaxVoid/Memories1.webp'
import Memory2 from '@/images/JaxVoid/Memories2.webp'
import Memory3 from '@/images/JaxVoid/Memories3.webp'
import Memory4 from '@/images/JaxVoid/Memories4.webp'

gsap.registerPlugin(ScrollTrigger)

let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#jax-void',
        start: 'top 70%',
      },
    })

    tl.from('#light', {
      opacity: 0,
      scale: 1.8,
      duration: 1,
    })
      // Un solo tween para todos los recuerdos: arrancan casi invisibles y
      // suben hasta la opacidad que les da el CSS. Con stagger igual a la
      // duración, cada uno empieza justo cuando el anterior acaba; añadir un
      // Memories3 ya no toca el timeline.
      .from(
        '.memory',
        {
          opacity: 0.04,
          duration: 6.4,
          ease: 'power2.out',
          stagger: 1.4,
        },
        // Solapa medio segundo con la luz para que no se sienta a trompicones
        '-=0.5',
      )
      // La pregunta cierra la secuencia. Entra 4s antes del final de los fades:
      // con power2.out los recuerdos ya están asentados mucho antes de que su
      // tween termine, y sin este solape quedaban ~4s en los que no pasa nada.
      // Sigue siendo relativa al final, así que un Memories5 la recoloca sola.
      .fromTo(
        '#question',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 3.5,
          ease: 'power2.out',
        },
        '-=5',
      )
      // Se añade al final del código a propósito: repeat -1 vuelve infinita la
      // duración del timeline, así que a partir de aquí el append por defecto
      // deja de servir. Por eso va con posición absoluta (2s) y de último.
      // El stagger desfasa los recuerdos para que no respiren al unísono, que
      // es lo que delata la animación.
      .to(
        '.memory__frame',
        {
          scale: 1.05,
          yPercent: -3,
          duration: 2.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 1.25,
        },
        2,
      )

    gsap.fromTo(
      '#img-jax-fall',
      {
        y: '-30vh',
      },
      {
        y: '30vh',
        duration: 6.5,
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

    <figure
      class="memory pointer-events-none absolute bottom-[10vh] left-[22vw] w-[11vw]"
      id="img-memory-2"
      aria-hidden="true"
    >
      <div class="memory__frame">
        <img :src="Memory2" alt="" />
      </div>
    </figure>

    <figure
      class="memory pointer-events-none absolute top-[16vh] right-[14vw] w-[11vw]"
      id="img-memory-3"
      aria-hidden="true"
    >
      <div class="memory__frame">
        <img :src="Memory3" alt="" />
      </div>
    </figure>

    <figure
      class="memory pointer-events-none absolute bottom-[16vh] right-[16vw] w-[13vw]"
      id="img-memory-4"
      aria-hidden="true"
    >
      <div class="memory__frame">
        <img :src="Memory4" alt="" />
      </div>
    </figure>

    <div
      class="absolute bottom-[2vh] right-[2vw] flex items-center justify-center text-center leading-snug"
      id="question"
    >
      <h1
        class="text-2xl font-semibold text-white [text-shadow:0_0_1px_rgba(255,255,255,1),0_0_2px_rgba(255,255,255,.8),0_0_4px_rgba(255,255,255,.55)]"
      >
        ¿Haz hecho algo de lo que te arrepientes...?
      </h1>
    </div>
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
  filter: grayscale(0.82) brightness(1.2) contrast(0.75) blur(0.2px);
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
