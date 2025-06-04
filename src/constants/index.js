// Voice Assistant Commands
export const VOICE_COMMANDS = {
    GREETINGS: ['hello', 'hi', 'hey'],
    ABOUT: ['about', 'who are you', 'what do you do'],
    PROJECTS: ['project', 'work', 'portfolio'],
    CONTACT: ['contact', 'hire', 'email'],
    SKILLS: ['skills', 'technologies', 'tech stack'],
};

// Voice Assistant Responses
export const AI_RESPONSES = {
    GREETING: "Hello! I'm your portfolio assistant. How can I help you today?",
    ABOUT: "I'm an AI assistant integrated into this portfolio to help visitors navigate and learn more about the developer's work.",
    PROJECTS: "You can find various projects in the portfolio section. Would you like me to tell you about any specific project?",
    CONTACT: "You can contact the developer through the contact form or by clicking the hire me button.",
    SKILLS: "The developer specializes in full-stack development, including React, Node.js, and various other modern technologies.",
    FALLBACK: "I'm sorry, I didn't understand that command. Try asking about projects, skills, or contact information.",
};

// Animation Variants
export const ANIMATION_VARIANTS = {
    scaleIn: {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { duration: 0.3 }
    },
    slideInLeft: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.3 }
    },
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 }
    }
}; 