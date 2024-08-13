'use client'

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

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
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chat with Us</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.isUser ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            {messages.length === 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
                {prePrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handlePrePromptClick(prompt)}
                    className="btn btn-sm btn-outline btn-primary mb-1 mr-1"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Type your message..."
                className="flex-grow input input-bordered"
              />
              <button onClick={() => handleSendMessage(inputMessage)} className="btn btn-primary ml-2">
                Send
              </button>
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