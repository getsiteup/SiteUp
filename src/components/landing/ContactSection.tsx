import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { PrimaryButton } from './PrimaryButton'
import { ScrollRevealItem, ScrollRevealRoot } from './ScrollReveal'

const inputClass =
  'w-full rounded-xl border border-neutral-600 bg-neutral-950/60 px-4 py-3 text-[15px] text-neutral-100 shadow-inner shadow-black/25 placeholder:text-neutral-500 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/35'

const labelClass = 'mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400'

/** Swap for your Formspree form URL (e.g. https://formspree.io/f/xxxxxxx) */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaqvnvlo'

const ENTRIES = [
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@doeplumbing.com',
    phone: '(206) 555-0182',
    business: 'Plumbing',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doeelectric.com',
    phone: '(253) 555-0347',
    business: 'Electrical',
  },
] as const

/** When demo copy changes, this changes too so the effect restarts and old timers can’t keep typing removed entries (e.g. after hot reload). */
const TYPEWRITER_ENTRIES_FINGERPRINT = ENTRIES.map((e) => `${e.firstName}|${e.lastName}|${e.email}`).join('::')

type FieldKey = keyof (typeof ENTRIES)[number]

const FIELD_ORDER: FieldKey[] = ['firstName', 'lastName', 'email', 'phone', 'business']

const CHAR_MS = 30
const PAUSE_MS = 3000

const initialPlaceholders = (): Record<FieldKey, string> => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  business: '',
})

function formspreeErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === 'object') {
    const o = data as { error?: string; errors?: Record<string, string> | Array<{ message?: string }> }
    if (typeof o.error === 'string' && o.error) return o.error
    if (Array.isArray(o.errors)) {
      const parts = o.errors.map((e) => (e && typeof e.message === 'string' ? e.message : '')).filter(Boolean)
      if (parts.length) return parts.join(' ')
    }
    if (o.errors && typeof o.errors === 'object' && !Array.isArray(o.errors)) {
      const parts = Object.entries(o.errors).map(([k, v]) => `${k}: ${v}`)
      if (parts.length) return parts.join(' ')
    }
  }
  return `Something went wrong (${status}). Please try again.`
}

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [placeholders, setPlaceholders] = useState(initialPlaceholders)
  const [placeholderDemoOn, setPlaceholderDemoOn] = useState(true)
  const demoActiveRef = useRef(true)

  useEffect(() => {
    if (sent || !placeholderDemoOn) return

    demoActiveRef.current = true
    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout>

    const cursor = { entry: 0, field: 0, char: 0 }

    const clearAndNextEntry = () => {
      if (!demoActiveRef.current) return
      setPlaceholders(initialPlaceholders())
      cursor.entry = (cursor.entry + 1) % ENTRIES.length
      cursor.field = 0
      cursor.char = 0
    }

    const tick = () => {
      if (cancelled || !demoActiveRef.current) return

      if (cursor.field >= FIELD_ORDER.length) {
        timeoutId = setTimeout(() => {
          if (cancelled || !demoActiveRef.current) return
          clearAndNextEntry()
          timeoutId = setTimeout(tick, CHAR_MS)
        }, PAUSE_MS)
        return
      }

      const field = FIELD_ORDER[cursor.field]
      const text = ENTRIES[cursor.entry][field]

      if (cursor.char < text.length) {
        const nextSlice = text.slice(0, cursor.char + 1)
        setPlaceholders((p) => ({ ...p, [field]: nextSlice }))
        cursor.char += 1
        if (cursor.char >= text.length) {
          cursor.field += 1
          cursor.char = 0
        }
        timeoutId = setTimeout(tick, CHAR_MS)
      } else {
        cursor.field += 1
        cursor.char = 0
        timeoutId = setTimeout(tick, 0)
      }
    }

    timeoutId = setTimeout(tick, CHAR_MS)

    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [sent, placeholderDemoOn, TYPEWRITER_ENTRIES_FINGERPRINT])

  function stopPlaceholderDemo() {
    if (!demoActiveRef.current && !placeholderDemoOn) return
    demoActiveRef.current = false
    setPlaceholderDemoOn(false)
    setPlaceholders(initialPlaceholders())
  }

  function openFormAgain() {
    demoActiveRef.current = true
    setSent(false)
    setSubmitError(null)
    setPlaceholderDemoOn(true)
    setPlaceholders(initialPlaceholders())
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      firstName: String(formData.get('firstName') ?? '').trim(),
      lastName: String(formData.get('lastName') ?? '').trim(),
      email: String(formData.get('email') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      business: String(formData.get('business') ?? '').trim(),
    }

    setSubmitError(null)
    setSubmitting(true)

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data: unknown = await res.json().catch(() => null)

      if (!res.ok) {
        throw new Error(formspreeErrorMessage(data, res.status))
      }

      form.reset()
      setSent(true)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const ph = placeholderDemoOn ? placeholders : initialPlaceholders()

  return (
    <ScrollRevealRoot
      id="contact"
      className="relative scroll-mt-20 bg-neutral-900 pt-16 pb-6 md:pt-24 md:pb-8 lg:scroll-mt-24 lg:pt-28 lg:pb-8"
      aria-labelledby="contact-heading"
    >
      <Container>
        <ScrollRevealItem index={0} className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">Contact</p>
          <h2
            id="contact-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl"
          >
            Tell us about your <span className="text-blue-400">project</span>
          </h2>
          <p className="mt-4 text-pretty text-neutral-400">
            Share a few details and we&apos;ll follow up shortly—usually within one business day.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem index={1} className="mx-auto mt-12 max-w-3xl lg:mt-14">
          <div className="rounded-3xl border border-neutral-700 bg-gradient-to-b from-neutral-800/90 to-neutral-900/90 p-px shadow-xl shadow-black/30 ring-1 ring-blue-500/15">
            <div className="rounded-[calc(1.5rem-1px)] bg-neutral-900/95 px-6 py-8 sm:px-10 sm:py-10">
              {sent ? (
                <div className="py-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-blue-500/35 bg-blue-500/10 text-blue-400">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="mt-6 text-lg font-medium text-neutral-100">Thanks—we&apos;ve received your message.</p>
                  <p className="mt-2 text-sm text-neutral-400">We&apos;ll get back to you soon.</p>
                  <button
                    type="button"
                    onClick={openFormAgain}
                    className="mt-8 rounded-sm text-sm font-semibold text-blue-400 underline-offset-4 transition hover:text-blue-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="given-name"
                        required
                        placeholder={ph.firstName}
                        onChange={stopPlaceholderDemo}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        autoComplete="family-name"
                        required
                        placeholder={ph.lastName}
                        onChange={stopPlaceholderDemo}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      required
                      placeholder={ph.email}
                      onChange={stopPlaceholderDemo}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      placeholder={ph.phone}
                      onChange={stopPlaceholderDemo}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="business" className={labelClass}>
                      Business / Industry
                    </label>
                    <input
                      id="business"
                      name="business"
                      type="text"
                      autoComplete="organization"
                      required
                      placeholder={ph.business}
                      onChange={stopPlaceholderDemo}
                      className={inputClass}
                    />
                  </div>

                  {submitError ? (
                    <p className="text-sm text-red-400/90" role="alert">
                      {submitError}
                    </p>
                  ) : null}

                  <div className="flex flex-col items-stretch gap-4 border-t border-neutral-700 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-neutral-500">
                      We respect your inbox. No spam—just a reply about your project.
                    </p>
                    <PrimaryButton
                      submit
                      disabled={submitting}
                      className="w-full shrink-0 sm:w-auto sm:min-w-[11rem]"
                    >
                      {submitting ? 'Sending…' : 'Send message'}
                    </PrimaryButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </ScrollRevealItem>
      </Container>
    </ScrollRevealRoot>
  )
}
