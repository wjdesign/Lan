<script setup lang="ts">
/**
 * PWA install button — surfaces a "加入桌面" pill in the bottom-left once the
 * browser fires `beforeinstallprompt`. Chrome / Edge / Samsung Internet do
 * not auto-show the install banner anymore; sites must trigger the saved
 * prompt themselves.
 *
 * Hidden if:
 *   - browser never fires beforeinstallprompt (iOS Safari, Firefox)
 *   - user previously dismissed (localStorage flag)
 *   - app already running standalone
 */

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const STORAGE_KEY = 'lanyeh_pwa_install_dismissed'
const deferredPrompt = ref<BIPEvent | null>(null)
const standalone = ref(false)

const visible = computed(() =>
  Boolean(deferredPrompt.value) && !standalone.value,
)

const onBeforeInstall = (e: Event) => {
  e.preventDefault()
  if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') return
  deferredPrompt.value = e as BIPEvent
}

const onInstalled = () => {
  deferredPrompt.value = null
  standalone.value = true
}

const install = async () => {
  if (!deferredPrompt.value) return
  try {
    await deferredPrompt.value.prompt()
    await deferredPrompt.value.userChoice
  }
  finally {
    deferredPrompt.value = null
  }
}

const dismiss = () => {
  deferredPrompt.value = null
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, '1')
}

onMounted(() => {
  if (typeof window === 'undefined') return
  standalone.value =
    window.matchMedia?.('(display-mode: standalone)').matches ||
    // iOS
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  window.addEventListener('beforeinstallprompt', onBeforeInstall as EventListener)
  window.addEventListener('appinstalled', onInstalled)
})
onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('beforeinstallprompt', onBeforeInstall as EventListener)
  window.removeEventListener('appinstalled', onInstalled)
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="visible"
      class="fixed bottom-5 left-5 z-40 flex items-stretch border border-wine-800/20 bg-champagne-50/85 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(58,29,31,0.3)] print:hidden"
    >
      <button
        type="button"
        class="flex items-center gap-2 pl-4 pr-3 py-2 text-wine-800 hover:bg-wine-800/5 transition-colors duration-200"
        @click="install"
      >
        <UIcon name="i-lucide-download" class="size-4" />
        <span class="font-serif text-sm tracking-wider">加入桌面</span>
      </button>
      <button
        type="button"
        aria-label="dismiss"
        class="px-2 border-l border-wine-800/15 text-wine-800/60 hover:text-wine-800 hover:bg-wine-800/5 transition-colors duration-200"
        @click="dismiss"
      >
        <UIcon name="i-lucide-x" class="size-3.5" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
