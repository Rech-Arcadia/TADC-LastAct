<script setup lang="ts">
import { computed, ref } from 'vue'
import { characters } from '@/data/InfoCharacters/characters'

import Cube from '@/images/InfoCharacters/Cube.webp'
import Eye from '@/images/InfoCharacters/Eye.webp'
import Teapot from '@/images/InfoCharacters/Teapot.webp'
import Phonograph from '@/images/InfoCharacters/Phonograph.webp'
import Flowerpot from '@/images/InfoCharacters/Flowerpot.webp'

const selectedId = ref(characters[0].id)

const selected = computed(() => characters.find((c) => c.id === selectedId.value) ?? characters[0])
</script>

<template>
  <main class="relative min-h-dvh w-full overflow-hidden" id="info-characters">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_28%_45%_at_28%_60%,--alpha(var(--color-accent-300)/14%),transparent)]"
      ></div>

      <div class="absolute bottom-[-28vh] left-0 w-[60vw]">
        <img :src="Cube" alt="" class="w-full" />

        <Transition name="char">
          <img
            v-if="selected.image"
            :key="selected.id"
            :src="selected.image"
            alt=""
            class="absolute bottom-[42vh] left-[21vw] w-[20vw]"
          />
        </Transition>
      </div>

      <img :src="Eye" alt="" class="absolute bottom-[34vh] left-[41vw] w-[8vw]" />
      <img :src="Teapot" alt="" class="absolute bottom-[30vh] left-[10vw] w-[8vw]" />
      <img :src="Phonograph" alt="" class="absolute bottom-[-6vh] left-[37vw] w-[12vw]" />
      <img :src="Flowerpot" alt="" class="absolute bottom-[2vh] left-[10vw] w-[8vw]" />
    </div>

    <!-- ── Panel: ficha del personaje seleccionado ──────────────────────── -->
    <div
      class="relative flex min-h-dvh items-center justify-center px-6 lg:justify-end lg:pr-[12vw]"
    >
      <section class="w-full max-w-[28rem]">
        <header class="flex items-start gap-4">
          <span
            class="grid size-[12vh] shrink-0 place-items-center overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <img v-if="selected.avatar" :src="selected.avatar" alt="" class="w-full" />
          </span>

          <div class="min-w-0">
            <h2 class="text-[60px] text-white">{{ selected.name }}</h2>

            <div class="mt-2 flex items-center gap-1.5" aria-hidden="true">
              <span class="size-1.5 rounded-full bg-accent-400"></span>
              <span class="h-px w-16 bg-gradient-to-r from-accent-400 to-accent-400/30"></span>
              <span class="size-1.5 rounded-full bg-accent-400"></span>
            </div>

            <p class="mt-4 text-lg leading-relaxed font-semibold text-white/90">
              {{ selected.description }}
            </p>
          </div>
        </header>

        <hr class="my-6 border-white/15" />

        <ul class="mx-auto flex max-w-[19rem] flex-wrap justify-center gap-4">
          <li v-for="character in characters" :key="character.id">
            <button
              type="button"
              class="group grid size-16 cursor-pointer place-items-center overflow-hidden rounded-full transition disabled:cursor-not-allowed"
              :class="
                selectedId === character.id
                  ? 'ring-2 ring-accent-400 shadow-[0_0_16px_-2px_var(--color-accent-500)]'
                  : 'opacity-60 hover:opacity-100 hover:ring-2 hover:ring-white/25 disabled:opacity-25 disabled:hover:ring-0'
              "
              :disabled="!character.avatar"
              :aria-pressed="selectedId === character.id"
              :aria-label="character.avatar ? character.name : `${character.name} (próximamente)`"
              @click="selectedId = character.id"
            >
              <img
                v-if="character.avatar"
                :src="character.avatar"
                alt=""
                class="w-full transition-transform duration-300 group-hover:scale-105"
              />
              <span
                v-else
                class="grid size-full place-items-center rounded-full border border-dashed border-white/25 text-sm font-semibold text-white/40"
              >
                {{ character.name.charAt(0) }}
              </span>
            </button>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.char-enter-active,
.char-leave-active {
  transition:
    opacity 0.45s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.char-enter-from,
.char-leave-to {
  opacity: 0;
  transform: translateY(1.5rem);
}

/* @media (prefers-reduced-motion: reduce) {
  .char-enter-active,
  .char-leave-active {
    transition-duration: 0.01ms;
  }
} */
</style>
