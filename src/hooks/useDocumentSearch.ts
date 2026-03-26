import { useMemo } from "react";
import { DocumentSearchAPI } from "../llm/DocumentSearch";

type windowENV = {
    __ENV__: {
        VITE_APP_DOCUMENT_SEARCH_BACKEND_URL: string | undefined
    }
}

export function useDocumentSearch() {
    const url = (window as unknown as windowENV).__ENV__.VITE_APP_DOCUMENT_SEARCH_BACKEND_URL

    return useMemo(() => {
        if (url == null) return null

        return new DocumentSearchAPI(url)
    }, [url])
}
