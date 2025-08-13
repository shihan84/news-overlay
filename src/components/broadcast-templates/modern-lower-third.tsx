'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ModernLowerThirdProps {
  title: string
  subtitle?: string
  location?: string
  logo?: string
  theme?: 'news' | 'sports' | 'business' | 'entertainment'
  animated?: boolean
  visible?: boolean
  compact?: boolean
  position?: { x: number; y: number }
}

export function ModernLowerThird({
  title,
  subtitle,
  location,
  logo,
  theme = 'news',
  animated = true,
  visible = true,
  compact = false,
  position = { x: 0, y: 0 }
}: ModernLowerThirdProps) {
  const [isVisible, setIsVisible] = useState(visible)

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  const themeColors = {
    news: {
      gradient: 'from-blue-600 to-blue-800',
      accent: 'bg-blue-500',
      text: 'text-blue-500',
      bg: 'bg-blue-600/10',
      border: 'border-blue-500'
    },
    sports: {
      gradient: 'from-green-600 to-green-800',
      accent: 'bg-green-500',
      text: 'text-green-500',
      bg: 'bg-green-600/10',
      border: 'border-green-500'
    },
    business: {
      gradient: 'from-purple-600 to-purple-800',
      accent: 'bg-purple-500',
      text: 'text-purple-500',
      bg: 'bg-purple-600/10',
      border: 'border-purple-500'
    },
    entertainment: {
      gradient: 'from-pink-600 to-pink-800',
      accent: 'bg-pink-500',
      text: 'text-pink-500',
      bg: 'bg-pink-600/10',
      border: 'border-pink-500'
    }
  }

  const colors = themeColors[theme]

  if (!isVisible) return null

  if (compact) {
    return (
      <div 
        className={cn(
          'absolute z-50',
          animated && 'animate-slide-up',
          'max-w-md',
          !visible && 'hidden'
        )}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}>
        <div className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden">
          <div className={cn('h-1', colors.accent)} />
          <div className="p-4">
            <div className="flex items-center space-x-3">
              {logo && (
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
                  <img src={logo} alt="" className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{title}</h2>
                {subtitle && (
                  <p className="text-sm text-gray-300">{subtitle}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        'absolute z-50',
        animated && 'animate-slide-up',
        'max-w-2xl',
        !visible && 'hidden'
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}>
      <div className="bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
        {/* Top accent bar */}
        <div className={cn('h-1', colors.accent)} />
        
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Logo/Icon section */}
            <div className="flex-shrink-0">
              {logo ? (
                <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center">
                  <img src={logo} alt="" className="w-10 h-10" />
                </div>
              ) : (
                <div className={cn(
                  'w-16 h-16 rounded-lg bg-gradient-to-br',
                  colors.gradient,
                  'flex items-center justify-center'
                )}>
                  <span className="text-white font-bold text-xl">
                    {title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <div className={cn(
                  'px-2 py-1 rounded text-xs font-bold text-white uppercase',
                  colors.accent
                )}>
                  {theme}
                </div>
                {location && (
                  <div className="flex items-center text-xs text-gray-400">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {location}
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                {title}
              </h2>
              
              {subtitle && (
                <p className="text-lg text-gray-300 leading-relaxed">
                  {subtitle}
                </p>
              )}

              {/* Animated underline */}
              <div className="mt-3 h-px bg-gray-700 overflow-hidden">
                <div className={cn('h-full', colors.text, 'animate-progress-bar')} style={{ width: '60%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className={cn('h-1', colors.bg)} />
      </div>

      {/* Decorative corner elements */}
      <div className={cn(
        'absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2',
        colors.border
      )} />
      <div className={cn(
        'absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2',
        colors.border
      )} />
    </div>
  )
}