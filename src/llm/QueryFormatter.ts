import { pipeline } from "@huggingface/transformers";
import { type QueryFormatter } from './types';


type Queries = {
    queries: string[]
}

export class TransformersQueryFormatter implements QueryFormatter {
    private generator: any; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    private loading: Promise<void>;
    private systemPrompt = `Ты — система переписывания поисковых запросов для векторной базы данных (RAG).

Твоя задача:
На основе вопроса пользователя сформировать один или несколько поисковых запросов, которые максимально помогут найти релевантные документы.

Правила:
- Отвечай строго в формате JSON
- Не добавляй пояснений, комментариев или текста вне JSON
- Используй простой и точный язык
- Убирай лишние слова
- Добавляй ключевые термины, если это улучшает поиск
- Если вопрос сложный или многокомпонентный — разбей его на несколько запросов
- Если достаточно одного запроса — верни один

Формат ответа:
{
  "queries": ["запрос 1", "запрос 2"]
}

Требования:
- queries — массив строк
- минимум 1 элемент
- не дублируй запросы
- каждый запрос должен быть самодостаточным
- язык запроса должен совпадать с языком пользователя`;

    constructor() {
        this.loading = this.init();
    }

    private async init() {
        this.generator = await pipeline('text-generation', 'onnx-community/Qwen3-4B-ONNX', {
            device: 'webgpu'
        } as any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        );
    }

    async formatQuery(query: string): Promise<string[]> {
        // Ждём инициализации
        await this.loading;

        const messages = [
            { role: "system", content: this.systemPrompt },
            { role: "user", content: `Вопрос пользователя:\n${query}` }
        ];

        const output = await this.generator(messages, {
            max_new_tokens: 512,
            do_sample: false
        });

        const response = output[0].generated_text.at(-1).content;
        console.log("Intermediate response", response)
        return this.extractQueries(response)
    }

    private extractQueries(response: string): string[] {
        const json = response.split('</think>', 2).at(-1)

        if (!json)
            return []

        const queries: Queries = JSON.parse(json);
        return queries.queries;
    }
}
