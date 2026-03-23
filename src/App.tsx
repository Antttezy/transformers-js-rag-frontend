import ChatWindow from './components/Chat/ChatWindow';
import ChatInput from './components/Chat/ChatInput';
import { useChat } from './hooks/useChat';
import { TransformersQueryFormatter } from './llm/QueryFormatter';
import { useRef } from 'react';


export default function App() {
  const formatter = useRef<TransformersQueryFormatter>(new TransformersQueryFormatter())
  const { messages, sendMessage } = useChat({
    async sendMessage(query: string): Promise<string> {
      const formatted = await formatter.current.formatQuery(query);
      console.log('Formatted query', formatted)
      return `Ответ на: "${query}"`;
    },
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ChatWindow messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
