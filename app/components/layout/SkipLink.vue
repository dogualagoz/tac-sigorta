<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:inline-flex focus:min-h-[46px] focus:items-center focus:rounded-input focus:bg-blue-600 focus:px-5 focus:text-white focus:font-semibold"
  >
    {{ t('a11y.skipLink') }}
  </a>
</template>
