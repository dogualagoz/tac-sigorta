<script setup lang="ts">
import type { HomeTeam } from '~/types/home'

defineProps<{
  team: HomeTeam
}>()
</script>

<template>
  <section class="border-b border-border bg-white">
    <TheContainer>
      <div class="py-16 lg:py-20">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <span class="font-heading text-sm font-semibold text-blue-600">{{ team.label }}</span>
            <h2 class="mt-3.5 font-heading text-2xl font-bold leading-tight text-navy-800">
              {{ team.title }}
            </h2>
          </div>
          <NuxtLink
            to="/ueber-uns"
            class="font-heading text-sm font-semibold text-blue-600 hover:text-navy-800"
          >
            {{ team.linkLabel }}
          </NuxtLink>
        </div>

        <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <BaseCard
            v-for="(member, index) in team.members"
            :key="index"
            class="flex gap-4"
          >
            <div
              class="h-[76px] w-[76px] shrink-0 rounded-input border border-border bg-surface-2"
              aria-hidden="true"
            />
            <div>
              <h3 class="text-md font-semibold leading-snug text-navy-800">
                {{ member.name }}
              </h3>
              <p class="mt-1 text-sm leading-snug text-slate-500">
                {{ member.role }}
              </p>
              <p class="mt-3 flex flex-col text-sm leading-relaxed">
                <a
                  :href="`tel:${member.phone}`"
                  class="text-blue-600 hover:text-navy-800"
                >{{ member.phone }}</a>
                <a
                  :href="`mailto:${member.email}`"
                  class="text-blue-600 hover:text-navy-800"
                >{{ member.email }}</a>
              </p>
              <p class="mt-2.5 flex flex-wrap gap-2 text-sm text-slate-500">
                <span
                  v-for="language in member.languages"
                  :key="language"
                >{{ language }}</span>
              </p>
            </div>
          </BaseCard>
        </div>
      </div>
    </TheContainer>
  </section>
</template>
