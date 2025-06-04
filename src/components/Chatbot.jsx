import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); opacity: 0.8; }
  70% { transform: scale(0.9); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
  }
`;

const ChatButton = styled.button`
  background-color: #4F46E5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s;
  animation: ${bounceIn} 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: scale(1.1);
    background-color: #4338CA;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const ChatWindow = styled.div`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 100px);
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 80px;
  }

  @media (max-width: 480px) {
    bottom: 70px;
  }
`;

const ChatHeader = styled.div`
  background-color: #4F46E5;
  color: white;
  padding: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px;
  margin: ${props => props.isUser ? '0 0 0 auto' : '0'};
  background-color: ${props => props.isUser ? '#E5E7EB' : '#4F46E5'};
  color: ${props => props.isUser ? '#1F2937' : 'white'};
  animation: ${fadeIn} 0.3s ease-out;
`;

const InputContainer = styled.div`
  padding: 16px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 12px;
    background-color: white;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #4F46E5;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on mobile */
    padding: 10px;
  }
`;

const SendButton = styled.button`
  background-color: #4F46E5;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338CA;
  }

  &:disabled {
    background-color: #E5E7EB;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hi there! I'm your friendly portfolio assistant!", isUser: false },
    { text: "How can I help you today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(inputValue);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 500);

    setInputValue('');
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('do')) {
      return "I specialize in full-stack development with React, Node.js, and modern web technologies! What would you like to know more about?";
    }
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return "I've worked on various exciting projects including e-commerce platforms, mobile apps, and web applications!";
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return "You can reach me through email at your.email@example.com or connect on LinkedIn!";
    }
    return "Thanks for your message! Feel free to ask about my skills, projects, or how to get in touch!";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatContainer>
      {!isOpen && (
        <ChatButton onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </ChatButton>
      )}
      
      {isOpen && (
        <ChatWindow>
          <ChatHeader>
            <span>Portfolio Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✕
            </button>
          </ChatHeader>
          
          <ChatMessages>
            {messages.map((message, index) => (
              <Message key={index} isUser={message.isUser}>
                {message.text}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <InputContainer>
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </SendButton>
          </InputContainer>
        </ChatWindow>
      )}
    </ChatContainer>
  );
};

export default ChatbotComponent; 