'use client'

const ASPECT_RATIOS = [
    { id: '1:1', label: '1:1', value: '1:1' },
    { id: '16:9', label: '16:9', value: '16:9' },
    { id: '9:16', label: '9:16', value: '9:16' },
    { id: '21:9', label: '21:9', value: '21:9' },
    { id: '9:21', label: '9:21', value: '9:21' },
    { id: '2:3', label: '2:3', value: '2:3' },
    { id: '3:2', label: '3:2', value: '3:2' },
    { id: '4:5', label: '4:5', value: '4:5' },
    { id: '5:4', label: '5:4', value: '5:4' }
]

export function ResolutionPicker({ selectedResolution, onResolutionChange }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(70px,1fr))] w-full gap-2">
            {ASPECT_RATIOS.map(({ id, label, value }) => (
                <button
                    key={id}
                    onClick={() => onResolutionChange(value)}
                    className={`px-3 py-2 rounded-lg text-xs font-normal whitespace-nowrap transition-colors text-[#E4E4E7] ${
                        selectedResolution === value
                            ? 'bg-[#f2330d]'
                            : 'bg-[#1E1F25] hover:bg-[#394150]'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
