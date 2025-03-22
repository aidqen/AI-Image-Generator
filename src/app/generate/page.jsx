'use client'

import { useEffect, useRef, useState } from "react"
import { ColorPicker } from "@/components/ColorPicker"
import { ResolutionPicker } from "@/components/ResolutionPicker"
import { NumberRangePicker } from "@/components/NumberRangePicker"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { Sparkles } from "lucide-react"

export default function GenerateImage() {
    const promptRef = useRef(null)
    const negativePromptRef = useRef(null)
    const [prompt, setPrompt] = useState('')
    const [negativePrompt, setNegativePrompt] = useState('')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedResolution, setSelectedResolution] = useState('1024x1024') // Default to 1:1
    const [guidance, setGuidance] = useState(10) // Default to 7 for balanced guidance
    const [generatedImage, setGeneratedImage] = useState(null)

    const adjustTextareaHeight = (textarea) => {
        if (textarea) {
            textarea.style.height = '50px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight(promptRef.current);
    }, [prompt]);

    useEffect(() => {
        adjustTextareaHeight(negativePromptRef.current);
    }, [negativePrompt]);


    return (
        <div className="flex flex-col pt-[52px] px-[32px] pb-[32px] justify-start gap-8">
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="prompt" className="text-[#6C727F] text-[14px] font-semibold">Prompt</label>
                <textarea 
                    id="prompt"
                    name="prompt" 
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                        adjustTextareaHeight(e.target);
                    }}
                    className="text-[#E4E4E7] px-[16px] py-[12px] w-full text-base font-normal bg-[#212936] border-[0.5px] border-[#394150] rounded-lg resize-none"
                    ref={promptRef}
                    style={{ minHeight: '50px', overflow: 'hidden' }}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="negative-prompt" className="text-[#6C727F] text-[14px] font-semibold">Negative Prompt (Optional)</label>
                <textarea 
                    id="negative-prompt"
                    name="negative-prompt" 
                    value={negativePrompt}
                    onChange={(e) => {
                        setNegativePrompt(e.target.value);
                        adjustTextareaHeight(e.target);
                    }}
                    className="text-[#E4E4E7] px-[16px] py-[12px] w-full text-base font-normal bg-[#212936] border-[0.5px] border-[#394150] rounded-lg resize-none"
                    ref={negativePromptRef}
                    style={{ minHeight: '50px', overflow: 'hidden' }}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Colors</label>
                <ColorPicker 
                    selectedColor={selectedColor} 
                    onColorChange={setSelectedColor}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Resolution</label>
                <ResolutionPicker 
                    selectedResolution={selectedResolution}
                    onResolutionChange={setSelectedResolution}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Guidance <span className="ml-2 text-[#E4E4E7]">{guidance}</span></label>
                <NumberRangePicker 
                    value={guidance}
                    onChange={setGuidance}
                />
            </div>
            <button className="flex flex-row items-center justify-center w-full bg-[#7C71FF] rounded-xl text-base py-3 font-semibold text-white hover:bg-[#6A5FE6] transition-colors">
                <Sparkles className="mr-2" size={24}/> Generate Image
            </button>
            <div className="relative">
                {generatedImage ? (
                    <img 
                        src={generatedImage} 
                        alt="Generated image"
                        className="w-full rounded-xl"
                        style={{ 
                            aspectRatio: selectedResolution.split('x').reduce((a, b) => Number(a) / Number(b)) 
                        }}
                    />
                ) : (
                    <ImagePlaceholder resolution={selectedResolution} />
                )}
            </div>
        </div>
    )
}