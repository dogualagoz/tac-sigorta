<script setup lang="ts">
import { kontaktSchema } from '#shared/utils/kontaktSchema'

const { t } = useI18n()

const fields = reactive({
  name: '',
  email: '',
  unternehmen: '',
  anliegen: '',
  nachricht: '',
  dsgvoConsent: false,
  // Honeypot — CLAUDE.md "Formlar": bot'lar için görünmez alan, screenreader'dan
  // da gizli (aria-hidden + ekran dışına konum), bu yüzden görünür bir label yok.
  website: '',
})

type FieldErrors = Partial<Record<'name' | 'email' | 'nachricht' | 'dsgvoConsent', string>>
const errors = reactive<FieldErrors>({})

type Status = 'idle' | 'loading' | 'success' | 'error'
const status = ref<Status>('idle')

const errorMessages: Record<keyof FieldErrors, string> = {
  name: 'form.errors.name',
  email: 'form.errors.email',
  nachricht: 'form.errors.nachricht',
  dsgvoConsent: 'form.errors.dsgvoConsent',
}

function validate() {
  (Object.keys(errorMessages) as (keyof FieldErrors)[]).forEach((key) => {
    errors[key] = undefined
  })

  const result = kontaktSchema.safeParse(fields)
  if (result.success) return true

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof FieldErrors
    if (field in errorMessages && !errors[field]) {
      errors[field] = t(errorMessages[field])
    }
  }
  return false
}

async function handleSubmit() {
  if (!validate()) return

  status.value = 'loading'
  try {
    await $fetch('/api/kontakt', { method: 'POST', body: fields })
    status.value = 'success'
  }
  catch {
    status.value = 'error'
  }
}
</script>

<template>
  <form
    v-if="status !== 'success'"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div class="grid gap-4 sm:grid-cols-2">
      <BaseInput
        id="kontakt-name"
        v-model="fields.name"
        :label="t('form.name')"
        :error="errors.name"
        required
        autocomplete="name"
      />
      <BaseInput
        id="kontakt-email"
        v-model="fields.email"
        type="email"
        :label="t('form.email')"
        :error="errors.email"
        required
        autocomplete="email"
      />
      <BaseInput
        id="kontakt-unternehmen"
        v-model="fields.unternehmen"
        :label="t('form.unternehmen')"
        autocomplete="organization"
      />
      <BaseInput
        id="kontakt-anliegen"
        v-model="fields.anliegen"
        :label="t('form.anliegen')"
      />
    </div>

    <div class="mt-4">
      <BaseTextarea
        id="kontakt-nachricht"
        v-model="fields.nachricht"
        :label="t('form.nachricht')"
        :error="errors.nachricht"
        required
      />
    </div>

    <div
      aria-hidden="true"
      class="absolute left-[-9999px] top-auto"
    >
      <input
        v-model="fields.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      >
    </div>

    <div class="mt-4">
      <label class="flex items-start gap-2 text-sm text-navy-800">
        <input
          v-model="fields.dsgvoConsent"
          type="checkbox"
          required
          class="mt-0.5 h-4 w-4 shrink-0 rounded-sm border-border text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          :aria-describedby="errors.dsgvoConsent ? 'kontakt-dsgvo-error' : undefined"
        >
        <span>
          <NuxtLink
            to="/datenschutz"
            class="underline hover:text-blue-600"
          >{{ t('form.dsgvoConsent') }}</NuxtLink>
        </span>
      </label>
      <p
        v-if="errors.dsgvoConsent"
        id="kontakt-dsgvo-error"
        class="mt-1.5 text-sm text-error"
      >
        {{ errors.dsgvoConsent }}
      </p>
    </div>

    <p
      v-if="status === 'error'"
      role="alert"
      class="mt-4 text-sm text-error"
    >
      {{ t('form.error') }}
    </p>

    <BaseButton
      type="submit"
      variant="primary"
      class="mt-5"
      :disabled="status === 'loading'"
    >
      {{ status === 'loading' ? t('form.loading') : t('cta.absenden') }}
    </BaseButton>
  </form>
  <p
    v-else
    role="status"
    class="text-md font-semibold text-success"
  >
    {{ t('form.success') }}
  </p>
</template>
