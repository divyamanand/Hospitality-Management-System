import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import PopCard from '../features/PopCard';
import TeamsPopup from './TeamsPopup';
import Input from '../ui/input';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';


function RoomsTable({ filteredHostels}) {
  const [listHostels, setListHostels] = useState(filteredHostels);
  const [current, setCurrent] = useState(1);
  const [length, setLength] = useState(10)

  const totalPages = Math.ceil(filteredHostels.length / length);

  const getStatus = (val) => {
    const statusValue = (val.vacant / val.capacity) * 100;
    if (statusValue === 100) {
      return <Badge className="bg-green-800 hover:bg-green-800/80">Empty</Badge>;
    } else if (statusValue === 0) {
      return <Badge variant="destructive">Occupied</Badge>;
    } else {
      return <Progress value={statusValue} />;
    }
  };

  useEffect(() => {
    const startIdx = (current - 1) * length;
    const endIdx = Math.min(startIdx + length, filteredHostels.length);
    setListHostels(filteredHostels.slice(startIdx, endIdx));
  }, [current, length, filteredHostels]);

  return (
    <>
      <div className="border-2 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Room</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Vacant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listHostels.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.room}</TableCell>
                <TableCell>{val.capacity}</TableCell>
                <TableCell>{val.vacant}</TableCell>
                <TableCell className="flex">
                {getStatus(val)}
                </TableCell>
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
        <Input className="w-10" value={length} onChange={(e) => setLength(Math.min(e.target.value,filteredHostels.length))}/>
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
