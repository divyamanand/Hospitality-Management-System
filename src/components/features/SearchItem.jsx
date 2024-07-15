import React from 'react'
import { Search } from 'lucide-react'

function SearchItem({ message = "Search", handleChange }) {
  return (
    <div className="flex items-center border border-gray-300 rounded-md shadow-sm mb-5 bg-background">
      <Search className="w-5 h-5 text-gray-500 ml-3 " />
      <input
        type="search"
        placeholder={message}
        className="pl-2 py-2 w-full focus:outline-none bg-background"
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchItem
