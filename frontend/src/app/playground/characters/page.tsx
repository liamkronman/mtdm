import { CharacterChat } from "@/components/character-chat"

export default function CharactersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-medium mb-6">AI Characters</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Chat with AI characters and experience different personalities. Each character has their own unique traits, 
            emotions, and conversation style.
          </p>
        </div>

        <CharacterChat characterName="Abby" />
      </div>
    </div>
  )
} 