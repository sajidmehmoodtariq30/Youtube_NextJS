import { SearchIcon } from "lucide-react"

export const SearchInput = () => {
    return (
        // Add todo functionality
        <form className="flex w-full max-w-[600px]" action="">
            <div className="w-full relative">
                <input 
                placeholder="search"
                type="text" 
                className="w-full h-10 px-4 pr-10 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-full"
                />
            {/* Add search remove button */}
            </div>
            <button type="submit" className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full -ml-[52px] z-10 disabled:cursor-not-allowed disabled:opacity-50">
                <SearchIcon size={12}/>
            </button>
        </form>
    )
}