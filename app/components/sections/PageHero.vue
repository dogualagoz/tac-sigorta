<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string | null
}>()
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <TheBreadcrumb />
      <div class="pb-14 pt-2 lg:pb-20">
        <h1
          lang="de"
          class="max-w-[720px] font-heading text-3xl font-bold leading-tight tracking-tight text-navy-800 md:text-4xl"
        >
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          class="mt-5 max-w-[640px] text-lg leading-relaxed text-navy-500"
        >
          {{ subtitle }}
        </p>
      </div>
    </TheContainer>
  </section>
</template>
