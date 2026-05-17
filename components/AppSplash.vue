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
const REVEAL_MS = 2000 // slow, steady handwriting pace
const HOLD_MS = 0      // no forced wait — fade kicks in as soon as the last letter lands
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
  /* Soft-edged mask sweeps left → right. mask-position is what we animate
     (a single transform-style property) — smooth on GPU, not janky like
     clip-path with non-linear easing. The gradient gives a feathered edge
     that mimics ink flowing onto paper. */
  -webkit-mask-image: linear-gradient(to right, #000 50%, transparent 60%);
          mask-image: linear-gradient(to right, #000 50%, transparent 60%);
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-size: 220% 100%;
          mask-size: 220% 100%;
  -webkit-mask-position: 100% 0;
          mask-position: 100% 0;
  animation: splash-reveal 2000ms linear forwards;
  will-change: mask-position, -webkit-mask-position;
  transform: translateZ(0);
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
  animation: splash-cursor 2000ms linear forwards;
  will-change: left, opacity;
}

@keyframes splash-reveal {
  from {
    -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
  }
  to {
    -webkit-mask-position: 0% 0;
            mask-position: 0% 0;
  }
}

@keyframes splash-cursor {
  0%   { left: 0;    opacity: 0.5; }
  92%  { left: 100%; opacity: 0.5; }
  100% { left: 100%; opacity: 0; }
}

.splash-reduced .splash-text {
  animation: none;
  -webkit-mask-image: none;
          mask-image: none;
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
