// Context and memory management for AI
const conversationContext = {
    lastQuery: null,
    lastResponse: null,
    sessionHistory: [],
    projectsData: {
        web: ["E-commerce Platform", "Portfolio Website", "Task Management System"],
        mobile: ["Fitness Tracking App", "Social Media App", "Food Delivery App"],
        ai: ["Voice Assistant", "Chatbot Integration", "AI Content Generator"]
    },
    skills: {
        frontend: ["React", "Next.js", "TailwindCSS", "JavaScript", "TypeScript"],
        backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Python"],
        tools: ["Git", "Docker", "AWS", "Firebase", "Vercel"]
    }
};

const generateResponse = (query, context = {}) => {
    const q = query.toLowerCase();
    let response = '';

    // Update context with the current query
    conversationContext.lastQuery = q;
    conversationContext.sessionHistory.push({ query: q, timestamp: Date.now() });

    // Handle greetings with time awareness
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
        const hour = new Date().getHours();
        if (hour < 12) response = "Good morning! How can I assist you with the portfolio today?";
        else if (hour < 18) response = "Good afternoon! What would you like to know about the portfolio?";
        else response = "Good evening! I'm here to help you explore the portfolio.";
    }

    // Handle project-related queries
    else if (q.includes('project') || q.includes('work')) {
        if (q.includes('web')) {
            response = `Here are some web projects: ${conversationContext.projectsData.web.join(', ')}. Would you like to know more about any specific one?`;
        } else if (q.includes('mobile')) {
            response = `Here are some mobile projects: ${conversationContext.projectsData.mobile.join(', ')}. Would you like more details?`;
        } else if (q.includes('ai')) {
            response = `Here are some AI projects: ${conversationContext.projectsData.ai.join(', ')}. Which one interests you?`;
        } else {
            response = "I can tell you about web development, mobile apps, or AI projects. Which area interests you?";
        }
    }

    // Handle skill-related queries
    else if (q.includes('skill') || q.includes('tech') || q.includes('technology')) {
        if (q.includes('front')) {
            response = `Frontend skills include: ${conversationContext.skills.frontend.join(', ')}`;
        } else if (q.includes('back')) {
            response = `Backend technologies include: ${conversationContext.skills.backend.join(', ')}`;
        } else if (q.includes('tool')) {
            response = `Development tools: ${conversationContext.skills.tools.join(', ')}`;
        } else {
            response = "I can tell you about frontend, backend skills, or development tools. What would you like to know?";
        }
    }

    // Handle contact related queries
    else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
        response = "You can reach out through the contact form, or click the 'Hire Me' button. Would you like me to tell you more about the hiring process?";
    }

    // Handle experience/about queries
    else if (q.includes('experience') || q.includes('about')) {
        response = "I'm a full-stack developer with expertise in modern web technologies. I specialize in React, Node.js, and AI integration. Would you like to know more about my experience in any specific area?";
    }

    // Handle follow-up questions
    else if (q.includes('more') || q.includes('detail') || q.includes('explain')) {
        const lastQuery = conversationContext.lastQuery;
        if (lastQuery && lastQuery.includes('project')) {
            response = "Each project includes detailed documentation, tech stack used, and live demos. Which aspect would you like to explore?";
        } else if (lastQuery && lastQuery.includes('skill')) {
            response = "I have professional experience with these technologies and have used them in various production projects. Would you like to see specific examples?";
        } else {
            response = "I'd be happy to provide more details. What specific aspect would you like to know more about?";
        }
    }

    // Default response for unknown queries
    else {
        response = "I can help you explore projects, skills, or discuss potential collaboration. What would you like to know?";
    }

    // Update context with the response
    conversationContext.lastResponse = response;
    return response;
};

export const aiService = {
    generateResponse,
    getContext: () => conversationContext,
    clearContext: () => {
        conversationContext.lastQuery = null;
        conversationContext.lastResponse = null;
        conversationContext.sessionHistory = [];
    }
}; 