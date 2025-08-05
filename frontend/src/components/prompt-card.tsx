import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy, Eye, Heart, Play, Star, TrendingUp } from "lucide-react"

interface PromptCardProps {
  title: string
  tags: string[]
  impact: {
    views: string
    likes: string
  }
  rating?: number
  model?: string
  category?: string
  promptPreview?: string
}

export function PromptCard({
  title,
  tags,
  impact,
  rating = 4.5,
  model = "GPT-4o",
  category = "General",
  promptPreview = "You are an expert assistant that...",
}: PromptCardProps) {
  return (
    <Card className="bg-gray-900/80 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-300 transition-colors line-clamp-2">
              {title}
            </h3>
            <Badge variant="secondary" className="bg-purple-900/50 text-purple-300 border-purple-500/30 text-xs">
              {category}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{rating}</span>
          </div>
        </div>

        {/* Prompt Preview */}
        <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-400 mb-1">Preview:</p>
          <p className="text-sm text-gray-300 italic line-clamp-2">"{promptPreview}..."</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
            {model}
          </Badge>
          {tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
              {tag}
            </Badge>
          ))}
          {tags.length > 2 && (
            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
              +{tags.length - 2}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{impact.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{impact.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400">Trending</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Try It
          </Button>
          <Button variant="outline" className="border-gray-600 hover:bg-gray-800 bg-transparent" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
