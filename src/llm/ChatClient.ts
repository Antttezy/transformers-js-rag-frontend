import type { ChatClient as ChatClientType, QueryFormatter, DocumentSearch, ResponseGenerator } from './types'

export class ChatClient implements ChatClientType {
    private queryFormatter;
    private documentSearch;
    private responseGenerator;

    constructor(queryFormatter: QueryFormatter, documentSearch: DocumentSearch, responseGenerator: ResponseGenerator) {
        this.queryFormatter = queryFormatter;
        this.documentSearch = documentSearch;
        this.responseGenerator = responseGenerator;
    }

    async sendMessage(query: string): Promise<string> {
        console.log("ChatClient", "query", query)

        const formatted = await this.queryFormatter.formatQuery(query);
        console.log("ChatClient", "formatted", formatted)

        const documents: string[] = []

        for (let i = 0; i < formatted.length; i++) {
            const request = formatted[i];
            const docs = await this.documentSearch.search(request);
            documents.push(...docs)
        }

        console.log("ChatClient", "documents", documents)

        const response = await this.responseGenerator.getResponse(query, documents);
        return response;
    }
}
