import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Play, Star } from "lucide-react"
import Link from "next/link"

export function LearnInterface() {
  const courses = [
    {
      title: "Prompt Engineering Fundamentals",
      description: "Master the basics of crafting effective prompts",
      level: "Beginner",
      duration: "2 hours",
      lessons: 8,
      completed: 3,
      rating: 4.9,
      students: "12.5K",
      thumbnail: "/placeholder.svg?height=200&width=300",
      topics: ["Basic Structure", "Clear Instructions", "Context Setting", "Output Formatting"],
    },
    {
      title: "Advanced Prompt Techniques",
      description: "Chain-of-thought, few-shot learning, and complex reasoning",
      level: "Advanced",
      duration: "4 hours",
      lessons: 12,
      completed: 0,
      rating: 4.8,
      students: "8.2K",
      thumbnail: "/placeholder.svg?height=200&width=300",
      topics: ["Chain-of-Thought", "Few-Shot Learning", "Role Playing", "Meta-Prompting"],
    },
    {
      title: "Model-Specific Optimization",
      description: "Optimize prompts for GPT-4, Claude, Grok, and more",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 10,
      completed: 0,
      rating: 4.7,
      students: "6.8K",
      thumbnail: "/placeholder.svg?height=200&width=300",
      topics: ["GPT-4 Techniques", "Claude Optimization", "Grok Strategies", "Model Comparison"],
    },
  ]

  const quickTips = [
    {
      title: "The Italian Brainrot Formula",
      description: "Why absurd + specific = viral content",
      readTime: "3 min",
      category: "Viral Content",
      trending: true,
    },
    {
      title: "Temperature Settings Decoded",
      description: "When to use 0.1 vs 0.7 vs 1.5 for different outputs",
      readTime: "5 min",
      category: "Technical",
      trending: false,
    },
    {
      title: "System Prompt Architecture",
      description: "Building robust system prompts that work consistently",
      readTime: "7 min",
      category: "Advanced",
      trending: true,
    },
    {
      title: "Prompt Injection Defense",
      description: "Protecting your prompts from malicious inputs",
      readTime: "4 min",
      category: "Security",
      trending: false,
    },
  ]

  const challenges = [
    {
      title: "30-Day Prompt Challenge",
      description: "Create one viral-worthy prompt every day for 30 days",
      participants: "2.3K",
      prize: "$500 + Recognition",
      difficulty: "All Levels",
      timeLeft: "12 days",
    },
    {
      title: "Character Creation Contest",
      description: "Build the most engaging AI character",
      participants: "856",
      prize: "$1000 + Feature",
      difficulty: "Intermediate",
      timeLeft: "5 days",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Learning Path */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🎯 Learning Paths</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="bg-gray-900/80 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group hover:scale-[1.02]"
            >
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-800 rounded-t-lg overflow-hidden">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        course.level === "Beginner"
                          ? "default"
                          : course.level === "Intermediate"
                            ? "secondary"
                            : "destructive"
                      }
                      className="text-xs"
                    >
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                      <span>({course.students})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.lessons} lessons</span>
                  </div>

                  {course.completed > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-purple-400">
                          {Math.round((course.completed / course.lessons) * 100)}%
                        </span>
                      </div>
                      <Progress value={(course.completed / course.lessons) * 100} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.slice(0, 2).map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        +{course.topics.length - 2}
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    {course.completed > 0 ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Start Course
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">💡 Quick Tips & Insights</h2>
          <Link href="/learn/tips" className="text-purple-400 hover:text-purple-300 transition-colors">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickTips.map((tip, index) => (
            <Card
              key={index}
              className="bg-gray-900/80 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                    {tip.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    {tip.trending && (
                      <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">🔥 Trending</Badge>
                    )}
                    <span className="text-xs text-gray-400">{tip.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-purple-300 transition-colors">{tip.title}</h3>

                <p className="text-gray-400 text-sm">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Challenges */}
      <section>
        <h2 className="text-3xl font-bold mb-6">🏆 Active Challenges</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2">{challenge.title}</CardTitle>
                    <p className="text-gray-300 text-sm">{challenge.description}</p>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                    {challenge.timeLeft} left
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-purple-300">{challenge.participants}</div>
                    <div className="text-xs text-gray-400">Participants</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-300">{challenge.prize}</div>
                    <div className="text-xs text-gray-400">Prize</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-300">{challenge.difficulty}</div>
                    <div className="text-xs text-gray-400">Difficulty</div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Join Challenge
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Community Stats */}
      <section className="bg-gray-900/50 rounded-2xl p-8 border border-purple-500/20">
        <h2 className="text-3xl font-bold mb-6 text-center">📊 Community Learning Stats</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">15,892</div>
            <div className="text-sm text-gray-400">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400 mb-2">2.3M</div>
            <div className="text-sm text-gray-400">Prompts Tested</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400 mb-2">847</div>
            <div className="text-sm text-gray-400">Courses Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-400 mb-2">99.2%</div>
            <div className="text-sm text-gray-400">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  )
}
