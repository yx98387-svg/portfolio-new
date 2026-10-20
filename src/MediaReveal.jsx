import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const canAnimate = typeof window !== 'undefined' && typeof window.matchMedia === 'function'

if (canAnimate) gsap.registerPlugin(ScrollTrigger)

export default function MediaReveal({ as: Tag = 'div', children, className = '', parallax = 6, ...props }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || !canAnimate) return undefined
    const media = element.querySelector('img, video')
    if (!media) return undefined

    const context = gsap.context(() => {
      gsap.set(element, { clipPath: 'inset(0 0 100% 0)' })
      const reveal = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .to(element, { clipPath: 'inset(0 0 0% 0)', duration: 1.2 })
        .fromTo(media, { scale: 1.14 }, { scale: 1, duration: 1.35 }, 0)

      ScrollTrigger.create({ trigger: element, start: 'top 82%', once: true, onEnter: () => reveal.play() })
      gsap.to(media, {
        yPercent: -parallax,
        ease: 'none',
        scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      })
    }, element)

    return () => context.revert()
  }, [parallax])

  return <Tag ref={ref} className={className} {...props}>{children}</Tag>
}
