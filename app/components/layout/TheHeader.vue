<script setup lang="ts">
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const config = useRuntimeConfig()

// NUXT_PUBLIC_DEV_LOCALE_TR kapalıyken "tr" hiç register edilmediği için
// i18n'in ürettiği locale union'ı sadece "de" olur — typecheck bu yüzden
// "tr" karşılaştırmalarını hatalı sayar. Bkz. CLAUDE.md "Dil: DE / TR".
const trLocaleCode = 'tr' as unknown as typeof locale.value
const isTrLocale = computed(() => (locale.value as string) === 'tr')

const { data: site } = await useAsyncData('site-config', () => queryCollection('site').first())

const mobileOpen = ref(false)

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

// CLAUDE.md "Menü (önerilen)" + onaylı plan madde 4: tasarımın nav'ı ile CLAUDE.md
// URL listesi arasındaki eşleme. Bkz. plan "elegant-sparking-piglet.md".
const navLinks = computed(() => [
  { label: t('nav.sicherungsschein'), to: '/sicherungsschein' },
  { label: t('nav.insolvenzabsicherung'), to: '/insolvenzabsicherung' },
  { label: t('nav.reiseversicherungen'), to: '/reiseversicherungen' },
  { label: t('nav.rechtsgrundlagen'), to: '/sicherungsschein#rechtsgrundlage' },
  { label: t('header.topbar.schadenmeldung'), placeholder: true },
  { label: t('nav.ueberUns'), to: '/ueber-uns' },
])

const placeholderTopbarLinks = computed(() => [
  t('header.topbar.maklerportal'),
  t('header.topbar.schadenmeldung'),
])
</script>

<template>
  <header class="border-b border-border bg-white">
    <!-- Top bar — masaüstünde görünür, mobilde gizli -->
    <div class="hidden bg-navy-800 text-white lg:block">
      <TheContainer>
        <div class="flex h-11 items-center justify-between gap-8 text-sm">
          <div class="flex items-center gap-3 text-border-strong">
            <span>{{ t('header.topbar.advisory') }}</span>
            <span
              aria-hidden="true"
              class="h-3 border-l border-navy-600"
            />
            <span
              v-if="site?.phone"
              class="text-white"
            >{{ site.phone }}</span>
            <span
              aria-hidden="true"
              class="h-3 border-l border-navy-600"
            />
            <span>{{ site?.openingHours }}</span>
          </div>
          <div class="flex items-center gap-5 text-border-strong">
            <span
              v-for="label in placeholderTopbarLinks"
              :key="label"
              class="cursor-not-allowed opacity-70"
              title="TODO(TSC): teyit bekliyor"
            >{{ label }}</span>
            <template v-if="config.public.devLocaleTr">
              <span
                aria-hidden="true"
                class="h-3 border-l border-navy-600"
              />
              <span class="flex items-center gap-2">
                <NuxtLink
                  :to="switchLocalePath('de')"
                  :class="locale === 'de' ? 'text-white font-semibold' : 'text-border-strong'"
                >
                  DE
                </NuxtLink>
                <NuxtLink
                  :to="switchLocalePath(trLocaleCode)"
                  :class="isTrLocale ? 'text-white font-semibold' : 'text-border-strong'"
                >
                  TR
                </NuxtLink>
                <span class="rounded-sm bg-navy-600 px-1.5 py-0.5 text-xs">{{ t('dev.locale') }}</span>
              </span>
            </template>
          </div>
        </div>
      </TheContainer>
    </div>

    <!-- Ana bar -->
    <TheContainer>
      <div class="flex h-[72px] items-center justify-between gap-10 lg:h-[82px]">
        <NuxtLink
          to="/"
          class="flex items-center gap-3"
        >
          <span class="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-navy-800 font-heading text-sm font-bold text-navy-800">TSC</span>
          <span class="hidden leading-tight sm:block">
            <span class="block font-heading text-lg font-bold tracking-tight text-navy-800">{{ t('header.brandName') }}</span>
            <span class="block text-xs text-slate-500">{{ site?.tagline }}</span>
          </span>
        </NuxtLink>

        <nav
          :aria-label="t('nav.ariaLabel')"
          class="hidden items-center gap-7 lg:flex"
        >
          <template
            v-for="link in navLinks"
            :key="link.label"
          >
            <NuxtLink
              v-if="!link.placeholder"
              :to="link.to"
              class="font-heading text-sm font-semibold text-navy-800 hover:text-blue-600"
            >
              {{ link.label }}
            </NuxtLink>
            <span
              v-else
              class="cursor-not-allowed font-heading text-sm font-semibold text-slate-400"
              title="TODO(TSC): teyit bekliyor"
            >{{ link.label }}</span>
          </template>
        </nav>

        <div class="hidden items-center gap-3 lg:flex">
          <BaseButton
            to="/nachweis-pruefen"
            variant="ghost"
          >
            {{ t('cta.nachweisPruefen') }}
          </BaseButton>
          <BaseButton
            to="/angebote"
            variant="primary"
          >
            {{ t('cta.angebotAnfordern') }}
          </BaseButton>
        </div>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-input border border-border text-navy-800 lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav-panel"
          :aria-label="mobileOpen ? t('header.mobileMenu.close') : t('header.mobileMenu.open')"
          @click="mobileOpen = !mobileOpen"
        >
          <BaseIcon :name="mobileOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </TheContainer>

    <!-- Mobil panel -->
    <div
      v-if="mobileOpen"
      id="mobile-nav-panel"
      class="border-t border-border bg-white lg:hidden"
    >
      <TheContainer>
        <nav
          :aria-label="t('nav.ariaLabel')"
          class="flex flex-col gap-1 py-4"
        >
          <template
            v-for="link in navLinks"
            :key="link.label"
          >
            <NuxtLink
              v-if="!link.placeholder"
              :to="link.to"
              class="rounded-input px-2 py-3 font-heading text-base font-semibold text-navy-800 hover:bg-sky"
            >
              {{ link.label }}
            </NuxtLink>
            <span
              v-else
              class="px-2 py-3 font-heading text-base font-semibold text-slate-400"
            >{{ link.label }}</span>
          </template>
        </nav>
        <div class="flex flex-col gap-3 border-t border-border py-4">
          <BaseButton
            to="/angebote"
            variant="primary"
            block
          >
            {{ t('cta.angebotAnfordern') }}
          </BaseButton>
          <BaseButton
            to="/nachweis-pruefen"
            variant="ghost"
            block
          >
            {{ t('cta.nachweisPruefen') }}
          </BaseButton>
        </div>
      </TheContainer>
    </div>
  </header>
</template>
