import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
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
import PopCard from '../features/PopCard'
import TeamsPopup from './TeamsPopup'
import Input from '../ui/input'

function TeamsTable({
  teams = [
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
]}) {
  

  const [filteredTeams, setfilteredTeams] = useState(teams)
  const [listHostels, setListHostels] = useState(filteredTeams)
  const [searchValue, setSearchValue] = useState('')
  const [length, setLength] = useState(10)
  const [current, setCurrent] = useState(1)
  const totalPages = Math.ceil(filteredTeams.length / length)
  
  const [filters, setFilters] = useState({
    listview: true,
    available: false,
    booked: false,
    partially: false
  })

  useEffect(() => {
    const startIdx = (current - 1) * length
    const endIdx = Math.min(startIdx + length, filteredTeams.length)
    setListHostels(filteredTeams.slice(startIdx, endIdx))
  }, [current, length, filteredTeams])

  useEffect(() => {
    if (searchValue) {
      setfilteredTeams(
        teams.filter((value) =>
          value.room.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else {
      setfilteredTeams(teams)
    }
  }, [searchValue])



  return (
    <>
      <div className='flex'>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
          Teams
        </h2>
        <div className='ml-auto'>
        <Button className="mx-1">
          <PlusIcon className='h-auto w-auto mr-2'/> New / Update
        </Button>
        <Button className="mx-1">
          <Download className='h-auto w-auto mr-2'/>  Download
        </Button>
        </div>
      </div>
      <SearchItem message="Search Teams" handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="border-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Group ID</TableHead>
              <TableHead>Hostel Name</TableHead>
              <TableHead>Room Number</TableHead>
              <TableHead className="text-right">Members Allocated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listHostels.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.room}</TableCell>
                <TableCell>{val.capacity}</TableCell>
                <TableCell>{val.status}</TableCell>
                <TableCell className="text-right font-bold text-xs">
                <PopCard
                  trigger={
                    <div>View Details</div>
                  }
                  content={<TeamsPopup />}
                /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center gap-3 justify-end my-3 mx-auto'>
      <h4>Max</h4>
      <Input className="w-10" value={length} onChange={(e) => setLength(Math.min(e.target.value,filteredTeams.length))}/>
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

export default TeamsTable
