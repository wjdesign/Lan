<script setup lang="ts">
/**
 * First-paint splash with a handwritten "Lan yeh makeup studio" in Allura.
 *
 * Layout responsiveness
 *   - ≥ 768px (md): both lines flow horizontally as a single visual line
 *   - < 768px (mobile): lines stack vertically so the long script glyphs
 *     never overflow the viewport
 *
 * Animation: each line has its own mask-position sweep, the second line
 * starting after the first finishes — gives a continuous "writing" feel
 * whether laid out in one row or two.
 */

const SESSION_KEY = 'lanyeh_splash_seen'
const LINE_MS = 1000        // each line writes in 1.0s
const STAGGER_MS = 800      // line 2 starts 0.8s after line 1
const TOTAL_REVEAL_MS = STAGGER_MS + LINE_MS // 1.8s
const HOLD_MS = 0
const FADE_MS = 400

const visible = ref(true)
const reduced = ref(false)

onMounted(() => {
  if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
    visible.value = false
    return
  }

  reduced.value =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const total = reduced.value ? 300 : TOTAL_REVEAL_MS + HOLD_MS
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
      <p class="splash-text">
        <span class="splash-line splash-line-1">Lan yeh</span>
        <span class="splash-line splash-line-2">makeup studio</span>
      </p>
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

.splash-text {
  font-family: 'Allura', cursive;
  font-weight: 400;
  font-size: clamp(3rem, 13vw, 9rem);
  line-height: 1.05;
  color: #3a1d1f;
  letter-spacing: 0.01em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  text-align: center;
}

@media (min-width: 768px) {
  .splash-text {
    flex-direction: row;
    gap: 0.3em;
  }
}

.splash-line {
  display: inline-block;
  white-space: nowrap;
  -webkit-mask-image: linear-gradient(to right, #000 50%, transparent 60%);
          mask-image: linear-gradient(to right, #000 50%, transparent 60%);
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-size: 220% 100%;
          mask-size: 220% 100%;
  -webkit-mask-position: 100% 0;
          mask-position: 100% 0;
  animation: splash-reveal 1000ms linear forwards;
  will-change: mask-position, -webkit-mask-position;
  transform: translateZ(0);
}

.splash-line-2 {
  animation-delay: 800ms;
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

.splash-reduced .splash-line {
  animation: none;
  -webkit-mask-image: none;
          mask-image: none;
}

.splash-leave-active {
  transition: opacity 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.splash-leave-to {
  opacity: 0;
}
</style>
