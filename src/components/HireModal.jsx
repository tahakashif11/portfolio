import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

// Initialize EmailJS
emailjs.init("6aZMutv-IwH_hAOJa"); // Replace with your public key

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 20, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: linear-gradient(165deg, rgba(30, 30, 50, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%);
  border-radius: 24px;
  padding: 2rem;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 0 40px rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.1);

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

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #67e8f9;
  cursor: pointer;
  padding: 8px;
  transition: all 0.2s;
  z-index: 10;
  
  &:hover {
    transform: rotate(90deg);
    color: #22d3ee;
  }
`;

const Title = styled.h2`
  color: #f0f9ff;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #93c5fd;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  background: rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 12px;
  padding: 1rem;
  color: #e0f2fe;
  font-size: 1rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #67e8f9;
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.2);
  }

  &::placeholder {
    color: rgba(224, 242, 254, 0.5);
  }
`;

const TextArea = styled.textarea`
  background: rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 12px;
  padding: 1rem;
  color: #e0f2fe;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: #67e8f9;
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.2);
  }

  &::placeholder {
    color: rgba(224, 242, 254, 0.5);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  color: #0f172a;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ProjectTypes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProjectType = styled.div`
  background: rgba(103, 232, 249, 0.1);
  border: 1px solid rgba(103, 232, 249, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.selected && `
    border-color: #67e8f9;
    box-shadow: 0 0 15px rgba(103, 232, 249, 0.2);
  `}

  &:hover {
    transform: translateY(-2px);
  }

  h3 {
    color: #f0f9ff;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #93c5fd;
    font-size: 0.9rem;
  }
`;

const HireModal = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const projectTypes = [
    {
      id: 'web',
      title: 'Web Application',
      description: 'Full-stack web applications with modern frameworks and responsive design.'
    },
    {
      id: 'mobile',
      title: 'Mobile App',
      description: 'Cross-platform mobile applications using React Native.'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Solution',
      description: 'Specialized healthcare applications with secure data handling.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProject) {
      toast.error("Please select a project type");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_7m6hsye", // Replace with your service ID
        "template_chvikun", // Replace with your template ID
        form.current,
        "6aZMutv-IwH_hAOJa" // Replace with your public key
      );

      if (result.text === 'OK') {
        toast.success("Message sent successfully! I'll get back to you soon.");
        form.current.reset();
        setSelectedProject(null);
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message. Please try contacting through email directly at tahacodes1@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <Toaster position="top-center" />
            <CloseButton onClick={onClose}>
              <FaTimes size={24} />
            </CloseButton>

            <Title>Let's Work Together</Title>
            <Subtitle>Tell me about your project</Subtitle>

            <ProjectTypes>
              {projectTypes.map((type) => (
                <ProjectType
                  key={type.id}
                  selected={selectedProject === type.id}
                  onClick={() => setSelectedProject(type.id)}
                >
                  <h3>{type.title}</h3>
                  <p>{type.description}</p>
                </ProjectType>
              ))}
            </ProjectTypes>

            <Form ref={form} onSubmit={handleSubmit}>
              <input type="hidden" name="project_type" value={selectedProject || ''} />
              
              <Input
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
              />
              
              <Input
                type="email"
                name="user_email"
                placeholder="Your Email"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                required
              />
              
              <Input
                type="text"
                name="subject"
                placeholder="Project Subject"
                required
              />
              
              <TextArea
                name="message"
                placeholder="Tell me about your project requirements..."
                required
              />
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting || !selectedProject}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message
                    <FaPaperPlane />
                  </>
                )}
              </SubmitButton>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default HireModal; 