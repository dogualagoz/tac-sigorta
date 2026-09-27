<script setup lang="ts">
import type { HomeProductsTeaser } from '~/types/home'
import type { ProductCardItem } from '~/components/product/ProductCard.vue'

defineProps<{
  productsTeaser: HomeProductsTeaser
}>()

const { locale } = useI18n()

const { data: rawProducts } = await useAsyncData(
  () => `products-teaser-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trProducts' : 'deProducts').all(),
  { watch: [locale] },
)

// zod'daki `.default(false)` alanları content'in üretilmiş tipinde opsiyonel
// bırakıyor — ProductCardItem'ın kesin boolean beklediği yerde normalize edilir.
const products = computed<ProductCardItem[]>(() =>
  (rawProducts.value ?? []).filter(product => product.featured).map(product => ({
    slug: product.slug,
    name: product.name,
    icon: product.icon,
    benefit: product.benefit,
    price: product.price,
    period: product.period,
    badge: product.badge,
    approved: product.approved ?? false,
  })),
)
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h2 class="font-heading text-2xl font-bold leading-tight text-navy-800">
              {{ productsTeaser.title }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-500">
              {{ productsTeaser.description }}
            </p>
          </div>
          <NuxtLink
            to="/angebote"
            class="whitespace-nowrap font-heading text-sm font-semibold text-blue-600 hover:text-navy-800"
          >
            {{ productsTeaser.linkLabel }}
          </NuxtLink>
        </div>
        <div class="mt-8">
          <ProductGrid :products="products" />
        </div>
      </div>
    </TheContainer>
  </section>
</template>
