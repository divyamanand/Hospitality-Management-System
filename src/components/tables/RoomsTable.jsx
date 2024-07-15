import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SearchItem from '../features/SearchItem'
import { Button } from '@/components/ui/button'
import { LayoutGridIcon, ListIcon, PlusIcon } from 'lucide-react'
import Hover from '../features/HoverCard'
import TeamsTable from './TeamsPopup'
import PopCard from '../features/PopCard'

function RoomsTable() {
  const hostels = [
    {
      room: '101',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '102',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '103',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '104',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '105',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '106',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '107',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '108',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '109',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '110',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '111',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '112',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '113',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '114',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '115',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '116',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '117',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '118',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '119',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '120',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '121',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '122',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '123',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '124',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '125',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '126',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '127',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
    {
      room: '128',
      capacity: Math.floor(Math.random() * 4) + 1,
      status: Math.round(Math.random()),
      Details: 'View Details',
    },
  ]
  

  const [filteredHostels, setFilteredHostels] = useState(hostels)
  const [listHostels, setListHostels] = useState(filteredHostels)
  const [searchValue, setSearchValue] = useState('')
  const [current, setCurrent] = useState(1)
  const totalPages = Math.ceil(filteredHostels.length / 10)
  const [filters, setFilters] = useState({
    listview: true,
    available: false,
    booked: false,
    partially: false
  })

  useEffect(() => {
    const startIdx = (current - 1) * 10
    const endIdx = Math.min(startIdx + 10, filteredHostels.length)
    setListHostels(filteredHostels.slice(startIdx, endIdx))
  }, [current, filteredHostels])

  useEffect(() => {
    if (searchValue) {
      setFilteredHostels(
        hostels.filter((value) =>
          value.Hostel.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else {
      setFilteredHostels(hostels)
    }
  }, [searchValue])

  return (
    <>
      <div className='flex'>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
          Rooms
        </h2>
        <Button className="ml-auto">
          <PlusIcon className='h-auto w-auto'/> New / Update
        </Button>
      </div>
      <SearchItem message="Search Room" handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="flex justify-start mb-2 align-bottom">
        <ToggleGroup type="single" className="inline-block">
          <ToggleGroupItem value="Available">
            <h4>Available</h4>
          </ToggleGroupItem>
          <ToggleGroupItem value="Booked">
            <h4>Booked</h4>
          </ToggleGroupItem>
          <ToggleGroupItem value="Partial">
            <h4>Partially Booked</h4>
          </ToggleGroupItem>
        </ToggleGroup>
        <Button 
          onClick={() => setListview(!filters.listview)}
          variant="secondary" 
          className="ml-auto">
          {filters.listview ? <LayoutGridIcon /> : <ListIcon />}
        </Button>
      </div>
      <div className="border-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listHostels.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.room}</TableCell>
                <TableCell>{val.capacity}</TableCell>
                <TableCell>{val.status}</TableCell>
                <PopCard
                trigger={<TableCell 
                className="text-right font-bold text-xs cursor-pointer">
                  {val.Details}
                </TableCell>}
                content={
                  <TeamsTable/>
                }/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center gap-3 justify-end my-3 mx-auto'>
        <Button variant="outline" size="icon" className="w-9 h-9"
        onClick={() => setCurrent(current - 1)}
        disabled={current <= 1}
        ><ChevronLeft className='h-4 w-10'/></Button>
        <div className="text-xl font-semibold">{current}</div>
        <div className="text-md">{`/ ${totalPages}`}</div>
        <Button 
        variant="outline"
        size="icon"
        className="w-9 h-9"
        onClick={() => setCurrent(current + 1)}
        disabled={current === totalPages}>
          <ChevronRight className='h-4 w-10'/></Button>
      </div>
    </>
  )
}

export default RoomsTable
