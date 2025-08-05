"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Clock, Star } from "lucide-react"
import { PromptCard } from "@/components/prompt-card"
import { VideoCard } from "@/components/video-card"
import { CharacterCard } from "@/components/character-card"

export function BrowseInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedModel, setSelectedModel] = useState("all")
  const [sortBy, setSortBy] = useState("trending")

  const categories = [
    "All Categories",
    "AI Videos",
    "AI Characters",
    "Self-Help",
    "Creative Writing",
    "Music & Audio",
    "Education",
    "Coding",
    "Business",
  ]

  const models = ["All Models", "GPT-4o", "Claude-3", "Grok-3", "Gemini Pro", "Veo3", "Suno"]

  // Sample data - in real app this would come from API
  const samplePrompts = [
    {
      title: "Italian Brainrot Content Generator",
      tags: ["veo3", "video", "brainrot", "viral"],
      impact: { views: "2.3M", likes: "180K" },
      rating: 4.9,
      model: "Veo3",
      category: "Video",
      promptPreview:
        "Create an absurd Italian-style video where everything is exaggerated and nonsensical, featuring...",
    },
    {
      title: "CBT Therapist AI",
      tags: ["gpt-4o", "therapy", "mental-health"],
      impact: { views: "847K", likes: "65K" },
      rating: 4.8,
      model: "GPT-4o",
      category: "Self-Help",
      promptPreview: "You are a licensed cognitive behavioral therapist. Use CBT techniques to help users...",
    },
    {
      title: "Viral TikTok Script Writer",
      tags: ["claude-3", "social-media", "viral"],
      impact: { views: "1.2M", likes: "95K" },
      rating: 4.7,
      model: "Claude-3",
      category: "Creative",
      promptPreview: "Write a TikTok script that will go viral by incorporating current trends...",
    },
  ]

  const sampleVideos = [
    {
      title: "AI Drake Diss Track",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "AI-generated Drake diss track that sounds eerily real",
      tags: ["Claude-3", "Suno", "music", "rap"],
      views: "3.1M",
      likes: "220K",
      model: "Claude-3 + Suno",
      promptPreview: "Write a Drake-style diss track with...",
    },
    {
      title: "Yoda Explains Quantum Physics",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Educational content in Yoda's voice that actually makes sense",
      tags: ["GPT-4o", "ElevenLabs", "education"],
      views: "1.8M",
      likes: "95K",
      model: "GPT-4o + ElevenLabs",
      promptPreview: "You are Yoda. Explain quantum physics using...",
    },
  ]

  const sampleCharacters = [
    {
      name: "Dr. Mindful",
      description: "CBT therapist that actually helps",
      avatar: "/placeholder.svg?height=80&width=80",
      tags: ["GPT-4o", "therapy", "self-help"],
      interactions: "847K",
      rating: 4.9,
      model: "GPT-4o",
    },
    {
      name: "Code Sensei",
      description: "Programming mentor who explains like you're 5",
      avatar: "/placeholder.svg?height=80&width=80",
      tags: ["GPT-4o", "coding", "education"],
      interactions: "623K",
      rating: 4.9,
      model: "GPT-4o",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-gray-900/80 rounded-xl p-6 border border-purple-500/20">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search prompts, creators, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, "-")}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {models.map((model) => (
                  <SelectItem key={model} value={model.toLowerCase().replace(/\s+/g, "-")}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="trending">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending
                  </div>
                </SelectItem>
                <SelectItem value="recent">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Recent
                  </div>
                </SelectItem>
                <SelectItem value="rating">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Top Rated
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        <div className="flex gap-2 mt-4">
          <Badge variant="secondary" className="bg-purple-900/50 text-purple-300">
            🔥 Trending
          </Badge>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            All Categories
          </Badge>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            All Models
          </Badge>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border border-purple-500/20">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="videos">🎬 Videos</TabsTrigger>
          <TabsTrigger value="characters">🤖 Characters</TabsTrigger>
          <TabsTrigger value="prompts">📝 Prompts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8 mt-6">
          {/* Videos Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🎬 Trending Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleVideos.map((video, index) => (
                <VideoCard key={index} {...video} />
              ))}
            </div>
          </div>

          {/* Characters Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">🤖 Popular Characters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sampleCharacters.map((character, index) => (
                <CharacterCard key={index} {...character} />
              ))}
            </div>
          </div>

          {/* Prompts Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">📝 Top Prompts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePrompts.map((prompt, index) => (
                <PromptCard key={index} {...prompt} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleVideos.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleCharacters.map((character, index) => (
              <CharacterCard key={index} {...character} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prompts" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePrompts.map((prompt, index) => (
              <PromptCard key={index} {...prompt} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Load More */}
      <div className="text-center py-8">
        <Button variant="outline" className="border-purple-500/30 hover:bg-purple-900/20 bg-transparent">
          Load More Results
        </Button>
      </div>
    </div>
  )
}
