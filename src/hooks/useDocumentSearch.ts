import { useMemo } from "react";
import { DocumentSearchAPI } from "../llm/DocumentSearch";

export function useDocumentSearch() {
    const url = import.meta.env.VITE_APP_DOCUMENT_SEARCH_BACKEND_URL as (string | undefined)
    
    return useMemo(() => {
        if (!url) return null

        return new DocumentSearchAPI(url)
    }, [url])
}
