import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Play } from "lucide-react"

interface VideoCardProps {
  title: string
  videoUrl: string
  description: string
  tags: string[]
  views: string
  likes: string
  model: string
  promptPreview: string
}

export function VideoCard({ title, videoUrl, description, tags, views, likes, model, promptPreview }: VideoCardProps) {
  return (
    <Card className="bg-gray-900/60 border-red-500/20 hover:border-red-400/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10 backdrop-blur-sm">
      <CardContent className="p-0">
        {/* Video Thumbnail */}
        <div className="relative aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Play className="w-12 h-12 text-white/80" />
          </div>
        </div>

        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-red-300 transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* View Count and Recency */}
          <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
            <span>•</span>
            <span>2 days ago</span>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 text-sm">
            See the Context
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
