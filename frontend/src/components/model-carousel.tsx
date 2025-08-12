"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
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

export function ModelCarousel({ model, prompts = [] }: ModelCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Added safety checks for prompts array
  const safePrompts = prompts || []

  // Calculate total pages and current page
  const totalPages = Math.ceil(safePrompts.length / cardsPerView)
  const currentPage = Math.floor(currentIndex / cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = safePrompts.length - cardsPerView
      return prev >= maxIndex ? 0 : Math.min(prev + cardsPerView, maxIndex)
    })
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      return prev <= 0 ? Math.max(0, safePrompts.length - cardsPerView) : Math.max(0, prev - cardsPerView)
    })
  }

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setTranslateX(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setTranslateX(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 50 // minimum drag distance to trigger slide change
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        prevSlide()
      } else {
        nextSlide()
      }
    }
    setTranslateX(0)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleDragStart(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX)
  }

  const handleMouseUp = () => {
    handleDragEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    handleDragEnd()
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleDragMove(e.clientX)
      }
    }

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleDragEnd()
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging, startX])

  // Updated condition to use safePrompts
  if (!safePrompts.length) return null

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{model} Prompts</h2>
          <p className="text-gray-400">Discover the best prompts for {model}</p>
        </div>
        <Link
          href={`/browse?model=${encodeURIComponent(model)}`}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          View All →
        </Link>
      </div>

      <div className="relative group">
        {/* Navigation Buttons */}
        {safePrompts.length > cardsPerView && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Carousel Container */}
        <div className="overflow-hidden rounded-xl">
          <div
            ref={carouselRef}
            className={`flex transition-transform duration-500 ease-in-out gap-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / cardsPerView)}% + ${translateX}px))`,
              width: safePrompts.length > cardsPerView ? `${(safePrompts.length * 100) / cardsPerView}%` : "100%",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {safePrompts.map((prompt) => (
              <div
                key={prompt.id}
                className={`flex-shrink-0 ${
                  safePrompts.length >= cardsPerView
                    ? "lg:w-1/3 md:w-1/2 w-full"
                    : safePrompts.length === 2
                      ? "w-1/2"
                      : "w-full"
                }`}
              >
                <Link href={`/playground?prompt=${prompt.id}`}>
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group/card">
                    <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                      {prompt.image_url ? (
                        <img
                          src={prompt.image_url || "/placeholder.svg"}
                          alt={prompt.title}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-1">🎬</div>
                            <div className="text-gray-400 text-xs">{prompt.output_type}</div>
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-red-500/90 hover:bg-red-500 p-2 rounded-full">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover/card:text-red-400 transition-colors">
                        {prompt.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {prompt.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-800/50 text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {(prompt.tags?.length || 0) > 2 && (
                          <span className="px-2 py-0.5 bg-gray-800/50 text-gray-400 text-xs rounded-full">
                            +{(prompt.tags?.length || 0) - 2}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                            {formatNumber(prompt.metrics?.views || 0)}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            {formatNumber(prompt.metrics?.likes || 0)}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-300 truncate max-w-20">{prompt.author}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {safePrompts.length > cardsPerView && totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * cardsPerView)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPage ? "bg-red-500 w-6" : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
