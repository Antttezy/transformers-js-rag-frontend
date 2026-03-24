import { type TextGenerationPipeline } from "@huggingface/transformers";
import { useMemo } from "react";
import { TransformersQueryFormatter } from "../llm/QueryFormatter";


export function useQueryFormatter(pipeline: TextGenerationPipeline | null) {
    return useMemo(() => {
        if (!pipeline) return null

        return new TransformersQueryFormatter(pipeline)
    }, [pipeline])
}
