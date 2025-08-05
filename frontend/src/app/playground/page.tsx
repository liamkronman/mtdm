import { PlaygroundInterface } from "@/components/playground-interface"

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-medium mb-6">The Laboratory</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Experiment with prompts, test different models, and perfect your craft. This is where prompt engineers are
            born.
          </p>
        </div>

        <PlaygroundInterface />
      </div>
    </div>
  )
}
