import React, { useState, useEffect } from 'react';
import RoomsTable from '@/components/tables/RoomsTable';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, LayoutGridIcon, ListIcon, PlusIcon } from 'lucide-react';
import SearchItem from '@/components/features/SearchItem';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import GridView from '@/components/features/GridView';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useData } from '@/data/useData';
import { getRoomsList, getHostelsList } from '@/data/rooomsData';
import PopCard from '@/components/features/PopCard';
import {convertRoomsData } from '@/data/dashboardData';
import Boys from '@/components/charts/Boys';
import Girls from '@/components/charts/Girls';

function Rooms() {
  const {allotment, selectHostel, notification} = useData()
  
  const [filters, setFilters] = useState({
    listview: false,
    available: false,
    Occupied: false,
    partially: false,
  });

  const [listOfHostels, setHostelsList] = useState([])
  
  const [listValue, setListValue] = useState(null);
  const [roomsList, setRoomsList] = useState([])

  useEffect(() => {
    const list = getHostelsList(allotment)
    setHostelsList(list);
    if (selectHostel) {setListValue(selectHostel)
    }else {
  setListValue(list[0])
}
  }, [allotment, selectHostel])

  useEffect(() => {
    const roomsList = getRoomsList(allotment, listValue)
    setRoomsList(roomsList)
  }, [listValue, allotment])

  
  const [filteredRooms, setfilteredRooms] = useState(roomsList);
  const [filteredHostelsList, setfilteredHostelsList] = useState(listOfHostels);
  const [searchValue, setSearchValue] = useState('');
  const [listSearchValue, setListSearchValue] = useState('');

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
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy/value.Capacity)*100 === 100);
    } else if (filters.Occupied) {
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy/value.Capacity)*100 === 0);
    } else if (filters.partially) {
      updatedRooms = updatedRooms.filter((value) => (value.Vacancy/value.Capacity)*100 > 0 && (value.Vacancy/value.Capacity)*100 < 100);
    }

    setfilteredRooms(updatedRooms);
    setfilteredHostelsList(updatedHostelsList);

  }, [searchValue, filters, listSearchValue, listValue, listOfHostels, roomsList]);


  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="gap-6">
        <ResizablePanel defaultSize={15}>
          <div className="p-4">
            <ScrollArea className="h-screen rounded-md">
              <SearchItem message='Search' handleChange={(e) => setListSearchValue(e.target.value)} />
                {filteredHostelsList.map((hostel, index) => (
                  <Button key={index} value={hostel} 
                  onClick={() => setListValue(hostel)} variant="secondary"
                  className={`my-1 ${listValue===hostel? "bg-secondary" : "bg-transparent"}`}>
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
              <Boys/>
              <Girls/>
              </div>
            }
          />
        </div>
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
