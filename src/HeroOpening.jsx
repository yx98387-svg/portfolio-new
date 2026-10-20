import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

const canAnimate = typeof window !== 'undefined' && typeof window.matchMedia === 'function'

export default function HeroOpening({ children, className = '' }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const context = gsap.context(() => {
      gsap.set(element, { visibility: 'visible' })
      if (!canAnimate) return

      const query = gsap.utils.selector(element)
      const timeline = gsap.timeline({ defaults: { ease: 'expo.out' } })

      timeline
        .set(query('.hero-opening-mask'), { scaleX: 1, transformOrigin: 'right center' })
        .set(query('.hero-title-line'), { yPercent: 128, scaleY: 0.72, opacity: 0, transformOrigin: '50% 100%' })
        .set(query('.hero-kicker, .message-link, .hero-note, .hero-footer'), { y: 20, opacity: 0 })
        .set(query('.hero-artwork'), { clipPath: 'inset(0 0 100% 0)', y: 72, scale: 1.06 })
        .to(query('.hero-opening-mask'), { scaleX: 0, duration: 1.15 })
        .to(query('.hero-kicker'), { y: 0, opacity: 1, duration: 0.82 }, 0.28)
        .to(query('.hero-title-line'), { yPercent: 0, scaleY: 1, opacity: 1, duration: 1.45, stagger: 0.14 }, 0.42)
        .to(query('.hero-artwork'), { clipPath: 'inset(0 0 0% 0)', y: 0, scale: 1, duration: 1.65 }, 0.54)
        .to(query('.message-link, .hero-note, .hero-footer'), { y: 0, opacity: 1, duration: 0.9, stagger: 0.09 }, 0.98)
    }, element)

    return () => context.revert()
  }, [])

  return <div ref={ref} className={`hero-opening ${className}`} style={{ visibility: 'hidden' }}>{children}</div>
}
