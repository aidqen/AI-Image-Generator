'use client'

import { ImageIcon } from "lucide-react"

export function ImagePlaceholder({ resolution }) {
    // Parse resolution string to get dimensions
    const [width, height] = resolution.split('x').map(Number)
    const aspectRatio = width / height

    return (
        <div 
            className="w-full bg-[#212936] rounded-xl overflow-hidden relative border border-[#394150]"
            style={{ 
                aspectRatio: aspectRatio,
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#6C727F]">
                <ImageIcon size={64} strokeWidth={1.5} />
                <p className="text-base font-semibold">Your image will appear here</p>
                <div className="text-sm">{resolution}</div>
            </div>
        </div>
    )
}
