'use client'

import { HistoryImagePreview } from './HistoryImagePreview'

export function HistoryImageList({ images }) {
    return (
        <div className="flex flex-col gap-4">
            {images.map(image => (
                <>
                    <HistoryImagePreview
                        key={image.id}
                        image={image}
                    />
                    <hr className='border-[#212936] border-[1.5px]'/>
                </>
            ))}
        </div>
    )
}