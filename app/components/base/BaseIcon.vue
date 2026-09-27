<script setup lang="ts">
import type { IconName } from '~/types/icon'

// CLAUDE.md "İkonlar": tek set, line stil, tek stroke kalınlığı (1.5px), emoji yok.
const ICONS: Record<IconName, string[]> = {
  'chevron-down': ['M6 9l6 6 6-6'],
  'plus': ['M12 5v14', 'M5 12h14'],
  'minus': ['M5 12h14'],
  'check': ['M5 13l4 4L19 7'],
  'phone': [
    'M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.2c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z',
  ],
  'mail': ['M4 5h16v14H4z', 'M4 6l8 7 8-7'],
  'arrow-right': ['M4 12h16', 'M13 5l7 7-7 7'],
  'shield': ['M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z'],
  'menu': ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  'close': ['M6 6l12 12', 'M18 6L6 18'],
  'pin': ['M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'],
}

const props = withDefaults(defineProps<{
  name: IconName
  size?: number
}>(), {
  size: 20,
})

const paths = computed(() => ICONS[props.name] ?? [])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="d in paths"
      :key="d"
      :d="d"
    />
  </svg>
</template>
