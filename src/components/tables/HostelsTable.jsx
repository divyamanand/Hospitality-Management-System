import React from 'react'
import { ColumnDef } from "@tanstack/react-table"

function HostelsTable() {

    const Payment = {
        id: 'string',
        amount: 'number',
        status: ['pending', 'processing', 'success', 'failed'],
        email: 'string'
        };
        
        const columns = [
        {
            accessorKey: 'status',
            header: 'Status'
        },
        {
            accessorKey: 'email',
            header: 'Email'
        },
        {
            accessorKey: 'amount',
            header: 'Amount'
        }
        ];
        
  return (
    <div>
      
    </div>
  )
}

export default HostelsTable
