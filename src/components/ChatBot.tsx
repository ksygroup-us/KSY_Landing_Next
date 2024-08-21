'use client'

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const prePrompts = [
  "Tell me about your chemical importing services",
  "What industries do you serve?",
  "How can I request a quote?",
  "What's your delivery timeframe?",
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') return;

    setMessages([...messages, { text: message, isUser: true }]);
    setInputMessage('');

    // Simulate a bot response (replace this with actual API call in production)
    setTimeout(() => {
      setMessages(prev => [...prev, { text: `Thank you for your message: "${message}". Our team will get back to you soon.`, isUser: false }]);
    }, 1000);
  };

  const handlePrePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body p-0">
            <div className="bg-primary text-primary-content p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="card-title">Chat with Us</h3>
              <button onClick={toggleChat} className="btn btn-ghost btn-circle btn-sm">
                <X size={20} />
              </button>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`chat ${msg.isUser ? 'chat-end' : 'chat-start'}`}>
                  <div className={`chat-bubble ${msg.isUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              {messages.length === 0 && (
                <div className="mb-4">
                  <p className="text-sm text-base-content opacity-70 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {prePrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handlePrePromptClick(prompt)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="join w-full">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  placeholder="Type your message..."
                  className="input input-bordered join-item flex-grow"
                />
                <button 
                  onClick={() => handleSendMessage(inputMessage)} 
                  className="btn btn-primary join-item"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="btn btn-primary btn-circle">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;