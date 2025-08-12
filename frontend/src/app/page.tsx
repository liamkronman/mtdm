import { CharacterCard } from "@/components/character-card"
import { HeroSection } from "@/components/hero-section"
import { StatsBar } from "@/components/stats-bar"
import { CategorySection } from "@/components/category-section"
import { HomepageCarousels } from "@/components/homepage-carousels"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt="Mordor" width={32} height={32} />
              <span className="text-2xl font-semibold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-dm-mono">
                mtdm.ai
              </span>
            </Link>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search for 'Best GPT-4o prompts'"
                className="w-80 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-300 font-dm-sans">
            <Link href="/browse" className="hover:text-red-400 transition-colors font-semibold">
              Library
            </Link>
            <Link href="https://discord.gg/mordor" target="_blank" className="hover:text-red-400 transition-colors font-semibold">
              Discord
            </Link>
            <Link href="/login" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors font-semibold">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* AI Model Carousels */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Prompts by Model</h2>
          <p className="text-xl text-gray-400">Discover the best prompts for each AI model</p>
        </div>
        
        <HomepageCarousels />
      </section>

      {/* AI Characters Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">🤖 Legendary AI Characters</h2>
            <p className="text-gray-400">Experience conversations with AI characters that have unique personalities and emotions</p>
          </div>
          <Link href="/playground/characters" className="text-red-400 hover:text-red-300 transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {/* Featured Abby Character */}
          <CharacterCard
            name="Abby"
            description="A dramatic Gen-Z girlfriend in a breakup simulator. Always looking for reasons to end the relationship."
            avatar="/logo.png"
            tags={["Drama", "Breakup", "Gen-Z"]}
            interactions="2.3K"
            rating={4.8}
            model="GPT-4"
          />
          
          {/* Placeholder characters for future */}
          <CharacterCard
            name="Coming Soon"
            description="More AI characters with unique personalities and conversation styles will be added soon."
            avatar="/logo.png"
            tags={["Coming Soon"]}
            interactions="0"
            rating={0}
            model="TBD"
          />
          
          <CharacterCard
            name="Coming Soon"
            description="More AI characters with unique personalities and conversation styles will be added soon."
            avatar="/logo.png"
            tags={["Coming Soon"]}
            interactions="0"
            rating={0}
            model="TBD"
          />
          
          <CharacterCard
            name="Coming Soon"
            description="More AI characters with unique personalities and conversation styles will be added soon."
            avatar="/logo.png"
            tags={["Coming Soon"]}
            interactions="0"
            rating={0}
            model="TBD"
          />
        </div>
      </section>

      {/* Category Sections */}
      <CategorySection />

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-2xl p-12 border border-red-500/20">
          <h2 className="text-4xl font-bold mb-4">Ready to Become a Prompt God?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who&apos;ve mastered the art and science of prompt engineering
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/mordor"
              target="_blank"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Join Discord Community
            </Link>
            <Link
              href="/playground"
              className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Experimenting
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-500/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image src="/logo.png" alt="Mordor" width={24} height={24} />
                <h3 className="font-semibold text-lg font-kanit">Mordor</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Making prompt engineering actual engineering. Master the science behind AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/playground" className="block hover:text-white">
                  Playground
                </Link>
                <Link href="/browse" className="block hover:text-white">
                  Browse
                </Link>
                <Link href="/submit" className="block hover:text-white">
                  Submit
                </Link>
                <Link href="/learn" className="block hover:text-white">
                  Learn
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="https://discord.gg/mordor" target="_blank" className="block hover:text-white">
                  Discord
                </Link>
                <Link href="/competitions" className="block hover:text-white">
                  Competitions
                </Link>
                <Link href="/leaderboard" className="block hover:text-white">
                  Leaderboard
                </Link>
                <Link href="/blog" className="block hover:text-white">
                  Blog
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/docs" className="block hover:text-white">
                  Documentation
                </Link>
                <Link href="/api" className="block hover:text-white">
                  API
                </Link>
                <Link href="/help" className="block hover:text-white">
                  Help Center
                </Link>
                <Link href="/contact" className="block hover:text-white">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-red-500/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Mordor. Making AI accessible through better prompts.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
