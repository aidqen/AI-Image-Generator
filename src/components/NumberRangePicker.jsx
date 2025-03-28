'use client'

export function NumberRangePicker({ value, onChange, min = 1, max = 10 }) {
    return (
        <div className="flex items-center gap-4 w-full">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="flex-1 h-1 bg-[#212936] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f2330d]"
            />
        </div>
    )
}
