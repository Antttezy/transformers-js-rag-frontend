import styles from './ChatMessage.module.css';
import { type Message } from './types';


export default function ChatMessage({ message }: { message: Message }) {
    return (
        <div
            className={`${styles.message} ${message.role === 'user' ? styles.user : styles.bot}`}
        >
            {message.text}
        </div>
    );
}
