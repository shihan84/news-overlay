'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BreakingNewsTickerProps {
  headlines: string[]
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  autoPlay?: boolean
  showIcon?: boolean
  visible?: boolean
  position?: { x: number; y: number }
  bulletType?: 'none' | 'bullet' | 'image'
  bulletImage?: string
}

export function BreakingNewsTicker({
  headlines,
  speed = 'normal',
  className,
  autoPlay = true,
  showIcon = true,
  visible = true,
  position = { x: 0, y: 0 },
  bulletType = 'bullet',
  bulletImage
}: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoPlay || isPaused || headlines.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length)
    }, speed === 'slow' ? 6000 : speed === 'fast' ? 2000 : 4000)

    return () => clearInterval(interval)
  }, [autoPlay, isPaused, headlines.length, speed])

  const speedClasses = {
    slow: 'duration-1000',
    normal: 'duration-700',
    fast: 'duration-400'
  }

  // Helper function to render bullet
  const renderBullet = () => {
    if (bulletType === 'none') return null
    if (bulletType === 'image' && bulletImage) {
      return <img src={bulletImage} alt="" className="w-4 h-4 mr-2 inline-block" />
    }
    return <span className="mr-2">•</span>
  }

  return (
    <div 
      className={cn(
        'absolute bg-red-600 overflow-hidden shadow-lg',
        'border-t-2 border-red-700 border-b-2 border-red-700',
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
      
      {/* Left side - Breaking News label */}
      <div className="absolute left-0 top-0 bottom-0 bg-red-800 flex items-center px-4 z-10">
        <div className="flex items-center space-x-2">
          {showIcon && (
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          )}
          <span className="text-white font-bold text-sm uppercase tracking-wider whitespace-nowrap">
            Breaking News
          </span>
        </div>
      </div>

      {/* Right side - Scrolling headlines */}
      <div className="ml-32 overflow-hidden">
        <div className="flex items-center h-12">
          {headlines.map((headline, index) => (
            <div
              key={index}
              className={cn(
                'absolute whitespace-nowrap text-white font-medium text-base px-4 flex items-center justify-center',
                'transition-all ease-in-out',
                speedClasses[speed],
                index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentIndex 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              )}
              style={{ 
                left: '0',
                top: '50%',
                transform: index === currentIndex ? 'translateY(-50%)' : 'translateY(-50%) translateX(-100%)',
                transitionDelay: index === currentIndex ? '0ms' : `${index === currentIndex ? 0 : Math.abs(index - currentIndex) * 100}ms`
              }}
            >
              {renderBullet()}
              {headline}
            </div>
          ))}
        </div>
      </div>

      {/* Control buttons */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="w-6 h-6 bg-red-700 hover:bg-red-800 rounded-full flex items-center justify-center text-white text-xs"
        >
          {isPaused ? '▶' : '⏸'}
        </button>
      </div>

      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-800 overflow-hidden">
        <div className="h-full bg-white animate-pulse" style={{ width: '30%' }} />
      </div>
    </div>
  )
}