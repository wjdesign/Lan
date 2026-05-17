/**
 * Lightweight scroll-reveal directive backed by IntersectionObserver.
 * Add `v-reveal` (or attribute data-reveal="") to any element to fade-up on enter.
 */
import type { Directive } from 'vue'

export const vReveal: Directive<HTMLElement, { delay?: number, threshold?: number } | void> = {
  // SSR: emit the attribute so server HTML matches client
  getSSRProps(binding) {
    const delay = binding.value?.delay ?? 0
    return {
      'data-reveal': '',
      'style': `--reveal-delay: ${delay}ms`,
    }
  },
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    const delay = binding.value?.delay ?? 0
    el.style.setProperty('--reveal-delay', `${delay}ms`)

    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-reveal', 'visible')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute('data-reveal', 'visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: binding.value?.threshold ?? 0.15, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
  },
}
