import React, { useState } from 'react';
import './CSS/chatbot.css';

const Chatbot = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userMessage.trim() === '') return;

    const message = userMessage;
    setChatHistory(prev => [...prev, { type: 'user', message }]);
    setUserMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      setChatHistory(prev => [...prev, { type: 'bot', message: data.response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { type: 'bot', message: 'Error: Unable to reach server.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mains'>
      <div className="chatbot-container">
        <div className="chatbot-header">
          <h6>AI Assistant</h6>
          <button className="chatbot-close" onClick={onClose}>&times;</button>
        </div>

        <div id="chat-history" className="chatbot-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.type}-message`}>
              {chat.message}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bot-message loading-spinner">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
            </div>
          )}
        </div>

        <div className="chatbot-input">
          <input 
            type="text" 
            value={userMessage} 
            onChange={(e) => setUserMessage(e.target.value)} 
            placeholder="Type your message" 
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submit or newline
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage} className="sendBtn" disabled={isLoading}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
