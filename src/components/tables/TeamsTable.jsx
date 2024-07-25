import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // UI components for table
import SearchItem from '../features/SearchItem'; // Component for searching
import { Button } from '@/components/ui/button'; // UI component for buttons
import PopCard from '../features/PopCard'; // Component for pop-up cards
import Input from '../ui/input'; // UI component for input fields
import { useData } from '@/data/useData'; // Custom hook for managing data state
import { summariseTeamsData } from '@/data/teamsData'; // Function for summarizing teams data
import Papa from 'papaparse'; // Library for parsing CSV data
import UnallocatedTable from './UnallocatedTable'; // Component to display unallocated teams
import Visitors from '../charts/Visitors';

function TeamsTable() {
  const { allotment } = useData(); // Get allotment data from the custom hook

  const [teams, setTeams] = useState([]); // State to store all teams
  const [filteredTeams, setFilteredTeams] = useState([]); // State to store filtered teams
  const [listTeams, setListTeams] = useState([]); // State to store teams for current page
  const [searchValue, setSearchValue] = useState(''); // State to store search input
  const [length, setLength] = useState(10); // Number of teams per page
  const [current, setCurrent] = useState(1); // Current page number
  const totalPages = Math.ceil(filteredTeams.length / length); // Total number of pages

  // Function to sort teams by hostel name
  const sortArrayByHostelName = (array) => {
    return array.sort((a, b) => a.hostelName.localeCompare(b.hostelName));
  };

  // Effect to summarize and set teams data when allotment changes
  useEffect(() => {
    const boysTeams = summariseTeamsData(allotment.boysAllottment.allTeams);
    const girlsTeams = summariseTeamsData(allotment.girlsAllottment.allTeams);
    const totalData = [...boysTeams, ...girlsTeams];
    let uniqueArray = Array.from(new Set(totalData.map(item => JSON.stringify(item))))
      .map(item => JSON.parse(item));
    uniqueArray = sortArrayByHostelName(uniqueArray);
    setTeams(uniqueArray);
    setFilteredTeams(uniqueArray);
  }, [allotment.boysAllottment.allTeams, allotment.girlsAllottment.allTeams]);

  // Effect to paginate the filtered teams
  useEffect(() => {
    const startIdx = (current - 1) * length;
    const endIdx = Math.min(startIdx + length, filteredTeams.length);
    setListTeams(filteredTeams.slice(startIdx, endIdx));
  }, [filteredTeams, length, current]);

  // Effect to filter teams based on search input
  useEffect(() => {
    if (searchValue) {
      setFilteredTeams(
        teams.filter((value) =>
          value.GroupID.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredTeams(teams);
    }
  }, [searchValue, teams]);

  // Function to download teams data as CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(teams);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'teamsAllotment.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className='flex'>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
          Teams
        </h2>
        <div className='ml-auto flex'>
          <div className='ml-auto mr-2'>
            <PopCard
              trigger={
                <Button variant="Secondary" className="w-min h-min bg-background">
                  Unallocated <ChevronDown />
                </Button>
              }
              side="bottom"
              content={<UnallocatedTable />} // Display unallocated teams
            />
          </div>
          <div className='ml-auto'>
            <PopCard
              trigger={
                <Button variant="Secondary" className="w-min h-min bg-background">
                  Summary <ChevronDown />
                </Button>
              }
              side="bottom"
              content={<Visitors />} // Display visitors chart
            />
          </div>
          <Button className="mx-1" onClick={downloadCSV}>
            <Download className='h-auto w-auto mr-2' /> Download
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
        <Input className="w-10" value={length} onChange={(e) => setLength(Math.min(e.target.value, filteredTeams.length))} />
        <Button variant="outline" size="icon" className="w-9 h-9" onClick={() => setCurrent(current - 1)} disabled={current <= 1}>
          <ChevronLeft className='h-4 w-10' />
        </Button>
        <div className="text-xl font-semibold">{current}</div>
        <div className="text-md">{`/ ${totalPages}`}</div>
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9"
          onClick={() => setCurrent(current + 1)}
          disabled={current === totalPages}
        >
          <ChevronRight className='h-4 w-10' />
        </Button>
      </div>
    </>
  );
}

export default TeamsTable;
