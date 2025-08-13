'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { 
  Newspaper, 
  Search, 
  Filter, 
  Monitor, 
  Settings,
  User, 
  Plus,
  Eye,
  Edit,
  Copy,
  Download,
  LogOut,
  ExternalLink
} from 'lucide-react'

const mockTemplates = [
  {
    id: '1',
    name: 'Breaking News Banner',
    category: 'BREAKING_NEWS',
    description: 'Eye-catching breaking news overlay with animated text',
    thumbnail: '/templates/breaking-news.jpg',
    isPublic: true
  },
  {
    id: '2',
    name: 'News Ticker',
    category: 'TICKER',
    description: 'Scrolling news ticker for bottom of screen',
    thumbnail: '/templates/ticker.jpg',
    isPublic: true
  },
  {
    id: '3',
    name: 'Weather Update',
    category: 'WEATHER',
    description: 'Weather information overlay with icons',
    thumbnail: '/templates/weather.jpg',
    isPublic: true
  },
  {
    id: '4',
    name: 'Sports Score',
    category: 'SPORTS',
    description: 'Live sports score overlay with team logos',
    thumbnail: '/templates/sports.jpg',
    isPublic: true
  },
  {
    id: '5',
    name: 'Lower Third',
    category: 'LOWER_THIRD',
    description: 'Professional lower third for speaker identification',
    thumbnail: '/templates/lower-third.jpg',
    isPublic: true
  },
  {
    id: '6',
    name: 'Financial Ticker',
    category: 'FINANCE',
    description: 'Stock market ticker with real-time data',
    thumbnail: '/templates/finance.jpg',
    isPublic: true
  }
]

const categoryColors = {
  BREAKING_NEWS: 'bg-red-500',
  TICKER: 'bg-blue-500',
  WEATHER: 'bg-green-500',
  SPORTS: 'bg-orange-500',
  FINANCE: 'bg-purple-500',
  POLITICS: 'bg-gray-500',
  LOWER_THIRD: 'bg-indigo-500',
  HEADLINE: 'bg-cyan-500',
  INTERVIEW: 'bg-pink-500'
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [user, setUser] = useState(null) // In a real app, this would come from auth context
  const { toast } = useToast()

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLogout = () => {
    setUser(null)
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Newspaper className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">News Overlay Studio</h1>
              <p className="text-sm text-muted-foreground">Professional news overlay studio with real-time control</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.name || user.email}
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => setUser({ name: 'Demo User', email: 'demo@example.com' })}>
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => window.open('/template-library', '_blank')}>
              <Search className="h-4 w-4 mr-2" />
              Template Library
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!user && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Welcome to News Overlay Studio</CardTitle>
              <CardDescription>
                Create professional news overlays with real-time control panels. Sign in to save your overlays and access premium features.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setUser({ name: 'Demo User', email: 'demo@example.com' })}>
                Get Started
              </Button>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Template Library</TabsTrigger>
            <TabsTrigger value="my-overlays" disabled={!user}>
              My Overlays {!user && '(Sign in required)'}
            </TabsTrigger>
            <TabsTrigger value="browser-config" disabled={!user}>
              Browser Outputs {!user && '(Sign in required)'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="BREAKING_NEWS">Breaking News</SelectItem>
                  <SelectItem value="TICKER">Ticker</SelectItem>
                  <SelectItem value="WEATHER">Weather</SelectItem>
                  <SelectItem value="SPORTS">Sports</SelectItem>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                  <SelectItem value="LOWER_THIRD">Lower Third</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Newspaper className="h-16 w-16 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Template Preview</p>
                      </div>
                    </div>
                    <Badge 
                      className={`absolute top-2 right-2 ${categoryColors[template.category]} text-white`}
                    >
                      {template.category.replace('_', ' ')}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{template.name}</DialogTitle>
                            <DialogDescription>{template.description}</DialogDescription>
                          </DialogHeader>
                          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Newspaper className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                              <p className="text-lg font-semibold">Template Preview</p>
                              <p className="text-muted-foreground">Full preview would appear here</p>
                            </div>
                          </div>
                          <div className="flex gap-2 justify-end">
                            <Button variant="outline">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy URL
                            </Button>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />
                              Use Template
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          if (!user) {
                            setUser({ name: 'Demo User', email: 'demo@example.com' })
                          }
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        {user ? 'Customize' : 'Sign in'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-overlays" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">My Overlays</h2>
                <p className="text-muted-foreground">Manage your custom overlay configurations</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Overlay
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-64">
                  <Plus className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Create New Overlay</p>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start with a template or create from scratch
                  </p>
                  <Button>Pick a Template</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="browser-config" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Browser Outputs</h2>
                <p className="text-muted-foreground">Manage browser-based overlay outputs</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Manage Outputs
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Setup</CardTitle>
                <CardDescription>
                  Quickly configure a new browser output
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Output Name</label>
                    <Input placeholder="Main Screen" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Overlay URL</label>
                    <Input placeholder="/overlay/breaking-news" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>Add Browser Output</Button>
                  <Button variant="outline">
                    <Monitor className="h-4 w-4 mr-2" />
                    Advanced Settings
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Example Overlay URLs:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Breaking News</Badge>
                      <code className="bg-background px-2 py-1 rounded">/overlay/breaking-news</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/overlay/breaking-news', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">News Ticker</Badge>
                      <code className="bg-background px-2 py-1 rounded">/overlay/ticker</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/overlay/ticker', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Weather</Badge>
                      <code className="bg-background px-2 py-1 rounded">/overlay/weather</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/overlay/weather', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Sports</Badge>
                      <code className="bg-background px-2 py-1 rounded">/overlay/sports</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/overlay/sports', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Lower Third</Badge>
                      <code className="bg-background px-2 py-1 rounded">/overlay/lower-third</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/overlay/lower-third', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="font-medium mb-2">Control Panels:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Breaking News Control</Badge>
                      <code className="bg-background px-2 py-1 rounded">/control/demo-breaking-news</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/control/demo-breaking-news', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Lower Third Control</Badge>
                      <code className="bg-background px-2 py-1 rounded">/control/demo-lower-third</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/control/demo-lower-third', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Weather Control</Badge>
                      <code className="bg-background px-2 py-1 rounded">/control/demo-weather</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/control/demo-weather', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Sports Control</Badge>
                      <code className="bg-background px-2 py-1 rounded">/control/demo-sports</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/control/demo-sports', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="font-medium mb-2">Broadcast CG Demo:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Professional Graphics</Badge>
                      <code className="bg-background px-2 py-1 rounded">/broadcast-cg-demo</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/broadcast-cg-demo', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Interactive demo with professional broadcast graphics components inspired by CodePen examples
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <h4 className="font-medium mb-2">Pre-built Templates:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Professional Templates</Badge>
                      <code className="bg-background px-2 py-1 rounded">/broadcast-templates-demo</code>
                      <Button size="sm" variant="ghost" onClick={() => window.open('/broadcast-templates-demo', '_blank')}>
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    5 pre-built templates inspired by CodePen broadcast graphics examples
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}