import { useLLM } from './hooks/useLLM';
import LoadingStatus from './components/Loader/LoadingStatus';
import ChatBox from './components/Chat/ChatBox';


export default function App() {
  const { pipeline, progress, loading } = useLLM()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ChatBox pipeline={pipeline} />
      <LoadingStatus loading={loading} progress={progress} />
    </div>
  );
}
