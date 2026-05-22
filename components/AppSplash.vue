<script setup lang="ts">
/**
 * First-paint splash with a handwritten "Lan yeh makeup studio" in Allura.
 *
 * The splash is server-rendered and dismisses itself with a pure CSS
 * animation (~2.8s) — it never waits for the JS bundle to hydrate, so on a
 * slow device it can't block content the way a JS-timer dismissal would.
 * Repeat visits within a session skip it: an inline <head> script (see
 * nuxt.config.ts) sets `html.splash-seen`, which hides the overlay outright.
 */
</script>

<template>
  <div class="splash" aria-hidden="true">
    <p class="splash-text">
      <span class="splash-line splash-line-1">Lan yeh</span>
      <span class="splash-line splash-line-2">makeup studio</span>
    </p>
  </div>
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
  /* Self-dismisses via CSS so it never depends on JS hydration. The lines
     finish "writing" at 1.8s; hold briefly, then fade out by 2.8s. */
  animation: splash-dismiss 2800ms ease forwards;
}

/* Already visited this session — the inline head script set this class. */
:global(html.splash-seen) .splash {
  display: none;
}

@keyframes splash-dismiss {
  0%, 79% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; pointer-events: none; }
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

@media (prefers-reduced-motion: reduce) {
  .splash {
    animation: splash-dismiss-fast 500ms ease forwards;
  }
  .splash-line {
    animation: none;
    -webkit-mask-image: none;
            mask-image: none;
  }
}

@keyframes splash-dismiss-fast {
  0%, 40% { opacity: 1; }
  100% { opacity: 0; visibility: hidden; pointer-events: none; }
}
</style>
