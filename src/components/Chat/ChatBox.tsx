import type { TextGenerationPipeline } from "@huggingface/transformers";
import { useQueryFormatter } from "../../hooks/useQueryFormatter";
import { useChat } from "../../hooks/useChat";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { useMemo, useState } from "react";
import { useDocumentSearch } from "../../hooks/useDocumentSearch";
import { useResponseGenerator } from "../../hooks/useResponseGenerator";
import { useChatClient } from "../../hooks/useChatClient";

type Props = {
    pipeline: TextGenerationPipeline | null
};

export default function ChatBox({ pipeline }: Props) {
    const [loading, setLoading] = useState(false)

    const formatter = useQueryFormatter(pipeline)
    const search = useDocumentSearch()
    const response = useResponseGenerator(pipeline)
    const chatClient = useChatClient(formatter, search, response)

    const available = useMemo(() => {
        return chatClient != null

    }, [chatClient])

    const { messages, sendMessage } = useChat(chatClient);

    const handleSend = async (text: string) => {
        try {
            setLoading(true)
            await sendMessage(text)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ChatWindow messages={messages} />
            <ChatInput onSend={handleSend} enabled={available && !loading} />
        </>
    )
}
