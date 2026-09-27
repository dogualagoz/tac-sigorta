<script setup lang="ts">
const props = withDefaults(defineProps<{
  id: string
  label: string
  type?: string
  placeholder?: string
  error?: string
  required?: boolean
  autocomplete?: string
}>(), {
  type: 'text',
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
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : undefined"
      class="mt-1.5 block w-full min-h-[46px] px-3 rounded-input border text-base text-navy-800 bg-white placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      :class="error ? 'border-error' : 'border-border'"
    >
    <p
      v-if="error"
      :id="errorId"
      class="mt-1.5 text-sm text-error"
    >
      {{ error }}
    </p>
  </div>
</template>
