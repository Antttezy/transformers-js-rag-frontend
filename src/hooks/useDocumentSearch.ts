import { useMemo } from "react";
import { DocumentSearchAPI } from "../llm/DocumentSearch";


export function useDocumentSearch() {
    return useMemo(() => {
        return new DocumentSearchAPI()
    }, [])
}
