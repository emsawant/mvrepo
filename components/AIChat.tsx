import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/gemini';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm your assistant. Ask me anything about Maitrayee's finance experience.", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', text: userText, timestamp: new Date() }]);
    setIsLoading(true);

    try {
        setMessages(prev => [...prev, { role: 'model', text: '', timestamp: new Date() }]);
        
        const stream = await sendMessageToGemini(userText);
        
        let fullText = '';
        for await (const chunk of stream) {
            fullText += chunk;
            setMessages(prev => {
                const newArr = [...prev];
                const lastMsg = newArr[newArr.length - 1];
                if (lastMsg.role === 'model') {
                    lastMsg.text = fullText;
                }
                return newArr;
            });
        }
    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later.", timestamp: new Date() }]);
    } finally {
        setIsLoading(false);
    }
  };

  // Helper function to render text with bold formatting
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-apple-hover w-80 md:w-96 h-[500px] mb-4 flex flex-col overflow-hidden animate-fade-in-up transition-all">
          {/* Header */}
          <div className="bg-white/50 border-b border-gray-100 p-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <h3 className="font-semibold text-text-main text-sm">Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-text-main transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-br-none' 
                      : 'bg-[#e9e9eb] text-black rounded-bl-none'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length-1]?.text === '' && (
                 <div className="flex justify-start">
                    <div className="bg-[#e9e9eb] p-3 rounded-2xl rounded-bl-none">
                        <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                        </span>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-secondary text-text-main text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="bg-accent text-white p-2 rounded-full hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-gray-800' : 'bg-accent'} text-white p-4 rounded-full shadow-apple hover:scale-105 transition-all duration-300 flex items-center justify-center`}
      >
         {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
         ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
         )}
      </button>
    </div>
  );
};

export default AIChat;