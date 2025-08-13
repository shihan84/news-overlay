'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  BreakingNewsTicker,
  ProfessionalNewsTicker,
  ModernLowerThird,
  WeatherAlert,
  SportsScoreBug
} from '@/components/broadcast-templates'
import { Play, Pause, Eye, EyeOff, Settings, ExternalLink } from 'lucide-react'

export default function BroadcastTemplatesDemo() {
  // Breaking News Ticker State
  const [breakingHeadlines, setBreakingHeadlines] = useState([
    "MAJOR EARTHQUAKE STRIKES PACIFIC REGION",
    "TSUNAMI WARNING ISSUED FOR COASTAL AREAS",
    "EMERGENCY SERVICES ON HIGH ALERT",
    "PRESIDENT TO ADDRESS NATION SHORTLY"
  ])
  const [tickerSpeed, setTickerSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [showTickerIcon, setShowTickerIcon] = useState(true)
  const [breakingPosition, setBreakingPosition] = useState({ x: 0, y: 0 })
  const [breakingBulletType, setBreakingBulletType] = useState<'none' | 'bullet' | 'image'>('bullet')
  const [breakingBulletImage, setBreakingBulletImage] = useState('')

  // Professional News Ticker State
  const [newsItems, setNewsItems] = useState([
    "Stock markets reach all-time high as tech stocks surge",
    "New climate agreement signed by world leaders",
    "Local sports team advances to championship finals",
    "Breakthrough in renewable energy technology announced",
    "Traffic updates: Major highway construction begins next week"
  ])
  const [tickerTheme, setTickerTheme] = useState<'news' | 'sports' | 'business' | 'weather'>('news')
  const [tickerMode, setTickerMode] = useState<'continuous' | 'discrete'>('continuous')
  const [professionalTickerSpeed, setProfessionalTickerSpeed] = useState<'slow' | 'normal' | 'fast'>('normal')
  const [professionalPosition, setProfessionalPosition] = useState({ x: 0, y: 50 })
  const [showLines, setShowLines] = useState(false)
  const [bulletType, setBulletType] = useState<'none' | 'bullet' | 'image'>('bullet')
  const [bulletImage, setBulletImage] = useState('')

  // Modern Lower Third State
  const [lowerThird, setLowerThird] = useState({
    title: "Sarah Johnson",
    subtitle: "Chief International Correspondent",
    location: "London, United Kingdom",
    theme: 'news' as const,
    compact: false
  })
  const [lowerThirdPosition, setLowerThirdPosition] = useState({ x: 0, y: 500 })

  // Weather Alert State
  const [weatherAlert, setWeatherAlert] = useState({
    alertType: 'severe' as const,
    title: "TORNADO WARNING",
    description: "A severe thunderstorm capable of producing a tornado has been detected. Take immediate shelter in a basement or interior room.",
    areas: ["Downtown", "North District", "East County", "Suburban Areas"],
    expires: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    autoHide: false
  })
  const [weatherPosition, setWeatherPosition] = useState({ x: 20, y: 100 })

  // Sports Score Bug State
  const [sportsScore, setSportsScore] = useState({
    homeTeam: { name: "Lakers", score: 108, color: "purple" },
    awayTeam: { name: "Warriors", score: 102, color: "blue" },
    gameStatus: "4th Quarter",
    timeRemaining: "2:45",
    period: "Q4",
    league: "NBA",
    compact: false
  })
  const [sportsPosition, setSportsPosition] = useState({ x: 600, y: 20 })

  // Visibility states
  const [visibility, setVisibility] = useState({
    breakingTicker: true,
    professionalTicker: true,
    lowerThird: true,
    weatherAlert: false,
    sportsBug: true
  })

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Broadcast Templates Demo</h1>
              <p className="text-gray-600">Professional pre-built broadcast graphics templates inspired by CodePen</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                5 Templates
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/broadcast-cg-demo', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Broadcast CG Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="preview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
            <TabsTrigger value="controls">Template Controls</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle>Template Showcase</CardTitle>
                <CardDescription>
                  All broadcast templates displayed simultaneously with real-time controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '700px' }}>
                  {/* Background placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <div className="text-8xl mb-4">📺</div>
                      <div className="text-2xl font-semibold mb-2">Live Broadcast Preview</div>
                      <div className="text-lg">Professional Templates Showcase</div>
                      <div className="text-sm mt-4 text-gray-500">
                        Templates inspired by CodePen broadcast graphics examples
                      </div>
                    </div>
                  </div>

                  {/* Broadcast Templates */}
                  <BreakingNewsTicker
                    headlines={breakingHeadlines}
                    speed={tickerSpeed}
                    showIcon={showTickerIcon}
                    visible={visibility.breakingTicker}
                    position={breakingPosition}
                    bulletType={breakingBulletType}
                    bulletImage={breakingBulletImage}
                  />

                  <ProfessionalNewsTicker
                    items={newsItems}
                    speed={professionalTickerSpeed}
                    theme={tickerTheme}
                    mode={tickerMode}
                    visible={visibility.professionalTicker}
                    position={professionalPosition}
                    showLines={showLines}
                    bulletType={bulletType}
                    bulletImage={bulletImage}
                  />

                  <WeatherAlert
                    alertType={weatherAlert.alertType}
                    title={weatherAlert.title}
                    description={weatherAlert.description}
                    areas={weatherAlert.areas}
                    expires={weatherAlert.expires}
                    autoHide={weatherAlert.autoHide}
                    visible={visibility.weatherAlert}
                    position={weatherPosition}
                  />

                  <SportsScoreBug
                    homeTeam={sportsScore.homeTeam}
                    awayTeam={sportsScore.awayTeam}
                    gameStatus={sportsScore.gameStatus}
                    timeRemaining={sportsScore.timeRemaining}
                    period={sportsScore.period}
                    league={sportsScore.league}
                    compact={sportsScore.compact}
                    visible={visibility.sportsBug}
                    position={sportsPosition}
                  />

                  <ModernLowerThird
                    title={lowerThird.title}
                    subtitle={lowerThird.subtitle}
                    location={lowerThird.location}
                    theme={lowerThird.theme}
                    compact={lowerThird.compact}
                    visible={visibility.lowerThird}
                    position={lowerThirdPosition}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="controls" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Breaking News Ticker Controls */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>Breaking News Ticker</span>
                    <Badge variant="outline">CodePen Inspired</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="breaking-visible">Visible</Label>
                    <Switch
                      checked={visibility.breakingTicker}
                      onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, breakingTicker: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="breaking-speed">Speed</Label>
                    <Select value={tickerSpeed} onValueChange={(value: any) => setTickerSpeed(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-icon">Show Alert Icon</Label>
                    <Switch
                      checked={showTickerIcon}
                      onCheckedChange={setShowTickerIcon}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="breaking-bullet-type">Bullet Type</Label>
                    <Select value={breakingBulletType} onValueChange={(value: any) => setBreakingBulletType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="bullet">Bullet (•)</SelectItem>
                        <SelectItem value="image">Image Bullet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {breakingBulletType === 'image' && (
                    <div>
                      <Label htmlFor="breaking-bullet-image">Bullet Image URL</Label>
                      <Input
                        id="breaking-bullet-image"
                        value={breakingBulletImage}
                        onChange={(e) => setBreakingBulletImage(e.target.value)}
                        placeholder="https://example.com/bullet.png"
                        className="bg-gray-50 border-gray-300 text-sm"
                      />
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Headlines</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setBreakingHeadlines([...breakingHeadlines, "NEW BREAKING HEADLINE"])}
                        className="text-xs"
                      >
                        Add Headline
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {breakingHeadlines.map((headline, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={headline}
                            onChange={(e) => {
                              const newHeadlines = [...breakingHeadlines]
                              newHeadlines[index] = e.target.value.toUpperCase()
                              setBreakingHeadlines(newHeadlines)
                            }}
                            className="bg-gray-50 border-gray-300 text-sm flex-1"
                          />
                          {breakingHeadlines.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newHeadlines = breakingHeadlines.filter((_, i) => i !== index)
                                setBreakingHeadlines(newHeadlines)
                              }}
                              className="text-xs p-2 h-8 w-8"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="breaking-x" className="text-xs">X Position</Label>
                        <Input
                          id="breaking-x"
                          type="number"
                          value={breakingPosition.x}
                          onChange={(e) => setBreakingPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="breaking-y" className="text-xs">Y Position</Label>
                        <Input
                          id="breaking-y"
                          type="number"
                          value={breakingPosition.y}
                          onChange={(e) => setBreakingPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professional News Ticker Controls */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Professional News Ticker</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="professional-visible">Visible</Label>
                    <Switch
                      checked={visibility.professionalTicker}
                      onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, professionalTicker: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ticker-theme">Theme</Label>
                    <Select value={tickerTheme} onValueChange={(value: any) => setTickerTheme(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="weather">Weather</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="ticker-mode">Mode</Label>
                    <Select value={tickerMode} onValueChange={(value: any) => setTickerMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="continuous">Continuous Marquee</SelectItem>
                        <SelectItem value="discrete">Discrete List</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="professional-speed">Speed</Label>
                    <Select value={professionalTickerSpeed} onValueChange={(value: any) => setProfessionalTickerSpeed(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="slow">Slow</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="fast">Fast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="show-lines">Show Lines</Label>
                    <Switch
                      checked={showLines}
                      onCheckedChange={setShowLines}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bullet-type">Bullet Type</Label>
                    <Select value={bulletType} onValueChange={(value: any) => setBulletType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="bullet">Bullet (•)</SelectItem>
                        <SelectItem value="image">Image Bullet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {bulletType === 'image' && (
                    <div>
                      <Label htmlFor="bullet-image">Bullet Image URL</Label>
                      <Input
                        id="bullet-image"
                        value={bulletImage}
                        onChange={(e) => setBulletImage(e.target.value)}
                        placeholder="https://example.com/bullet.png"
                        className="bg-gray-50 border-gray-300 text-sm"
                      />
                    </div>
                  )}
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>News Items</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setNewsItems([...newsItems, "New news item"])}
                        className="text-xs"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {newsItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={item}
                            onChange={(e) => {
                              const newItems = [...newsItems]
                              newItems[index] = e.target.value
                              setNewsItems(newItems)
                            }}
                            className="bg-gray-50 border-gray-300 text-sm flex-1"
                          />
                          {newsItems.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newItems = newsItems.filter((_, i) => i !== index)
                                setNewsItems(newItems)
                              }}
                              className="text-xs p-2 h-8 w-8"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="professional-x" className="text-xs">X Position</Label>
                        <Input
                          id="professional-x"
                          type="number"
                          value={professionalPosition.x}
                          onChange={(e) => setProfessionalPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="professional-y" className="text-xs">Y Position</Label>
                        <Input
                          id="professional-y"
                          type="number"
                          value={professionalPosition.y}
                          onChange={(e) => setProfessionalPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modern Lower Third Controls */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Modern Lower Third</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lower-third-visible">Visible</Label>
                    <Switch
                      checked={visibility.lowerThird}
                      onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, lowerThird: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lt-title">Title</Label>
                    <Input
                      id="lt-title"
                      value={lowerThird.title}
                      onChange={(e) => setLowerThird(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lt-subtitle">Subtitle</Label>
                    <Input
                      id="lt-subtitle"
                      value={lowerThird.subtitle}
                      onChange={(e) => setLowerThird(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lt-location">Location</Label>
                    <Input
                      id="lt-location"
                      value={lowerThird.location}
                      onChange={(e) => setLowerThird(prev => ({ ...prev, location: e.target.value }))}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lt-theme">Theme</Label>
                    <Select value={lowerThird.theme} onValueChange={(value: any) => setLowerThird(prev => ({ ...prev, theme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="news">News</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lt-compact">Compact Mode</Label>
                    <Switch
                      checked={lowerThird.compact}
                      onCheckedChange={(checked) => setLowerThird(prev => ({ ...prev, compact: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="lt-x" className="text-xs">X Position</Label>
                        <Input
                          id="lt-x"
                          type="number"
                          value={lowerThirdPosition.x}
                          onChange={(e) => setLowerThirdPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lt-y" className="text-xs">Y Position</Label>
                        <Input
                          id="lt-y"
                          type="number"
                          value={lowerThirdPosition.y}
                          onChange={(e) => setLowerThirdPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alert Controls */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Weather Alert</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weather-visible">Visible</Label>
                    <Switch
                      checked={visibility.weatherAlert}
                      onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, weatherAlert: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="weather-type">Alert Type</Label>
                    <Select value={weatherAlert.alertType} onValueChange={(value: any) => setWeatherAlert(prev => ({ ...prev, alertType: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="severe">Severe</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="watch">Watch</SelectItem>
                        <SelectItem value="advisory">Advisory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="weather-title">Title</Label>
                    <Input
                      id="weather-title"
                      value={weatherAlert.title}
                      onChange={(e) => setWeatherAlert(prev => ({ ...prev, title: e.target.value }))}
                      className="bg-gray-50 border-gray-300"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="weather-description">Description</Label>
                    <Textarea
                      id="weather-description"
                      value={weatherAlert.description}
                      onChange={(e) => setWeatherAlert(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-50 border-gray-300"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Affected Areas</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setWeatherAlert(prev => ({ 
                          ...prev, 
                          areas: [...prev.areas, "New Area"] 
                        }))}
                        className="text-xs"
                      >
                        Add Area
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {weatherAlert.areas.map((area, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={area}
                            onChange={(e) => {
                              const newAreas = [...weatherAlert.areas]
                              newAreas[index] = e.target.value
                              setWeatherAlert(prev => ({ ...prev, areas: newAreas }))
                            }}
                            className="bg-gray-50 border-gray-300 text-sm flex-1"
                          />
                          {weatherAlert.areas.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newAreas = weatherAlert.areas.filter((_, i) => i !== index)
                                setWeatherAlert(prev => ({ ...prev, areas: newAreas }))
                              }}
                              className="text-xs p-2 h-8 w-8"
                            >
                              ×
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weather-autohide">Auto Hide</Label>
                    <Switch
                      checked={weatherAlert.autoHide}
                      onCheckedChange={(checked) => setWeatherAlert(prev => ({ ...prev, autoHide: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="weather-x" className="text-xs">X Position</Label>
                        <Input
                          id="weather-x"
                          type="number"
                          value={weatherPosition.x}
                          onChange={(e) => setWeatherPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weather-y" className="text-xs">Y Position</Label>
                        <Input
                          id="weather-y"
                          type="number"
                          value={weatherPosition.y}
                          onChange={(e) => setWeatherPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sports Score Bug Controls */}
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Sports Score Bug</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sports-visible">Visible</Label>
                    <Switch
                      checked={visibility.sportsBug}
                      onCheckedChange={(checked) => setVisibility(prev => ({ ...prev, sportsBug: checked }))}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="sports-home">Home Team</Label>
                      <Input
                        id="sports-home"
                        value={sportsScore.homeTeam.name}
                        onChange={(e) => setSportsScore(prev => ({ 
                          ...prev, 
                          homeTeam: { ...prev.homeTeam, name: e.target.value }
                        }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sports-home-score">Score</Label>
                      <Input
                        id="sports-home-score"
                        type="number"
                        value={sportsScore.homeTeam.score}
                        onChange={(e) => setSportsScore(prev => ({ 
                          ...prev, 
                          homeTeam: { ...prev.homeTeam, score: parseInt(e.target.value) }
                        }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="sports-away">Away Team</Label>
                      <Input
                        id="sports-away"
                        value={sportsScore.awayTeam.name}
                        onChange={(e) => setSportsScore(prev => ({ 
                          ...prev, 
                          awayTeam: { ...prev.awayTeam, name: e.target.value }
                        }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sports-away-score">Score</Label>
                      <Input
                        id="sports-away-score"
                        type="number"
                        value={sportsScore.awayTeam.score}
                        onChange={(e) => setSportsScore(prev => ({ 
                          ...prev, 
                          awayTeam: { ...prev.awayTeam, score: parseInt(e.target.value) }
                        }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="sports-status">Status</Label>
                      <Input
                        id="sports-status"
                        value={sportsScore.gameStatus}
                        onChange={(e) => setSportsScore(prev => ({ ...prev, gameStatus: e.target.value }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sports-time">Time</Label>
                      <Input
                        id="sports-time"
                        value={sportsScore.timeRemaining}
                        onChange={(e) => setSportsScore(prev => ({ ...prev, timeRemaining: e.target.value }))}
                        className="bg-gray-50 border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sports-compact">Compact Mode</Label>
                    <Switch
                      checked={sportsScore.compact}
                      onCheckedChange={(checked) => setSportsScore(prev => ({ ...prev, compact: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <Label htmlFor="sports-x" className="text-xs">X Position</Label>
                        <Input
                          id="sports-x"
                          type="number"
                          value={sportsPosition.x}
                          onChange={(e) => setSportsPosition(prev => ({ ...prev, x: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sports-y" className="text-xs">Y Position</Label>
                        <Input
                          id="sports-y"
                          type="number"
                          value={sportsPosition.y}
                          onChange={(e) => setSportsPosition(prev => ({ ...prev, y: parseInt(e.target.value) || 0 }))}
                          className="bg-gray-50 border-gray-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}