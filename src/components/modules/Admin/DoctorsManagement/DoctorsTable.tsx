'use client'

import React from "react";
import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { SortingState } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { doctorColumns } from "./doctorsColumns";


export default function DoctorsTable({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const router = useRouter();
    const searchParamsObj = useSearchParams();

    // Initialize sorting state from URL params
    const [sorting, setSorting] = React.useState<SortingState>([
        {
            id: searchParamsObj.get('sortBy') || '',
            desc: searchParamsObj.get('sortOrder') === 'desc'
        }
    ].filter(s => s.id));

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ['doctors', searchParams],
        queryFn: () => getDoctors(searchParams)
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

    const handleSortingChange = (newSorting: SortingState) => {
        setSorting(newSorting);

        // Update URL params
        const params = new URLSearchParams(searchParamsObj.toString());

        if (newSorting.length > 0) {
            params.set('sortBy', newSorting[0].id);
            params.set('sortOrder', newSorting[0].desc ? 'desc' : 'asc');
        } else {
            params.delete('sortBy');
            params.delete('sortOrder');
        }

        router.push(`?${params.toString()}`);
    };

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
                sorting={{
                    state: sorting,
                    onSortingChange: handleSortingChange
                }}
            />
        </div>
    )
}