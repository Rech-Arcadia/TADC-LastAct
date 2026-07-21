<script setup lang="ts">
import { subtitle } from '@/data/Home/subtitle'
import Button from '@/components/common/button.vue'
</script>

<template>
  <div
    class="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 px-6 pb-10 sm:inset-x-auto sm:left-10 sm:max-w-sm sm:px-0 sm:pb-16 lg:left-16 lg:max-w-md xl:max-w-lg"
  >
    <div class="flex items-center gap-3 text-[#dfd368]">
      <span class="h-0.5 w-6 shrink-0 bg-[#dfd368] sm:w-8"></span>
      <span class="text-xs font-semibold tracking-[0.2em] uppercase">
        {{ subtitle.subtitle }}
      </span>
    </div>

    <h2 class="font-semibold text-white">
      {{ subtitle.title }}
    </h2>

    <p class="max-w-xs text-sm font-light text-gray-300 sm:max-w-sm sm:text-base">
      {{ subtitle.phrase }}
    </p>

    <div class="mt-2 flex flex-wrap items-center gap-x-6 gap-y-4">
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
