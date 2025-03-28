'use client'

import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const STYLES = [
    { id: '3d-model', label: '3D Model' },
    { id: 'analog-film', label: 'Analog Film' },
    { id: 'anime', label: 'Anime' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'comic-book', label: 'Comic Book' },
    { id: 'digital-art', label: 'Digital Art' },
    { id: 'enhance', label: 'Enhance' },
    { id: 'fantasy-art', label: 'Fantasy Art' },
    { id: 'isometric', label: 'Isometric' },
    { id: 'line-art', label: 'Line Art' },
    { id: 'low-poly', label: 'Low Poly' },
    { id: 'modeling-compound', label: 'Modeling Compound' },
    { id: 'neon-punk', label: 'Neon Punk' },
    { id: 'origami', label: 'Origami' },
    { id: 'photographic', label: 'Photographic' },
    { id: 'pixel-art', label: 'Pixel Art' },
    { id: 'tile-texture', label: 'Tile Texture' },
]

export function StylePicker({ selectedStyle, onStyleChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
    
    const selectedStyleObj = STYLES.find(style => style.id === selectedStyle) || STYLES[0]

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-[#E4E4E7] bg-[#1E1F25] border-[0.5px] border-[#212936] rounded-lg"
            >
                <span>{selectedStyleObj.label}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#1E1F25] border-[0.5px] border-[#212936] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {STYLES.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => {
                                onStyleChange(style.id)
                                setIsOpen(false)
                            }}
                            className={`block w-full text-left px-4 py-2 hover:bg-[#2A2C35] transition-colors ${
                                selectedStyle === style.id ? 'bg-[#f2330d] text-white' : 'text-[#E4E4E7]'
                            }`}
                        >
                            {style.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
