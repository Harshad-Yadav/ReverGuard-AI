import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontal, Bot } from 'lucide-react';
import { emitNewChatMessage, ChatMessageEventData, onNewChatMessage } from '@/lib/events';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I am RiverGuard Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to chat messages from other components
  useEffect(() => {
    const unsubscribe = onNewChatMessage((message) => {
      setMessages(prev => [...prev, message]);
    });
    
    return unsubscribe;
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Emit event for other components that might be listening
    emitNewChatMessage(userMessage);
    
    setInputValue('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Emit the bot response too
      emitNewChatMessage(botMessage);
    }, 500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! How can I assist you with RiverGuard monitoring today?';
    } else if (input.includes('help')) {
      return 'I can help you with checking incident reports, monitoring camera feeds, analyzing water quality data, or providing information about our monitoring system.';
    } else if (input.includes('incident') || input.includes('report')) {
      return 'You can view all reported incidents in the Incidents tab. Would you like me to provide a summary of recent incidents?';
    } else if (input.includes('camera') || input.includes('feed')) {
      return 'Our live camera feeds are accessible from the Feeds tab. All feeds are monitored 24/7 by our AI detection system.';
    } else if (input.includes('water quality') || input.includes('pollution')) {
      return 'Our sensors continuously monitor water quality parameters including pH, dissolved oxygen, turbidity, and temperature. Current readings show normal conditions except for slightly elevated turbidity levels.';
    } else if (input.includes('statistics') || input.includes('analytics')) {
      return 'You can find detailed statistics in the Analytics tab, including incident trends, detection rates, and water quality metrics over time.';
    } else if (input.includes('upload') || input.includes('photo') || input.includes('image')) {
      return 'You can upload images of incidents by clicking on the "Report Incident" button on the Incidents page. This will allow you to submit details and an image of the environmental issue.';
    } else {
      return 'I understand you\'re asking about ' + userInput + '. Could you provide more details so I can better assist you?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the most recent message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-riverguard-600" />
          RiverGuard Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-grow mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {message.sender === 'bot' && (
                  <Avatar className="h-8 w-8 bg-riverguard-100">
                    <AvatarFallback className="bg-riverguard-100 text-riverguard-700">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg p-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-riverguard-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                  <div
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-riverguard-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-8 w-8 bg-riverguard-100">
                    <AvatarFallback className="bg-riverguard-600 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={inputValue.trim() === ''}
            className="bg-riverguard-600 hover:bg-riverguard-700"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatComponent; 