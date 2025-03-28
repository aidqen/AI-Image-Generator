'use client'

import { CalendarPlus, Download, Expand, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getTimeOfSent } from '@/service/util.service'

export function HistoryImagePreview({ image }) {
    return (
        <Card className={"pb-4 border-[#212936] border-0 gap-0"}>
            {/* Image Container */}
            <div className="relative w-full md:w-[180px] h-[240px] md:h-[180px] flex-shrink-0">
                <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
            </div>

            <CardContent className="flex-1 p-0 pt-2  gap-4 flex flex-col min-w-0">
                {/* Prompt Details */}
                    <h3 className="text-[#E4E4E7] text-xl font-medium leading-relaxed line-clamp-2 break-words">{image.prompt}</h3>

                {/* Negative Prompt */}
                <div className="">
                    <h3 className="text-[#6C727F] text-sm flex flex-row items-center"><X size={14} className='mr-1' />Negative prompt</h3>
                    <p className=" text-gray-300 text-sm font-normal leading-relaxed line-clamp-2 break-words">{image.negativePrompt || 'None'}</p>
                </div>

                <div className="flex flex-col gap-3 mt-auto">
                    {/* Generation Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="min-w-0">
                            <p className="text-[#6C727F] flex flex-row items-center"><CalendarPlus size={14} className='mr-1'/>Created At</p>
                            <p className="text-gray-300 truncate font-normal">{getTimeOfSent(image.createdAt)}</p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[#6C727F] flex flex-row items-center"><Expand size={14} className='mr-1' />Resolution</p>
                            <p className="text-gray-300 font-normal">{image.resolution}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col mt-4 sm:flex-row gap-3">
                        <Button 
                            variant="secondary" 
                            className="flex-1 bg-[#212936] gap-0.5 text-[#E4E4E7] h-11 hover:bg-[#2c3644] hover:text-white transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate text-base font-semibold">Download</span>
                        </Button>
                        <Button 
                            className="flex-1 bg-[#f2330d] gap-0.5 text-white h-11 hover:bg-[#f2200d] transition-colors"
                        >
                            <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate text-base font-semibold">Generate With Settings</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}