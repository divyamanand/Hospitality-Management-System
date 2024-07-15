import React from 'react'
import Navbar from '@/components/features/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search } from 'lucide-react';

const ManageHostels = () => {
  return (
    <>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 ">
    Manage Your Hostels
    </h2>
    <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
        <Search className="w-5 h-5 text-gray-500 ml-3" />
        <input
            type="Search"
            placeholder="Search Your Hostel"
            className="pl-2 py-2 w-full focus:outline-none"
        />
    </div>
    </>
  )
}

export default ManageHostels
