<script setup lang="ts">
import type { ProductCardItem } from './ProductCard.vue'

withDefaults(defineProps<{
  products: ProductCardItem[]
  size?: 'default' | 'large'
  ctaLabel?: string
}>(), {
  size: 'default',
  ctaLabel: undefined,
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
    <ProductCard
      v-for="product in products"
      :key="product.slug"
      :product="product"
      :size="size"
      :cta-label="ctaLabel"
    />
  </div>
</template>
