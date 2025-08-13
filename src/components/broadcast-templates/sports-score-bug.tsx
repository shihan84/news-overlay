'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TeamData {
  name: string
  score: number
  logo?: string
  color?: string
}

interface SportsScoreBugProps {
  homeTeam: TeamData
  awayTeam: TeamData
  gameStatus: string
  timeRemaining?: string
  period?: string
  league?: string
  className?: string
  animated?: boolean
  visible?: boolean
  compact?: boolean
  position?: { x: number; y: number }
}

export function SportsScoreBug({
  homeTeam,
  awayTeam,
  gameStatus,
  timeRemaining,
  period,
  league = 'SPORTS',
  className,
  animated = true,
  visible = true,
  compact = false,
  position = { x: 0, y: 0 }
}: SportsScoreBugProps) {
  const [isVisible, setIsVisible] = useState(visible)
  const [lastUpdate, setLastUpdate] = useState('')

  useEffect(() => {
    setIsVisible(visible)
  }, [visible])

  useEffect(() => {
    const updateTime = () => {
      setLastUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
    
    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  if (compact) {
    return (
      <div 
        className={cn(
          'absolute bg-black/90 backdrop-blur-sm rounded-lg p-3 text-white',
          'flex items-center space-x-4',
          animated && 'animate-slide-up',
          !visible && 'hidden',
          className
        )}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`
        }}>
        {/* Away Team */}
        <div className="text-right">
          <div className="text-sm font-semibold">{awayTeam.name}</div>
          <div className="text-2xl font-bold">{awayTeam.score}</div>
        </div>
        
        {/* VS */}
        <div className="text-gray-400 font-bold text-lg">VS</div>
        
        {/* Home Team */}
        <div>
          <div className="text-sm font-semibold">{homeTeam.name}</div>
          <div className="text-2xl font-bold">{homeTeam.score}</div>
        </div>
        
        {/* Game Info */}
        <div className="text-xs text-gray-400 text-left">
          <div>{gameStatus}</div>
          {timeRemaining && <div>{timeRemaining}</div>}
        </div>
      </div>
    )
  }

  return (
    <div 
      className={cn(
        'absolute z-50',
        animated && 'animate-slide-up',
        'w-96',
        !visible && 'hidden',
        className
      )}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`
      }}>
      <div className="bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
        {/* League Header */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              {league}
            </h3>
            <div className="text-xs text-gray-300">
              {lastUpdate}
            </div>
          </div>
        </div>

        {/* Teams and Scores */}
        <div className="p-4">
          {/* Away Team */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              {awayTeam.logo ? (
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img src={awayTeam.logo} alt={awayTeam.name} className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {awayTeam.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="text-white font-semibold">{awayTeam.name}</div>
                <div className="text-xs text-gray-400">AWAY</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">
              {awayTeam.score}
            </div>
          </div>

          {/* Home Team */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {homeTeam.logo ? (
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img src={homeTeam.logo} alt={homeTeam.name} className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {homeTeam.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="text-white font-semibold">{homeTeam.name}</div>
                <div className="text-xs text-gray-400">HOME</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">
              {homeTeam.score}
            </div>
          </div>

          {/* Game Status */}
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-gray-400 text-xs">STATUS</div>
                <div className="text-white font-semibold">{gameStatus}</div>
              </div>
              {period && (
                <div>
                  <div className="text-gray-400 text-xs">PERIOD</div>
                  <div className="text-white font-semibold">{period}</div>
                </div>
              )}
              {timeRemaining && (
                <div>
                  <div className="text-gray-400 text-xs">TIME</div>
                  <div className="text-red-400 font-bold">{timeRemaining}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Animated bottom bar */}
        <div className="h-1 bg-gray-800 overflow-hidden">
          <div className="h-full bg-green-500 animate-progress-bar" style={{ width: '50%' }} />
        </div>
      </div>

      {/* Live indicator */}
      <div className="absolute -top-2 -right-2">
        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
          LIVE
        </div>
      </div>
    </div>
  )
}