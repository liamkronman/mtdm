"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Share, Settings, Zap, Copy, RefreshCw, Users } from "lucide-react"
import Link from "next/link"

export function PlaygroundInterface() {
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("gpt-4o")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1000])
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")

  const models = [
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", cost: "$$$" },
    { id: "claude-3", name: "Claude-3 Sonnet", provider: "Anthropic", cost: "$$" },
    { id: "grok-3", name: "Grok-3", provider: "xAI", cost: "$" },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google", cost: "$$" },
  ]

  const handleRun = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResponse(
        "This is a simulated response from the AI model. In a real implementation, this would be the actual response from your selected model.",
      )
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Tabs defaultValue="prompts" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-8">
        <TabsTrigger value="prompts">Prompt Engineering</TabsTrigger>
        <TabsTrigger value="characters">AI Characters</TabsTrigger>
        <TabsTrigger value="veo">Veo 3D</TabsTrigger>
      </TabsList>

      <TabsContent value="prompts" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Prompt Input */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  Prompt Engineering Studio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">System Prompt (Optional)</label>
                  <Textarea
                    placeholder="You are a helpful assistant that..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Main Prompt</label>
                  <Textarea
                    placeholder="Write your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white min-h-[200px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleRun} disabled={!prompt || isLoading} className="bg-purple-600 hover:bg-purple-700">
                    {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                    {isLoading ? "Running..." : "Run Prompt"}
                  </Button>
                  <Button variant="outline" className="border-gray-600 bg-transparent">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="border-gray-600 bg-transparent">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Response Area */}
            <Card className="bg-gray-900/80 border-purple-500/20">
              <CardHeader>
                <CardTitle>Response</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400"></div>
                    <span className="ml-3 text-gray-400">Generating response...</span>
                  </div>
                ) : response ? (
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Run your prompt to see the response here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Settings */}
          <div className="space-y-6">
            <Card className="bg-gray-900/80 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-400" />
                  Model Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Model</label>
                  <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                    {models.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.provider}) - {model.cost}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Temperature: {temperature[0]}</label>
                  <Slider
                    value={temperature[0]}
                    onChange={(e) => setTemperature([parseFloat(e.target.value)])}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">Higher values make output more random</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Max Tokens: {maxTokens[0]}</label>
                  <Slider
                    value={maxTokens[0]}
                    onChange={(e) => setMaxTokens([parseInt(e.target.value)])}
                    max={4000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">Maximum length of the response</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card className="bg-gray-900/80 border-purple-500/20">
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="creative" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                    <TabsTrigger value="creative">Creative</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="coding">Coding</TabsTrigger>
                  </TabsList>

                  <TabsContent value="creative" className="space-y-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 text-left bg-transparent"
                      onClick={() => setPrompt("Write a short story about...")}
                    >
                      📖 Story Writer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Create a character that...")}
                    >
                      🎭 Character Creator
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Generate a viral social media post about...")}
                    >
                      📱 Social Media
                    </Button>
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Analyze the following data and provide insights...")}
                    >
                      📊 Data Analysis
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Summarize the key points from...")}
                    >
                      📝 Summarizer
                    </Button>
                  </TabsContent>

                  <TabsContent value="coding" className="space-y-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Write a function that...")}
                    >
                      💻 Code Generator
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start border-gray-600 bg-transparent"
                      onClick={() => setPrompt("Debug this code and explain the issue...")}
                    >
                      🐛 Code Debugger
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="characters" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">AI Characters</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experience conversations with AI characters that have unique personalities, emotions, and conversation styles.
            Each character responds based on their own internal state and objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900/80 border-red-500/20 hover:border-red-500/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-red-400" />
                Abby
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                A dramatic Gen-Z girlfriend in a breakup simulator. Always looking for reasons to end the relationship.
              </p>
              <Link href="/playground/characters">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Chat with Abby
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                More AI characters with unique personalities and conversation styles will be added soon.
              </p>
              <Button disabled className="w-full bg-gray-600">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="veo" className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Veo 3D Generation</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate 3D scenes and animations using Veo technology. Create immersive visual experiences.
          </p>
        </div>

        <Card className="bg-gray-900/80 border-purple-500/20">
          <CardHeader>
            <CardTitle>Veo 3D Studio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Veo 3D generation features will be implemented here. This will allow users to create 3D scenes and animations.
            </p>
            <Button disabled className="bg-purple-600 hover:bg-purple-700">
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
