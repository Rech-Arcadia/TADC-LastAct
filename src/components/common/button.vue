<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary'
  }>(),
  {
    variant: 'primary',
  },
)
</script>

<template>
  <a
    :href="href"
    class="inline-flex items-center uppercase tracking-wide transition-colors"
    :class="
      variant === 'primary'
        ? 'gap-2 rounded-full bg-amber-400 px-5 py-3 text-xs font-semibold text-gray-950 hover:bg-amber-300 sm:px-6 sm:text-sm'
        : 'gap-3 text-xs font-semibold text-amber-300 sm:text-sm'
    "
  >
    <span
      v-if="variant === 'secondary'"
      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/80 sm:h-10 sm:w-10"
    >
      <slot name="icon" />
    </span>

    <slot />

    <slot v-if="variant === 'primary'" name="icon" />
  </a>
</template>

<style scoped></style>
