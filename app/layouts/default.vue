<template>
  <div class="flex min-h-screen flex-col">
    <SkipLink />
    <TheHeader />
    <main
      id="main-content"
      class="flex-1"
    >
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
