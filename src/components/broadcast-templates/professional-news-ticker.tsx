'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface ProfessionalNewsTickerProps {
  items: string[]
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  mode?: 'continuous' | 'discrete'
  theme?: 'news' | 'sports' | 'business' | 'weather'
  showTimestamp?: boolean
  visible?: boolean
  position?: { x: number; y: number }
  showLines?: boolean
  bulletType?: 'none' | 'bullet' | 'image'
  bulletImage?: string
}

export function ProfessionalNewsTicker({
  items,
  speed = 'normal',
  className,
  mode = 'continuous',
  theme = 'news',
  showTimestamp = true,
  visible = true,
  position = { x: 0, y: 0 },
  showLines = false,
  bulletType = 'bullet',
  bulletImage
}: ProfessionalNewsTickerProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const themeColors = {
    news: {
      bg: 'bg-blue-600',
      border: 'border-blue-700',
      accent: 'bg-blue-800',
      text: 'text-white'
    },
    sports: {
      bg: 'bg-green-600',
      border: 'border-green-700',
      accent: 'bg-green-800',
      text: 'text-white'
    },
    business: {
      bg: 'bg-purple-600',
      border: 'border-purple-700',
      accent: 'bg-purple-800',
      text: 'text-white'
    },
    weather: {
      bg: 'bg-orange-600',
      border: 'border-orange-700',
      accent: 'bg-orange-800',
      text: 'text-white'
    }
  }

  const colors = themeColors[theme]
  const speedDuration = {
    slow: 'duration-[60s]',
    normal: 'duration-[40s]',
    fast: 'duration-[20s]'
  }

  // Helper function to render bullet
  const renderBullet = () => {
    if (bulletType === 'none') return null
    if (bulletType === 'image' && bulletImage) {
      return <img src={bulletImage} alt="" className="w-4 h-4 mr-2" />
    }
    return <span className="mr-2">•</span>
  }

  if (mode === 'discrete') {
    return (
      <div 
        className={cn(
          'absolute overflow-hidden shadow-lg',
          colors.bg,
          colors.border,
          'border-t border-b',
          !visible && 'hidden',
          className
        )}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          width: '800px'
        }}>
        <div className="flex items-center">
          {/* Left label */}
          <div className={cn(
            'flex-shrink-0 px-4 py-3 flex items-center justify-center space-x-2',
            colors.accent
          )}>
            <span className={cn('font-bold text-sm uppercase tracking-wider', colors.text)}>
              {theme.toUpperCase()}
            </span>
          </div>

          {/* News items */}
          <div className="flex-1 overflow-hidden py-3">
            <div className="space-y-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    'px-4 py-1 flex items-center',
                    colors.text,
                    'text-sm font-medium opacity-90 hover:opacity-100 transition-opacity cursor-pointer',
                    showLines && index < items.length - 1 && 'border-b border-white/20'
                  )}
                >
                  {renderBullet()}
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Timestamp */}
          {showTimestamp && (
            <div className={cn(
              'flex-shrink-0 px-4 py-3 text-xs font-mono flex items-center justify-center',
              colors.text,
              'opacity-75'
            )}>
              {currentTime}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Continuous marquee mode
  return (
    <div 
      className={cn(
        'absolute overflow-hidden shadow-lg',
        colors.bg,
        colors.border,
        'border-t border-b',
        !visible && 'hidden',
        className
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '800px'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>
      
        <div className="flex items-center h-12">
          {/* Left label */}
          <div className={cn(
            'flex-shrink-0 px-4 flex items-center justify-center space-x-2 h-full',
            colors.accent
          )}>
            <span className={cn('font-bold text-sm uppercase tracking-wider', colors.text)}>
              {theme.toUpperCase()}
            </span>
          </div>

          {/* Scrolling content */}
          <div className="flex-1 overflow-hidden h-full flex items-center">
            <div className={cn(
              'flex whitespace-nowrap',
              speedDuration[speed],
              !isPaused && 'animate-marquee'
            )}>
              {/* Original items */}
              {items.map((item, index) => (
                <span
                  key={index}
                  className={cn(
                    'mx-8 text-sm font-medium flex items-center',
                    colors.text,
                    'hover:opacity-100 transition-opacity cursor-pointer'
                  )}
                >
                  {renderBullet()}
                  {item}
                </span>
              ))}
              {/* Duplicated items for seamless loop */}
              {items.map((item, index) => (
                <span
                  key={`duplicate-${index}`}
                  className={cn(
                    'mx-8 text-sm font-medium flex items-center',
                    colors.text,
                    'hover:opacity-100 transition-opacity cursor-pointer'
                  )}
                >
                  {renderBullet()}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Timestamp */}
          {showTimestamp && (
            <div className={cn(
              'flex-shrink-0 px-4 text-xs font-mono flex items-center justify-center h-full',
              colors.text,
              'opacity-75'
            )}>
              {currentTime}
            </div>
          )}
        </div>

      {/* Pause indicator */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <span className="text-white text-xs bg-black/50 px-2 py-1 rounded">
            PAUSED
          </span>
        </div>
      )}
    </div>
  )
}