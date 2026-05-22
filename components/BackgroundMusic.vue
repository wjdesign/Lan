<script setup lang="ts">
/**
 * Tiny background-music player that respects browser autoplay policy.
 *
 * Behaviour
 *  1. The 3 MB MP3 is NOT preloaded. Playback (and the download) starts on the
 *     first user interaction anywhere on the page — which is also the first
 *     moment a browser would allow audible playback anyway. This keeps the
 *     feature without adding 3 MB to the initial page load.
 *  2. A circular pill in the bottom-right shows play/pause + volume state.
 *     Click toggles muting.
 *  3. The user's last preference (muted vs playing) is remembered in
 *     localStorage so returning visitors get what they chose.
 */
const SRC = useAssetUrl('/audio/ambient.mp3')
// The source MP3 is mastered very softly — even at 1.0 (HTML5 max) it sits at
// reasonable background level. If even this isn't enough we'd need WebAudio +
// GainNode to push past 1.0, but try the simple ceiling first.
const TARGET_VOLUME = 1.0
const STORAGE_KEY = 'lanyeh_bg_music_muted'

const audio = ref<HTMLAudioElement | null>(null)
const muted = ref(true)
const ready = ref(false)

const restorePref = (): boolean => {
  if (typeof localStorage === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) === '1'
}

const remember = (val: boolean) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, val ? '1' : '0')
  }
}

const toggle = () => {
  if (!audio.value) return
  muted.value = !muted.value
  audio.value.muted = muted.value
  if (!muted.value) {
    audio.value.volume = TARGET_VOLUME
    audio.value.play().catch(() => {})
  }
  remember(muted.value)
}

onMounted(() => {
  if (!audio.value) return
  audio.value.volume = TARGET_VOLUME
  audio.value.muted = true
  ready.value = true

  const userMutedPref = restorePref()
  if (userMutedPref) return // user previously muted — wait for an explicit button click

  // Browsers' "user activation" gates audible playback. The official
  // activation gestures are pointerdown / keydown / touchstart / click —
  // mouse-wheel scroll is NOT one (touch scroll IS, since it starts with
  // touchstart). We listen to every gesture event so that:
  //   - mobile users scrolling with their finger → music plays (touchstart)
  //   - desktop users clicking, tapping, or pressing a key → plays
  //   - desktop users only wheel-scrolling → won't unmute (browser block),
  //     they'll see the Music button and can click it directly
  const events = ['pointerdown', 'keydown', 'touchstart', 'click']
  const unmute = () => {
    if (!audio.value) return
    if (muted.value) {
      muted.value = false
      audio.value.muted = false
      audio.value.volume = TARGET_VOLUME
      audio.value.play().catch(() => {})
      remember(false)
    }
    cleanup()
  }
  const cleanup = () => {
    for (const e of events) document.removeEventListener(e, unmute)
  }
  for (const e of events) document.addEventListener(e, unmute, { once: true, passive: true })
})
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40 print:hidden">
    <audio ref="audio" :src="SRC" loop preload="none" playsinline />
    <button
      v-if="ready"
      type="button"
      :class="[
        'group flex items-center gap-2 pl-3 pr-4 py-2 backdrop-blur-md border transition-all duration-200',
        muted
          ? 'bg-champagne-50/60 border-wine-800/15 text-wine-800 hover:bg-champagne-50/80'
          : 'bg-wine-800/80 border-wine-700 text-champagne-50 hover:bg-wine-800',
      ]"
      :aria-label="muted ? 'Play background music' : 'Mute background music'"
      :aria-pressed="!muted"
      @click="toggle"
    >
      <UIcon
        :name="muted ? 'i-lucide-volume-x' : 'i-lucide-music-2'"
        class="size-4"
      />
      <span class="font-display text-base leading-none">
        {{ muted ? 'Music' : 'Playing' }}
      </span>
      <span v-if="!muted" class="ml-1 flex items-end gap-0.5 h-3" aria-hidden="true">
        <span class="bar bar-1" />
        <span class="bar bar-2" />
        <span class="bar bar-3" />
      </span>
    </button>
  </div>
</template>

<style scoped>
.bar {
  display: block;
  width: 2px;
  background: currentColor;
  border-radius: 1px;
  animation: bar 900ms ease-in-out infinite;
  transform-origin: bottom;
}
.bar-1 { animation-delay: 0ms;   height: 60%; }
.bar-2 { animation-delay: 180ms; height: 100%; }
.bar-3 { animation-delay: 360ms; height: 50%; }

@keyframes bar {
  0%, 100% { transform: scaleY(0.4); }
  50%       { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .bar { animation: none; }
}
</style>
