'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PaginationState, SortingState } from '@tanstack/react-table'

export function useTableParams() {
    const router = useRouter()
    const searchParamsObj = useSearchParams()

    const [sorting, setSorting] = React.useState<SortingState>(
        [{ id: searchParamsObj.get('sortBy') || '', desc: searchParamsObj.get('sortOrder') === 'desc' }].filter(s => s.id)
    )

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: parseInt(searchParamsObj.get('page') || '1', 10) - 1,
        pageSize: parseInt(searchParamsObj.get('limit') || '10', 10)
    })

    const [searchTerm, setSearchTerm] = React.useState(searchParamsObj.get('searchTerm') || '')

    const updateParams = (updater: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParamsObj.toString())
        updater(params)
        router.push(`?${params.toString()}`)
    }

    const handleSortingChange = (newSorting: SortingState) => {
        setSorting(newSorting)
        updateParams(params => {
            if (newSorting.length > 0) {
                params.set('sortBy', newSorting[0].id)
                params.set('sortOrder', newSorting[0].desc ? 'desc' : 'asc')
            } else {
                params.delete('sortBy')
                params.delete('sortOrder')
            }
        })
    }

    const handlePaginationChange = (newPagination: PaginationState) => {
        setPagination(newPagination)
        updateParams(params => {
            params.set('page', (newPagination.pageIndex + 1).toString())
            params.set('limit', newPagination.pageSize.toString())
        })
    }

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm)
        updateParams(params => {
            if (newSearchTerm) {
                params.set('searchTerm', newSearchTerm)
            } else {
                params.delete('searchTerm')
            }
            params.set('page', '1')
        })
    }

    return {
        sorting,
        pagination,
        searchTerm,
        handleSortingChange,
        handlePaginationChange,
        handleSearchChange
    }
}
