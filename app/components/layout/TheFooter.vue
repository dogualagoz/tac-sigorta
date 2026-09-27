<script setup lang="ts">
const { t } = useI18n()
const { data: site } = await useAsyncData('site-config', () => queryCollection('site').first())

const year = new Date().getFullYear()

const produktLinks = computed(() => [
  { label: t('nav.insolvenzabsicherung'), to: '/insolvenzabsicherung' },
  { label: t('nav.sicherungsschein'), to: '/sicherungsschein' },
  { label: t('nav.reiseversicherungen'), to: '/reiseversicherungen' },
  { label: t('footer.links.gruppenIncoming'), placeholder: true },
])

const serviceLinks = computed(() => [
  { label: t('header.topbar.maklerportal'), placeholder: true },
  { label: t('footer.links.downloadcenter'), placeholder: true },
  { label: t('header.topbar.schadenmeldung'), placeholder: true },
  { label: t('nav.faq'), to: '/faq' },
])

const unternehmenLinks = computed(() => [
  { label: t('nav.ueberUns'), to: '/ueber-uns' },
  { label: t('footer.links.aktuelles'), placeholder: true },
  { label: t('footer.links.karriere'), placeholder: true },
  { label: t('nav.kontakt'), to: '/kontakt' },
])

const legalLinks = computed(() => [
  { label: t('footer.impressum'), to: '/impressum' },
  { label: t('footer.datenschutz'), to: '/datenschutz' },
  { label: t('footer.agb'), to: '/agb' },
])
</script>

<template>
  <footer class="bg-navy-900 text-border-strong">
    <TheContainer>
      <div class="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-11 lg:py-16">
        <div>
          <div class="flex items-center gap-2.5">
            <span class="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-white font-heading text-sm font-bold text-white">TSC</span>
            <span class="font-heading text-base font-bold tracking-tight text-white">{{ t('header.brandName') }}</span>
          </div>
          <p class="mt-4 leading-relaxed">
            {{ site?.companyName }} {{ site?.legalForm }}<br>
            {{ site?.street }}<br>
            {{ site?.postalCode }} {{ site?.city }}
          </p>
          <p class="mt-3.5 leading-relaxed">
            HRB: {{ site?.hrb }}<br>
            BaFin-Register: {{ site?.bafinRegister }}
          </p>
        </div>

        <div>
          <div class="text-sm font-semibold text-blue-300">
            {{ t('footer.columns.produkte') }}
          </div>
          <div class="mt-3.5 flex flex-col gap-2.5">
            <template
              v-for="link in produktLinks"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.placeholder"
                :to="link.to"
                class="hover:text-white"
              >{{ link.label }}</NuxtLink>
              <span
                v-else
                class="cursor-not-allowed opacity-70"
                title="TODO(TSC): teyit bekliyor"
              >{{ link.label }}</span>
            </template>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-blue-300">
            {{ t('footer.columns.service') }}
          </div>
          <div class="mt-3.5 flex flex-col gap-2.5">
            <template
              v-for="link in serviceLinks"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.placeholder"
                :to="link.to"
                class="hover:text-white"
              >{{ link.label }}</NuxtLink>
              <span
                v-else
                class="cursor-not-allowed opacity-70"
                title="TODO(TSC): teyit bekliyor"
              >{{ link.label }}</span>
            </template>
          </div>
        </div>

        <div>
          <div class="text-sm font-semibold text-blue-300">
            {{ t('footer.columns.unternehmen') }}
          </div>
          <div class="mt-3.5 flex flex-col gap-2.5">
            <template
              v-for="link in unternehmenLinks"
              :key="link.label"
            >
              <NuxtLink
                v-if="!link.placeholder"
                :to="link.to"
                class="hover:text-white"
              >{{ link.label }}</NuxtLink>
              <span
                v-else
                class="cursor-not-allowed opacity-70"
                title="TODO(TSC): teyit bekliyor"
              >{{ link.label }}</span>
            </template>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 border-t border-navy-700 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span>© {{ year }} {{ site?.companyName }}</span>
        <div class="flex flex-wrap gap-5">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.to"
            :to="link.to"
            class="hover:text-white"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </TheContainer>
  </footer>
</template>
