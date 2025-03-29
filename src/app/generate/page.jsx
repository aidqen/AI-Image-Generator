'use client'

import { useEffect, useRef, useState } from "react"
import { ColorPicker } from "@/components/ColorPicker"
import { ResolutionPicker } from "@/components/ResolutionPicker"
import { NumberRangePicker } from "@/components/NumberRangePicker"
import { ImagePlaceholder } from "@/components/ImagePlaceholder"
import { StylePicker } from '@/components/StylePicker'
import { Sparkles, Loader2 } from 'lucide-react'
import { generateService } from '@/service/generate.service'
import { supabaseService } from '@/service/supabase.service'

export default function GenerateImage() {
    const promptRef = useRef(null)
    const negativePromptRef = useRef(null)
    const [prompt, setPrompt] = useState('')
    const [negativePrompt, setNegativePrompt] = useState('')
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedResolution, setSelectedResolution] = useState('1:1') // Default to 1:1
    const [guidance, setGuidance] = useState(10) // Default to 7 for balanced guidance
    const [selectedStyle, setSelectedStyle] = useState('digital-art')
    const [generatedImage, setGeneratedImage] = useState(null)
    const [isGenerating, setIsGenerating] = useState(false)
    const [error, setError] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [user, setUser] = useState(null)

    const adjustTextareaHeight = (textarea) => {
        if (textarea) {
            textarea.style.height = '36px';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight(promptRef.current);
        adjustTextareaHeight(negativePromptRef.current);
    }, [negativePrompt, prompt]);

    const handleGenerateImage = async () => {
        if (!prompt) {
            setError('Please enter a prompt to generate an image');
            return;
        }

        try {
            setError(null);
            setIsGenerating(true);
            setIsSaved(false);

            const imageUrl = await generateService.generateImage({
                prompt,
                negativePrompt,
                style: selectedStyle,
                aspectRatio: selectedResolution,
                guidance,
                color: selectedColor
            });

            setGeneratedImage(imageUrl);
        } catch (err) {
            console.error('Failed to generate image:', err);
            setError(err.message || 'Failed to generate image. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveImage = async () => {
        if (!user) {
            setError('Please sign in to save images');
            return;
        }

        if (!generatedImage) {
            return;
        }

        try {
            setIsSaving(true);

            await supabaseService.saveGeneratedImage({
                imageUrl: generatedImage,
                prompt,
                style: selectedStyle,
                aspectRatio: selectedResolution
            });

            setIsSaved(true);
        } catch (err) {
            console.error('Failed to save image:', err);
            setError(err.message || 'Failed to save image. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="flex flex-col pt-[52px] px-[32px] pb-[32px] justify-start gap-8">
            <div className="flex flex-col space-y-1">
                <h1 className="text-2xl font-medium text-white tracking-tight">Text To Image Generator</h1>
                <p className="text-gray-300 text-base font-normal">Simply describe what you imagine, and watch it come to life in seconds!</p>
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                {/* <label htmlFor="prompt" className="text-[#6C727F] text-[14px] font-semibold">Prompt</label> */}
                <textarea
                    id="prompt"
                    name="prompt"
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                        adjustTextareaHeight(e.target);
                    }}
                    className="text-[#E4E4E7] px-[16px] py-[8px] w-full text-base bg-[#1E1F25] border-[0.5px] border-[#212936] rounded-lg resize-none focus-within:outline-0 focus-within:border-1 focus-within:border-[#f2330d] placeholder:text-[#6C727F] leading-none"
                    ref={promptRef}
                    placeholder="Prompt"
                    style={{ height: '40px', minHeight: '40px', overflow: 'hidden' }}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                {/* <label htmlFor="negative-prompt" className="text-[#6C727F] text-[14px] font-semibold">Negative Prompt (Optional)</label> */}
                <textarea
                    id="negative-prompt"
                    name="negative-prompt"
                    value={negativePrompt}
                    onChange={(e) => {
                        setNegativePrompt(e.target.value);
                        adjustTextareaHeight(e.target);
                    }}
                    className="text-[#E4E4E7] px-[16px] py-[8px] w-full text-base bg-[#1E1F25] border-[0.5px] border-[#212936] rounded-lg resize-none focus-within:outline-0 focus-within:border-1 focus-within:border-[#f2330d] placeholder:text-[#6C727F] leading-none"
                    ref={negativePromptRef}
                    placeholder="Negative Prompt (Optional)"
                    style={{ height: '40px', minHeight: '40px', overflow: 'hidden' }}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Style</label>
                <StylePicker
                    selectedStyle={selectedStyle}
                    onStyleChange={setSelectedStyle}
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
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Aspect Ratio</label>
                <ResolutionPicker
                    selectedResolution={selectedResolution}
                    onResolutionChange={setSelectedResolution}
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
                <label htmlFor="" className="text-[#6C727F] text-[14px] font-semibold">Creativity<span className="ml-2 text-[#E4E4E7]">{guidance}</span></label>
                <NumberRangePicker
                    value={guidance}
                    onChange={setGuidance}
                />
            </div>
            <div className="relative">
                {isGenerating ? (
                    <div className="w-full bg-[#1E1F25] rounded-xl overflow-hidden relative border border-[#394150]"
                        style={{
                            aspectRatio: selectedResolution.split(':').join('/'),
                        }}
                    >
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[#434651]">
                            <Loader2 className="animate-spin" size={64} strokeWidth={1.5} />
                            <p className="text-base font-semibold">Generating your image...</p>
                            <p className="text-sm text-[#6C727F]">This may take a moment</p>
                        </div>
                    </div>
                ) : generatedImage ? (
                    <img
                        src={generatedImage}
                        alt="Generated image"
                        className="w-full rounded-xl"
                        style={{
                            aspectRatio: selectedResolution.split(':').join('/')
                        }}
                    />
                ) : (
                    <ImagePlaceholder
                        aspectRatio={selectedResolution.split(':').join('/')}
                        resolution={selectedResolution}
                    />
                )}
            </div>
                <button
                    onClick={handleGenerateImage}
                    disabled={isGenerating || !prompt}
                    className={`flex flex-row items-center justify-center cursor-pointer w-full rounded-xl text-base py-3 font-semibold text-white transition-colors ${isGenerating || !prompt
                            ? 'bg-[#3a3a3a] cursor-not-allowed'
                            : 'bg-[#f2330d] hover:bg-[#f2200d]'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 animate-spin" size={24} /> Generating...
                        </>
                    ) : (
                        <>
                            <Sparkles className="mr-2" size={24} /> Generate Image
                        </>
                    )}
                </button>
                {error && (
                    <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
        </div>
    )
}