"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { MountDoomScene } from "./mount-doom-scene"

export function HeroSection() {
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState(
    "Create a dramatic 3D scene of Mount Doom from Lord of the Rings. Show a towering volcanic mountain with glowing lava flows, dark rocky terrain, and an ominous red-orange glow emanating from the peak. The atmosphere should be dark and foreboding with subtle particle effects suggesting ash and ember.",
  )

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* 2D ASCII Background */}
      <div className="absolute inset-0 z-0">
        <MountDoomScene />
      </div>

      {/* Prompt Reveal Corner */}
      <div
        className="absolute top-24 right-6 z-50"
        onMouseEnter={() => setIsPromptVisible(true)}
        onMouseLeave={() => setIsPromptVisible(false)}
        style={{ pointerEvents: 'auto' }}
      >
        <Link href="/playground" className="block" style={{ pointerEvents: 'auto', zIndex: 60, position: 'relative' }}>
          <div className={`transition-all duration-700 flex items-center justify-center overflow-hidden shadow-lg border border-red-500/40 backdrop-blur-sm
            ${isPromptVisible ? 'w-56 rounded-lg bg-red-600 hover:bg-red-700 px-4' : 'w-10 h-10 rounded-full bg-red-500/30 hover:bg-red-500/50'}
            h-10 group`}
            style={{ zIndex: 60, pointerEvents: 'auto', position: 'relative' }}
          >
            {isPromptVisible ? (
              <span className="flex items-center justify-center gap-2 w-full text-base font-semibold text-white text-center transition-all duration-700 text-sm">
                Try this in Playground <span className="text-lg">→</span>
              </span>
            ) : (
              <span className="text-lg font-bold text-white text-center w-full transition-all duration-700">?</span>
            )}
          </div>
        </Link>
      </div>

      {/* Prompt Overlay - Higher z-index than content */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-sm transition-all duration-500 z-40 flex items-center justify-center
          ${isPromptVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ pointerEvents: isPromptVisible ? 'auto' : 'none' }}
      >
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h3 className="text-2xl font-bold mb-6 text-red-300">Current Scene Prompt</h3>
          <div className="bg-gray-900/80 rounded-xl p-6 mb-8 border border-red-500/30">
            <p className="text-gray-300 leading-relaxed italic">&ldquo;{currentPrompt}&rdquo;</p>
          </div>
        </div>
      </div>

      {/* Content - Lower z-index than overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl leading-[0.9] mb-4">
            <span className="font-light text-white/95 tracking-tight">One prompt</span>
            <br />
            <span className="font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent tracking-tight">
              to rule them all
            </span>
          </h1>

        {/* Subheading */}
        <h2 className="text-xl md:text-2xl text-white mb-12">
        Learn to prompt like a{" "}
          <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            GOD
          </span>.
        </h2>

        {/* Mission Statement */}
        <div className="bg-black/40 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 mb-12 max-w-3xl mx-auto text-left space-y-4">
          <h3 className="text-lg font-bold mb-4 text-center">Mission</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            The future belongs
                to those who can expertly carve their vision through artificial intelligence, turning these powerful systems
                into precise instruments of human creativity and intent.
          </p>
          <p className="text-sm text-gray-200 leading-relaxed font-bold text-red-400">
          Mordor is where you learn how.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          <Link
            href="/playground"
            className="bg-white text-black px-8 py-4 rounded-full font-medium text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
          >
            Enter Playground
          </Link>
          <Link
            href="/browse"
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-white/30 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 text-white"
          >
            Explore Library
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center opacity-80">
          <div>
            <div className="text-2xl font-bold text-red-400">50K+</div>
            <div className="text-sm text-gray-400">Prompts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">25+</div>
            <div className="text-sm text-gray-400">Models Supported</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-400">2.3M+</div>
            <div className="text-sm text-gray-400">Views Accumulated</div>
          </div>
        </div>
      </div>
    </section>
  )
}
