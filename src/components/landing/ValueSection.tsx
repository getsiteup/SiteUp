import { Container } from './Container'
import { ScrollRevealItem, ScrollRevealRoot } from './ScrollReveal'
import { SectionBlend } from './SectionBlend'

const values = [
  {
    heading: 'Turn clicks into customers',
    body:
      'Your site should work like a 24/7 salesperson—clear offers, trust signals, and friction-free ways to reach you so casual browsers become booked appointments.',
  },
  {
    heading: 'Fill your pipeline',
    body:
      'We structure pages around the actions that matter for your business: calls, texts, contact forms, and quote requests—so you see more qualified leads, not just traffic.',
  },
  {
    heading: 'Design that performs',
    body:
      'Looks matter, but conversion matters more. Every layout choice supports one goal: helping visitors understand what you offer and why they should choose you—fast.',
  },
] as const

export function ValueSection() {
  return (
    <ScrollRevealRoot className="relative bg-neutral-800 py-16 md:py-24 lg:py-28">
      <Container>
        <ul className="grid gap-12 md:grid-cols-3 md:gap-10 lg:gap-14">
          {values.map(({ heading, body }, i) => (
            <ScrollRevealItem key={heading} as="li" index={i} className="text-center md:text-left">
              <h3 className="text-xl font-bold tracking-tight text-neutral-100 sm:text-2xl">{heading}</h3>
              <span className="mx-auto mt-4 mb-5 block h-1 w-10 rounded-full bg-blue-500 md:mx-0 md:mb-6" aria-hidden />
              <p className="text-pretty text-base leading-relaxed text-neutral-400 sm:text-[17px]">{body}</p>
            </ScrollRevealItem>
          ))}
        </ul>
      </Container>
      <SectionBlend className="to-neutral-900/28" />
    </ScrollRevealRoot>
  )
}
