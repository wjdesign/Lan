<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'

/**
 * Wine/champagne-themed date picker used by the booking form.
 *
 * Wraps Nuxt UI's <UCalendar> in a <UPopover> so the trigger renders like
 * the form's other text inputs (champagne border + serif type) while the
 * actual selector is a styled calendar that opens on click.
 *
 * v-model is an ISO date string (YYYY-MM-DD) so it serialises cleanly into
 * the Formsubmit payload.
 */
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { locale } = useI18n()

// Bridge string ↔ CalendarDate for <UCalendar>.
const calValue = computed<CalendarDate | undefined>({
  get() {
    if (!props.modelValue) return undefined
    const [y, m, d] = props.modelValue.split('-').map(Number)
    if (!y || !m || !d) return undefined
    return new CalendarDate(y, m, d)
  },
  set(v) {
    if (!v) emit('update:modelValue', '')
    else emit('update:modelValue', `${v.year}-${String(v.month).padStart(2, '0')}-${String(v.day).padStart(2, '0')}`)
  },
})

const minDate = today(getLocalTimeZone())

const INTL_LOCALE: Record<string, string> = {
  'zh-Hant': 'zh-TW',
  'zh-Hans': 'zh-CN',
  'en': 'en-US',
  'ja': 'ja-JP',
}

const displayLabel = computed(() => {
  if (!props.modelValue) return ''
  const [y, m, d] = props.modelValue.split('-').map(Number)
  if (!y || !m || !d) return ''
  const date = new Date(y, m - 1, d)
  const tag = INTL_LOCALE[locale.value] || 'zh-TW'
  return new Intl.DateTimeFormat(tag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date)
})

const open = ref(false)
const clear = (e: Event) => {
  e.stopPropagation()
  emit('update:modelValue', '')
}

const onSelect = () => {
  // Auto-close on day pick — matches user expectation for single-date forms.
  open.value = false
}
</script>

<template>
  <UPopover
    v-model:open="open"
    :content="{ align: 'start', sideOffset: 6 }"
    :ui="{ content: 'p-0 bg-champagne-50 border border-champagne-300 shadow-xl rounded-none' }"
  >
    <button
      type="button"
      class="w-full flex items-center justify-between gap-3 px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 hover:bg-white focus:border-wine-700 focus:bg-white focus:outline-none transition cursor-pointer text-left"
      :class="{ 'border-wine-700 bg-white': open }"
    >
      <span :class="modelValue ? 'text-ink-900' : 'text-ink-400'">
        {{ modelValue ? displayLabel : (placeholder || '—') }}
      </span>
      <span class="flex items-center gap-2 shrink-0">
        <span
          v-if="modelValue"
          role="button"
          tabindex="-1"
          :aria-label="$t('contact.form.fields.eventDateClear')"
          class="text-ink-400 hover:text-wine-700 transition"
          @click="clear"
        >
          <UIcon name="i-lucide-x" class="size-4" />
        </span>
        <UIcon name="i-lucide-calendar-days" class="size-4 text-wine-700" />
      </span>
    </button>

    <template #content>
      <UCalendar
        v-model="calValue"
        :min-value="minDate"
        color="primary"
        size="md"
        class="lan-calendar p-3"
        @update:model-value="onSelect"
      />
    </template>
  </UPopover>
</template>

<style scoped>
/* Nuxt UI's Calendar already maps data-[selected]:bg-primary to our wine
   palette via app.config.ts. We only override the cell shape so the picker
   matches the site's universal square-corner aesthetic, and tighten the
   typography to use the brand serif fonts. */
.lan-calendar :deep(button[data-radix-calendar-cell-trigger]),
.lan-calendar :deep(.cellTrigger),
.lan-calendar :deep([class*="cellTrigger"]) {
  border-radius: 0 !important;
  font-family: var(--font-serif);
}
.lan-calendar :deep(button[data-radix-calendar-cell-trigger][data-today]:not([data-selected])) {
  box-shadow: inset 0 0 0 1px var(--color-rose-400);
}
.lan-calendar :deep([class*="heading"]) {
  font-family: var(--font-display);
  color: var(--color-wine-800);
  letter-spacing: 0.02em;
}
.lan-calendar :deep(th) {
  font-family: var(--font-serif);
  letter-spacing: 0.06em;
}
</style>
