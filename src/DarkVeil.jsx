import { useEffect, useRef } from 'react'
import './DarkVeil.css'

const toRgba = (hex, alpha) => {
  const value = hex.replace('#', '')
  const expanded = value.length === 3 ? value.split('').map((part) => `${part}${part}`).join('') : value
  const number = Number.parseInt(expanded, 16)
  const red = (number >> 16) & 255
  const green = (number >> 8) & 255
  const blue = number & 255
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

const DarkVeil = ({ color = '#6f0505', speed = 0.8, scale = 1.1, className = '' }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return undefined

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0.72, y: 0.2 }
    let width = 1
    let height = 1
    let frame = 0
    let animation = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.ceil(width * ratio)
      canvas.height = Math.ceil(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const drawVeil = (phase, offset, alpha) => {
      const spread = Math.max(width, height) * scale
      const x = width * (0.52 + Math.sin(phase * 0.8 + offset) * 0.15)
      const y = height * (0.16 + Math.cos(phase * 0.7 + offset) * 0.13)
      const radial = context.createRadialGradient(x, y, 0, x, y, spread * 0.64)
      radial.addColorStop(0, toRgba(color, alpha))
      radial.addColorStop(0.38, toRgba(color, alpha * 0.42))
      radial.addColorStop(1, 'rgba(18, 19, 21, 0)')
      context.fillStyle = radial
      context.fillRect(0, 0, width, height)

      const ribbon = context.createLinearGradient(0, 0, width, height)
      ribbon.addColorStop(0, 'rgba(255, 255, 255, 0)')
      ribbon.addColorStop(0.42, toRgba(color, alpha * 0.34))
      ribbon.addColorStop(0.55, `rgba(255, 168, 168, ${alpha * 0.12})`)
      ribbon.addColorStop(1, 'rgba(255, 255, 255, 0)')
      context.save()
      context.translate(width * 0.5, height * 0.5)
      context.rotate(Math.sin(phase * 0.33 + offset) * 0.3 - 0.5)
      context.translate(-width * 0.5, -height * 0.5)
      context.fillStyle = ribbon
      context.fillRect(-width * 0.22, height * 0.22, width * 1.45, height * 0.22)
      context.restore()
    }

    const render = () => {
      const phase = frame * 0.0105 * speed
      context.clearRect(0, 0, width, height)
      const base = context.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, '#0e0f11')
      base.addColorStop(0.52, '#151114')
      base.addColorStop(1, '#090a0c')
      context.fillStyle = base
      context.fillRect(0, 0, width, height)
      drawVeil(phase, 0, 1)
      drawVeil(phase * 1.35, 2.2, 0.7)

      const cursorGlow = context.createRadialGradient(pointer.x * width, pointer.y * height, 0, pointer.x * width, pointer.y * height, Math.max(width, height) * 0.34)
      cursorGlow.addColorStop(0, toRgba(color, 0.4))
      cursorGlow.addColorStop(1, 'rgba(151, 22, 22, 0)')
      context.fillStyle = cursorGlow
      context.fillRect(0, 0, width, height)

      if (!prefersReducedMotion) {
        frame += 1
        animation = requestAnimationFrame(render)
      }
    }

    const move = (event) => {
      pointer.x += ((event.clientX / Math.max(width, 1)) - pointer.x) * 0.035
      pointer.y += ((event.clientY / Math.max(height, 1)) - pointer.y) * 0.035
    }

    resize()
    render()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
    }
  }, [color, scale, speed])

  return <div className={`dark-veil-container ${className}`} aria-hidden="true"><canvas ref={canvasRef} className="dark-veil-canvas" /></div>
}

export default DarkVeil
