import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0F',
          padding: '72px',
          position: 'relative',
        }}
      >
        {/* Fox-fire glow, top right */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 40% 40%, rgba(249,115,22,0.30) 0%, rgba(253,186,116,0.12) 45%, rgba(10,10,15,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="52" height="52" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 15 L65 5 L72 30 L85 25 L78 50 L90 55 L70 60 L72 80 L50 70 L28 80 L30 60 L10 55 L22 50 L15 25 L28 30 L35 5 Z"
              stroke="#F97316"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <circle cx="40" cy="42" r="3" fill="#F97316" />
            <circle cx="60" cy="42" r="3" fill="#F97316" />
          </svg>
          <div style={{ display: 'flex', marginLeft: 18, fontSize: 34, fontWeight: 700, color: '#FFFFFF' }}>
            <span>Kitsu</span>
            <span style={{ color: '#F97316' }}>Digital</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 74,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: 940,
            }}
          >
            Digital products that turn visitors into revenue
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              color: '#A1A1AA',
              maxWidth: 860,
            }}
          >
            {siteConfig.shortDescription}
          </div>
        </div>

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 24, color: '#71717A' }}>
            {siteConfig.address.city}, {siteConfig.address.countryName}
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#F97316' }}>
            {siteConfig.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
