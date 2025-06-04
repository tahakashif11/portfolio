import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '../../constants';

const VoiceButton = ({ isListening, isSpeaking, onClick, className = '' }) => {
    const getButtonStyle = () => {
        if (isListening) return 'bg-red-500 hover:bg-red-600';
        if (isSpeaking) return 'bg-green-500 hover:bg-green-600';
        return 'bg-blue-500 hover:bg-blue-600';
    };

    const getIcon = () => {
        if (isListening) {
            return (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
            );
        }
        if (isSpeaking) {
            return (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                />
            );
        }
        return (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
        );
    };

    return (
        <motion.button
            onClick={onClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${getButtonStyle()} transition-colors duration-200 ${className}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            {...ANIMATION_VARIANTS.scaleIn}
        >
            <motion.div
                animate={isListening ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {getIcon()}
                </svg>
            </motion.div>
        </motion.button>
    );
};

export default VoiceButton;