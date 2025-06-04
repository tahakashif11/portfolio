import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaRobot, FaTimes } from 'react-icons/fa';

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
  padding: 2rem;
  border-radius: 24px;
  max-width: 400px;
  width: 90%;
  position: relative;
  background: linear-gradient(165deg, rgba(30, 30, 50, 0.95) 0%, rgba(15, 15, 35, 0.95) 100%);
  box-shadow: 0 0 40px rgba(103, 232, 249, 0.1),
              inset 0 0 20px rgba(103, 232, 249, 0.05);
  border: 1px solid rgba(103, 232, 249, 0.1);
  backdrop-filter: blur(10px);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: #67e8f9;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: #22d3ee;
    transform: rotate(90deg);
  }
`;

const Title = styled.h2`
  color: #f0f9ff;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  text-shadow: 0 0 10px rgba(103, 232, 249, 0.3);
`;

const Description = styled.p`
  color: #93c5fd;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
`;

const Feature = styled(motion.li)`
  color: #e0f2fe;
  padding: 10px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;

  &:before {
    content: "›";
    color: #67e8f9;
    font-size: 1.4em;
    font-weight: bold;
  }

  &:hover {
    color: #67e8f9;
    transform: translateX(5px);
    transition: all 0.3s ease;
  }
`;

const TryButton = styled(motion.button)`
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  color: #0f172a;
  border: none;
  padding: 14px 28px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(270deg, #67e8f9, #0891b2, #67e8f9);
    background-size: 200% 200%;
    animation: glow 3s linear infinite;
    border-radius: 30px;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(103, 232, 249, 0.4);
    color: #0f172a;
  }

  @keyframes glow {
    0% { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }
`;

const RobotIcon = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #67e8f9 0%, #0891b2 100%);
  color: #0f172a;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(103, 232, 249, 0.3);
  position: relative;

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
`;

const AnnouncementModal = ({ isOpen, onClose, onTryIt }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <CloseButton onClick={onClose}>
              <FaTimes size={20} />
            </CloseButton>

            <Title>
              <RobotIcon
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                <FaRobot size={28} />
              </RobotIcon>
              AI Assistant Online
            </Title>

            <Description>
              Experience the future of portfolio exploration with our advanced AI assistant!
            </Description>

            <Features>
              {[
                "Real-time skill & experience insights",
                "Smart project navigation",
                "Interactive portfolio exploration",
                "Instant answers to your questions"
              ].map((feature, index) => (
                <Feature
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {feature}
                </Feature>
              ))}
            </Features>

            <TryButton
              onClick={onTryIt}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaRobot size={18} />
              Activate AI Assistant
            </TryButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementModal; 