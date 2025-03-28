'use client'

import { Bookmark } from 'lucide-react'
import { useState } from 'react'
import { ImageDetailsModal } from './ImageDetailsModal'
import { cn } from '@/lib/utils'

export function FeedImagePreview({ image, idx }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div
                className="feed-image-container relative flex flex-col gap-2 break-inside-avoid group"
            >
                <div
                    className="relative overflow-hidden  cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img
                        src={image.url}
                        alt={image.prompt}
                        className={'w-full object-cover border-1 border-black transition-all duration-300'}

                    loading="lazy"
                    />
                    <div className="hover-text opacity-0 absolute inset-0 flex flex-col justify-end p-4 transition-all duration-300 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm font-medium mb-2">{image.prompt}</p>
                        <div className="flex justify-between items-center text-xs text-gray-300">
                            <span>{image.resolution}</span>
                            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                {/* <div className='flex flex-row justify-between w-full items-center'>
                    <div className="flex flex-row items-center gap-1.5">
                        <img 
                            src={image.creator.img} 
                            alt={image.creator.name} 
                            className='w-6 h-6 rounded-full object-cover'
                        />
                        <h3 className='text-[#F3F4F6] font-medium text-sm tracking-[-0.42px]'>{image.creator.name}</h3>
                    </div>
                    <button className={`${image.saved ? 'bg-[#212936]' : 'bg-[#212936]' } rounded-sm p-1.5 transition-colors hover:bg-[#2c3644]`}>
                        <Bookmark className={`${image.saved ? 'fill-white' : 'fill-none'} text-white w-4 h-4`}/>
                    </button>
                </div> */}
            </div>

            <ImageDetailsModal
                image={image}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    )
}