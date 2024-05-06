export interface ImageData {
    id: number;
    created_at: string;
    name: number;
    embedding: number[];
    similarity?: number
  }

export interface SearchType {
    input: string,
    setInput: (e: string) => void,
    handleInput: () => void,
}


export interface RandomEmbeddingType {
    min: number, 
    max: number
    dimensions?: number, 
  }
  