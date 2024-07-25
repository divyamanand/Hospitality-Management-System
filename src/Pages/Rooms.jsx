import React, { useState, useEffect } from 'react';
import RoomsTable from '@/components/tables/RoomsTable'; // Component for displaying rooms in table format
import { Button } from '@/components/ui/button'; // UI component for button
import { ChevronLeft, LayoutGridIcon, ListIcon} from 'lucide-react'; // Icons for UI
import SearchItem from '@/components/features/SearchItem'; // Component for search input
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'; // UI component for toggle buttons
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"; // Components for resizable panels
import GridView from '@/components/features/GridView'; // Component for displaying rooms in grid format
import { ScrollArea } from '@/components/ui/scroll-area'; // Component for scrollable area
import { useData } from '@/data/useData'; // Custom hook for managing data state
import { getRoomsList, getHostelsList } from '@/data/rooomsData'; // Functions for fetching rooms and hostels data
import PopCard from '@/components/features/PopCard'; // Component for displaying additional information in a pop-up card
import Boys from '@/components/charts/Boys'; // Component for boys' chart
import Girls from '@/components/charts/Girls'; // Component for girls' chart

function Rooms() {
  // Extract necessary states and functions from the custom hook
  const { allotment, selectHostel, notification } = useData();
  
  // State for managing filters
  const [filters, setFilters] = useState({
    listview: false,
    available: false,
    Occupied: false,
    partially: false,
  });

  // State for managing hostels and rooms lists
  const [listOfHostels, setHostelsList] = useState([]);
  const [listValue, setListValue] = useState(null);
  const [roomsList, setRoomsList] = useState([]);

  // Update hostels list and selected hostel on component mount or when allotment or selectHostel changes
  useEffect(() => {
    const list = getHostelsList(allotment);
    setHostelsList(list);
    setListValue(selectHostel || list[0]);
  }, [allotment, selectHostel]);

  // Update rooms list when selected hostel or allotment changes
  useEffect(() => {
    const roomsList = getRoomsList(allotment, listValue);
    setRoomsList(roomsList);
  }, [listValue, allotment]);

  // State for managing filtered results and search input
  const [filteredRooms, setFilteredRooms] = useState(roomsList);
  const [filteredHostelsList, setFilteredHostelsList] = useState(listOfHostels);
  const [searchValue, setSearchValue] = useState('');
  const [listSearchValue, setListSearchValue] = useState('');

  // Apply filters and search results
  useEffect(() => {
    let updatedRooms = roomsList;
    let updatedHostelsList = listOfHostels;

    if (searchValue) {
      updatedRooms = updatedRooms.filter((value) =>
        value.roomNumber.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (listSearchValue) {
      updatedHostelsList = listOfHostels.filter((val) =>
        val.toLowerCase().includes(listSearchValue.toLowerCase())
      );
    }

    if (filters.available) {
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy / value.Capacity) * 100 === 100);
    } else if (filters.Occupied) {
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy / value.Capacity) * 100 === 0);
    } else if (filters.partially) {
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy / value.Capacity) * 100 > 0 && (value.Vacancy / value.Capacity) * 100 < 100);
    }

    setFilteredRooms(updatedRooms);
    setFilteredHostelsList(updatedHostelsList);
  }, [searchValue, filters, listSearchValue, listValue, listOfHostels, roomsList]);

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="gap-6">
        <ResizablePanel defaultSize={15}>
          <div className="p-4">
            <ScrollArea className="h-screen rounded-md">
              {/* Search input for filtering hostels */}
              <SearchItem message='Search' handleChange={(e) => setListSearchValue(e.target.value)} />
              {filteredHostelsList.map((hostel, index) => (
                <Button
                  key={index}
                  value={hostel}
                  onClick={() => setListValue(hostel)}
                  variant="secondary"
                  className={`my-1 ${listValue === hostel ? "bg-secondary" : "bg-transparent"}`}
                >
                  <h2>{hostel}</h2>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={85}>
          <div className="flex">
            <h2 className="scroll-m-20 pb-7 text-3xl font-semibold tracking-tight first:mt-0 text-left">
              Rooms
            </h2>
            <div className='ml-auto'>
              <PopCard
                trigger={
                  <Button variant="Secondary" className="w-min h-min bg-background">
                    <ChevronLeft /> Summary
                  </Button>
                }
                side="left"
                content={
                  <div className='flex gap-2'>
                    <Boys /> {/* Chart component for boys */}
                    <Girls /> {/* Chart component for girls */}
                  </div>
                }
              />
            </div>
          </div>
          {/* Search input for filtering rooms */}
          <SearchItem message="Search Room" handleChange={(e) => setSearchValue(e.target.value)} />
          <div className="flex justify-start mb-2 align-bottom">
            {/* Filter buttons */}
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
          {/* Display rooms in either table or grid view based on filter */}
          {filters.listview ? (
            <RoomsTable filteredRooms={filteredRooms} />
          ) : (
            <GridView filteredRooms={filteredRooms} />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default Rooms;
