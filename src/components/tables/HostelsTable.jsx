import React, { useState, useEffect } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from 'react-router-dom';
import SearchItem from '../features/SearchItem';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useData } from '@/data/useData';
import { mergeHostelData } from '@/data/rooomsData';
import PopCard from '../features/PopCard';
import Hostels from '../charts/Hostels';

const HostelsTable = () => {
  const { allotment, setSelectHostel } = useData();

  const [hostels, setHostels] = useState({});
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    male: false,
    female: false,
  });

  useEffect(() => {
    const hostelData = mergeHostelData(allotment);
    setHostels(hostelData);
  }, [allotment]);

  useEffect(() => {
    const hostelsKeys = Object.keys(hostels);
    hostelsKeys.sort();
    let updatedHostels = hostelsKeys.map(key => ({
      Hostel: key,
      ...hostels[key]
    }));

    if (searchValue) {
      updatedHostels = updatedHostels.filter((value) =>
        value.Hostel.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (filters.male) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Boys");
    } else if (filters.female) {
      updatedHostels = updatedHostels.filter(val => val.Gender === "Girls");
    }

    setFilteredHostels(updatedHostels);
  }, [searchValue, filters, hostels]);

  console.log(allotment);
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
            content={
              <Hostels/>
            }
          />
        </div>
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
            <h4>Boys</h4>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Female"
            onClick={() =>
              setFilters({ male: false, female: !filters.female })
            }
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
