import React, { useState, useEffect } from 'react';
import RoomsTable from '@/components/tables/RoomsTable';
import { Button } from '@/components/ui/button';
import { LayoutGridIcon, ListIcon, PlusIcon } from 'lucide-react';
import SearchItem from '@/components/features/SearchItem';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import GridView from '@/components/features/GridView';
import { ScrollArea } from '@/components/ui/scroll-area';

function Rooms({ 
  hostels = [
    { room: '101', capacity: 4, vacant: 0, details: [ { id: 1122, members: 3 }, { id: 1222, members: 2 }, ] },
    { room: '102', capacity: 4, vacant: 3, details: [ { id: 1122, members: 3 }, { id: 1222, members: 2 }, ] },
    { room: '103', capacity: 4, vacant: 3, details: [ { id: 1122, members: 3 }, { id: 1222, members: 2 }, ] },
    { room: '104', capacity: 4, vacant: 3, details: [ { id: 1122, members: 3 }, { id: 1222, members: 2 }, ] },
    { room: '105', capacity: 4, vacant: 3, details: [ { id: 1122, members: 3 }, { id: 1222, members: 2 }, ] },
    { room: 'Room 106', capacity: 2, vacant: 3, details: [ { id: 2233, members: 1 }, ] },
    { room: 'Room 107', capacity: 3, vacant: 3, details: [ { id: 3344, members: 2 }, { id: 3444, members: 1 }, ] },
    { room: 'Room 108', capacity: 5, vacant: 3, details: [ { id: 4455, members: 3 }, { id: 4555, members: 2 }, { id: 4655, members: 1 }, ] },
    { room: 'Room 109', capacity: 6, vacant: 3, details: [ { id: 5566, members: 4 }, ] },
    { room: 'Room 110', capacity: 3, vacant: 3, details: [ { id: 6677, members: 2 }, { id: 6777, members: 1 }, ] },
    { room: 'Room 111', capacity: 4, vacant: 3, details: [ { id: 7788, members: 3 }, ] },
    { room: 'Room 112', capacity: 1, vacant: 3, details: [ { id: 8899, members: 1 }, ] },
    { room: 'Room 113', capacity: 2, vacant: 3, details: [ { id: 9900, members: 1 }, ] },
    { room: 'Room 114', capacity: 5, vacant: 3, details: [ { id: 1011, members: 4 }, { id: 1022, members: 1 }, ] },
  ]
}) {
  const hostelsList = [
    "Vivekananda",
    "Vashishtha",
    "Panini A",
    "Panini B",
    "Saraswati",
    "Nagarjuna",
  ];
  const [listValue, setListValue] = useState(hostelsList[0]);

  const [filters, setFilters] = useState({
    listview: false,
    available: false,
    Occupied: false,
    partially: false,
  });

  const [filteredHostels, setFilteredHostels] = useState(hostels);
  const [filteredHostelsList, setFilteredHostelsList] = useState(hostelsList);
  const [searchValue, setSearchValue] = useState('');
  const [listSearchValue, setListSearchValue] = useState('');

  useEffect(() => {
    let updatedHostels = hostels;
    let updatedHostelsList = hostelsList;

    if (searchValue) {
      updatedHostels = updatedHostels.filter((value) =>
        value.room.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (listSearchValue) {
      updatedHostelsList = hostelsList.filter((val) =>
        val.toLowerCase().includes(listSearchValue.toLowerCase())
      );
    }

    if (filters.available) {
      updatedHostels = updatedHostels.filter((value) => (value.vacant/value.capacity)*100 === 100);
    } else if (filters.Occupied) {
      updatedHostels = updatedHostels.filter((value) => (value.vacant/value.capacity)*100 === 0);
    } else if (filters.partially) {
      updatedHostels = updatedHostels.filter((value) => (value.vacant/value.capacity)*100 > 0 && (value.vacant/value.capacity)*100 < 100);
    }

    setFilteredHostels(updatedHostels);
    setFilteredHostelsList(updatedHostelsList);

  }, [searchValue, hostels, filters, listSearchValue, hostelsList]);

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="gap-6">
        <ResizablePanel defaultSize={15}>
          <div className="p-4">
            <ScrollArea className="h-screen rounded-md">
              <SearchItem message='Search' handleChange={(e) => setListSearchValue(e.target.value)} />
              <ToggleGroup type="single" className="flex-col">
                {filteredHostelsList.map((hostel, index) => (
                  <ToggleGroupItem key={index} value={hostel} onClick={() => setListValue(hostel)}>
                    <h2>{hostel}</h2>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex">
            <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
              Rooms
            </h2>
            <Button className="ml-auto">
              <PlusIcon className='h-auto w-auto' /> New / Update
            </Button>
          </div>
          <SearchItem message="Search Room" handleChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-start mb-2 align-bottom">
            <ToggleGroup type="single" className="inline-block">
              <ToggleGroupItem
                value="Available"
                onClick={() =>
                  setFilters({
                    ...filters,
                    available: !filters.available,
                    Occupied: false,
                    partially: false
                  })
                }
              >
                <h4>Empty</h4>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Occupied"
                onClick={() =>
                  setFilters({
                    ...filters,
                    available: false,
                    Occupied: !filters.Occupied,
                    partially: false
                  })
                }
              >
                <h4>Occupied</h4>
              </ToggleGroupItem>
              <ToggleGroupItem
                value="Partial"
                onClick={() =>
                  setFilters({
                    ...filters,
                    available: false,
                    Occupied: false,
                    partially: !filters.partially
                  })
                }
              >
                <h4>Partial</h4>
              </ToggleGroupItem>
            </ToggleGroup>
            <Button
              onClick={() => setFilters({ ...filters, listview: !filters.listview })}
              variant="secondary"
              className="ml-auto"
            >
              {filters.listview ? <LayoutGridIcon /> : <ListIcon />}
            </Button>
          </div>
          {filters.listview ? (
            <RoomsTable filteredHostels={filteredHostels} />
          ) : (
            <GridView filteredHostels={filteredHostels} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Rooms;
