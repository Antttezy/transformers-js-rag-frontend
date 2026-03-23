export type ChatClient = {
    sendMessage: (query: string) => Promise<string>
}

export type QueryFormatter = {
    formatQuery: (query: string) => Promise<string[]>
}

export type DocumentSearch = {
    search: (query: string) => Promise<string[]>
}

export type ResponseGenerator = {
    getResponse: (userQuery: string, documents: string[]) => Promise<string>
}
