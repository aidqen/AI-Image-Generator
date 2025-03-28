'use client'

const trendingSearches = [
    "Cyberpunk",
    "Fantasy landscapes",
    "Anime",
    "Space",
    "Abstract",
    "Pixel art",
    "Nature scenes"
];

export function TrendingSearches({ searchQuery, onSearchSelect }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
                <span className="text-[#6C727F] text-sm font-medium">Trending searches</span>
                {/* <div className="h-[1px] flex-grow bg-[#212936]" /> */}
            </div>
            <div className="flex justify-center flex-wrap gap-2">
                {trendingSearches.map((search, index) => {
                    const isSelected = searchQuery.toLowerCase() === search.toLowerCase();
                    return (
                        <button
                            key={index}
                            onClick={() => onSearchSelect(search)}
                            className={`
                                px-3 py-1.5 rounded-full text-sm 
                                ${isSelected 
                                    ? 'bg-[#7C71FF] text-white hover:bg-[#6a61db]' 
                                    : 'bg-[#212936] text-[#E4E4E7] hover:bg-[#2c3644]'
                                }
                                transition-all duration-200 ease-in-out
                                hover:scale-105 active:scale-95
                            `}
                        >
                            {search}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
