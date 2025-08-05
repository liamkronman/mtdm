"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, X, Eye, Send } from "lucide-react"

export function SubmitInterface() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [category, setCategory] = useState("")
  const [model, setModel] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [submissionType, setSubmissionType] = useState("prompt")

  const categories = [
    "AI Videos",
    "AI Characters",
    "Self-Help & Therapy",
    "Creative Writing",
    "Music & Audio",
    "Education",
    "Coding",
    "Business",
    "Social Media",
    "Gaming",
  ]

  const models = [
    "GPT-4o",
    "Claude-3 Sonnet",
    "Claude-3 Haiku",
    "Grok-3",
    "Gemini Pro",
    "Veo3",
    "Suno",
    "ElevenLabs",
    "Midjourney",
    "DALL-E 3",
  ]

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Submitting:", {
      title,
      description,
      prompt,
      systemPrompt,
      category,
      model,
      tags,
      submissionType,
    })
  }

  return (
    <div className="space-y-6">
      {/* Submission Type */}
      <Card className="bg-gray-900/80 border-purple-500/20">
        <CardHeader>
          <CardTitle>What are you sharing?</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={submissionType} onValueChange={setSubmissionType}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800">
              <TabsTrigger value="prompt">📝 Text Prompt</TabsTrigger>
              <TabsTrigger value="video">🎬 AI Video</TabsTrigger>
              <TabsTrigger value="character">🤖 AI Character</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="bg-gray-900/80 border-purple-500/20">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Title *</label>
            <Input
              placeholder="Give your prompt a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
            <Textarea
              placeholder="Describe what this prompt does and what makes it special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Category *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Model Used *</label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {models.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompt Content */}
      <Card className="bg-gray-900/80 border-purple-500/20">
        <CardHeader>
          <CardTitle>The Prompt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">System Prompt (Optional)</label>
            <Textarea
              placeholder="You are a helpful assistant that..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Main Prompt *</label>
            <Textarea
              placeholder="Paste your full prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags and Media */}
      <Card className="bg-gray-900/80 border-purple-500/20">
        <CardHeader>
          <CardTitle>Tags & Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && addTag()}
              />
              <Button onClick={addTag} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-purple-900/50 text-purple-300">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="ml-2 hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {submissionType === "video" && (
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Video URL or Upload</label>
              <div className="space-y-2">
                <Input
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-gray-800 border-gray-600 text-white"
                />
                <div className="text-center">
                  <Button variant="outline" className="border-gray-600 bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video File
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Impact Metrics (Optional) */}
      <Card className="bg-gray-900/80 border-purple-500/20">
        <CardHeader>
          <CardTitle>Impact Metrics (Optional)</CardTitle>
          <p className="text-sm text-gray-400">
            If your prompt generated viral content, share the metrics to help others understand its success
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Views/Impressions</label>
              <Input placeholder="e.g., 2.3M" className="bg-gray-800 border-gray-600 text-white" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Likes/Reactions</label>
              <Input placeholder="e.g., 180K" className="bg-gray-800 border-gray-600 text-white" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Platform</label>
              <Select>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="twitter">Twitter/X</SelectItem>
                  <SelectItem value="reddit">Reddit</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview and Submit */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 border-gray-600 bg-transparent">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button
          onClick={handleSubmit}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          disabled={!title || !prompt || !category || !model}
        >
          <Send className="w-4 h-4 mr-2" />
          Submit to Pronto
        </Button>
      </div>

      {/* Submission Guidelines */}
      <Card className="bg-gray-800/50 border-gray-600/30">
        <CardHeader>
          <CardTitle className="text-lg">📋 Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-300 space-y-2">
          <p>• Ensure your prompt is original and produces consistent results</p>
          <p>• Provide clear, accurate descriptions and appropriate tags</p>
          <p>• Include system prompts when they're essential to the output</p>
          <p>• Respect intellectual property and give credit where due</p>
          <p>• Test your prompt multiple times before submitting</p>
        </CardContent>
      </Card>
    </div>
  )
}
