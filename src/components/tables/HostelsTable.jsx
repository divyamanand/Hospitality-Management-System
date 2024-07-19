import React, { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import SearchItem from '../features/SearchItem';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useData } from '@/data/useData';
import { summariseDataForHostels } from '@/data/hostelsData';

const HostelsTable = () => {
  const {allotment} = useData()
  const boysHostels = summariseDataForHostels(allotment.boysAllottment.allHostels);
  const girlsHostels = summariseDataForHostels(allotment.girlsAllottment.allHostels);
  const hostelData = { ...boysHostels, ...girlsHostels }
  console.log(hostelData)

  const [hostels, setHostels] = useState([])
  const [filteredHostels, setFilteredHostels] = useState(hostels);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    male: false,
    female: false,
  });

  useEffect(() => {
    let updatedHostels = hostels;

    if (searchValue) {
      updatedHostels = updatedHostels.filter((value) =>
        value.Hostel.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (filters.male) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Male");
    } else if (filters.female) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Female");
    }

    setFilteredHostels(updatedHostels);
  }, [searchValue, filters, hostels]);

  return (
    <>
      <div className='flex'>
        <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
          Manage Your Hostels
        </h2>
        <Button className="ml-auto">
          <PlusIcon className='h-auto w-auto' /> New / Update
        </Button>
      </div>
      <SearchItem message='Search Hostel' handleChange={(e) => setSearchValue(e.target.value)} />
      <div className="flex justify-start mb-2">
        <ToggleGroup type="single" className="inline-block">
          <ToggleGroupItem
            value="Male"
            onClick={() =>
              setFilters({ male: !filters.male, female: false })
            }
            className={filters.male ? 'bg-gray-200' : ''}
          >
            <h4>Male</h4>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Female"
            onClick={() =>
              setFilters({ male: false, female: !filters.female })
            }
            className={filters.female ? 'bg-gray-200' : ''}
          >
            <h4>Female</h4>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="border-2 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Hostel</TableHead>
              <TableHead>Occupancy</TableHead>
              <TableHead>Available</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHostels.map((hostel, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{hostel.Hostel}</TableCell>
                <TableCell>{hostel.Occupancy}</TableCell>
                <TableCell>{hostel.Available}</TableCell>
                <TableCell>{hostel.Gender}</TableCell>
                <TableCell className="text-right font-bold text-xs">
                  <Link to="/rooms">{hostel.Details}</Link>
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
