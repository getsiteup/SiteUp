import { Container } from './Container'
import { ScrollRevealItem, ScrollRevealRoot } from './ScrollReveal'
import { SectionBlend } from './SectionBlend'

const features = [
  'Built for lead generation',
  'Mobile optimized',
  'Clear call-to-actions',
  'Done-for-you service',
] as const

function FeatureIcon() {
  return (
    <span
      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/35 bg-neutral-800 text-blue-400"
      aria-hidden
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

const featureItemClass =
  'flex gap-4 rounded-2xl border border-neutral-700 bg-neutral-800/60 p-6 lg:p-8'

export function Features() {
  return (
    <ScrollRevealRoot
      id="features"
      className="relative scroll-mt-20 bg-neutral-900 py-16 md:py-24 lg:scroll-mt-24 lg:py-28"
    >
      <Container>
        <ScrollRevealItem index={0} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
            Everything you need to <span className="text-blue-400">grow</span>
          </h2>
          <p className="mt-4 text-pretty text-neutral-400">
            A focused build process so you can spend less time on your website and more time on the
            work that pays.
          </p>
        </ScrollRevealItem>
        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:gap-8">
          {features.map((title, index) => (
            <ScrollRevealItem key={title} as="li" index={index + 1} className={featureItemClass}>
              <FeatureIcon />
              <span className="pt-1 text-base font-medium leading-snug text-neutral-100">{title}</span>
            </ScrollRevealItem>
          ))}
        </ul>
      </Container>
      <SectionBlend className="to-neutral-800/26" />
    </ScrollRevealRoot>
  )
}
