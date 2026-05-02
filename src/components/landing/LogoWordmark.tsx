type LogoWordmarkProps = {
  className?: string
}

export function LogoWordmark({ className = '' }: LogoWordmarkProps) {
  return (
    <span
      className={`inline whitespace-nowrap font-sans font-bold leading-none tracking-tight ${className}`}
    >
      <span className="text-white">Site</span>
      <span className="text-blue-400">.</span>
      <span className="text-white">Up</span>
    </span>
  )
}
