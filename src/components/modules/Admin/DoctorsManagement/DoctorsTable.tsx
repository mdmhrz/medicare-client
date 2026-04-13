'use client'

import DataTable from "@/components/shared/table/DataTable";
import { Table, TableBody, TableHeader, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { doctorColumns } from "./doctorsColumns";


export default function DoctorsTable() {

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getDoctors()
    })

    const { data: doctors } = doctorDataResponse || {};


    const handleView = (doctor: IDoctor) => {
        console.log(doctor);
    }

    const handleEdit = (doctor: IDoctor) => {
        console.log(doctor);
    }

    const handleDelete = (doctor: IDoctor) => {
        console.log(doctor);
    }

    


    const { getHeaderGroups, getRowModel } = useReactTable({
        data: doctors || [],
        columns: doctorColumns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div>
            <DataTable
                data={doctors || []}
                columns={doctorColumns}
                isLoading={isLoading}
                emptyMessage="No doctors found"
                actions={{
                    onView: handleView,
                    onEdit: handleEdit,
                    onDelete: handleDelete
                }}
            />
        </div>
    )
}