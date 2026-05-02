import { Container } from './Container'
import { ScrollRevealItem, ScrollRevealRoot } from './ScrollReveal'

const steps = [
  {
    step: 1,
    title: 'Tell us about your business',
  },
  {
    step: 2,
    title: 'We build a site designed to bring in leads',
  },
  {
    step: 3,
    title: 'Start getting more calls and jobs',
  },
] as const

export function HowItWorks() {
  return (
    <ScrollRevealRoot
      id="how-it-works"
      className="relative scroll-mt-20 bg-neutral-800 pt-20 pb-14 md:pt-28 md:pb-16 lg:scroll-mt-24 lg:pt-32 lg:pb-20"
    >
      <Container>
        <ScrollRevealItem index={0} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
            How it <span className="text-blue-400">works</span>
          </h2>
          <p className="mt-4 text-pretty text-neutral-400">
            Three simple steps from kickoff to more inbound opportunities.
          </p>
        </ScrollRevealItem>
        <ol className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-10 md:gap-y-0 lg:mt-16 lg:gap-x-12">
          {steps.map(({ step, title }, i) => (
            <ScrollRevealItem
              key={step}
              as="li"
              index={i + 1}
              className="flex min-w-0 flex-col items-center text-center md:items-start md:text-left"
            >
              <span className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-neutral-900 text-sm font-semibold text-blue-300">
                {step}
              </span>
              <p className="w-full text-pretty text-lg font-medium leading-snug tracking-tight text-neutral-100">
                <span className="sr-only">{`Step ${step}: `}</span>
                {title}
              </p>
            </ScrollRevealItem>
          ))}
        </ol>
      </Container>
    </ScrollRevealRoot>
  )
}
