<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-screen bg-champagne-50">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <BackgroundMusic />
    <PwaInstall />
  </div>
</template>
