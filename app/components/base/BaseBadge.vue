<script setup lang="ts">
// CLAUDE.md "AI şablonu gibi durmasın": ALL-CAPS tracked eyebrow yasak — bu yüzden
// normal case, sadece renk/kalınlıkla ayrışan bir rozet.
withDefaults(defineProps<{
  tone?: 'blue' | 'navy' | 'sky'
}>(), {
  tone: 'blue',
})

const toneClasses = {
  blue: 'bg-sky border-border text-blue-600',
  navy: 'bg-navy-800 border-navy-700 text-white',
  sky: 'bg-white border-border text-navy-800',
}
</script>

<template>
  <span
    class="inline-flex items-center gap-2 h-[30px] px-3 rounded-sm border text-sm font-semibold"
    :class="toneClasses[tone]"
  >
    <slot />
  </span>
</template>
