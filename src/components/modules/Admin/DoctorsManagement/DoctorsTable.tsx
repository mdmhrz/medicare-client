'use client'

import React, { useState } from "react";
import DataTable from "@/components/shared/table/DataTable";
import { getDoctors } from "@/services/doctor.services";
import { IDoctor } from "@/types/doctor.types";
import { useQuery } from "@tanstack/react-query";
import { doctorColumns } from "./doctorsColumns";
import { toast } from 'sonner';
import { deleteDoctor } from '@/services/doctor.services';
import { useTableParams } from "@/hooks/useTableParams";
import { useDeleteEntity } from "@/hooks/useDeleteEntity";
import { useCrudModal } from "@/hooks/useCrudModal";
import { useDoctorTableFilters } from "./useDoctorTableFilters";
import DoctorsTableModals from "./DoctorsTableModals";

export default function DoctorsTable({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const { sorting, pagination, searchTerm, handleSortingChange, handlePaginationChange, handleSearchChange } = useTableParams();
    const { filterConfigs, handleFilterChange, handleFilterRemove } = useDoctorTableFilters();

    const { isModalOpen, setIsModalOpen, editingItem: editingDoctor, handleCreate, handleEdit, handleClose } = useCrudModal<IDoctor>();

    const { deleteDialogOpen, setDeleteDialogOpen, itemToDelete: doctorToDelete, handleDelete, handleConfirmDelete, isDeleting } = useDeleteEntity<IDoctor>({
        mutationFn: deleteDoctor,
        queryKey: 'doctors',
        successMessage: 'Doctor deleted successfully!',
        getId: (doctor) => doctor.id.toString()
    });

    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [doctorToView, setDoctorToView] = useState<string | null>(null);

    const { data: doctorDataResponse, isLoading } = useQuery({
        queryKey: ['doctors', searchParams],
        queryFn: () => getDoctors(searchParams)
    });
    const { data: doctors, meta } = doctorDataResponse || {};

    const handleView = (doctor: IDoctor) => {
        setDoctorToView(doctor.id.toString());
        setViewModalOpen(true);
    };

    const handleCreateSuccess = () => {
        handleClose();
        toast.success(editingDoctor ? 'Doctor updated successfully!' : 'Doctor created successfully!');
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
                sorting={{ state: sorting, onSortingChange: handleSortingChange }}
                search={{ value: searchTerm, onChange: handleSearchChange, placeholder: "Search doctors..." }}
                filters={{ configs: filterConfigs, onFilterChange: handleFilterChange, onFilterRemove: handleFilterRemove }}
                onCreate={handleCreate}
                createButtonLabel="Create Doctor"
                pagination={meta ? {
                    state: pagination,
                    onPaginationChange: handlePaginationChange,
                    pageCount: meta.totalPages,
                    totalItems: meta.total
                } : undefined}
            />

            <DoctorsTableModals
                isCrudModalOpen={isModalOpen}
                setIsCrudModalOpen={setIsModalOpen}
                editingDoctor={editingDoctor}
                onCloseCrudModal={handleClose}
                onCreateSuccess={handleCreateSuccess}
                deleteDialogOpen={deleteDialogOpen}
                setDeleteDialogOpen={setDeleteDialogOpen}
                onConfirmDelete={handleConfirmDelete}
                isDeleting={isDeleting}
                doctorToDelete={doctorToDelete}
                viewModalOpen={viewModalOpen}
                setViewModalOpen={setViewModalOpen}
                doctorToView={doctorToView}
                clearDoctorToView={() => setDoctorToView(null)}
            />
        </div>
    )
}