import { TrendingUp, Users, Zap, Target } from "lucide-react"

export function StatsBar() {
  return (
    <div className="bg-black/40 backdrop-blur-sm border-y border-red-500/20 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-full mb-3">
              <Zap className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">50,247</div>
            <div className="text-sm text-gray-400">Prompts Engineered</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600/20 rounded-full mb-3">
              <Users className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">15,892</div>
            <div className="text-sm text-gray-400">Prompt Engineers</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-600/20 rounded-full mb-3">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">2.3M</div>
            <div className="text-sm text-gray-400">Experiments Run</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-600/20 rounded-full mb-3">
              <Target className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">99.2%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
