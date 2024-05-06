import { SearchType } from '@/Types/types'
import React from 'react'



function Search({input, setInput, handleInput}: SearchType) {
    return (
        <>
            <div className="text-center p-2 text-lg">Search here for cosine similarity</div>
            <div className="flex justify-center my-2">
                <input className="border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300 w-[380px] mr-2" placeholder="write embedding e.g. :- float1, float2, float3" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleInput}>
                    click here
                </button>
            </div>
        </>
    )
}

export default Search