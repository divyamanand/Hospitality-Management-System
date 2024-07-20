import React, { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // UI component for toggle buttons
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // UI components for table
import { Link } from 'react-router-dom'; // Link component for navigation
import SearchItem from '../features/SearchItem'; // Search input component
import { ChevronDown } from 'lucide-react'; // Icon for dropdown
import { Button } from '../ui/button'; // UI component for buttons
import { useData } from '@/data/useData'; // Custom hook for data
import { mergeHostelData } from '@/data/rooomsData'; // Function to merge hostel data
import PopCard from '../features/PopCard'; // Component for pop-up cards
import Hostels from '../charts/Hostels'; // Component for hostel summary chart

const HostelsTable = () => {
  const { allotment, setSelectHostel } = useData(); // Data and setter from custom hook

  const [hostels, setHostels] = useState({}); // State to store hostel data
  const [filteredHostels, setFilteredHostels] = useState([]); // State to store filtered hostel data
  const [searchValue, setSearchValue] = useState(''); // State for search input
  const [filters, setFilters] = useState({
    male: false,
    female: false,
  }); // State for gender filters

  // Effect to merge and set hostel data when allotment changes
  useEffect(() => {
    const hostelData = mergeHostelData(allotment);
    setHostels(hostelData);
  }, [allotment]);

  // Effect to filter and update hostels based on search and filters
  useEffect(() => {
    const hostelsKeys = Object.keys(hostels);
    hostelsKeys.sort();
    let updatedHostels = hostelsKeys.map(key => ({
      Hostel: key,
      ...hostels[key]
    }));

    // Apply search filter
    if (searchValue) {
      updatedHostels = updatedHostels.filter((value) =>
        value.Hostel.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply gender filters
    if (filters.male) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Boys");
    } else if (filters.female) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Girls");
    }

    setFilteredHostels(updatedHostels);
  }, [searchValue, filters, hostels]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
          Manage Your Hostels
        </h2>
        <div className='ml-auto'>
          <PopCard
            trigger={
              <Button variant="Secondary" className="w-min h-min bg-background">
                Summary <ChevronDown />
              </Button>
            }
            side="bottom"
            content={<Hostels />} // Pop-up content with hostel summary chart
          />
        </div>
      </div>
      <SearchItem message='Search Hostel' handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="flex justify-start mb-2">
        <ToggleGroup type="single" className="inline-block">
          <ToggleGroupItem
            value="Male"
            onClick={() => setFilters({ male: !filters.male, female: false })}
            className={filters.male ? 'bg-gray-200' : ''}
          >
            <h4>Boys</h4>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Female"
            onClick={() => setFilters({ male: false, female: !filters.female })}
            className={filters.female ? 'bg-gray-200' : ''}
          >
            <h4>Girls</h4>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="border-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hostel</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Vacancy</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHostels.map((hostel, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{hostel.Hostel}</TableCell>
                <TableCell>{hostel.totalCapacity}</TableCell>
                <TableCell>{hostel.totalVacancy}</TableCell>
                <TableCell>{hostel.Gender}</TableCell>
                <TableCell className="text-right font-bold text-xs"
                  onClick={() => setSelectHostel(hostel.Hostel)}>
                  <Link to="/rooms">Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default HostelsTable;
