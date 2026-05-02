import { useEffect, useState, type CSSProperties } from 'react'
import { Container } from './Container'
import { LogoWordmark } from './LogoWordmark'
import { PrimaryButton } from './PrimaryButton'
import { ScrollRevealItem, ScrollRevealViewport } from './ScrollReveal'
import { SectionBlend } from './SectionBlend'

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateFromScroll = () => {
      const scrollTop = window.scrollY
      const scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      /* 0 = page top (streak left in hero), 1 = page bottom (streak right) */
      setScrollProgress(clamp01(scrollTop / scrollable))
    }

    updateFromScroll()
    window.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    return () => {
      window.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-neutral-900 pb-16 pt-12 md:pb-24 md:pt-20 lg:pb-32 lg:pt-28">
      <div className="hero-grid-layer hero-grid-lines" aria-hidden />
      <div
        className="hero-fixed-streak"
        style={{ '--hero-scroll': scrollProgress } as CSSProperties}
        aria-hidden
      />
      <ScrollRevealViewport className="relative z-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <ScrollRevealItem index={0}>
              <p className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.2em]">
                <LogoWordmark className="uppercase" />
                <span className="text-neutral-600" aria-hidden>
                  ·
                </span>
                <span className="text-blue-400">Websites that convert</span>
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem index={1}>
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-neutral-100 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
                Get a Professional Website That Brings You More{' '}
                <span className="text-blue-400">Customers</span>
              </h1>
            </ScrollRevealItem>
            <ScrollRevealItem index={2}>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-400 sm:text-xl">
                We build high-converting websites designed to generate more leads and jobs for your
                business—fast and hassle-free
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem index={3}>
              <div className="mx-auto mt-10 flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
                <PrimaryButton
                  variant="outline"
                  href="#testimonials"
                  className="w-full min-w-0 sm:w-auto sm:min-w-[9rem]"
                >
                  View Our Work
                </PrimaryButton>
                <PrimaryButton href="#contact" className="w-full min-w-0 sm:w-auto sm:min-w-[9rem]">
                  Get a Website Like This
                </PrimaryButton>
              </div>
            </ScrollRevealItem>
          </div>
        </Container>
      </ScrollRevealViewport>
      <SectionBlend className="to-neutral-800/28" />
    </section>
  )
}
