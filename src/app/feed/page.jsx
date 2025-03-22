'use client'

import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { Bookmark, Search } from 'lucide-react'
import { useState } from 'react'
import { FeedImagePreview } from './components/FeedImagePreview';
import { TrendingSearches } from './components/TrendingSearches'

const demoImages = [
    {
        id: 1,
        url: 'https://picsum.photos/800/600?random=1',
        prompt: 'A serene mountain landscape at sunset',
        negativePrompt: 'blurry, dark, overexposed, people, buildings',
        createdAt: '2025-03-21T15:30:00Z',
        resolution: '800x600',
        creator: {
            name: 'Emma Wilson',
            img: 'https://i.pravatar.cc/150?img=1'
        },
        saved: false
    },
    {
        id: 2,
        url: 'https://picsum.photos/600/800?random=2',
        prompt: 'Abstract digital art with neon colors',
        negativePrompt: 'realistic, muted colors, black and white, photography',
        createdAt: '2025-03-22T08:15:00Z',
        resolution: '600x800',
        creator: {
            name: 'Alex Chen',
            img: 'https://i.pravatar.cc/150?img=2'
        },
        saved: true
    },
    {
        id: 3,
        url: 'https://picsum.photos/800/800?random=3',
        prompt: 'Futuristic cityscape at night',
        negativePrompt: 'daytime, historical buildings, nature, rural',
        createdAt: '2025-03-22T12:45:00Z',
        resolution: '800x800',
        creator: {
            name: 'Marcus Rodriguez',
            img: 'https://i.pravatar.cc/150?img=3'
        },
        saved: false
    },
    {
        id: 4,
        url: 'https://picsum.photos/700/500?random=4',
        prompt: 'Mystical forest in the fog',
        negativePrompt: 'clear sky, urban, people, modern elements',
        createdAt: '2025-03-22T14:20:00Z',
        resolution: '700x500',
        creator: {
            name: 'Sofia Patel',
            img: 'https://i.pravatar.cc/150?img=4'
        },
        saved: false
    },
    {
        id: 5,
        url: 'https://picsum.photos/600/900?random=5',
        prompt: 'Underwater scene with bioluminescent creatures',
        negativePrompt: 'above water, daylight, boats, humans',
        createdAt: '2025-03-22T16:05:00Z',
        resolution: '600x900',
        creator: {
            name: 'Lucas Kim',
            img: 'https://i.pravatar.cc/150?img=5'
        },
        saved: true
    },
    {
        id: 6,
        url: 'https://picsum.photos/800/600?random=6',
        prompt: 'Cosmic space scene with nebulas',
        negativePrompt: 'earth, buildings, people, daytime',
        createdAt: '2025-03-22T17:30:00Z',
        resolution: '800x600',
        creator: {
            name: 'Isabella Santos',
            img: 'https://i.pravatar.cc/150?img=6'
        },
        saved: false
    },
    {
        id: 7,
        url: 'https://picsum.photos/900/600?random=7',
        prompt: 'Cyberpunk street market',
        negativePrompt: 'historical, rural, nature, daytime',
        createdAt: '2025-03-22T18:45:00Z',
        resolution: '900x600',
        creator: {
            name: 'Noah Thompson',
            img: 'https://i.pravatar.cc/150?img=7'
        },
        saved: false
    },
    {
        id: 8,
        url: 'https://picsum.photos/700/800?random=8',
        prompt: 'Floating islands in the sky',
        negativePrompt: 'ground, buildings, vehicles, modern elements',
        createdAt: '2025-03-22T19:15:00Z',
        resolution: '700x800',
        creator: {
            name: 'Olivia Martinez',
            img: 'https://i.pravatar.cc/150?img=8'
        },
        saved: false
    }
];

export default function FeedPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <div className="flex gap-8 flex-col w-full py-[32px] px-[32px]">
            <div className="flex flex-col gap-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search images by keywords"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full text-[#E4E4E7] text-base font-normal py-3 pl-4 pr-2 rounded-full border-2 border-[#212936] focus:outline-none placeholder:text-[#6C727F]"
                    />
                    <button className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#7C71FF] rounded-full p-2'>
                        <Search className="text-white" />
                    </button>
                </div>

                <TrendingSearches
                    searchQuery={searchQuery}
                    onSearchSelect={setSearchQuery}
                />
            </div>

            <div className='flex flex-col gap-3 items-start'>
                <h3 className='text-white tracking-[-0.24px] text-[18px] font-normal'>Explore Images</h3>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-6 w-full">
                    {demoImages.map(image => (
                        <FeedImagePreview key={image.id} image={image} />
                    ))}
                </div>
            </div>
        </div>
    )
}