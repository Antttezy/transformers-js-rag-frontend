import type { TextGenerationPipeline } from "@huggingface/transformers";
import type { ResponseGenerator } from "./types";

export class TransformersResponseGenerator implements ResponseGenerator {
    private pipeline: TextGenerationPipeline;
    private systemPrompt = `Ты — интеллектуальный ассистент, который отвечает на вопросы пользователя на основе предоставленных документов. 
Контекст предоставлен в виде отдельных источников.

Правила:
1. Используй только информацию из предоставленных источников. Не придумывай факты.
2. Если информация противоречивая, укажи это и дай наиболее вероятный ответ.
3. Формат ответа — связный текст, без JSON, без списков источников.
4. Сохраняй язык вопроса (русский или английский).
5. Если вопрос не покрыт документами, честно скажи: "По предоставленным материалам информации недостаточно".

Формат источников:
[ИСТОЧНИК 1]
текст чанка

[ИСТОЧНИК 2]
текст чанка

Источники информации предоставлены ниже:`

    constructor(pipeline: TextGenerationPipeline) {
        this.pipeline = pipeline
    }

    async getResponse(userQuery: string, documents: string[]): Promise<string> {
        let systemPrompt = this.systemPrompt

        for (let i = 0; i < documents.length; i++) {
            const doc = documents[i];
            const n = i + 1

            systemPrompt += `\n[ИСТОЧНИК ${n}]\n${doc}\n`
        }

        if (documents.length == 0) {
            systemPrompt += `\nНЕ НАЙДЕНО НИ ОДНОГО ИСТОЧНИКА`
        }

        console.log("TransformersResponseGenerator", "systemPrompt", systemPrompt)

        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userQuery }
        ];

        const output = (await this.pipeline(messages, {
            max_new_tokens: 4096,
            do_sample: false
        })) as any; /* eslint-disable-line @typescript-eslint/no-explicit-any */

        const response = (output[0].generated_text.at(-1).content) as string;
        console.log("TransformersResponseGenerator", "Intermediate response", response)
        return this.extractResponse(response)
    }

    private extractResponse(response: string): string {
        return response.split('</think>', 2).at(-1) ?? ''
    }
}
