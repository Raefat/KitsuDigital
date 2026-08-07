import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Horizontal rhythm for every section. Sections previously set their own
 * padding (or none), so content ran edge-to-edge on wide screens and touched
 * the viewport edge on mobile.
 */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-7xl',
    wide: 'max-w-[90rem]',
  }

  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', widths[size], className)}>
      {children}
    </div>
  )
}
