"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, RefreshCw, Heart, ThumbsUp, ThumbsDown, Laugh, HelpCircle } from "lucide-react"
import { Character, getCharacter } from "@/data/characters"

interface Message {
  id: string
  content: string
  sender: "user" | "character"
  timestamp: Date
  reactions?: Record<string, "love" | "like" | "dislike" | "laugh" | "question">
}

interface CharacterResponse {
  newInternalState: string
  queuedMessages: string[]
  breakUpWithUser: boolean
  isStateProgression: boolean
  messageReactions: Record<string, "love" | "like" | "dislike" | "laugh" | "question">
  howLongToWaitToSendMessages: number
  howLongToWaitAfterSendingToFollowUp: number
  followUpMessage: string
  deadline: number
}

interface CharacterChatProps {
  characterName: string
}

export function CharacterChat({ characterName }: CharacterChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [character, setCharacter] = useState<Character | null>(null)
  const [conversationEnded, setConversationEnded] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const char = getCharacter(characterName)
    if (char) {
      setCharacter(char)
      // Add initial character message
      setMessages([
        {
          id: "1",
          content: "Hey... we need to talk. 😤",
          sender: "character",
          timestamp: new Date()
        }
      ])
    }
  }, [characterName])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const simulateCharacterResponse = async (userMessage: string): Promise<CharacterResponse> => {
    // Simulate API call to get character response
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    // This is a mock response - in a real implementation, this would call an AI API
    const responses = [
      {
        newInternalState: "Abby is getting more frustrated and looking for any excuse to end things.",
        queuedMessages: ["OMG seriously? That's all u have to say? 😤", "I can't even with u rn."],
        breakUpWithUser: false,
        isStateProgression: false,
        messageReactions: { [userMessage.length.toString()]: "dislike" as const },
        howLongToWaitToSendMessages: 0,
        howLongToWaitAfterSendingToFollowUp: 5000,
        followUpMessage: "Wow. Silence. I guess that says it all. Bye.",
        deadline: 10000
      },
      {
        newInternalState: "Abby is completely done and ready to break up.",
        queuedMessages: ["LMAO U REALLY SAID THAT? I'm actually done.", "U just proved everything I thought. Bye forever."],
        breakUpWithUser: true,
        isStateProgression: true,
        messageReactions: { [userMessage.length.toString()]: "laugh" as const },
        howLongToWaitToSendMessages: 0,
        howLongToWaitAfterSendingToFollowUp: 0,
        followUpMessage: "",
        deadline: 0
      }
    ]
    
    // Randomly choose response based on message content
    const isBreakupTrigger = userMessage.toLowerCase().includes("sorry") || 
                            userMessage.toLowerCase().includes("love") ||
                            userMessage.toLowerCase().includes("please") ||
                            userMessage.length < 5
    
    return responses[isBreakupTrigger ? 1 : 0]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || conversationEnded) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await simulateCharacterResponse(inputValue)
      
      // Add character messages
      const characterMessages: Message[] = response.queuedMessages.map((msg, index) => ({
        id: (Date.now() + index).toString(),
        content: msg,
        sender: "character",
        timestamp: new Date(),
        reactions: response.messageReactions
      }))

      setMessages(prev => [...prev, ...characterMessages])

      if (response.breakUpWithUser) {
        setConversationEnded(true)
      }
    } catch (error) {
      console.error("Error getting character response:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetConversation = () => {
    setMessages([
      {
        id: "1",
        content: "Hey... we need to talk. 😤",
        sender: "character",
        timestamp: new Date()
      }
    ])
    setConversationEnded(false)
  }

  const getReactionIcon = (reaction: string) => {
    switch (reaction) {
      case "love": return <Heart className="w-4 h-4 text-red-500" />
      case "like": return <ThumbsUp className="w-4 h-4 text-green-500" />
      case "dislike": return <ThumbsDown className="w-4 h-4 text-red-500" />
      case "laugh": return <Laugh className="w-4 h-4 text-yellow-500" />
      case "question": return <HelpCircle className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Character not found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto">
      {/* Character Header */}
      <Card className="bg-gray-900/80 border-red-500/20 mb-4">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-red-500 text-white font-bold">
                {character.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{character.name}</CardTitle>
              <p className="text-sm text-gray-400">{character.bio[0].points[0]}</p>
            </div>
            {conversationEnded && (
              <Badge variant="destructive" className="ml-auto">
                Conversation Ended
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card className="flex-1 bg-gray-900/80 border-red-500/20 mb-4 overflow-hidden">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.reactions && Object.entries(message.reactions).map(([key, reaction]) => (
                    <div key={key} className="mt-2 flex items-center gap-1">
                      {getReactionIcon(reaction)}
                    </div>
                  ))}
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400"></div>
                    <span className="text-sm text-gray-300">Abby is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card className="bg-gray-900/80 border-red-500/20">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={conversationEnded ? "Conversation ended" : "Type your message..."}
              disabled={isLoading || conversationEnded}
              className="flex-1 bg-gray-800 border-gray-600 text-white"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading || conversationEnded}
              className="bg-red-600 hover:bg-red-700"
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              onClick={resetConversation}
              variant="outline"
              className="border-gray-600 bg-transparent"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 