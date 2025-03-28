import { Search } from "lucide-react"


export function Searchbar({ searchQuery, setSearchQuery }) {

    return (
        <div className="fixed -translate-x-1/2 left-1/2 w-[90%] z-10 bottom-[68px]">

            <div className="relative w-full">
                <input
                    type="text"
                    placeholder="Search images by keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-[#434651]  bg-[#1E1F25] text-base font-medium py-3.5 pl-4 pr-2  rounded-full border-2 border-[#212936] focus:outline-none placeholder:text-[#434651]"
                />
                <button className='absolute right-2 top-1/2 -translate-y-1/2 bg-[#f2330d] rounded-full p-2'>
                    <Search className="text-white" />
                </button>
            </div>
        </div>
    )
}