import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '../constants';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';
import VoiceButton from './ui/VoiceButton';
import FeedbackBubble from './ui/FeedbackBubble';
import { aiService } from '../services/aiService';

const VoiceAssistant = () => {
    const [response, setResponse] = useState('');
    const { 
        isListening, 
        transcript, 
        toggleListening, 
        isSupported: isRecognitionSupported,
        setTranscript 
    } = useSpeechRecognition();
    const { 
        speak, 
        stop, 
        isSpeaking, 
        voices,
        isSupported: isSynthesisSupported 
    } = useSpeechSynthesis();

    // Handle transcript changes
    useEffect(() => {
        if (transcript) {
            handleCommand(transcript);
        }
    }, [transcript]);

    // Clear response when starting new listening session
    useEffect(() => {
        if (isListening) {
            setResponse('');
        }
    }, [isListening]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stop();
            aiService.clearContext();
        };
    }, [stop]);

    const handleCommand = useCallback((command) => {
        // Get AI response
        const aiResponse = aiService.generateResponse(command);
        setResponse(aiResponse);
        
        // Stop any ongoing speech before starting new one
        stop();

        // Use a female voice if available
        const femaleVoice = voices.find(voice => 
            voice.name.includes('female') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Google UK English Female')
        );

        speak(aiResponse, {
            rate: 1,
            pitch: 1,
            volume: 1,
            voice: femaleVoice?.name
        });
    }, [speak, stop, voices]);

    const handleToggle = useCallback(() => {
        if (isSpeaking) {
            stop();
        }
        toggleListening();
    }, [toggleListening, isSpeaking, stop]);

    // If speech features are not supported, show a message instead of nothing
    if (!isRecognitionSupported || !isSynthesisSupported) {
        return (
            <div className="fixed bottom-4 right-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg shadow-lg">
                Speech features are not supported in your browser.
            </div>
        );
    }

    return (
        <motion.div
            className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50"
            initial={ANIMATION_VARIANTS.scaleIn.initial}
            animate={ANIMATION_VARIANTS.scaleIn.animate}
            transition={ANIMATION_VARIANTS.scaleIn.transition}
        >
            <div className="relative">
                <FeedbackBubble 
                    transcript={transcript} 
                    response={response}
                />
                <VoiceButton 
                    isListening={isListening}
                    onClick={handleToggle}
                    isSpeaking={isSpeaking}
                />
            </div>
        </motion.div>
    );
};

export default VoiceAssistant; 