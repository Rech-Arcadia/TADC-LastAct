<script setup lang="ts">
import Cube from '@/images/InfoCharacters/Cube.webp'
import Pomni from '@/images/InfoCharacters/PomniChar.webp'

import Eye from '@/images/InfoCharacters/Eye.webp'
import Teapot from '@/images/InfoCharacters/Teapot.webp'
import Phonograph from '@/images/InfoCharacters/Phonograph.webp'
import Flowerpot from '@/images/InfoCharacters/Flowerpot.webp'

import PomniDoor from '@/images/InfoCharacters/PomniDoor.webp'

const characters = [
  {
    name: 'Pomni',
    description:
      'Pomni supera sus miedos, se enfrenta a Caine y viaja a la mente de Jax. Descubre que todos son copias digitales y consuela a sus amigos en el circo.',
    image: Pomni,
  },
]
</script>

<template>
  <main class="relative min-h-dvh w-full overflow-hidden" id="hero">
    <div class="pointer-events-none absolute bottom-[-28vh]">
      <div class="pointer-events-none absolute bottom-[42vh] left-[21vw]">
        <img :src="Pomni" alt="Pomni" class="w-[20vw] mx-auto" />
      </div>
      <img :src="Cube" alt="Cube" class="w-[60vw] mx-auto" />
    </div>

    <div class="pointer-events-none absolute bottom-[34vh] left-[41vw]">
      <img :src="Eye" alt="Eye" class="w-[8vw] mx-auto" />
    </div>

    <div class="pointer-events-none absolute bottom-[30vh] left-[10vw]">
      <img :src="Teapot" alt="Teapot" class="w-[8vw] mx-auto" />
    </div>

    <div class="pointer-events-none absolute bottom-[-6vh] left-[37vw]">
      <img :src="Phonograph" alt="Phonograph" class="w-[12vw] mx-auto" />
    </div>

    <div class="pointer-events-none absolute bottom-[2vh] left-[10vw]">
      <img :src="Flowerpot" alt="Flowerpot" class="w-[8vw] mx-auto" />
    </div>

    <div class="flex flex-col items-center justify-center gap-4 absolute bottom-[10vh] left-[">
      <img :src="PomniDoor" alt="Pomni Door" class="w-[8vw] mx-auto" />
    </div>
  </main>
</template>

<style></style>
