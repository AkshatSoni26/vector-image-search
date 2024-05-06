import { ImageData } from '@/Types/types'
import Image from 'next/image';
import React from 'react'

interface GridProps {
    searchArr: ImageData[];
}


function Grid({searchArr}: GridProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {
                searchArr.map(
                    (image, id) => (
                        <div key={id} style={{
                            margin: '20px'
                        }}>
                            <Image
                                src={require(`@/images/${image.name}.jpg`)}
                                alt={`${id}`}
                                priority={true}
                                // loading='lazy'
                                style={{ width: '200px', height: 'auto' }}
                            />
                            <div>Image name:- {image.name}</div>
                            <div>Image embedding:- {image.embedding.join(' ,')}</div>
                            {image.similarity && <div>cosine similarity:- {image.similarity}</div>}
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Grid