import { LearnInterface } from "@/components/learn-interface"

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🧠 The Academy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Master the science of prompt engineering. From beginner techniques to advanced strategies, learn what
            separates good prompts from legendary ones.
          </p>
        </div>

        <LearnInterface />
      </div>
    </div>
  )
}
