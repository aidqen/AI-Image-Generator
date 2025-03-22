'use client'

import { X } from "lucide-react"

const COLORS = [
    { id: 'red', color: '#FF5A5A' },
    { id: 'orange', color: '#FF9F5A' },
    { id: 'green', color: '#5AFF7F' },
    { id: 'blue', color: '#5A7FFF' },
    { id: 'purple', color: '#BC5AFF' },
    { id: 'white', color: '#FFFFFF' }
]

export function ColorPicker({ selectedColor, onColorChange }) {
    return (
        <div className="flex items-center gap-2">
            {COLORS.map(({ id, color }) => (
                <button
                    key={id}
                    onClick={() => onColorChange(color)}
                    className={`w-8 h-8 rounded-full transition-all ${
                        selectedColor === color 
                            ? 'ring-2 ring-offset-2 ring-[#7C71FF] ring-offset-[#121826]' 
                            : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                />
            ))}
            <button
                onClick={() => onColorChange(null)}
                className="w-8 h-8 rounded-full bg-[#212936] hover:bg-[#394150] transition-colors flex items-center justify-center"
            >
                <X className="w-4 h-4 text-[#6C727F]" />
            </button>
        </div>
    )
}
