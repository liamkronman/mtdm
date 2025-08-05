import { BrowseInterface } from "@/components/browse-interface"

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🔍 The Archives</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the most powerful prompts from the community. Filter by category, model, and success metrics to
            find exactly what you need.
          </p>
        </div>

        <BrowseInterface />
      </div>
    </div>
  )
}
