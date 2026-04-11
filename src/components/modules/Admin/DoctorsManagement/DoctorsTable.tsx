'use client'

import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";


export default function DoctorsTable() {

    const { data: doctorDataResponse } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getDoctors()
    })

    const { data: doctors } = doctorDataResponse || {};

    const doctorColumns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "specialization", header: "Specialization" },
        { accessorKey: "experience", header: "Experience" },
        { accessorKey: "rating", header: "Rating" }
    ]


    const { getHeaderGroups, getRowModel } = useReactTable({
        data: doctors || [],
        columns: doctorColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <Table>
                <TableHeader>
                    {getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}