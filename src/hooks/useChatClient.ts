import { useMemo } from "react";
import type { ChatClient, DocumentSearch, QueryFormatter, ResponseGenerator } from "../llm/types";
import { ChatClient as ChatClientImpl } from "../llm/ChatClient";

export function useChatClient(
    queryFormatter: QueryFormatter | null,
    documentSearch: DocumentSearch | null,
    responseGenerator: ResponseGenerator | null): ChatClient | null {
    return useMemo(() => {
        if (!queryFormatter || !documentSearch || !responseGenerator)
            return null

        return new ChatClientImpl(queryFormatter, documentSearch, responseGenerator)
    }, [queryFormatter, documentSearch, responseGenerator])
}
