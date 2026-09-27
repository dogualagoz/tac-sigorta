<script setup lang="ts">
// CLAUDE.md "Design system": kart radius 8px, gölge yok (varsayılan), hover'da çok hafif.
withDefaults(defineProps<{
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
}>(), {
  padding: 'md',
  hoverable: false,
})

const paddingClasses = {
  sm: 'p-5',
  md: 'p-6',
  lg: 'p-7',
}
</script>

<template>
  <div
    class="bg-white border border-border rounded-card"
    :class="[paddingClasses[padding], hoverable ? 'transition-shadow hover:shadow-[0_2px_10px_rgba(11,46,89,0.08)]' : '']"
  >
    <slot />
  </div>
</template>
