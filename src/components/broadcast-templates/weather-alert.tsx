'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface WeatherAlertProps {
  alertType: 'severe' | 'warning' | 'watch' | 'advisory'
  title: string
  description: string
  areas?: string[]
  expires?: string
  className?: string
  animated?: boolean
  visible?: boolean
  autoHide?: boolean
  position?: { x: number; y: number }
}

export function WeatherAlert({
  alertType,
  title,
  description,
  areas = [],
  expires,
  className,
  animated = true,
  visible = true,
  autoHide = false,
  position = { x: 0, y: 0 }
}: WeatherAlertProps) {
  const [isVisible, setIsVisible] = useState(visible)
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 30000) // Auto hide after 30 seconds
      
      return () => clearTimeout(timer)
    }
  }, [autoHide, isVisible])

  useEffect(() => {
    if (expires) {
      const updateCountdown = () => {
        const now = new Date()
        const expiryTime = new Date(expires)
        const diff = expiryTime.getTime() - now.getTime()
        
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60))
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          setTimeRemaining(`${hours}h ${minutes}m`)
        } else {
          setTimeRemaining('Expired')
        }
      }

      updateCountdown()
      const interval = setInterval(updateCountdown, 60000) // Update every minute
      
      return () => clearInterval(interval)
    }
  }, [expires])

  const alertConfig = {
    severe: {
      bg: 'bg-red-600',
      border: 'border-red-700',
      accent: 'bg-red-700',
      text: 'text-red-100',
      icon: '⚠️',
      label: 'SEVERE WEATHER ALERT'
    },
    warning: {
      bg: 'bg-orange-600',
      border: 'border-orange-700',
      accent: 'bg-orange-700',
      text: 'text-orange-100',
      icon: '⚡',
      label: 'WEATHER WARNING'
    },
    watch: {
      bg: 'bg-yellow-600',
      border: 'border-yellow-700',
      accent: 'bg-yellow-700',
      text: 'text-yellow-100',
      icon: '👁️',
      label: 'WEATHER WATCH'
    },
    advisory: {
      bg: 'bg-blue-600',
      border: 'border-blue-700',
      accent: 'bg-blue-700',
      text: 'text-blue-100',
      icon: 'ℹ️',
      label: 'WEATHER ADVISORY'
    }
  }

  const config = alertConfig[alertType]

  if (!isVisible) return null

  return (
    <div 
      className={cn(
        'absolute z-50 max-w-4xl',
        animated && 'animate-bounce-in',
        !visible && 'hidden',
        className
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}>
      <div className={cn(
        'rounded-lg overflow-hidden shadow-2xl',
        config.bg,
        config.border,
        'border-2'
      )}>
        {/* Header with pulsing effect */}
        <div className={cn(
          'flex items-center justify-between p-4',
          config.accent
        )}>
          <div className="flex items-center space-x-3">
            <span className="text-2xl animate-pulse">{config.icon}</span>
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">
                {config.label}
              </h3>
              <p className="text-xs text-white/80">
                {expires && `Expires in ${timeRemaining}`}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs text-white/60 mb-1">
              {new Date().toLocaleString()}
            </div>
            <div className="text-xs font-mono text-white/80">
              LIVE
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-3 leading-tight">
            {title}
          </h2>
          
          <p className="text-lg mb-4 leading-relaxed" style={{ color: config.text.replace('text-', '') }}>
            {description}
          </p>

          {/* Affected areas */}
          {areas.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wider">
                Affected Areas:
              </h4>
              <div className="flex flex-wrap gap-2">
                {areas.map((area, index) => (
                  <span
                    key={index}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      'bg-white/20 text-white'
                    )}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Animated progress bar */}
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={cn('h-full rounded-full animate-progress-bar')}
              style={{ 
                backgroundColor: config.text.replace('text-', ''),
                width: '70%'
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={cn(
          'px-4 py-2 flex items-center justify-between',
          config.accent
        )}>
          <div className="text-xs text-white/60">
            National Weather Service
          </div>
          <div className="text-xs text-white/60">
            Alert ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>

        {/* Animated corner accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-white/50" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-white/50" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-white/50" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-white/50" />
      </div>
    </div>
  )
}