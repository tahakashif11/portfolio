import { motion, AnimatePresence } from 'framer-motion';
import { ANIMATION_VARIANTS } from '../../constants';

const FeedbackBubble = ({ transcript, response }) => {
    return (
        <AnimatePresence>
            {(transcript || response) && (
                <motion.div
                    initial={ANIMATION_VARIANTS.slideInLeft.initial}
                    animate={ANIMATION_VARIANTS.slideInLeft.animate}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="absolute top-1/2 right-full mr-4 transform -translate-y-1/2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700"
                >
                    <AnimatePresence mode="wait">
                        {transcript && (
                            <motion.div
                                key="transcript"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="mb-2"
                            >
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">You said:</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{transcript}</p>
                            </motion.div>
                        )}
                        {response && (
                            <motion.div
                                key="response"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Assistant:</p>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{response}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FeedbackBubble; 