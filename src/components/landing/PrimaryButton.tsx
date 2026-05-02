import type { ReactNode } from 'react'

type Variant = 'dark' | 'light' | 'outline'

type PrimaryButtonProps = {
  children: ReactNode
  href?: string
  className?: string
  variant?: Variant
  submit?: boolean
  disabled?: boolean
}

export function PrimaryButton({
  children,
  href,
  className = '',
  variant = 'dark',
  submit = false,
  disabled = false,
}: PrimaryButtonProps) {
  const variants: Record<Variant, string> = {
    dark:
      'border-2 border-transparent bg-blue-600 text-white shadow-lg shadow-blue-950/35 hover:bg-blue-500 focus-visible:ring-blue-400 focus-visible:ring-offset-neutral-900',
    light:
      'border-2 border-transparent bg-white text-neutral-900 shadow-md hover:bg-blue-50 focus-visible:ring-white focus-visible:ring-offset-blue-600',
    outline:
      'border-2 border-white bg-transparent text-white shadow-none hover:bg-white/[0.06] focus-visible:ring-white focus-visible:ring-offset-neutral-900',
  }

  const base = `inline-flex min-h-11 min-w-[9rem] items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:px-8 ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    )
  }

  return (
    <button type={submit ? 'submit' : 'button'} disabled={disabled} className={base}>
      {children}
    </button>
  )
}
