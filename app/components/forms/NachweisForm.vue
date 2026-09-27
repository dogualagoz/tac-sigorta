<script setup lang="ts">
// CLAUDE.md "Doğrulama modülü (Nachweis prüfen)": UI şimdi, backend (/api/nachweis)
// adım 8'e ait. `idPrefix` aynı sayfada birden fazla instance (Startseite,
// Sicherungsschein, Insolvenzabsicherung, /nachweis-pruefen) çakışmasın diye.
withDefaults(defineProps<{
  idPrefix?: string
}>(), {
  idPrefix: 'nachweis',
})

const { t } = useI18n()

const number = ref('')
const name = ref('')
const submitted = ref(false)

function handleSubmit() {
  submitted.value = true
}
</script>

<template>
  <form
    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3"
    @submit.prevent="handleSubmit"
  >
    <div class="flex-1">
      <BaseInput
        :id="`${idPrefix}-number`"
        v-model="number"
        :label="t('nachweis.numberLabel')"
        :placeholder="t('nachweis.numberPlaceholder')"
        required
      />
    </div>
    <div class="flex-1">
      <BaseInput
        :id="`${idPrefix}-name`"
        v-model="name"
        :label="t('nachweis.nameLabel')"
        :placeholder="t('nachweis.namePlaceholder')"
        required
      />
    </div>
    <BaseButton
      type="submit"
      variant="primary"
      class="sm:min-w-[160px]"
    >
      {{ t('nachweis.submit') }}
    </BaseButton>
  </form>
  <p
    v-if="submitted"
    class="mt-3 text-sm text-slate-500"
    role="status"
  >
    {{ t('nachweis.notAvailableYet') }}
  </p>
</template>
