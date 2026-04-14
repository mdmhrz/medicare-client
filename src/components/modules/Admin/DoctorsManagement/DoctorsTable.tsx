'use client'

import React from "react";
import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
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

    // Initialize pagination state from URL params (TanStack Table uses 0-based pageIndex)
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: parseInt(searchParamsObj.get('page') || '1', 10) - 1,
        pageSize: parseInt(searchParamsObj.get('limit') || '10', 10)
    });

    // Initialize search state from URL params
    const [searchTerm, setSearchTerm] = React.useState(searchParamsObj.get('searchTerm') || '');

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ['doctors', searchParams],
        queryFn: () => getDoctors(searchParams)
    })

    const { data: doctors, meta } = doctorDataResponse || {};


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

    const handlePaginationChange = (newPagination: PaginationState) => {
        setPagination(newPagination);

        // Update URL params (convert 0-based pageIndex to 1-based page)
        const params = new URLSearchParams(searchParamsObj.toString());
        params.set('page', (newPagination.pageIndex + 1).toString());
        params.set('limit', newPagination.pageSize.toString());
        router.push(`?${params.toString()}`);
    };

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm);

        // Update URL params
        const params = new URLSearchParams(searchParamsObj.toString());
        if (newSearchTerm) {
            params.set('searchTerm', newSearchTerm);
        } else {
            params.delete('searchTerm');
        }

        // Reset to first page when searching
        params.set('page', '1');
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
                search={{
                    value: searchTerm,
                    onChange: handleSearchChange,
                    placeholder: "Search doctors..."
                }}
                pagination={
                    meta ? {
                        state: pagination,
                        onPaginationChange: handlePaginationChange,
                        pageCount: meta.totalPages,
                        totalItems: meta.total
                    } : undefined
                }
            />
        </div>
    )
}