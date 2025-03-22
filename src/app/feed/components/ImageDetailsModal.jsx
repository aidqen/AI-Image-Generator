'use client'

import { Button } from '@/components/ui/button'
import { Download, Sparkles, X } from 'lucide-react'

export function ImageDetailsModal({ image, isOpen, onClose }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-[#131B2A] overflow-y-auto relative rounded-lg max-w-lg max-h-[95%] w-[90%] mx-4">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4  hover:text-white rounded-lg bg-transparent text-black transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="">
                    <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full rounded-t-lg object-fit"
                    />
                </div>

                {/* Image details */}
                    <div className="px-5 pt-3 flex flex-row items-center justify-between">
                        <Button className={'text-gray-400 px-4 py-2 bg-[#212936]'}><Download className="w-4 h-4" />Download</Button>
                    </div>
                <div className="p-5 space-y-4">
                    {/* Prompt details */}
                    <div className="space-y-1">
                        <h3 className="text-[#6C727F] text-sm font-medium">Prompt</h3>
                        <p className="text-[#E4E4E7] text-base">{image.prompt}</p>
                    </div>
                    <div className="space-y-0">
                        <h3 className="text-[#6C727F] text-sm font-medium">Negative Prompt</h3>
                        <p className="text-[#E4E4E7] text-base">{image.negativePrompt}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                            <p className="text-[#6C727F]">Created on</p>
                            <p className="text-[#E4E4E7]">{new Date(image.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-[#6C727F]">Resolution</p>
                            <p className="text-[#E4E4E7]">{image.resolution}</p>
                        </div>
                    </div>

                    <Button className={'bg-[#7C71FF] w-full mt-2 py-5 text-sm font-medium text-white'}><Sparkles className="w-4 h-4" />Generate Using These Settings</Button>
                    {/* Creator info */}
                    <div className="flex items-center gap-2 pt-2">
                        <img
                            src={image.creator.img}
                            alt={image.creator.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-[#E4E4E7] text-sm font-medium">{image.creator.name}</p>
                            <p className="text-[#6C727F] text-xs">Creator</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
