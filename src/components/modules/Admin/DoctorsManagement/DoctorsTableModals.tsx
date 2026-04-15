'use client'

import Modal from '@/components/shared/modal/Modal'
import DeleteConfirmDialog from '@/components/shared/DeleteConfirmDialog'
import { IDoctor } from '@/types/doctor.types'
import CreateDoctorForm from './CreateDoctorForm'
import ViewDoctor from './ViewDoctor'

interface DoctorsTableModalsProps {
    isCrudModalOpen: boolean
    setIsCrudModalOpen: (open: boolean) => void
    editingDoctor: IDoctor | null
    onCloseCrudModal: () => void
    onCreateSuccess: () => void
    deleteDialogOpen: boolean
    setDeleteDialogOpen: (open: boolean) => void
    onConfirmDelete: () => void
    isDeleting: boolean
    doctorToDelete: IDoctor | null
    viewModalOpen: boolean
    setViewModalOpen: (open: boolean) => void
    doctorToView: string | null
    clearDoctorToView: () => void
}

export default function DoctorsTableModals({
    isCrudModalOpen,
    setIsCrudModalOpen,
    editingDoctor,
    onCloseCrudModal,
    onCreateSuccess,
    deleteDialogOpen,
    setDeleteDialogOpen,
    onConfirmDelete,
    isDeleting,
    doctorToDelete,
    viewModalOpen,
    setViewModalOpen,
    doctorToView,
    clearDoctorToView,
}: DoctorsTableModalsProps) {
    return (
        <>
            <Modal
                open={isCrudModalOpen}
                onOpenChange={(open) => {
                    setIsCrudModalOpen(open)
                    if (!open) onCloseCrudModal()
                }}
                title={editingDoctor ? 'Edit Doctor' : 'Create New Doctor'}
            >
                <CreateDoctorForm onSuccess={onCreateSuccess} doctor={editingDoctor} />
            </Modal>

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={onConfirmDelete}
                isPending={isDeleting}
                entityLabel="doctor"
                entityName={doctorToDelete?.name}
            />

            <Modal
                open={viewModalOpen}
                onOpenChange={(open) => {
                    setViewModalOpen(open)
                    if (!open) clearDoctorToView()
                }}
                title="Doctor Details"
            >
                {doctorToView && <ViewDoctor doctorId={doctorToView} />}
            </Modal>
        </>
    )
}