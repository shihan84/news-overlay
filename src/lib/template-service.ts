import { Template } from '@/types/template'

// Template data storage and management
export class TemplateService {
  private static instance: TemplateService
  private templates: Template[] = []

  private constructor() {
    this.initializeTemplates()
  }

  static getInstance(): TemplateService {
    if (!TemplateService.instance) {
      TemplateService.instance = new TemplateService()
    }
    return TemplateService.instance
  }

  private initializeTemplates() {
    this.templates = [
      {
        id: '1',
        name: 'Breaking News Ticker',
        description: 'Professional breaking news ticker with smooth animations and customizable styling',
        category: 'News',
        tags: ['ticker', 'news', 'breaking', 'animation'],
        difficulty: 'beginner',
        rating: 4.8,
        downloads: 1250,
        author: 'Broadcast Pro',
        preview: '/templates/breaking-news-preview.png',
        code: `import { useState, useEffect } from 'react'
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

  return (
    <div className={cn('absolute bg-red-600 overflow-hidden shadow-lg', !visible && 'hidden', className)}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        isFeatured: true
      },
      {
        id: '2',
        name: 'Professional News Ticker',
        description: 'Continuous marquee news ticker with theme support and multiple display modes',
        category: 'News',
        tags: ['ticker', 'marquee', 'continuous', 'professional'],
        difficulty: 'intermediate',
        rating: 4.6,
        downloads: 980,
        author: 'Design Studio',
        preview: '/templates/professional-ticker-preview.png',
        code: `import { useState, useEffect } from 'react'
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
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={cn('absolute overflow-hidden shadow-lg', !visible && 'hidden', className)}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss', 'framer-motion'],
        createdAt: '2024-01-02',
        updatedAt: '2024-01-14',
        isFeatured: true
      },
      {
        id: '3',
        name: 'Modern Lower Third',
        description: 'Clean and modern lower third graphics perfect for interviews and presentations',
        category: 'Graphics',
        tags: ['lower-third', 'interview', 'presentation', 'modern'],
        difficulty: 'beginner',
        rating: 4.9,
        downloads: 1560,
        author: 'UI Master',
        preview: '/templates/lower-third-preview.png',
        code: `import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ModernLowerThirdProps {
  title: string
  subtitle: string
  location?: string
  theme?: 'news' | 'sports' | 'business' | 'weather' | 'entertainment'
  compact?: boolean
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function ModernLowerThird({
  title,
  subtitle,
  location,
  theme = 'news',
  compact = false,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: ModernLowerThirdProps) {
  const themeColors = {
    news: 'bg-blue-600',
    sports: 'bg-green-600',
    business: 'bg-purple-600',
    weather: 'bg-orange-600',
    entertainment: 'bg-pink-600'
  }

  return (
    <div className={cn(
      'absolute bg-gradient-to-r from-black/80 to-transparent backdrop-blur-sm',
      'border-l-4 border-white shadow-2xl',
      !visible && 'hidden',
      className
    )}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss'],
        createdAt: '2024-01-03',
        updatedAt: '2024-01-13',
        isFeatured: true
      },
      {
        id: '4',
        name: 'Weather Alert',
        description: 'Dynamic weather alert system with severity levels and automatic expiration',
        category: 'Weather',
        tags: ['weather', 'alert', 'emergency', 'dynamic'],
        difficulty: 'intermediate',
        rating: 4.7,
        downloads: 890,
        author: 'Weather Pro',
        preview: '/templates/weather-alert-preview.png',
        code: `import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface WeatherAlertProps {
  alertType: 'severe' | 'moderate' | 'minor'
  title: string
  description: string
  areas: string[]
  expires: string
  autoHide?: boolean
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function WeatherAlert({
  alertType,
  title,
  description,
  areas,
  expires,
  autoHide = false,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: WeatherAlertProps) {
  const [isVisible, setIsVisible] = useState(visible)
  const [timeRemaining, setTimeRemaining] = useState('')

  useEffect(() => {
    if (!autoHide) return

    const expiresDate = new Date(expires)
    const updateCountdown = () => {
      const now = new Date()
      const diff = expiresDate.getTime() - now.getTime()
      
      if (diff <= 0) {
        setIsVisible(false)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeRemaining(\`\${hours}h \${minutes}m\`)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000)

    return () => clearInterval(interval)
  }, [expires, autoHide])

  return (
    <div className={cn(
      'absolute border-2 rounded-lg shadow-2xl backdrop-blur-sm',
      !isVisible && 'hidden',
      className
    )}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss', 'date-fns'],
        createdAt: '2024-01-04',
        updatedAt: '2024-01-12',
        isFeatured: false
      },
      {
        id: '5',
        name: 'Sports Score Bug',
        description: 'Live sports score display with team colors and game status indicators',
        category: 'Sports',
        tags: ['sports', 'score', 'live', 'bug'],
        difficulty: 'intermediate',
        rating: 4.5,
        downloads: 720,
        author: 'Sports GFX',
        preview: '/templates/sports-score-preview.png',
        code: `import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Team {
  name: string
  score: number
  color: string
}

interface SportsScoreBugProps {
  homeTeam: Team
  awayTeam: Team
  gameStatus: string
  timeRemaining: string
  period: string
  league?: string
  compact?: boolean
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function SportsScoreBug({
  homeTeam,
  awayTeam,
  gameStatus,
  timeRemaining,
  period,
  league,
  compact = false,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: SportsScoreBugProps) {
  return (
    <div className={cn(
      'absolute bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl',
      'border border-gray-700',
      !visible && 'hidden',
      className
    )}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss'],
        createdAt: '2024-01-05',
        updatedAt: '2024-01-11',
        isFeatured: false
      },
      {
        id: '6',
        name: 'Countdown Timer',
        description: 'Broadcast-style countdown timer with customizable styling and animations',
        category: 'Graphics',
        tags: ['timer', 'countdown', 'broadcast', 'animation'],
        difficulty: 'advanced',
        rating: 4.4,
        downloads: 650,
        author: 'Time Master',
        preview: '/templates/countdown-preview.png',
        code: `import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  targetTime: Date | string
  format?: 'digital' | 'analog' | 'text'
  style?: 'modern' | 'classic' | 'minimal'
  showLabels?: boolean
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function CountdownTimer({
  targetTime,
  format = 'digital',
  style = 'modern',
  showLabels = true,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetTime).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetTime])

  return (
    <div className={cn(
      'absolute bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl',
      'border border-gray-600',
      !visible && 'hidden',
      className
    )}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss', 'framer-motion'],
        createdAt: '2024-01-06',
        updatedAt: '2024-01-10',
        isFeatured: false
      },
      {
        id: '7',
        name: 'Social Media Feed',
        description: 'Real-time social media feed integration for broadcast displays',
        category: 'Social',
        tags: ['social', 'feed', 'twitter', 'real-time'],
        difficulty: 'advanced',
        rating: 4.3,
        downloads: 540,
        author: 'Social Connect',
        preview: '/templates/social-feed-preview.png',
        code: `import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SocialPost {
  id: string
  username: string
  content: string
  timestamp: string
  avatar?: string
  platform: 'twitter' | 'instagram' | 'facebook'
}

interface SocialMediaFeedProps {
  platform: 'twitter' | 'instagram' | 'facebook'
  hashtag?: string
  username?: string
  refreshInterval?: number
  maxPosts?: number
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function SocialMediaFeed({
  platform,
  hashtag,
  username,
  refreshInterval = 30000,
  maxPosts = 5,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: SocialMediaFeedProps) {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        // Mock API call - replace with actual API integration
        const mockPosts: SocialPost[] = [
          {
            id: '1',
            username: '@user1',
            content: 'Great broadcast today! #live',
            timestamp: '2m ago',
            platform: 'twitter'
          }
        ]
        setPosts(mockPosts.slice(0, maxPosts))
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
    const interval = setInterval(fetchPosts, refreshInterval)

    return () => clearInterval(interval)
  }, [platform, hashtag, username, refreshInterval, maxPosts])

  return (
    <div className={cn(
      'absolute bg-black/90 backdrop-blur-sm rounded-lg shadow-2xl',
      'border border-gray-700',
      !visible && 'hidden',
      className
    )}>
      {/* Implementation */}
    </div>
  )
}`,
        dependencies: ['react', 'tailwindcss', 'axios'],
        createdAt: '2024-01-07',
        updatedAt: '2024-01-09',
        isFeatured: false
      },
      {
        id: '8',
        name: 'Lower Third with Animation',
        description: 'Animated lower third with smooth transitions and multiple animation styles',
        category: 'Graphics',
        tags: ['lower-third', 'animation', 'transition', 'smooth'],
        difficulty: 'advanced',
        rating: 4.6,
        downloads: 780,
        author: 'Animation Pro',
        preview: '/templates/animated-lower-third-preview.png',
        code: `import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedLowerThirdProps {
  title: string
  subtitle: string
  location?: string
  animationType?: 'slide' | 'fade' | 'scale' | 'bounce'
  theme?: 'news' | 'sports' | 'business' | 'weather'
  duration?: number
  className?: string
  visible?: boolean
  position?: { x: number; y: number }
}

export function AnimatedLowerThird({
  title,
  subtitle,
  location,
  animationType = 'slide',
  theme = 'news',
  duration = 0.5,
  className,
  visible = true,
  position = { x: 0, y: 0 }
}: AnimatedLowerThirdProps) {
  const [isVisible, setIsVisible] = useState(visible)

  const animations = {
    slide: {
      initial: { x: -100, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 100, opacity: 0 }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 }
    },
    bounce: {
      initial: { y: -50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 50, opacity: 0 }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={animations[animationType].initial}
          animate={animations[animationType].animate}
          exit={animations[animationType].exit}
          transition={{ duration }}
          className={cn(
            'absolute bg-gradient-to-r from-black/80 to-transparent backdrop-blur-sm',
            'border-l-4 border-white shadow-2xl',
            !isVisible && 'hidden',
            className
          )}
        >
          {/* Implementation */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}`,
        dependencies: ['react', 'tailwindcss', 'framer-motion'],
        createdAt: '2024-01-08',
        updatedAt: '2024-01-08',
        isFeatured: true
      }
    ]
  }

  // Get all templates
  getAllTemplates(): Template[] {
    return [...this.templates]
  }

  // Get template by ID
  getTemplateById(id: string): Template | undefined {
    return this.templates.find(template => template.id === id)
  }

  // Get templates by category
  getTemplatesByCategory(category: string): Template[] {
    return this.templates.filter(template => template.category === category)
  }

  // Get featured templates
  getFeaturedTemplates(): Template[] {
    return this.templates.filter(template => template.isFeatured)
  }

  // Search templates
  searchTemplates(query: string): Template[] {
    const lowercaseQuery = query.toLowerCase()
    return this.templates.filter(template =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  }

  // Filter templates by multiple criteria
  filterTemplates(filters: {
    category?: string
    difficulty?: string
    tags?: string[]
    minRating?: number
    author?: string
  }): Template[] {
    return this.templates.filter(template => {
      if (filters.category && template.category !== filters.category) return false
      if (filters.difficulty && template.difficulty !== filters.difficulty) return false
      if (filters.minRating && template.rating < filters.minRating) return false
      if (filters.author && !template.author.toLowerCase().includes(filters.author.toLowerCase())) return false
      if (filters.tags && filters.tags.length > 0) {
        return filters.tags.every(tag => template.tags.includes(tag))
      }
      return true
    })
  }

  // Sort templates
  sortTemplates(templates: Template[], sortBy: 'rating' | 'downloads' | 'recent' | 'name'): Template[] {
    return [...templates].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'downloads':
          return b.downloads - a.downloads
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })
  }

  // Get template categories
  getCategories(): string[] {
    return Array.from(new Set(this.templates.map(template => template.category)))
  }

  // Get all tags
  getAllTags(): string[] {
    return Array.from(new Set(this.templates.flatMap(template => template.tags)))
  }

  // Get template statistics
  getStatistics() {
    return {
      totalTemplates: this.templates.length,
      featuredTemplates: this.templates.filter(t => t.isFeatured).length,
      categories: this.getCategories().length,
      averageRating: this.templates.reduce((sum, t) => sum + t.rating, 0) / this.templates.length,
      totalDownloads: this.templates.reduce((sum, t) => sum + t.downloads, 0)
    }
  }

  // Add new template (for future admin functionality)
  addTemplate(template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>): Template {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }
    this.templates.push(newTemplate)
    return newTemplate
  }

  // Update template
  updateTemplate(id: string, updates: Partial<Template>): Template | null {
    const templateIndex = this.templates.findIndex(t => t.id === id)
    if (templateIndex === -1) return null

    this.templates[templateIndex] = {
      ...this.templates[templateIndex],
      ...updates,
      updatedAt: new Date().toISOString().split('T')[0]
    }
    return this.templates[templateIndex]
  }

  // Delete template
  deleteTemplate(id: string): boolean {
    const templateIndex = this.templates.findIndex(t => t.id === id)
    if (templateIndex === -1) return false

    this.templates.splice(templateIndex, 1)
    return true
  }

  // Increment download count
  incrementDownloads(id: string): void {
    const template = this.getTemplateById(id)
    if (template) {
      template.downloads += 1
    }
  }

  // Get recommended templates based on user preferences
  getRecommendedTemplates(userPreferences: {
    favoriteCategories?: string[]
    preferredDifficulty?: string
    minRating?: number
  }): Template[] {
    let recommended = this.templates

    if (userPreferences.favoriteCategories && userPreferences.favoriteCategories.length > 0) {
      recommended = recommended.filter(t => 
        userPreferences.favoriteCategories!.includes(t.category)
      )
    }

    if (userPreferences.preferredDifficulty) {
      recommended = recommended.filter(t => t.difficulty === userPreferences.preferredDifficulty)
    }

    if (userPreferences.minRating) {
      recommended = recommended.filter(t => t.rating >= userPreferences.minRating)
    }

    return this.sortTemplates(recommended, 'rating').slice(0, 6)
  }
}

// Export singleton instance
export const templateService = TemplateService.getInstance()