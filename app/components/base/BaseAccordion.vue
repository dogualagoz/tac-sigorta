<script setup lang="ts">
interface AccordionItem {
  id: string
  title: string
}

const props = defineProps<{
  items: AccordionItem[]
  defaultOpenId?: string
}>()

const openId = ref<string | null>(props.defaultOpenId ?? null)

function toggle(id: string) {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <div class="divide-y divide-border border-t border-border">
    <div
      v-for="item in items"
      :key="item.id"
    >
      <h3 class="m-0">
        <button
          :id="`accordion-trigger-${item.id}`"
          type="button"
          :aria-expanded="openId === item.id"
          :aria-controls="`accordion-panel-${item.id}`"
          class="w-full flex items-center justify-between gap-6 py-5 text-left"
          @click="toggle(item.id)"
        >
          <span class="text-md font-semibold text-navy-800 leading-snug">{{ item.title }}</span>
          <BaseIcon
            :name="openId === item.id ? 'minus' : 'plus'"
            :size="20"
            class="text-blue-600 shrink-0"
          />
        </button>
      </h3>
      <div
        v-show="openId === item.id"
        :id="`accordion-panel-${item.id}`"
        role="region"
        :aria-labelledby="`accordion-trigger-${item.id}`"
        class="pb-5"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>
