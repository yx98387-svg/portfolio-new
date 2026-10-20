import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio page', () => {
  afterEach(cleanup)

  it('renders the hero identity and all primary landmark sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /wang xinyuan/i })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('exposes a direct email contact action', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      'mailto:2402800273@qq.com',
    )
  })

  it('uses a frosted portfolio folder as the hero artwork', () => {
    render(<App />)

    expect(screen.getByRole('img', { name: /frosted glass portfolio folder artwork/i })).toBeInTheDocument()
  })

  it('marks the hero and archive for staged, editorial motion', () => {
    const { container } = render(<App />)

    expect(container.querySelector('.hero-opening')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /wang xinyuan/i }).querySelectorAll('.hero-title-line')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: /portfolio archive/i }).closest('.kinetic-heading')).toBeInTheDocument()
  })

  it('floats the navigation after the visitor scrolls past the hero', () => {
    render(<App />)

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 900 })
    fireEvent.scroll(window)

    expect(screen.getByRole('navigation')).toHaveClass('is-floating')
  })

  it('keeps the corrected Puxian project entry in the directory', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: /朴鲜鲜潘娜托妮宣传视频/i })).toBeInTheDocument()
  })

  it('uses the updated Liu Run project name in the directory', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: '刘润动物大迁徙倒计时' })).toBeInTheDocument()
  })

  it('opens a long-form project page and returns to the portfolio archive', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('link', { name: /朴鲜鲜潘娜托妮宣传视频/i }))
    expect(screen.getByRole('heading', { name: /朴鲜鲜潘娜托妮宣传视频/i })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('link', { name: /back to portfolio/i }))
    expect(screen.getByRole('heading', { name: /portfolio archive/i })).toBeInTheDocument()
  })
})
