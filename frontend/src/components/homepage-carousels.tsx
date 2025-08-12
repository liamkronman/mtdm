"use client"

import { useState, useEffect } from "react"
import { ModelCarousel } from "./model-carousel"

interface Prompt {
  id: string
  title: string
  model: string
  output_type: string
  tags: string[]
  source_url: string
  attribution: string
  image_url: string | null
  created_at: string
  author: string
  metrics: {
    views: number
    likes: number
    shares: number
    comments: number
  }
}

export function HomepageCarousels() {
  const [models, setModels] = useState<string[]>([])
  const [promptsByModel, setPromptsByModel] = useState<Record<string, Prompt[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchModelsAndPrompts = async () => {
      try {
        setLoading(true)

        // Fetch available models
        const modelsResponse = await fetch("http://localhost:8000/api/models")
        if (!modelsResponse.ok) throw new Error("Failed to fetch models")
        const modelsData = await modelsResponse.json()

        setModels(modelsData)

        // Fetch prompts for each model
        const promptsData: Record<string, Prompt[]> = {}

        for (const model of modelsData) {
          const promptsResponse = await fetch(
            `http://localhost:8000/api/prompts/by-model/${encodeURIComponent(model)}?limit=6`,
          )
          if (promptsResponse.ok) {
            const modelPrompts = await promptsResponse.json()
            promptsData[model] = modelPrompts
          }
        }

        setPromptsByModel(promptsData)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load prompts")
        setLoading(false)
      }
    }

    fetchModelsAndPrompts()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading featured prompts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-4">Error loading prompts: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">No prompts available yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {models.map((model) => {
        const prompts = promptsByModel[model] || []
        // Always show the carousel even if no prompts, so user knows the model exists
        return <ModelCarousel key={model} model={model} prompts={prompts} />
      })}
    </div>
  )
}
