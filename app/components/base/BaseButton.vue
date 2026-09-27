<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// CLAUDE.md "Design system": buton min yükseklik 46px, radius 6px, gölge yok, gradient yok.
type Variant = 'primary' | 'secondary' | 'ghost' | 'outline-light'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  href?: string
  variant?: Variant
  disabled?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  disabled: false,
  block: false,
  type: 'button',
})

const variantClasses: Record<Variant, string> = {
  'primary': 'bg-blue-600 text-white hover:bg-navy-800',
  'secondary': 'bg-white text-navy-800 border border-navy-800 hover:bg-sky',
  'ghost': 'bg-white text-navy-800 border border-border hover:bg-sky',
  'outline-light': 'bg-transparent text-white border border-blue-300 hover:bg-navy-700',
}

const classes = computed(() => [
  'inline-flex items-center justify-center gap-2 min-h-[46px] px-6 rounded-input font-heading font-semibold text-md leading-none transition-colors',
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
  'disabled:opacity-50 disabled:pointer-events-none',
  props.block ? 'w-full' : '',
  variantClasses[props.variant],
])
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
  >
    <slot />
  </button>
</template>
