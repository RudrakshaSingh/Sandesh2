import { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Loader2, MessageCircle, X, Minimize2, Maximize2 } from "lucide-react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize the AI client
  const ai = new GoogleGenAI({ apiKey:import.meta.env.VITE_GOOGLE_GEMINI_API_KEY});
  const model = "gemini-2.0-flash";

  // Scroll to bottom whenever messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    const userMessage = input.trim();
    setMessages(prevMessages => [...prevMessages, { text: userMessage, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      // Convert chat history to format expected by Gemini
      const formattedHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      // Get AI response
      const result = await ai.models.generateContent({
        model: model,
        contents: [
          ...formattedHistory,
          { role: "user", parts: [{ text: userMessage }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      // Extract response text
      let botResponse = "";

      // Check different possible ways to access the text based on Gemini API versions
      if (result.text) {
        botResponse = result.text;
      } else if (result.response && typeof result.response.text === 'function') {
        botResponse = result.response.text();
      } else if (result.response && result.response.text) {
        botResponse = result.response.text;
      } else if (result.candidates && result.candidates[0].content.parts[0].text) {
        botResponse = result.candidates[0].content.parts[0].text;
      } else {
        console.log("Response structure:", JSON.stringify(result));
        botResponse = "I received a response but couldn't parse it correctly.";
      }

      // Add bot response to chat
      setMessages(prevMessages => [...prevMessages, { text: botResponse, isUser: false }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: "Sorry, I encountered an error. Please try again.",
          isUser: false
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const minimizeChat = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 flex items-end">

      {/* Main Chat Widget */}
      <div
        className={`flex flex-col bg-white rounded-tl-2xl shadow-xl transition-all duration-300 ease-in-out border border-gray-200 ${
          isOpen
            ? isMinimized
              ? 'w-64 h-16'
              : 'w-96 h-128 md:w-96 md:h-128'
            : 'w-0 h-0 opacity-0'
        }`}
        style={{ maxHeight: '80vh' }}
      >
        {/* Header */}
        <div
          className="bg-gradient-to-r from-orange-300 to-orange-500 text-white p-4 rounded-tl-2xl flex justify-between items-center cursor-pointer"
          onClick={isMinimized ? () => setIsMinimized(false) : undefined}
        >
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold">Sandesh Assistant</h1>
              {!isMinimized && <p className="text-xs text-orange-200">Powered by Google Gemini</p>}
            </div>
          </div>
          <div className="flex space-x-2">
            {isMinimized ? (
              <Maximize2 className="h-5 w-5 hover:text-indigo-200" />
            ) : (
              <>
                <Minimize2
                  className="h-5 w-5 hover:text-indigo-200"
                  onClick={minimizeChat}
                />
                <X
                  className="h-5 w-5 hover:text-indigo-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Chat container - only shown when not minimized */}
        {!isMinimized && (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                  <div className="bg-indigo-100 rounded-full p-3 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">How can I help?</h3>
                  <p className="text-gray-500 text-center text-sm">Ask me anything or start a conversation.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-3 py-2
                          ${message.isUser
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
                      >
                        <p className="whitespace-pre-wrap text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-xs rounded-lg px-3 py-2 bg-gray-100 text-gray-800 rounded-bl-none">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                          <p className="text-xs text-gray-500">Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-1" />
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-end bg-gray-100 rounded-lg">
                <textarea
                  ref={textareaRef}
                  className="flex-1 resize-none rounded-l-lg p-2 focus:outline-none text-gray-700 bg-transparent text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  rows={1}
                />
                <button
                  className={`p-2 rounded-r-lg focus:outline-none ${isLoading || input.trim() === '' ? 'text-gray-400' : 'text-indigo-600 hover:bg-indigo-50'}`}
                  onClick={handleSendMessage}
                  disabled={isLoading || input.trim() === ''}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-orange-500 hover:bg-orange-700 text-white rounded-full p-4 shadow-lg m-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;