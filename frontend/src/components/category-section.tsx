import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    name: "🎭 Self-Help & Therapy",
    description: "AI therapists, life coaches, and mental health companions",
    count: "2,847",
    trending: true,
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30",
  },
  {
    name: "🎨 Creative Writing",
    description: "Fanfiction, storytelling, and creative content generation",
    count: "5,234",
    trending: true,
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    name: "🎵 Music & Audio",
    description: "AI-generated music, voice synthesis, and audio content",
    count: "1,892",
    trending: false,
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    name: "🎬 Video & Animation",
    description: "AI video generation, animation, and visual storytelling",
    count: "3,156",
    trending: true,
    color: "from-red-500/20 to-orange-500/20",
    border: "border-red-500/30",
  },
  {
    name: "🤖 AI Companions",
    description: "Virtual friends, romantic partners, and social AI",
    count: "4,567",
    trending: true,
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
  {
    name: "📚 Education & Learning",
    description: "Tutors, explainers, and educational content creators",
    count: "2,341",
    trending: false,
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/30",
  },
]

export function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-medium mb-6">Explore by Category</h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Dive deep into specialized prompt collections, each crafted for specific use cases and outcomes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 pt-8">
        {categories.map((category, index) => (
          <Link key={index} href={`/browse?category=${category.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}>
            <Card
              className={`bg-gradient-to-br ${category.color} border ${category.border} hover:scale-[1.02] transition-all duration-500 group cursor-pointer h-full backdrop-blur-sm relative overflow-hidden m-0`}
            >
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
              
              <CardContent className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-red-300 transition-colors leading-tight">
                    {category.name}
                  </h3>
                  {category.trending && (
                    <Badge className="bg-orange-500/80 text-white border-orange-500/50 text-xs px-2 py-1">Hot</Badge>
                  )}
                </div>

                <p className="text-gray-200 mb-6 leading-relaxed text-sm">{category.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">{category.count}</span>
                  <span className="text-gray-300 uppercase tracking-wider text-xs font-medium">prompts</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
