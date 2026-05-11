import { ContactSection } from './ContactSection'
import { Container } from './Container'
import { LogoWordmark } from './LogoWordmark'
import { Features } from './Features'
import { Hero } from './Hero'
import { HowItWorks } from './HowItWorks'
import { ScrollRevealItem, ScrollRevealRoot } from './ScrollReveal'
import { SiteHeader } from './SiteHeader'
import { Testimonials } from './Testimonials'
import { ValueSection } from './ValueSection'

export function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-neutral-900 text-neutral-100">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white opacity-0 shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 focus:translate-y-0 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ValueSection />
        <Features />
        <HowItWorks />
        <Testimonials />
        <ContactSection />
      </main>
      <ScrollRevealRoot
        as="footer"
        className="border-t border-neutral-800/50 bg-neutral-950 px-4 pb-10 pt-6 md:px-6 md:pb-12 md:pt-8 lg:px-8"
      >
        <Container className="text-center">
          <ScrollRevealItem
            index={0}
            className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-8"
          >
            <a
              href="tel:+14256339512"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="text-neutral-600" aria-hidden>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span>(425)-633-9512</span>
            </a>
            <a
              href="mailto:Ben@getsiteup.com"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
            >
              <span className="text-neutral-600" aria-hidden>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span>Ben@getsiteup.com</span>
            </a>
          </ScrollRevealItem>
          <ScrollRevealItem index={1}>
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()}{' '}
              <LogoWordmark className="tracking-tight" />
              . All rights reserved.
            </p>
          </ScrollRevealItem>
        </Container>
      </ScrollRevealRoot>
    </div>
  )
}
