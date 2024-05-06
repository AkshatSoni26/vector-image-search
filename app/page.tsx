"use client"

import { ImageData } from "@/Types/types";
import Grid from "@/components/Grid";
import Search from "@/components/Search";
import { calculateCosineSimilarity, fetchData, generateRandomEmbedding, hanndleSupabse } from "@/utils";
import { useEffect, useState } from "react";


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
              <Search input={input} setInput={setInput} handleInput={handleInput} />
              <Grid searchArr={searchArr} />
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