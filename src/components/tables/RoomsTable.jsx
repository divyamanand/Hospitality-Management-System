import React, { useState, useEffect } from 'react'
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
import TeamsTable from './TeamsTable'
import PopCard from '../features/PopCard'

function RoomsTable() {
  const hostels = [
    {
      Hostel: 'Vashishtha',
      Occupancy: 'Paid',
      Available: '$250.00',
      Gender: "Male",
      Details: 'View Details',
    },
    {
      Hostel: 'Vivekananda',
      Occupancy: 'Pending',
      Available: '$150.00',
      Gender: "Female",
      Details: 'View Details',
    },
    {
      Hostel: 'Panini A',
      Occupancy: 'Unpaid',
      Available: '$350.00',
      Gender: "Male",
      Details: 'View Details',
    },
    {
      Hostel: 'Panini B',
      Occupancy: 'Paid',
      Available: '$450.00',
      Gender: "Male",
      Details: 'View Details',
    },
    {
      Hostel: 'Panini C',
      Occupancy: 'Paid',
      Available: '$550.00',
      Gender: "Female",
      Details: 'View Details',
    },
    {
      Hostel: 'Saraswati',
      Occupancy: 'Pending',
      Available: '$200.00',
      Gender: "Male",
      Details: 'View Details',
    },
    {
      Hostel: 'Nagarjuna Girls Hostel',
      Occupancy: 'Unpaid',
      Available: '$300.00',
      Gender: "Male",
      Details: 'View Details',
    },
  ]

  const [filteredHostels, setFilteredHostels] = useState(hostels)
  const [searchValue, setSearchValue] = useState('')
  const [listview, setListview] = useState(true)

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
  }, [searchValue, hostels])

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
          onClick={() => setListview(!listview)}
          variant="secondary" 
          className="ml-auto">
          {listview ? <LayoutGridIcon /> : <ListIcon />}
        </Button>
      </div>
      <div className="border-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHostels.map((hostel) => (
              <TableRow key={hostel.Hostel}>
                <TableCell className="font-medium">{hostel.Hostel}</TableCell>
                <TableCell>{hostel.Occupancy}</TableCell>
                <TableCell>{hostel.Available}</TableCell>
                <TableCell>{hostel.Gender}</TableCell>
                <PopCard
                trigger={<TableCell 
                className="text-right font-bold text-xs cursor-pointer">
                  {hostel.Details}
                </TableCell>}
                content={
                  <TeamsTable/>
                }/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default RoomsTable
