<script setup lang="ts">
import type { ProductCardItem } from '~/components/product/ProductCard.vue'

const { t, locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `angebote-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trListingPages' : 'deListingPages')
    .where('path', '=', '/angebote')
    .first(),
  { watch: [locale] },
)

const { data: rawProducts } = await useAsyncData(
  () => `angebote-products-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trProducts' : 'deProducts').all(),
  { watch: [locale] },
)

const products = computed<ProductCardItem[]>(() =>
  (rawProducts.value ?? []).map(product => ({
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

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <PageHero
      :title="page.hero.title"
      :subtitle="page.hero.subtitle"
    />
    <div class="bg-white">
      <TheContainer>
        <div class="py-16 lg:py-20">
          <ProductGrid
            :products="products"
            size="large"
            :cta-label="t('cta.jetztSichern')"
          />
        </div>
      </TheContainer>
    </div>
  </div>
</template>
