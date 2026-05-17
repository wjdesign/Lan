<script setup lang="ts">
defineProps<{ question: string, answer: string, defaultOpen?: boolean }>()

const open = ref(false)
const content = ref<HTMLElement | null>(null)

const onEnter = (el: Element) => {
  const e = el as HTMLElement
  e.style.height = '0px'
  // Force reflow before transitioning to the natural height.
  void e.offsetHeight
  e.style.height = `${e.scrollHeight}px`
}
const onAfterEnter = (el: Element) => {
  ;(el as HTMLElement).style.height = ''
}
const onLeave = (el: Element) => {
  const e = el as HTMLElement
  e.style.height = `${e.scrollHeight}px`
  void e.offsetHeight
  e.style.height = '0px'
}
</script>

<template>
  <div class="group bg-white border border-champagne-300/60 transition-colors duration-200 hover:border-rose-300">
    <button
      type="button"
      class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="font-serif text-lg text-wine-800">{{ question }}</span>
      <UIcon
        name="i-lucide-plus"
        :class="['size-5 shrink-0 text-rose-500 transition-transform duration-300', open ? 'rotate-45' : '']"
      />
    </button>
    <Transition
      name="faq"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
    >
      <div v-show="open" ref="content" class="overflow-hidden">
        <p class="px-6 pb-6 text-ink-700 font-serif leading-loose">
          {{ answer }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.faq-enter-active,
.faq-leave-active {
  transition: height 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease;
  overflow: hidden;
}
.faq-enter-from,
.faq-leave-to {
  height: 0;
  opacity: 0;
}
</style>
