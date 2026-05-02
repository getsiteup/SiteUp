import { useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { LogoWordmark } from './LogoWordmark'
import { PrimaryButton } from './PrimaryButton'

const navLinks = [
  { href: '#features', label: 'Services' },
  { href: '#how-it-works', label: 'Process' },
  { href: '#testimonials', label: 'Work' },
  { href: '#contact', label: 'Contact' },
] as const

const navLinkClass =
  'shrink-0 rounded-sm text-[13px] font-medium text-neutral-100 no-underline transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 sm:text-sm'

const mobileNavLinkClass =
  'block rounded-lg px-3 py-3.5 text-base font-medium text-neutral-100 no-underline transition-colors hover:bg-neutral-800 hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-neutral-700 bg-neutral-900/90 backdrop-blur-md supports-[backdrop-filter]:bg-neutral-900/80"
    >
      <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 md:gap-4">
        <a
          href="#top"
          aria-label="SiteUp home"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
        >
          <LogoWordmark className="text-xl sm:text-2xl lg:text-[1.65rem]" />
        </a>
        <nav
          aria-label="Page sections"
          className="hidden min-w-0 flex-1 justify-center gap-6 px-1 md:flex md:gap-8"
        >
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className={navLinkClass}>
              {label}
            </a>
          ))}
        </nav>
        <PrimaryButton
          href="#contact"
          className="hidden min-h-11 shrink-0 px-8 py-3.5 text-sm md:inline-flex"
        >
          Get Started
        </PrimaryButton>
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-100 transition hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-dropdown"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </Container>
      <div
        id="mobile-nav-dropdown"
        role="navigation"
        aria-label="Page sections"
        className={`border-t border-neutral-700 bg-neutral-900/98 backdrop-blur-md md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <Container className="py-2 pb-4">
          <nav className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={mobileNavLinkClass}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  )
}
