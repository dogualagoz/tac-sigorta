<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `kontakt-${locale.value}`,
  () => queryCollection((locale.value as string) === 'tr' ? 'trKontaktPage' : 'deKontaktPage')
    .where('path', '=', '/kontakt')
    .first(),
  { watch: [locale] },
)

const { data: site } = await useAsyncData('site-config', () => queryCollection('site').first())

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
        <div class="grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-20">
          <div>
            <div class="flex items-start gap-3">
              <BaseIcon
                name="phone"
                :size="22"
                class="mt-0.5 shrink-0 text-blue-600"
              />
              <div>
                <a
                  :href="`tel:${site?.phone}`"
                  class="font-heading text-md font-semibold text-navy-800 hover:text-blue-600"
                >{{ site?.phone }}</a>
                <p
                  v-if="site?.openingHours"
                  class="mt-1 text-sm text-slate-500"
                >
                  {{ site.openingHours }}
                </p>
              </div>
            </div>
            <div class="mt-6 flex items-start gap-3">
              <BaseIcon
                name="mail"
                :size="22"
                class="mt-0.5 shrink-0 text-blue-600"
              />
              <a
                :href="`mailto:${site?.email}`"
                class="font-heading text-md font-semibold text-navy-800 hover:text-blue-600"
              >{{ site?.email }}</a>
            </div>
            <div class="mt-6 flex items-start gap-3">
              <BaseIcon
                name="pin"
                :size="22"
                class="mt-0.5 shrink-0 text-blue-600"
              />
              <p class="leading-relaxed text-navy-800">
                {{ site?.companyName }} {{ site?.legalForm }}<br>
                {{ site?.street }}<br>
                {{ site?.postalCode }} {{ site?.city }}
              </p>
            </div>
          </div>

          <BaseCard padding="lg">
            <h2 class="font-heading text-lg font-semibold text-navy-800">
              {{ page.formTitle }}
            </h2>
            <div class="mt-5">
              <KontaktForm />
            </div>
          </BaseCard>
        </div>
      </TheContainer>
    </div>
  </div>
</template>
