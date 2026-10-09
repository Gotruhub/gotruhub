import React, { useState } from 'react'

const OFFICIAL_LOGO_PATH = '/images/synchrohub-logo.svg'
const FALLBACK_LOGO_PATH = '/images/synchrohub-logo.png'

const BrandLogo = ({ className = '', fallbackPath = FALLBACK_LOGO_PATH, variant = 'light' }) => {
  const [source, setSource] = useState(OFFICIAL_LOGO_PATH)
  const synchroClass = variant === 'dark' ? 'text-background-neutral' : 'text-primary'

  const useFallback = () => {
    if (source !== fallbackPath) setSource(fallbackPath)
  }

  return (
    <span className={`inline-flex min-w-0 items-center gap-2 ${className}`}>
      <img src={source} onError={useFallback} alt="" aria-hidden="true" className="h-full min-h-[32px] w-auto shrink-0 object-contain" decoding="async" />
      <span className={`whitespace-nowrap font-[600] tracking-[-0.04em] ${synchroClass} text-[clamp(1.1rem,2.2vw,1.5rem)]`}>
        Synchro<span className="text-brand-primary">Hub</span>
      </span>
    </span>
  )
}

export default BrandLogo
