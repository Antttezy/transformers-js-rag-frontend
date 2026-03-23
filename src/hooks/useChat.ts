import { type Message } from '../components/Chat/types';
import { useState } from 'react';


type ChatClient = {
    sendMessage: (query: string) => Promise<string>
}

export function useChat(chatClient: ChatClient) {
    const [messages, setMessages] = useState<Message[]>([]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { text, role: 'user' };
        setMessages(prev => [...prev, userMsg]);

        const responseText = await chatClient.sendMessage(text);
        const botMsg: Message = { text: responseText, role: 'bot' };
        setMessages(prev => [...prev, botMsg]);
    };

    return { messages, sendMessage };
}
