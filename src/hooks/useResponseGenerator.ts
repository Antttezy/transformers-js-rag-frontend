import { type TextGenerationPipeline } from "@huggingface/transformers";
import { useMemo } from "react";
import { TransformersResponseGenerator } from "../llm/ResponseGenerator";


export function useResponseGenerator(pipeline: TextGenerationPipeline | null) {
    return useMemo(() => {
        if (!pipeline) return null

        return new TransformersResponseGenerator(pipeline)
    }, [pipeline])
}
