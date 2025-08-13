'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, Filter, Download, Eye, Star, Copy, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { templateService } from '@/lib/template-service'
import { Template } from '@/types/template'

interface TemplateLibraryProps {
  onTemplateSelect?: (template: Template) => void
}

export default function TemplateLibrary({ onTemplateSelect }: TemplateLibraryProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'recent'>('rating')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get unique categories and tags
  const categories = ['all', ...templateService.getCategories()]
  const allTags = templateService.getAllTags()

  useEffect(() => {
    // Load templates from service
    const loadedTemplates = templateService.getAllTemplates()
    setTemplates(loadedTemplates)
    setFilteredTemplates(loadedTemplates)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    let filtered = templates

    // Filter by search query
    if (searchQuery) {
      filtered = templateService.searchTemplates(searchQuery)
    }

    // Apply additional filters
    const filters: any = {}
    if (selectedCategory !== 'all') {
      filters.category = selectedCategory
    }
    if (selectedDifficulty !== 'all') {
      filters.difficulty = selectedDifficulty
    }
    if (selectedTags.length > 0) {
      filters.tags = selectedTags
    }

    if (Object.keys(filters).length > 0) {
      filtered = templateService.filterTemplates(filters)
    }

    // Sort templates
    filtered = templateService.sortTemplates(filtered, sortBy)

    setFilteredTemplates(filtered)
  }, [templates, searchQuery, selectedCategory, selectedDifficulty, selectedTags, sortBy])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    
    // Increment download count
    templateService.incrementDownloads(template.id)
    
    if (onTemplateSelect) {
      onTemplateSelect(template)
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const featuredTemplates = templateService.getFeaturedTemplates()
  const statistics = templateService.getStatistics()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Template Library</h1>
              <p className="text-gray-600 mt-1">
                Discover and use professional broadcast templates • 
                <span className="ml-2 text-blue-600">
                  {statistics.totalTemplates} templates • {statistics.categories} categories • ⭐ {statistics.averageRating.toFixed(1)} avg rating
                </span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit Template
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search templates by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters and Sort */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filters:</span>
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                    <SelectItem value="recent">Recently Updated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </div>
            </div>

            {/* Tag Filters */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Popular Tags:</span>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredTemplates.length} of {statistics.totalTemplates} templates
              </p>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                >
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Templates Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map(template => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="text-sm mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        {template.isFeatured && (
                          <Badge variant="secondary">Featured</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{template.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{template.downloads}</span>
                            </div>
                          </div>
                          <Badge variant={template.difficulty === 'beginner' ? 'default' : template.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                            {template.difficulty}
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{template.name}</DialogTitle>
                                <DialogDescription>{template.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Preview</h4>
                                    <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                                      <span className="text-gray-500">Template Preview</span>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><strong>Category:</strong> {template.category}</div>
                                      <div><strong>Author:</strong> {template.author}</div>
                                      <div><strong>Difficulty:</strong> {template.difficulty}</div>
                                      <div><strong>Created:</strong> {template.createdAt}</div>
                                      <div><strong>Updated:</strong> {template.updatedAt}</div>
                                      {template.dependencies && (
                                        <div><strong>Dependencies:</strong> {template.dependencies.join(', ')}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Code</h4>
                                  <ScrollArea className="h-64 w-full">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                      <code>{template.code}</code>
                                    </pre>
                                  </ScrollArea>
                                </div>
                                <div className="flex space-x-2">
                                  <Button onClick={() => handleTemplateSelect(template)}>
                                    Use Template
                                  </Button>
                                  <Button variant="outline" onClick={() => handleCopyCode(template.code)}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Code
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            onClick={() => handleTemplateSelect(template)}
                          >
                            Use
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredTemplates.map(template => (
                  <Card key={template.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold">{template.name}</h3>
                            {template.isFeatured && (
                              <Badge variant="secondary">Featured</Badge>
                            )}
                            <Badge variant={template.difficulty === 'beginner' ? 'default' : template.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                              {template.difficulty}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mt-1">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{template.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{template.downloads}</span>
                            </div>
                            <span>By {template.author}</span>
                            <span>{template.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{template.name}</DialogTitle>
                                <DialogDescription>{template.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Preview</h4>
                                    <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                                      <span className="text-gray-500">Template Preview</span>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div><strong>Category:</strong> {template.category}</div>
                                      <div><strong>Author:</strong> {template.author}</div>
                                      <div><strong>Difficulty:</strong> {template.difficulty}</div>
                                      <div><strong>Created:</strong> {template.createdAt}</div>
                                      <div><strong>Updated:</strong> {template.updatedAt}</div>
                                      {template.dependencies && (
                                        <div><strong>Dependencies:</strong> {template.dependencies.join(', ')}</div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Code</h4>
                                  <ScrollArea className="h-64 w-full">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                      <code>{template.code}</code>
                                    </pre>
                                  </ScrollArea>
                                </div>
                                <div className="flex space-x-2">
                                  <Button onClick={() => handleTemplateSelect(template)}>
                                    Use Template
                                  </Button>
                                  <Button variant="outline" onClick={() => handleCopyCode(template.code)}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy Code
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button onClick={() => handleTemplateSelect(template)}>
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map(template => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {template.description}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span>{template.downloads}</span>
                          </div>
                        </div>
                        <Badge variant={template.difficulty === 'beginner' ? 'default' : template.difficulty === 'intermediate' ? 'secondary' : 'destructive'}>
                          {template.difficulty}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{template.name}</DialogTitle>
                              <DialogDescription>{template.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Preview</h4>
                                  <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                                    <span className="text-gray-500">Template Preview</span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Details</h4>
                                  <div className="space-y-2 text-sm">
                                    <div><strong>Category:</strong> {template.category}</div>
                                    <div><strong>Author:</strong> {template.author}</div>
                                    <div><strong>Difficulty:</strong> {template.difficulty}</div>
                                    <div><strong>Created:</strong> {template.createdAt}</div>
                                    <div><strong>Updated:</strong> {template.updatedAt}</div>
                                    {template.dependencies && (
                                      <div><strong>Dependencies:</strong> {template.dependencies.join(', ')}</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Code</h4>
                                <ScrollArea className="h-64 w-full">
                                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                                    <code>{template.code}</code>
                                  </pre>
                                </ScrollArea>
                              </div>
                              <div className="flex space-x-2">
                                <Button onClick={() => handleTemplateSelect(template)}>
                                  Use Template
                                </Button>
                                <Button variant="outline" onClick={() => handleCopyCode(template.code)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Copy Code
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          onClick={() => handleTemplateSelect(template)}
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.slice(1).map(category => {
                const categoryTemplates = templateService.getTemplatesByCategory(category)
                return (
                  <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg">{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
                      <CardDescription>
                        {categoryTemplates.length} templates available
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {categoryTemplates.slice(0, 3).map(template => (
                          <div key={template.id} className="flex items-center justify-between text-sm">
                            <span className="truncate">{template.name}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{template.rating}</span>
                            </div>
                          </div>
                        ))}
                        {categoryTemplates.length > 3 && (
                          <p className="text-xs text-gray-500">
                            +{categoryTemplates.length - 3} more templates
                          </p>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => setSelectedCategory(category)}
                      >
                        View All {category.charAt(0).toUpperCase() + category.slice(1)} Templates
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}