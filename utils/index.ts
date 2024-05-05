import { supabase } from "@/lib/supabase";

export const randomFloatInRange = (min: number, max: number): number => {
  const randomNumber = Math.random() * (max - min) + min;
  return parseFloat(randomNumber.toFixed(2));
};

interface RandomEmbeddingType {
  min: number, 
  max: number
  dimensions?: number, 
}

export function generateRandomEmbedding({dimensions=3, min, max}: RandomEmbeddingType): number[] {
  // Generates a random embedding with the specified number of dimensions.

  // Args:
  //     dimensions: The number of dimensions for the embedding (default: 3).

  // Returns:
  //     A list of random floating-point numbers between 0 (inclusive) and 1 (exclusive)
  //     representing the embedding.

  if (dimensions <= 0) {
    throw new Error("Embedding dimensions must be a positive integer.");
  }

  const embedding: number[] = [];
  for (let i = 0; i < dimensions; i++) {
    embedding.push(randomFloatInRange(min, max));
  }
  return embedding;
}

export function hanndleSupabse(data: { name: number; embedding: number[] }[]) {
  data.forEach(async (image) => {
    const { data, error } = await supabase
      .from('images')
      .insert([image]);

    if (error) {
      console.error('Error inserting image data:', error);
    } else {
      console.log('Image inserted:', data);
    }
  });
}


export async function fetchData() {
  try {
    const { data, error } = await supabase.from('images').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};


const dotProduct = (vec1: number[], vec2: number[]): number => {
  return vec1.reduce((acc, val, index) => acc + val * vec2[index], 0);
};

const euclideanNorm = (vec: number[]): number => {
  return Math.sqrt(vec.reduce((acc, val) => acc + val ** 2, 0));
};

export const calculateCosineSimilarity = (vec1: number[], vec2: number[]): number => {
  const dot = dotProduct(vec1, vec2);
  const normVec1 = euclideanNorm(vec1);
  const normVec2 = euclideanNorm(vec2);
  
  if (normVec1 === 0 || normVec2 === 0) {
    return 0; // If one of the vectors has zero magnitude, cosine similarity is undefined
  }

  return dot / (normVec1 * normVec2);
};
