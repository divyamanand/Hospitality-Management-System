import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // UI components for table
import { Button } from '@/components/ui/button'; // UI component for buttons
import PopCard from '../features/PopCard'; // Component for pop-up cards
import Input from '../ui/input'; // UI component for input fields
import { Progress } from '../ui/progress'; // UI component for progress bars
import { Badge } from '../ui/badge'; // UI component for badges
import { ScrollArea } from '../ui/scroll-area'; // UI component for scrollable areas

function RoomsTable({ filteredRooms }) {
  const [listRooms, setListRooms] = useState(filteredRooms); // State to store the current page of rooms
  const [current, setCurrent] = useState(1); // Current page number
  const [length, setLength] = useState(10); // Number of rooms per page

  const totalPages = Math.ceil(filteredRooms.length / length); // Total number of pages

  // Function to get the status badge or progress for a room
  const getStatus = (val) => {
    const statusValue = (val.Vacancy / val.Capacity) * 100;
    if (statusValue === 100) {
      return <Badge className="bg-green-800 hover:bg-green-800/80 w-full">Empty</Badge>;
    } else if (statusValue === 0) {
      return <Badge variant="destructive" className="w-full">Occupied</Badge>;
    } else {
      return <Progress value={statusValue} />;
    }
  };

  // Effect to handle pagination
  useEffect(() => {
    const startIdx = (current - 1) * length;
    const endIdx = Math.min(startIdx + length, filteredRooms.length);
    setListRooms(filteredRooms.slice(startIdx, endIdx));
  }, [current, length, filteredRooms]);

  return (
    <>
      <div className="border-2 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Vacancy</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listRooms?.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.roomNumber}</TableCell>
                <TableCell>{val.Capacity}</TableCell>
                <TableCell>{val.Vacancy}</TableCell>
                <TableCell className="flex w-[70%]">
                  {getStatus(val)}
                </TableCell>
                <TableCell className="text-right font-bold text-xs">
                  <PopCard
                    trigger={
                      <Button variant="link" className="w-min h-min text-xs">
                        View Details <ChevronDown />
                      </Button>
                    }
                    side="left"
                    content={
                      <ScrollArea className="max-h-[40vh] overflow-y-auto min-h-min w-max">
                        {val.Teams.map((team, index) => (
                          <div key={index} className="flex gap-4 py-1">
                            <Badge>{team["Group ID"]}</Badge>
                            <h4 className="font-semibold">{team.Members} Members</h4>
                          </div>
                        ))}
                      </ScrollArea>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='flex items-center gap-3 justify-end my-3 mx-auto'>
        <h4>Max</h4>
        <Input className="w-10" value={length} onChange={(e) => setLength(Math.min(e.target.value, filteredRooms.length))} />
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9"
          onClick={() => setCurrent(current - 1)}
          disabled={current <= 1}
        >
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

export default RoomsTable;
