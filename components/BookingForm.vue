<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { t } = useI18n()

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  eventDate: string
  message: string
  // Honeypot — bots fill this, humans don't see it.
  _honey: string
}

const form = reactive<FormState>({
  name: '',
  email: '',
  phone: '',
  service: '',
  eventDate: '',
  message: '',
  _honey: '',
})

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const errorMessage = ref('')

const serviceOptions = computed(() => [
  { value: 'bridal', label: t('contact.form.fields.serviceOptions.bridal') },
  { value: 'engagement', label: t('contact.form.fields.serviceOptions.engagement') },
  { value: 'mother', label: t('contact.form.fields.serviceOptions.mother') },
  { value: 'evening', label: t('contact.form.fields.serviceOptions.evening') },
  { value: 'shoot', label: t('contact.form.fields.serviceOptions.shoot') },
  { value: 'lesson', label: t('contact.form.fields.serviceOptions.lesson') },
  { value: 'other', label: t('contact.form.fields.serviceOptions.other') },
])

const reset = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.service = ''
  form.eventDate = ''
  form.message = ''
  form._honey = ''
}

const submit = async () => {
  if (form._honey) return // bot
  if (!form.name || !form.email || !form.message) {
    errorMessage.value = t('contact.form.errors.required')
    status.value = 'error'
    return
  }

  status.value = 'sending'
  errorMessage.value = ''

  try {
    const res = await $fetch<{ success: boolean | string, message?: string }>(
      siteConfig.contact.formspreeEndpoint,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone || '—',
          service: form.service
            ? serviceOptions.value.find(o => o.value === form.service)?.label || form.service
            : '—',
          eventDate: form.eventDate || '—',
          message: form.message,
          _subject: `[葉小蘭時尚彩妝] 來自網站的預約諮詢 — ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _autoresponse:
            '感謝您聯絡葉小蘭時尚彩妝工作室。我們已收到您的訊息，將於 48 小時內回覆。\n如需即時聯絡，歡迎加入 LINE：ye168248',
        },
      },
    )

    if (res?.success === true || res?.success === 'true') {
      status.value = 'success'
      reset()
    }
    else {
      throw new Error(res?.message || 'Unknown')
    }
  }
  catch (err) {
    status.value = 'error'
    errorMessage.value = err instanceof Error ? err.message : t('contact.form.errors.network')
  }
}
</script>

<template>
  <form
    class="space-y-5"
    novalidate
    @submit.prevent="submit"
  >
    <div class="grid sm:grid-cols-2 gap-5">
      <label class="block">
        <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
          {{ $t('contact.form.fields.name') }} <span class="text-rose-500">*</span>
        </span>
        <input
          v-model="form.name"
          required
          type="text"
          autocomplete="name"
          class="w-full px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 focus:border-wine-700 focus:bg-white focus:outline-none transition"
        />
      </label>
      <label class="block">
        <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
          {{ $t('contact.form.fields.email') }} <span class="text-rose-500">*</span>
        </span>
        <input
          v-model="form.email"
          required
          type="email"
          autocomplete="email"
          class="w-full px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 focus:border-wine-700 focus:bg-white focus:outline-none transition"
        />
      </label>
      <label class="block">
        <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
          {{ $t('contact.form.fields.phone') }}
        </span>
        <input
          v-model="form.phone"
          type="tel"
          autocomplete="tel"
          class="w-full px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 focus:border-wine-700 focus:bg-white focus:outline-none transition"
          :placeholder="$t('contact.form.fields.phonePlaceholder')"
        />
      </label>
      <label class="block">
        <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
          {{ $t('contact.form.fields.eventDate') }}
        </span>
        <DateField
          v-model="form.eventDate"
          :placeholder="$t('contact.form.fields.eventDatePlaceholder')"
        />
      </label>
    </div>

    <label class="block">
      <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
        {{ $t('contact.form.fields.service') }}
      </span>
      <select
        v-model="form.service"
        class="w-full px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 focus:border-wine-700 focus:bg-white focus:outline-none transition"
      >
        <option value="">{{ $t('contact.form.fields.servicePlaceholder') }}</option>
        <option v-for="o in serviceOptions" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
    </label>

    <label class="block">
      <span class="block text-xs tracking-[0.25em] uppercase text-ink-500 mb-2">
        {{ $t('contact.form.fields.message') }} <span class="text-rose-500">*</span>
      </span>
      <textarea
        v-model="form.message"
        required
        rows="6"
        class="w-full px-4 py-3 bg-champagne-50 border border-champagne-300 font-serif text-ink-900 focus:border-wine-700 focus:bg-white focus:outline-none transition resize-vertical"
        :placeholder="$t('contact.form.fields.messagePlaceholder')"
      />
    </label>

    <!-- Honeypot — hidden from humans -->
    <input
      v-model="form._honey"
      type="text"
      name="_honey"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      class="absolute -left-[9999px] opacity-0"
    />

    <div class="flex flex-col sm:flex-row gap-4 sm:items-center pt-2">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        :loading="status === 'sending'"
        :disabled="status === 'sending'"
        trailing-icon="i-lucide-send"
      >
        {{ status === 'sending' ? $t('contact.form.sending') : $t('contact.form.submit') }}
      </UButton>
      <p class="text-xs text-ink-500 font-serif">
        <UIcon name="i-lucide-lock" class="size-3.5 mr-1 align-text-bottom" />
        {{ $t('contact.form.privacy') }}
      </p>
    </div>

    <Transition name="fade">
      <div
        v-if="status === 'success'"
        class="mt-4 p-5 bg-emerald-50 border border-emerald-300 flex items-start gap-3"
      >
        <UIcon name="i-lucide-circle-check" class="size-6 text-emerald-600 mt-0.5 shrink-0" />
        <div>
          <p class="font-serif text-emerald-800 font-medium">{{ $t('contact.form.successTitle') }}</p>
          <p class="text-sm text-emerald-700 mt-1 font-serif leading-loose">
            {{ $t('contact.form.successBody') }}
          </p>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="status === 'error'"
        class="mt-4 p-5 bg-rose-50 border border-rose-300 flex items-start gap-3"
      >
        <UIcon name="i-lucide-alert-circle" class="size-6 text-rose-600 mt-0.5 shrink-0" />
        <div class="flex-1">
          <p class="font-serif text-rose-800 font-medium">{{ $t('contact.form.errorTitle') }}</p>
          <p class="text-sm text-rose-700 mt-1 font-serif">
            {{ errorMessage || $t('contact.form.errors.network') }}
          </p>
          <p class="text-sm text-rose-700 mt-2 font-serif">
            {{ $t('contact.form.errorRetry') }}
            <a
              :href="siteConfig.contact.lineHref"
              target="_blank"
              rel="noopener"
              class="text-wine-700 underline ml-1"
            >LINE</a>。
          </p>
        </div>
      </div>
    </Transition>
  </form>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 400ms ease, transform 400ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
