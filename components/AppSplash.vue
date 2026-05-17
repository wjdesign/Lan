<script setup lang="ts">
/**
 * First-paint splash with a handwritten "Lan yeh makeup studio" in Allura.
 *
 * - Renders in SSR so the user sees something on the very first paint, even
 *   before Nuxt has hydrated.
 * - Reveals the text left → right via clip-path animation (mimics handwriting).
 * - Shows once per browser session; subsequent SPA navigations skip the
 *   splash entirely.
 * - Respects prefers-reduced-motion (renders static, very brief).
 */

const SESSION_KEY = 'lanyeh_splash_seen'
const REVEAL_MS = 500
const HOLD_MS = 200
const FADE_MS = 400

const visible = ref(true)
const reduced = ref(false)

onMounted(() => {
  // Returning user mid-session — skip entirely
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
    visible.value = false
    return
  }

  reduced.value =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const total = reduced.value ? 300 : REVEAL_MS + HOLD_MS
  setTimeout(() => {
    visible.value = false
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(SESSION_KEY, '1')
  }, total)
})
</script>

<template>
  <Transition name="splash">
    <div
      v-if="visible"
      class="splash"
      :class="reduced ? 'splash-reduced' : ''"
      aria-hidden="true"
    >
      <div class="splash-stage">
        <p class="splash-text">Lan yeh makeup studio</p>
        <span class="splash-cursor" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: #fbf7f1;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
}

.splash-stage {
  position: relative;
  display: inline-block;
}

.splash-text {
  font-family: 'Allura', cursive;
  font-weight: 400;
  font-size: clamp(3rem, 13vw, 9rem);
  line-height: 1;
  color: #3a1d1f;
  letter-spacing: 0.01em;
  white-space: nowrap;
  /* Reveal mask — animates from "fully clipped" to "fully visible" */
  clip-path: inset(-0.2em 100% -0.2em 0);
  animation: splash-reveal 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* A small ink cursor that follows the reveal edge */
.splash-cursor {
  position: absolute;
  top: 8%;
  bottom: 8%;
  width: 1px;
  background: #3a1d1f;
  opacity: 0.4;
  left: 0;
  animation: splash-cursor 500ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes splash-reveal {
  from { clip-path: inset(-0.2em 100% -0.2em 0); }
  to   { clip-path: inset(-0.2em 0 -0.2em 0); }
}

@keyframes splash-cursor {
  0%   { left: 0;    opacity: 0.5; }
  90%  { left: 100%; opacity: 0.5; }
  100% { left: 100%; opacity: 0; }
}

.splash-reduced .splash-text {
  animation: none;
  clip-path: none;
}
.splash-reduced .splash-cursor {
  animation: none;
  display: none;
}

.splash-leave-active {
  transition: opacity v-bind('`${FADE_MS}ms`') cubic-bezier(0.22, 1, 0.36, 1);
}
.splash-leave-to {
  opacity: 0;
}
</style>
