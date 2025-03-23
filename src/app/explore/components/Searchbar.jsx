import { Search } from "lucide-react"


export function Searchbar({ searchQuery, setSearchQuery }) {

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder="Search images by keywords"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-[#E4E4E7] text-base font-normal py-3 pl-4 pr-2 rounded-full border-2 border-[#212936] focus:outline-none placeholder:text-[#6C727F]"
            />
            <button className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#f2330d] rounded-full p-2'>
                <Search className="text-white" />
            </button>
        </div>
    )
}