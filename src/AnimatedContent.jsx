import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const supportsScrollAnimations = typeof window !== 'undefined' && typeof window.matchMedia === 'function'

if (supportsScrollAnimations) gsap.registerPlugin(ScrollTrigger)

const AnimatedContent = ({
  as: Tag = 'div',
  children,
  distance = 56,
  direction = 'vertical',
  duration = 0.8,
  ease = 'power3.out',
  blur = 8,
  stagger = 0,
  threshold = 0.12,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return undefined
    const targets = stagger > 0 && element.children.length ? Array.from(element.children) : [element]
    const axis = direction === 'horizontal' ? 'x' : 'y'

    const context = gsap.context(() => {
      gsap.set(element, { visibility: 'visible' })
      if (!supportsScrollAnimations) return
      const animation = gsap.fromTo(targets,
        { [axis]: distance, opacity: 0, filter: `blur(${blur}px)` },
        { [axis]: 0, opacity: 1, filter: 'blur(0px)', duration, ease, stagger, paused: true, clearProps: 'transform,filter' },
      )
      ScrollTrigger.create({
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
        onEnter: () => animation.play(),
      })
    }, element)
    return () => context.revert()
  }, [blur, direction, distance, duration, ease, stagger, threshold])

  return <Tag ref={ref} className={className} style={{ visibility: 'hidden', willChange: 'transform, opacity, filter', ...style }} {...props}>{children}</Tag>
}

export default AnimatedContent
