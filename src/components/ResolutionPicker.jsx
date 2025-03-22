'use client'

const RESOLUTIONS = [
    { id: '1024x1024', label: '1024 × 1024 (1:1)', value: '1024x1024' },
    { id: '1152x896', label: '1152 × 896 (9:7)', value: '1152x896' },
    { id: '896x1152', label: '896 × 1152 (7:9)', value: '896x1152' },
    { id: '1344x768', label: '1344 × 768 (7:4)', value: '1344x768' },
    { id: '768x1344', label: '768 × 1344 (4:7)', value: '768x1344' }
]

export function ResolutionPicker({ selectedResolution, onResolutionChange }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(95px,1fr))] w-full gap-2">
            {RESOLUTIONS.map(({ id, label, value }) => (
                <button
                    key={id}
                    onClick={() => onResolutionChange(value)}
                    className={`px-3 py-2 rounded-lg text-xs font-normal whitespace-nowrap transition-colors text-[#E4E4E7] ${
                        selectedResolution === value
                            ? 'bg-[#7C71FF]'
                            : 'bg-[#212936] hover:bg-[#394150]'
                    }`}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}
