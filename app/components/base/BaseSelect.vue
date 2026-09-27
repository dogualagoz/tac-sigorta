<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  label: string
  options: { label: string, value: string }[]
  error?: string
  required?: boolean
}>(), {
  required: false,
})

const model = defineModel<string>({ default: '' })

const errorId = computed(() => `${props.id}-error`)
</script>

<template>
  <div>
    <label
      :for="id"
      class="block text-sm font-semibold text-navy-800"
    >
      {{ label }}<span
        v-if="required"
        aria-hidden="true"
      > *</span>
    </label>
    <div class="relative mt-1.5">
      <select
        :id="id"
        v-model="model"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : undefined"
        class="block w-full min-h-[46px] pl-3 pr-9 rounded-input border text-base text-navy-800 bg-white appearance-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        :class="error ? 'border-error' : 'border-border'"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <BaseIcon
        name="chevron-down"
        :size="16"
        class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
    <p
      v-if="error"
      :id="errorId"
      class="mt-1.5 text-sm text-error"
    >
      {{ error }}
    </p>
  </div>
</template>
