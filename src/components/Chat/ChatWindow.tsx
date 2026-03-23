import { useRef, useEffect } from 'react';
import styles from './ChatWindow.module.css';
import ChatMessage from './ChatMessage';
import { type Message } from './types';


export default function ChatWindow({ messages }: { messages: Message[] }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Автоскролл вниз при новом сообщении
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.container} ref={containerRef}>
            {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
            ))}
        </div>
    );
}
