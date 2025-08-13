"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Play, Save, Share, Settings, Zap, Copy, RefreshCw, 
  Key, CreditCard, Download, Eye, EyeOff, AlertCircle,
  CheckCircle, Clock, Image, Video, FileText
} from "lucide-react"
import Link from "next/link"

interface Model {
  id: string
  name: string
  provider: string
  type: 'text' | 'image' | 'video'
  cost: string
  description: string
  maxTokens?: number
  supportsStreaming?: boolean
}

interface Prompt {
  id: string
  title: string
  prompt_text: string
  model: string
  output_type: string
  tags: string[]
}

export function PlaygroundInterface() {
  const searchParams = useSearchParams()
  
  // State
  const [prompt, setPrompt] = useState("")
  const [systemPrompt, setSystemPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([1000])
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [responseImage, setResponseImage] = useState("")
  const [jobId, setJobId] = useState("")
  const [jobStatus, setJobStatus] = useState("")
  
  // BYOK State
  const [useMyKey, setUseMyKey] = useState(true)
  const [apiKey, setApiKey] = useState("")
  const [showApiKey, setShowApiKey] = useState(false)
  const [keyError, setKeyError] = useState("")

  // Models configuration
  const models: Model[] = [
    // Text Models
    { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", type: "text", cost: "$$$", description: "Most capable text model", maxTokens: 4096, supportsStreaming: true },
    { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", type: "text", cost: "$", description: "Fast and efficient", maxTokens: 4096, supportsStreaming: true },
    { id: "claude-3-sonnet", name: "Claude 3 Sonnet", provider: "Anthropic", type: "text", cost: "$$", description: "Balanced performance", maxTokens: 4096, supportsStreaming: true },
    { id: "claude-3-haiku", name: "Claude 3 Haiku", provider: "Anthropic", type: "text", cost: "$", description: "Fast and affordable", maxTokens: 4096, supportsStreaming: true },
    { id: "gemini-pro", name: "Gemini Pro", provider: "Google", type: "text", cost: "$$", description: "Google's latest model", maxTokens: 4096, supportsStreaming: true },
    { id: "grok-3", name: "Grok-3", provider: "xAI", type: "text", cost: "$", description: "Elon's AI model", maxTokens: 4096, supportsStreaming: true },
    
    // Image Models
    { id: "dall-e-3", name: "DALL-E 3", provider: "OpenAI", type: "image", cost: "$$", description: "High-quality image generation" },
    { id: "midjourney", name: "Midjourney", provider: "Midjourney", type: "image", cost: "$$", description: "Artistic image generation" },
    { id: "stable-diffusion", name: "Stable Diffusion", provider: "Stability AI", type: "image", cost: "$", description: "Open source image generation" },
    { id: "seedream", name: "Seedream", provider: "Seedream", type: "image", cost: "$$", description: "Advanced image generation" },
    { id: "grok-imagine", name: "Grok Imagine", provider: "xAI", type: "image", cost: "$", description: "xAI's image model" },
    { id: "higgsfield-ai", name: "Higgsfield AI", provider: "Higgsfield", type: "image", cost: "$$", description: "Specialized image generation" },
    
    // Video Models
    { id: "veo-3", name: "Veo-3", provider: "Google", type: "video", cost: "$$$", description: "High-quality video generation" },
    { id: "pika-labs", name: "Pika Labs", provider: "Pika", type: "video", cost: "$$", description: "Creative video generation" },
    { id: "runway", name: "Runway", provider: "Runway", type: "video", cost: "$$$", description: "Professional video generation" },
  ]

  // Auto-load prompt and model from URL
  useEffect(() => {
    const promptId = searchParams.get('prompt')
    const modelParam = searchParams.get('model')
    
    if (modelParam) {
      setSelectedModel(modelParam)
    }
    
    if (promptId) {
      loadPrompt(promptId)
    }
  }, [searchParams])

  const loadPrompt = async (promptId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/prompts/${promptId}`)
      if (response.ok) {
        const promptData: Prompt = await response.json()
        setPrompt(promptData.prompt_text)
        if (!selectedModel) {
          setSelectedModel(promptData.model)
        }
      }
    } catch (error) {
      console.error('Failed to load prompt:', error)
    }
  }

  const selectedModelData = models.find(m => m.id === selectedModel)

  const handleRun = async () => {
    if (!selectedModelData) return
    
    setIsLoading(true)
    setResponse("")
    setResponseImage("")
    setJobId("")
    setJobStatus("")

    try {
      if (selectedModelData.type === 'text') {
        // Synchronous text generation
        await handleTextGeneration()
      } else {
        // Asynchronous image/video generation
        await handleMediaGeneration()
      }
    } catch (error) {
      console.error('Generation failed:', error)
      setResponse("Error: Failed to generate content. Please check your API key and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleTextGeneration = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: prompt,
          system_prompt: systemPrompt || undefined,
          temperature: temperature[0],
          max_tokens: maxTokens[0],
          api_key: useMyKey ? apiKey : undefined,
          use_platform_credits: !useMyKey
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setResponse(result.response || '');
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: Failed to generate content. ${error}`);
    }
  }

  const handleMediaGeneration = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          prompt: prompt,
          system_prompt: systemPrompt || undefined,
          temperature: temperature[0],
          max_tokens: maxTokens[0],
          api_key: useMyKey ? apiKey : undefined,
          use_platform_credits: !useMyKey
        })
      });

      const result = await response.json();
      
      if (result.success) {
        if (result.image_url) {
          // Direct image response
          setResponseImage(result.image_url);
        } else if (result.job_id) {
          // Async job response
          setJobId(result.job_id);
          setJobStatus("submitted");
          
          // Poll for job status
          pollJobStatus(result.job_id);
        }
      } else {
        setResponse(`Error: ${result.error}`);
      }
    } catch (error) {
      setResponse(`Error: Failed to generate content. ${error}`);
    }
  }

  const pollJobStatus = async (jobId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/job/${jobId}`);
        const result = await response.json();
        
        setJobStatus(result.status);
        
        if (result.status === 'completed') {
          if (result.result?.image_url) {
            setResponseImage(result.result.image_url);
          }
          setJobId("");
          clearInterval(pollInterval);
        } else if (result.status === 'failed') {
          setResponse(`Error: ${result.error}`);
          setJobId("");
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Failed to poll job status:', error);
      }
    }, 2000); // Poll every 2 seconds
    
    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
      if (jobId) {
        setJobStatus("timeout");
        setJobId("");
      }
    }, 300000);
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const savePrompt = () => {
    // Save to localStorage for now
    const savedPrompts = JSON.parse(localStorage.getItem('savedPrompts') || '[]')
    savedPrompts.push({
      id: Date.now(),
      title: `Prompt ${savedPrompts.length + 1}`,
      prompt,
      systemPrompt,
      model: selectedModel,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('savedPrompts', JSON.stringify(savedPrompts))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Prompt Input */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gray-900/80 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                AI Playground
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
                <Button 
                  onClick={handleRun} 
                  disabled={!prompt || !selectedModel || isLoading} 
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                  {isLoading ? "Running..." : "Generate"}
                </Button>
                <Button variant="outline" className="border-gray-600 bg-transparent" onClick={savePrompt}>
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
                  <span className="ml-3 text-gray-400">
                    {selectedModelData?.type === 'text' ? 'Generating response...' : 'Processing...'}
                  </span>
                </div>
              ) : response || responseImage ? (
                <div className="space-y-4">
                  {response && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-200 whitespace-pre-wrap">{response}</p>
                    </div>
                  )}
                  {responseImage && (
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <img src={responseImage} alt="Generated" className="w-full rounded-lg" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600 bg-transparent"
                      onClick={() => copyToClipboard(response)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    {responseImage && (
                      <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}
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
          {/* Model Selection */}
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
                <Select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} className="bg-gray-800 border-gray-600 text-white">
                  <option value="">Select a model</option>
                  <optgroup label="Text Models">
                    {models.filter(m => m.type === 'text').map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Image Models">
                    {models.filter(m => m.type === 'image').map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Video Models">
                    {models.filter(m => m.type === 'video').map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name} ({model.provider})
                      </option>
                    ))}
                  </optgroup>
                </Select>
                {selectedModelData && (
                  <p className="text-xs text-gray-400 mt-1">{selectedModelData.description}</p>
                )}
              </div>

              {selectedModelData?.type === 'text' && (
                <>
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
                      max={selectedModelData.maxTokens || 4000}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-400 mt-1">Maximum length of the response</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* API Key Management */}
          <Card className="bg-gray-900/80 border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-purple-400" />
                API Key
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={useMyKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseMyKey(true)}
                  className={useMyKey ? "bg-purple-600" : "border-gray-600"}
                >
                  <Key className="w-4 h-4 mr-2" />
                  Use My Key
                </Button>
                <Button
                  variant={!useMyKey ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseMyKey(false)}
                  className={!useMyKey ? "bg-purple-600" : "border-gray-600"}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pronto Credits
                </Button>
              </div>

              {useMyKey && (
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">API Key</label>
                  <div className="relative">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-gray-800 border-gray-600 pr-10"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Your key is stored locally and never sent to our servers
                  </p>
                </div>
              )}

              {!useMyKey && (
                <div className="text-center py-4">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-400">Pronto credits coming soon</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Job Status */}
          {jobId && (
            <Card className="bg-gray-900/80 border-purple-500/20">
              <CardHeader>
                <CardTitle>Job Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {jobStatus === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-400 animate-spin" />
                  )}
                  <span className="text-sm text-gray-300">
                    {jobStatus === 'submitted' && 'Job submitted...'}
                    {jobStatus === 'processing' && 'Processing...'}
                    {jobStatus === 'completed' && 'Completed!'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Job ID: {jobId}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
