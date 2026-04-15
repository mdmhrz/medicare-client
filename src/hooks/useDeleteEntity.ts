/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface UseDeleteEntityOptions<T> {
    mutationFn: (id: string) => Promise<any>
    queryKey: string
    successMessage?: string
    getId: (item: T) => string
    errorMessage?: string
}

export function useDeleteEntity<T extends { name?: string }>({
    mutationFn,
    queryKey,
    successMessage = 'Deleted successfully!',
    getId,
    errorMessage = 'Failed to delete'
}: UseDeleteEntityOptions<T>) {
    const queryClient = useQueryClient()
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<T | null>(null)

    const deleteMutation = useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            toast.success(successMessage)
            setDeleteDialogOpen(false)
            setItemToDelete(null)
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.message || error?.message || errorMessage
            toast.error(msg)
        }
    })

    const handleDelete = (item: T) => {
        setItemToDelete(item)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = () => {
        if (itemToDelete) {
            deleteMutation.mutate(getId(itemToDelete))
        }
    }

    return {
        deleteDialogOpen,
        setDeleteDialogOpen,
        itemToDelete,
        handleDelete,
        handleConfirmDelete,
        isDeleting: deleteMutation.isPending
    }
}
