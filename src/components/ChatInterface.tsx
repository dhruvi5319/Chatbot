import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, FileText, Globe, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  source?: 'documents' | 'web' | null;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. Ask me anything about your documents, or any general questions you have.",
      sender: 'bot',
      timestamp: new Date(),
      source: null,
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    const question = newMessage; // Preserve question text
    setNewMessage('');
    setIsLoading(true);

    try {
      // Send the user question to FastAPI
      const response = await fetch("http://localhost:5002/api/chat/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch answer");
      }

      const data = await response.json();
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        content: data.answer,
        sender: 'bot',
        timestamp: new Date(),
        source: data.source || null, // ✅ Dynamically assign from backend
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error fetching chat response:", error);
      const errorMsg: Message = {
        id: `bot-${Date.now()}`,
        content: "Sorry, I couldn't fetch an answer at the moment.",
        sender: 'bot',
        timestamp: new Date(),
        source: null,
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI assistant. Ask me anything about your documents, or any general questions you have.",
        sender: 'bot',
        timestamp: new Date(),
        source: null,
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-muted/10 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 border-b bg-card/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-medium">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">Answers based on your documents & web search</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClearChat}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 elegant-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-6 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : ''} max-w-[85%]`}>
                <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
                  <Avatar>
                    {message.sender === 'user' ? (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </div>
                <div>
                  <div className={`${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-card shadow-sm border border-border/60'} px-4 py-3 rounded-2xl`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className={`mt-1 flex items-center text-xs text-muted-foreground ${message.sender === 'user' ? 'justify-end' : ''}`}>
                         <span>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </span>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
          {/* {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex mb-6"
            >
              <div className="flex max-w-[85%]">
                <div className="flex-shrink-0 mr-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="bg-card shadow-sm border border-border/60 px-4 py-3 rounded-2xl flex items-center">
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Thinking...</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )} */}
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <Separator />
      
      <div className="p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            placeholder="Ask something about your documents..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are based on your documents and web search when needed
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;