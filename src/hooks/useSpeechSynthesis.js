import { useState, useEffect, useCallback } from 'react';

const useSpeechSynthesis = () => {
    const [synth, setSynth] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const speechSynth = window.speechSynthesis;
        setSynth(speechSynth);

        const updateVoices = () => {
            setVoices(speechSynth.getVoices());
        };

        updateVoices();
        speechSynth.onvoiceschanged = updateVoices;

        return () => {
            if (synth) {
                synth.cancel();
            }
        };
    }, []);

    const speak = useCallback((text, options = {}) => {
        if (synth) {
            synth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Set default options
            utterance.rate = options.rate || 1;
            utterance.pitch = options.pitch || 1;
            utterance.volume = options.volume || 1;
            
            if (options.voice) {
                utterance.voice = voices.find(v => v.name === options.voice);
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            synth.speak(utterance);
        }
    }, [synth, voices]);

    const stop = useCallback(() => {
        if (synth) {
            synth.cancel();
            setIsSpeaking(false);
        }
    }, [synth]);

    return {
        speak,
        stop,
        isSpeaking,
        voices,
        isSupported: !!synth
    };
};

export default useSpeechSynthesis; 