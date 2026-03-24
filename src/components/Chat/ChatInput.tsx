import React, { useState } from 'react';
import styles from './ChatInput.module.css';

type Props = {
    onSend: (text: string) => void;
    enabled: boolean
};

export default function ChatInput({ onSend, enabled }: Props) {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim() || !enabled)
            return;

        onSend(text.trim());
        setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
            <textarea
                className={styles.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Введите сообщение..."
            />
            <button className={styles.button} onClick={handleSend} disabled={!enabled}>
                Отправить
            </button>
        </div>
    );
}
