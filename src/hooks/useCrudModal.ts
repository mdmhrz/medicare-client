'use client'

import { useState } from 'react'

export function useCrudModal<T>() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingItem, setEditingItem] = useState<T | null>(null)

    const handleCreate = () => {
        setEditingItem(null)
        setIsModalOpen(true)
    }

    const handleEdit = (item: T) => {
        setEditingItem(item)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setEditingItem(null)
    }

    return {
        isModalOpen,
        setIsModalOpen,
        editingItem,
        handleCreate,
        handleEdit,
        handleClose
    }
}
