import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from 'react'

const RevealVisibleContext = createContext(false)

const STAGGER_MS = 72

function useScrollRevealTrigger<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, visible }
}

type ScrollRevealRootProps = {
  as?: 'section' | 'footer'
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<'section'>, 'children'>

export function ScrollRevealRoot({ as: Tag = 'section', className, children, ...rest }: ScrollRevealRootProps) {
  const { ref, visible } = useScrollRevealTrigger<HTMLElement>()

  return (
    <Tag ref={ref as never} className={className} {...rest}>
      <RevealVisibleContext.Provider value={visible}>{children}</RevealVisibleContext.Provider>
    </Tag>
  )
}

export function ScrollRevealViewport({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, visible } = useScrollRevealTrigger<HTMLDivElement>()

  return (
    <div ref={ref} className={className}>
      <RevealVisibleContext.Provider value={visible}>{children}</RevealVisibleContext.Provider>
    </div>
  )
}

type ScrollRevealItemProps = {
  as?: 'div' | 'li' | 'article'
  index: number
  className?: string
  children: ReactNode
  style?: CSSProperties
}

export function ScrollRevealItem({
  as: Tag = 'div',
  index,
  className = '',
  children,
  style,
}: ScrollRevealItemProps) {
  const visible = useContext(RevealVisibleContext)
  const delay = index * STAGGER_MS

  return (
    <Tag
      className={`scroll-reveal-item ${visible ? 'scroll-reveal-item--visible' : ''} ${className}`.trim()}
      style={{ ...style, ['--sr-delay' as string]: `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
