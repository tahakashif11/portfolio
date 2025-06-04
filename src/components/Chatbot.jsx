import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import AnnouncementModal from './AnnouncementModal';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(270deg, #67e8f9, #0891b2, #67e8f9);
    background-size: 200% 200%;
    animation: glow 3s linear infinite;
    border-radius: 50%;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(103, 232, 249, 0.4);
  }

  @keyframes glow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: linear-gradient(165deg, rgba(30, 30, 50, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%);
  border-radius: 24px;
  box-shadow: 0 0 40px rgba(103, 232, 249, 0.1),
              inset 0 0 20px rgba(103, 232, 249, 0.05);
  border: 1px solid rgba(103, 232, 249, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  color: #0f172a;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
    color: #0f172a;
    font-size: 1.1rem;
    font-weight: 600;
  }

  button {
    background: none;
    border: none;
    color: #0f172a;
    cursor: pointer;
    padding: 5px;
    transition: all 0.2s;
    
    &:hover {
      transform: rotate(90deg);
    }
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(103, 232, 249, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(103, 232, 249, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(103, 232, 249, 0.5);
    }
  }
`;

const Message = styled(motion.div)`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
  
  ${props => props.isUser ? `
    align-self: flex-end;
    background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
    color: #0f172a;
    border-bottom-right-radius: 5px;
    box-shadow: 0 4px 15px rgba(103, 232, 249, 0.2);
  ` : `
    align-self: flex-start;
    background: rgba(103, 232, 249, 0.1);
    color: #e0f2fe;
    border-bottom-left-radius: 5px;
    border: 1px solid rgba(103, 232, 249, 0.2);
  `}
`;

const InputArea = styled.form`
  padding: 20px;
  border-top: 1px solid rgba(103, 232, 249, 0.2);
  display: flex;
  gap: 10px;
  background: rgba(15, 15, 35, 0.5);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 25px;
  outline: none;
  font-size: 0.9rem;
  background: rgba(103, 232, 249, 0.1);
  color: #e0f2fe;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(224, 242, 254, 0.5);
  }

  &:focus {
    border-color: #67e8f9;
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.2);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  color: #0f172a;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(270deg, #67e8f9, #0891b2, #67e8f9);
    background-size: 200% 200%;
    animation: glow 3s linear infinite;
    border-radius: 50%;
    z-index: -1;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.3);
  }

  &:disabled {
    background: rgba(103, 232, 249, 0.3);
    cursor: not-allowed;
    
    &:before {
      display: none;
    }
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  gap: 5px;
  padding: 12px 16px;
  background: rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 15px;
  align-self: flex-start;
  width: fit-content;

  span {
    width: 8px;
    height: 8px;
    background: #67e8f9;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(103, 232, 249, 0.5);
  }
`;

const initialMessages = [
  {
    text: "Hi! I'm Muhammad Taha's AI assistant. I can tell you about his skills, experience, and projects. What would you like to know?",
    isUser: false
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenAnnouncement = localStorage.getItem('hasSeenChatbotAnnouncement');
    if (!hasSeenAnnouncement) {
      // Wait a bit before showing the announcement
      const timer = setTimeout(() => {
        setShowAnnouncement(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem('hasSeenChatbotAnnouncement', 'true');
  };

  const handleTryIt = () => {
    handleCloseAnnouncement();
    setIsOpen(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    // Predefined responses based on keywords
    const responses = {
      skills: "Muhammad Taha is skilled in React.js, Node.js, JavaScript, TypeScript, Python, and various modern web technologies. He's particularly strong in frontend development and UI/UX design.",
      experience: "Muhammad Taha has experience in full-stack development, having worked on various projects including healthcare applications, business intelligence tools, and web applications.",
      projects: "Some notable projects include CareSync (a healthcare management system), Pharmytics (a pharmacy analytics platform), and several other web applications showcasing his full-stack capabilities.",
      education: "Muhammad Taha has a strong educational background in computer science and continues to stay updated with modern technologies and best practices.",
      contact: "You can reach Muhammad Taha through LinkedIn or via the contact form on this portfolio. Would you like me to share the direct links?",
      default: "I'd be happy to tell you more about Muhammad Taha's skills, experience, projects, or how to get in touch with him. What specific aspect would you like to know about?"
    };

    // Simple keyword matching
    const message = userMessage.toLowerCase();
    let response = responses.default;

    if (message.includes('skill') || message.includes('tech') || message.includes('stack')) {
      response = responses.skills;
    } else if (message.includes('experience') || message.includes('work')) {
      response = responses.experience;
    } else if (message.includes('project') || message.includes('portfolio')) {
      response = responses.projects;
    } else if (message.includes('education') || message.includes('study')) {
      response = responses.education;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('email')) {
      response = responses.contact;
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Get AI response
      const response = await generateAIResponse(inputValue);
      setIsTyping(false);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. Please try again later.", 
        isUser: false 
      }]);
    }
  };

  return (
    <>
      <AnnouncementModal 
        isOpen={showAnnouncement}
        onClose={handleCloseAnnouncement}
        onTryIt={handleTryIt}
      />
      
      <ChatbotContainer>
        <AnimatePresence>
          {isOpen && (
            <ChatWindow
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatHeader>
                <h3>Portfolio Assistant</h3>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </ChatHeader>

              <ChatMessages>
                {messages.map((message, index) => (
                  <Message
                    key={index}
                    isUser={message.isUser}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {message.text}
                  </Message>
                ))}
                
                {isTyping && (
                  <TypingIndicator
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </TypingIndicator>
                )}
                <div ref={messagesEndRef} />
              </ChatMessages>

              <InputArea onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <SendButton type="submit" disabled={!inputValue.trim() || isTyping}>
                  <FaPaperPlane size={16} />
                </SendButton>
              </InputArea>
            </ChatWindow>
          )}
        </AnimatePresence>

        <ChatButton
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaRobot size={24} />
        </ChatButton>
      </ChatbotContainer>
    </>
  );
};

export default Chatbot; 