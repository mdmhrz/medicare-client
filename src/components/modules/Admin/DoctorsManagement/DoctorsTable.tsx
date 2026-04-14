'use client'

import React, { useMemo, useState } from "react";
import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { getSpecialties, Specialty } from "@/services/specialty.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";
import { doctorColumns } from "./doctorsColumns";
import Filter, { FilterConfig } from "@/components/shared/filter/Filter";
import { Gender } from "@/types/doctor.types";
import Modal from "@/components/shared/modal/Modal";
import CreateDoctorForm from "./CreateDoctorForm";
import ViewDoctor from "./ViewDoctor";
import { toast } from 'sonner';
import { deleteDoctor } from '@/services/doctor.services';
import { useMutation } from '@tanstack/react-query';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DoctorsTable({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const router = useRouter();
    const searchParamsObj = useSearchParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState<IDoctor | null>(null);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [doctorToView, setDoctorToView] = useState<string | null>(null);

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

    // Fetch specialties for filter
    const { data: specialtiesResponse, isPending: isSpecialtiesLoading } = useQuery({
        queryKey: ['specialties'],
        queryFn: () => getSpecialties(),
        staleTime: 5 * 60 * 1000 // Cache for 5 minutes
    });

    const specialties = Array.isArray(specialtiesResponse) ? specialtiesResponse : specialtiesResponse?.data || [];

    // Delete doctor mutation
    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: deleteDoctor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctors'] });
            toast.success('Doctor deleted successfully!');
            setDeleteDialogOpen(false);
            setDoctorToDelete(null);
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to delete doctor';
            toast.error(errorMessage);
        }
    });

    // Initialize filter state from URL params
    const [genderFilter, setGenderFilter] = React.useState<string>(
        searchParamsObj.get('gender') || ''
    );
    const [specialtyFilter, setSpecialtyFilter] = React.useState<string[]>(
        searchParamsObj.get('specialties')?.split(',') || []
    );
    const [appointmentFeeFilter, setAppointmentFeeFilter] = React.useState<{
        operator: string;
        value: number;
    }>({
        operator: searchParamsObj.get('appointmentFee[operator]') || 'lte',
        value: parseInt(searchParamsObj.get('appointmentFee') || '0', 10)
    });

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ['doctors', searchParams],
        queryFn: () => getDoctors(searchParams)
    })

    const { data: doctors, meta } = doctorDataResponse || {};


    const handleView = (doctor: IDoctor) => {
        setDoctorToView(doctor.id.toString());
        setViewModalOpen(true);
    }

    const handleEdit = (doctor: IDoctor) => {
        setEditingDoctor(doctor);
        setIsCreateModalOpen(true);
    }

    const handleDelete = (doctor: IDoctor) => {
        setDoctorToDelete(doctor);
        setDeleteDialogOpen(true);
    }

    const handleConfirmDelete = () => {
        if (doctorToDelete) {
            deleteMutation.mutate(doctorToDelete.id.toString());
        }
    }

    const handleCreate = () => {
        setEditingDoctor(null);
        setIsCreateModalOpen(true);
    }

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        setEditingDoctor(null);
        toast.success(editingDoctor ? 'Doctor updated successfully!' : 'Doctor created successfully!');
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

    const handleFilterChange = (field: string, value: any, operator?: string) => {
        const params = new URLSearchParams(searchParamsObj.toString());

        if (field === 'gender') {
            setGenderFilter(value);
            if (value) {
                params.set('gender', value);
            } else {
                params.delete('gender');
            }
        } else if (field === 'specialties') {
            setSpecialtyFilter(value);
            if (value && value.length > 0) {
                params.set('specialties', value.join(','));
            } else {
                params.delete('specialties');
            }
        } else if (field === 'appointmentFee') {
            setAppointmentFeeFilter({
                operator: operator || 'lte',
                value: value
            });
            if (value !== undefined && value !== null && value !== 0) {
                params.set(`appointmentFee[${operator || 'lte'}]`, value.toString());
                params.delete('appointmentFee');
            } else {
                params.delete('appointmentFee[lte]');
                params.delete('appointmentFee[gt]');
                params.delete('appointmentFee[lt]');
                params.delete('appointmentFee[gte]');
            }
        }

        // Reset to first page when filtering
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handleFilterRemove = (field: string) => {
        const params = new URLSearchParams(searchParamsObj.toString());

        if (field === 'gender') {
            setGenderFilter('');
            params.delete('gender');
        } else if (field === 'specialties') {
            setSpecialtyFilter([]);
            params.delete('specialties');
        } else if (field === 'appointmentFee') {
            setAppointmentFeeFilter({ operator: 'lte', value: 0 });
            params.delete('appointmentFee[lte]');
            params.delete('appointmentFee[gt]');
            params.delete('appointmentFee[lt]');
            params.delete('appointmentFee[gte]');
        }

        // Reset to first page when removing filter
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    // Build filter configs - useMemo to ensure reactivity when specialties load
    const filterConfigs: FilterConfig[] = useMemo(() => [
        {
            type: 'single' as const,
            field: 'gender',
            label: 'Gender',
            options: [
                { value: Gender.MALE, label: 'Male' },
                { value: Gender.FEMALE, label: 'Female' },
                { value: Gender.OTHER, label: 'Other' }
            ],
            value: genderFilter
        },
        {
            type: 'multi' as const,
            field: 'specialties',
            label: 'Specialties',
            options: specialties.map(s => ({ value: s.id, label: s.title })),
            values: specialtyFilter,
            isLoading: isSpecialtiesLoading
        },
        {
            type: 'range' as const,
            field: 'appointmentFee',
            label: 'Appointment Fee',
            operator: appointmentFeeFilter.operator as any,
            value: appointmentFeeFilter.value,
            minValue: 0,
            maxValue: 10000
        }
    ], [specialties, specialtyFilter, genderFilter, appointmentFeeFilter, isSpecialtiesLoading]);

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
                filters={{
                    configs: filterConfigs,
                    onFilterChange: handleFilterChange,
                    onFilterRemove: handleFilterRemove
                }}
                onCreate={handleCreate}
                pagination={
                    meta ? {
                        state: pagination,
                        onPaginationChange: handlePaginationChange,
                        pageCount: meta.totalPages,
                        totalItems: meta.total
                    } : undefined
                }
            />
            <Modal
                open={isCreateModalOpen}
                onOpenChange={(open) => {
                    setIsCreateModalOpen(open);
                    if (!open) setEditingDoctor(null);
                }}
                title={editingDoctor ? "Edit Doctor" : "Create New Doctor"}
            >
                <CreateDoctorForm onSuccess={handleCreateSuccess} doctor={editingDoctor} />
            </Modal>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the doctor
                            {doctorToDelete && ` "${doctorToDelete.name}"`} from the system.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* View Doctor Modal */}
            <Modal
                open={viewModalOpen}
                onOpenChange={(open) => {
                    setViewModalOpen(open);
                    if (!open) setDoctorToView(null);
                }}
                title="Doctor Details"
            >
                {doctorToView && <ViewDoctor doctorId={doctorToView} />}
            </Modal>
        </div>
    )
}