import { convertTeamsData } from '@/data/dashboardData'; // Function for converting team data
import { useData } from '@/data/useData'; // Custom hook for managing data state
import React from 'react'; // Import React
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // UI components for table
import { ScrollArea } from '@radix-ui/react-scroll-area'; // Component for scrollable area

function UnallocatedTable() {
  const { allotment } = useData(); // Destructure allotment from the custom hook
  const { boysData, girlsData } = convertTeamsData(allotment); // Convert allotment data into boysData and girlsData

  return (
    <div className="border-2 rounded-lg">
      {/* Scrollable area to contain the table */}
      <ScrollArea className='max-h-[50vh]'>
        <Table>
          <TableHeader>
            <TableRow>
              {/* Table header with columns */}
              <TableHead className="w-[100px]">Group ID</TableHead> {/* Column for Group ID */}
              <TableHead>Gender</TableHead> {/* Column for Gender */}
              <TableHead>Members Unallocated</TableHead> {/* Column for Unallocated Members */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Map through boysData to create rows */}
            {boysData.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.groupID}</TableCell> {/* Display Group ID */}
                <TableCell>Boy</TableCell> {/* Display Gender */}
                <TableCell className="text-right">{val.boys - val.allotted}</TableCell> {/* Display Unallocated Members */}
              </TableRow>
            ))}
            {/* Map through girlsData to create rows */}
            {girlsData.map((val, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{val.groupID}</TableCell> {/* Display Group ID */}
                <TableCell>Girl</TableCell> {/* Display Gender */}
                <TableCell className="text-right">{parseInt(val.girls) - val.allotted}</TableCell> {/* Display Unallocated Members */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default UnallocatedTable;
