import React, { useState } from 'react';
import axios from 'axios';
import './ChatsPage.css'; // Make sure to import the CSS file
// import './main.css';

const ChatsPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);

    setInput('');
    setIsLoading(true); // Start the loading animation

    try {
      const response = await axios.post(
        'https://api.example.com/chat', // Replace with your actual API endpoint
        { input }, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_KEY', // Replace with your API key
          },
        }
      );

      // Ensure loading lasts at least 2 seconds
      setTimeout(() => {
        const botMessage = { role: 'bot', content: response.data.reply };
        setMessages([...messages, userMessage, botMessage]);
        setIsLoading(false); // Stop the loading animation
      }, 2000);
    } catch (error) {
      console.error('Error sending message:', error);
      setTimeout(() => {
        const errorMessage = { role: 'bot', content: 'Error communicating with the server.' };
        setMessages([...messages, userMessage, errorMessage]);
        setIsLoading(false); // Stop the loading animation
      }, 2000);
    }
  };

  return (
    <div className="background">
      <div className="chatContainer">
        <div className="chatWindow">
          {messages.map((message, index) => (
            <div
              key={index}
              className="message"
              style={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: message.role === 'user' ? '#fa541c' : '#3e404b',
                color: message.role === 'user' ? '#fff' : '#afafaf',
              }}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="loadingContainer">
              <div className="dotsContainer">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>
        <div className="inputContainer">
          <input
            className="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Type your message..."
          />
          <button className="sendButton" onClick={handleSend}>
            שלח
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
