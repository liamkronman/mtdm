"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

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

interface ModelCarouselProps {
  model: string
  prompts: Prompt[]
}

export function ModelCarousel({ model, prompts }: ModelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % prompts.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + prompts.length) % prompts.length)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  if (!prompts.length) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{model} Prompts</h2>
            <p className="text-gray-400 text-sm">Discover the best prompts for {model}</p>
          </div>
          <Link 
            href={`/browse?model=${encodeURIComponent(model)}`}
            className="text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            View All →
          </Link>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 border border-gray-700/30 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-sm">No prompts available for {model} yet.</div>
          <div className="text-gray-500 text-xs mt-1">Check back soon for new content!</div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">{model} Prompts</h2>
          <p className="text-gray-400 text-sm">Discover the best prompts for {model}</p>
        </div>
        <Link 
          href={`/browse?model=${encodeURIComponent(model)}`}
          className="text-red-400 hover:text-red-300 transition-colors text-sm"
        >
          View All →
        </Link>
      </div>

      <div className="relative group">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {prompts.map((prompt) => (
              <div key={prompt.id} className="w-full flex-shrink-0">
                <div className="mx-1">
                  <Link href={`/playground?prompt=${prompt.id}`}>
                    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden hover:border-red-500/50 transition-all duration-300 group/card">
                      {/* Image/Video Preview */}
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                        {prompt.image_url ? (
                          <img
                            src={prompt.image_url}
                            alt={prompt.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl mb-1">🎬</div>
                              <div className="text-gray-400 text-xs">{prompt.output_type}</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-red-500/90 hover:bg-red-500 p-2 rounded-full">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover/card:text-red-400 transition-colors">
                          {prompt.title}
                        </h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {prompt.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 bg-gray-800/50 text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {prompt.tags.length > 2 && (
                            <span className="px-1.5 py-0.5 bg-gray-800/50 text-gray-400 text-xs rounded-full">
                              +{prompt.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Stats and Author */}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                              </svg>
                              {formatNumber(prompt.metrics.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                              {formatNumber(prompt.metrics.likes)}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-300 text-xs">{prompt.author}</div>
                            <div className="text-xs opacity-75">{prompt.attribution}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {prompts.length > 1 && (
          <div className="flex justify-center mt-4 gap-1.5">
            {prompts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-red-500 w-4" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
