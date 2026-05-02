import { Container } from './Container'

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-20 bg-neutral-800 py-8 md:py-10 lg:scroll-mt-24"
      aria-label="Client results"
    >
      <Container>
        <div className="mx-auto max-w-md px-2">
          <div className="h-px w-full bg-blue-500/35" aria-hidden />
          <p className="py-5 text-center text-sm leading-relaxed text-neutral-500 md:text-[15px]">
            Currently onboarding our first clients — results coming soon.
          </p>
          <div className="h-px w-full bg-blue-500/35" aria-hidden />
        </div>
      </Container>
    </section>
  )
}
