import type { DocumentSearch } from "./types";

export class DocumentSearchAPI implements DocumentSearch {
    async search(): Promise<string[]> {
        return ["Демо документ 1", "Демо документ 2"]
    }
}
