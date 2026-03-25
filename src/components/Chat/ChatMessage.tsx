import styles from './ChatMessage.module.css';
import { type Message } from './types';


export default function ChatMessage({ message }: { message: Message }) {
    let style: string

    if (message.role == 'user') {
        style = styles.user
    } else if (message.role == 'bot') {
        style = styles.bot
    } else {
        style = styles.error
    }

    return (
        <div
            className={`${styles.message} ${style}`}
        >
            {message.text}
        </div>
    );
}
