"use client"

import { supabase } from "@/lib/supabase";
import { calculateCosineSimilarity, fetchData, generateRandomEmbedding, hanndleSupabse } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";



interface ImageData {
  id: number;
  created_at: string;
  name: number;
  embedding: number[];
  similarity?: number
}


export default function Home() {

  const [input, setInput] = useState<string>('')
  const [images, setImages] = useState<ImageData[]>([])
  const [searchArr, setSearchedArr] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  const handleInput = () => {
    let embedd = input
    if (input.length == 0) {
      alert('input is required for processing.')
      return
    }

    if (embedd[embedd.length - 1] == ',') {
      embedd = embedd.slice(0, input.length - 1)
    }

    let embeddArr = embedd.split(',').map((ele, id) => Number(ele))

    if (embeddArr.length !== 3) {
      alert('3 input is reuired in this format. e.g. :- float1,float2,float3')
      return
    }

    for (let index = 0; index < embeddArr.length; index++) {
      const element = embeddArr[index];
      console.log("(-1 < element) || (element > 1) ===========>", (-1 < element) || (element > 1), (-1 < element), (element > 1), element)
      if ((-1 > element) || (element > 1)) {
        alert('input is in the -1 to 1 range.')
        return
      }
    }

    setLoading(true)

    const results = images.map((image) => ({
      ...image,
      similarity: calculateCosineSimilarity(embeddArr, image.embedding),
    }));

    // Sort images based on cosine similarity in descending order
    results.sort((a, b) => b.similarity - a.similarity);

    // Display the top 3 most similar images
    setSearchedArr(results.slice(0, 3));
    setLoading(false)
  }


  useEffect(
    () => {
      if (images.length == 0) {
        setLoading(true)
        fetchData().then(
          (res: ImageData[] | []) => {
            const data = res.sort((a, b) => a.name - b.name)
            setImages(data)
            setSearchedArr(data)
            setLoading(false)
          }
        ).catch(
          (err: any) => {
            console.log('err ======>', err)
            setLoading(false)
            setError(true)
          }
        )
      }
      else {
        if (input.length == 0) {
        setLoading(true)
          setSearchedArr(images)
          setLoading(false)
        }
      }
    }, [input]
  )



  return (
    <main className="">
      {
        !loading
          ?
          error
          ?
          <div className="flex w-screen h-screen justify-center items-center text-red-800">There is some issue. Please check console.</div>
          :
          <div className="p-2 container mx-auto">
            <div className="text-center p-2 text-lg">Search here for cosine similarity</div>
            <div className="flex justify-center my-2">
              <input className="border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-[380px] mr-2" placeholder="write embedding e.g. :- float1, float2, float3" value={input} onChange={(e) => setInput(e.target.value)} />
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleInput}>
                click here
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {
                searchArr.map(
                  (image, id) => (
                    <div style={{
                      margin: '20px'
                    }}>
                      <Image
                        src={require(`@/images/${image.name}.jpg`)}
                        alt={`${id}`}
                        width={200}
                  height={200}
                  // placeholder="blur" // Use a placeholder
                      />
                      <div>Image name:- {image.name}</div>
                      <div>Image embedding:- {image.embedding.join(' ,')}</div>
                      {image.similarity && <div>cosine similarity:- {image.similarity}</div>}
                    </div>
                  )
                )
              }
            </div>
          </div>
          :
          <div className="flex w-screen h-screen justify-center items-center">
            <div className="animate-ping h-5 w-5 rounded-full mr-3 bg-blue-800"></div>
            <div className="text-blue-800">
              Loading...
              </div>
          </div>
      }
    </main>
  );
}

            // {/* <button onClick={() => hanndleSupabse(imageData)}>click here</button> */}