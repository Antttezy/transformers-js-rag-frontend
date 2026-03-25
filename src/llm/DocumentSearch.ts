import type { DocumentSearch } from "./types";

export class DocumentSearchAPI implements DocumentSearch {
    private endpoint: string

    constructor(endpoint: string) {
        console.log("DocumentSearch", "endpoint", endpoint)
        this.endpoint = endpoint
    }

    async search(query: string): Promise<string[]> {
        const docs = await this.retrieveContext(query)
        return docs.results.map(d => d.text)
    }

    private async retrieveContext(query: string): Promise<RetrieveContextResponse> {
        const url = `${this.endpoint}/retrieve?query=${query}`

        const response = await fetch(url, { redirect: 'follow' }).then(r => {
            if (r.status != 200)
                throw new Error(`request failed with code: ${r.status}`)

            return r.json()
        })

        return response as RetrieveContextResponse
    }
}

type RetrieveContextResponse = {
    results: {
        doc_id: string
        text: string
        distance: number
        metadata?: Record<string, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */
    }[]
}
