export interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  downloads: number
  author: string
  preview: string
  code: string
  dependencies?: string[]
  createdAt: string
  updatedAt: string
  isFeatured: boolean
}

export interface TemplateFilters {
  category?: string
  difficulty?: string
  tags?: string[]
  minRating?: number
  author?: string
  searchQuery?: string
}

export interface TemplateSearchOptions {
  query?: string
  category?: string
  difficulty?: string
  tags?: string[]
  sortBy?: 'rating' | 'downloads' | 'recent' | 'name'
  sortOrder?: 'asc' | 'desc'
  limit?: number
  offset?: number
}

export interface TemplateStatistics {
  totalTemplates: number
  featuredTemplates: number
  categories: number
  averageRating: number
  totalDownloads: number
}

export interface UserPreferences {
  favoriteCategories?: string[]
  preferredDifficulty?: string
  minRating?: number
  favoriteTags?: string[]
  recentlyViewed?: string[]
}

export interface TemplateSubmission {
  name: string
  description: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  code: string
  dependencies?: string[]
  authorName: string
  authorEmail: string
  previewImage?: File
  demoUrl?: string
  documentation?: string
}

export interface TemplateReview {
  id: string
  templateId: string
  reviewer: string
  rating: number
  comment: string
  approved: boolean
  createdAt: string
}

export interface TemplateComment {
  id: string
  templateId: string
  author: string
  content: string
  createdAt: string
  updatedAt: string
  replies?: TemplateComment[]
}

export interface TemplateUsage {
  id: string
  templateId: string
  userId: string
  projectName: string
  usedAt: string
  customizations?: Record<string, any>
}