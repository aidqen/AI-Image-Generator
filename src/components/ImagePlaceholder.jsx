'use client'

import { ImageIcon } from "lucide-react"

export function ImagePlaceholder({ resolution, aspectRatio }) {
    // Use provided aspectRatio if available, otherwise calculate it
    const calculatedAspectRatio = aspectRatio || 
        (resolution.includes('x') 
            ? resolution.split('x').map(Number).reduce((w, h) => w / h) 
            : 1);

    return (
        <div 
            className="w-full bg-[#1E1F25] rounded-xl overflow-hidden relative border border-[#394150]"
            style={{ 
                aspectRatio: calculatedAspectRatio,
            }}
        >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#434651]">
                <ImageIcon size={64} strokeWidth={1.5} />
                <p className="text-base font-semibold">Your image will appear here</p>
                <div className="text-sm">{resolution}</div>
            </div>
        </div>
    )
}
