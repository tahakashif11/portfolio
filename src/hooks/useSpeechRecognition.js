import { useState, useEffect, useCallback } from 'react';

const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setTranscript(transcript);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            setRecognition(recognition);
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, []);

    const startListening = useCallback(() => {
        setTranscript('');
        recognition?.start();
        setIsListening(true);
    }, [recognition]);

    const stopListening = useCallback(() => {
        recognition?.stop();
        setIsListening(false);
    }, [recognition]);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        transcript,
        toggleListening,
        startListening,
        stopListening,
        isSupported: !!recognition
    };
};

export default useSpeechRecognition; 