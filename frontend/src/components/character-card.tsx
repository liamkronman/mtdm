import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CharacterCardProps {
  name: string
  description: string
  avatar: string
  tags: string[]
  interactions: string
  rating: number
  model: string
}

export function CharacterCard({ name, description, avatar, interactions }: CharacterCardProps) {
  const isAbby = name.toLowerCase() === "abby"
  
  return (
    <Card className="bg-gray-900/60 border-red-500/20 hover:border-red-400/40 transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/10 backdrop-blur-sm">
      <CardContent className="p-5 text-center">
        {/* Avatar */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <Image
            src={avatar || "/placeholder.svg"}
            alt={name}
            fill
            className="rounded-full object-cover border-2 border-red-500/30 group-hover:border-red-400/50 transition-colors"
          />
        </div>

        {/* Name and Description */}
        <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-red-300 transition-colors line-clamp-1">{name}</h3>
        <p className="text-gray-400 mb-3 text-sm leading-snug line-clamp-2">{description}</p>

        {/* Interactions */}
        <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gray-400">
          <MessageCircle className="w-4 h-4" />
          <span>{interactions} chats</span>
        </div>

        {/* Single CTA Button */}
        {isAbby ? (
          <Link href="/playground/characters">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 text-sm">
              Chat with Abby
            </Button>
          </Link>
        ) : (
          <Button disabled className="w-full bg-gray-600 text-white font-medium py-2 text-sm">
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
