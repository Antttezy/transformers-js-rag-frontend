import { useEffect, useState } from "react";
import { pipeline, TextGenerationPipeline, type ProgressInfo } from "@huggingface/transformers";

type UseLLMResult = { pipeline: TextGenerationPipeline | null, progress: number, loading: boolean };

export function useLLM(): UseLLMResult {
    const [pipe, setPipe] = useState<TextGenerationPipeline | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        (async () => {
            setLoading(true);
            setProgress(0);

            const fileProgress: Record<string, [number, number]> = {};
            const instance = await pipeline('text-generation', 'onnx-community/Qwen3-4B-ONNX', {
                device: 'webgpu',
                progress_callback: (e: ProgressInfo) => {
                    if (!isMounted)
                        return;

                    if (e.status === "progress") {
                        fileProgress[e.file] = [e.loaded, e.total];

                        const values = Object.values(fileProgress);
                        const [loaded, total] = values.reduce(([la, ta], [lb, tb]) =>
                            [la + lb, ta + tb],
                            [0, 0]);

                        setProgress(Number((loaded * 100 / total).toFixed(1)));
                    }

                    if (e.status === "done") {
                        setProgress(100);
                    }
                },
            });

            if (isMounted) {
                setPipe(() => instance);
                setLoading(false);
            }
        })()

        return () => {
            isMounted = false;
        }
    }, []);

    return { pipeline: pipe, progress, loading };
}
