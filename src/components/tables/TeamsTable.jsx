import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { ScrollArea } from '../ui/scroll-area'

function TeamsTable() {
  return (
    <ScrollArea>
    <div className="border-2 rounded-lg w-min h-min">
      <Table>
        <TableHeader>
          <TableRow className="border-t border-b">
            <TableHead className="w-[100px] text-left">Team Id</TableHead>
            <TableHead className="text-right">Members</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-t border-b">
            <TableCell className="font-medium">12332423</TableCell>
            <TableCell className="text-right">4</TableCell>
          </TableRow>
          <TableRow className="border-t border-b">
            <TableCell className="font-medium">12332424</TableCell>
            <TableCell className="text-right">3</TableCell>
          </TableRow>
          <TableRow className="border-t border-b">
            <TableCell className="font-medium">12332423</TableCell>
            <TableCell className="text-right">4</TableCell>
          </TableRow>
          
        </TableBody>
      </Table>
    </div>
    </ScrollArea>
  )
}

export default TeamsTable
