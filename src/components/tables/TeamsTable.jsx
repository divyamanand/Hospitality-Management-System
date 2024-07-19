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
import { useData } from '@/data/useData'
import { summariseTeamsData } from '@/data/teamsData'

function TeamsTable() {
  const { allotment } = useData()
  
  const [teams, setTeams] = useState([])
  const [filteredTeams, setFilteredTeams] = useState([])
  const [listTeams, setListTeams] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [length, setLength] = useState(10)
  const [current, setCurrent] = useState(1)
  const totalPages = Math.ceil(filteredTeams.length / length)

  useEffect(() => {
    const boysTeams = summariseTeamsData(allotment.boysAllottment.allTeams);
    const girlsTeams = summariseTeamsData(allotment.girlsAllottment.allTeams);

    const totalData = [...boysTeams, ...girlsTeams];
    const uniqueArray = Array.from(new Set(totalData.map(item => JSON.stringify(item))))
      .map(item => JSON.parse(item));
    
    setTeams(uniqueArray)
    setFilteredTeams(uniqueArray)
  }, [allotment.boysAllottment.allTeams, allotment.girlsAllottment.allTeams])

  useEffect(() => {
    const startIdx = (current - 1) * length
    const endIdx = Math.min(startIdx + length, filteredTeams.length)
    setListTeams(filteredTeams.slice(startIdx, endIdx))
  }, [filteredTeams, length, current])

  useEffect(() => {
    if (searchValue) {
      setFilteredTeams(
        teams.filter((value) =>
          value.GroupID.toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    } else {
      setFilteredTeams(teams)
    }
  }, [searchValue, teams])

console.log(teams, filteredTeams, listTeams)
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
            {listTeams.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.GroupID}</TableCell>
                <TableCell>{val.hostelName}</TableCell>
                <TableCell>{val.roomNumber}</TableCell>
                <TableCell className="text-right">{val.membersAllocated}</TableCell>
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
