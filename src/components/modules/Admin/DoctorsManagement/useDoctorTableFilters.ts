'use client'

import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSpecialties } from '@/services/specialty.services'
import { Gender } from '@/types/doctor.types'
import { FilterConfig, FilterOperator } from '@/components/shared/filter/Filter'

const APPOINTMENT_FEE_OPERATORS: FilterOperator[] = ['lte', 'gt', 'lt', 'gte']

const getAppointmentFeeStateFromParams = (params: URLSearchParams) => {
    const operator = APPOINTMENT_FEE_OPERATORS.find((op) => params.has(`appointmentFee[${op}]`)) || 'lte'
    const rawValue = params.get(`appointmentFee[${operator}]`) || '0'
    const value = Number.parseInt(rawValue, 10)

    return {
        operator,
        value: Number.isNaN(value) ? 0 : value,
    }
}

export function useDoctorTableFilters() {
    const router = useRouter()
    const searchParamsObj = useSearchParams()

    const [genderFilter, setGenderFilter] = useState<string>(searchParamsObj.get('gender') || '')
    const [specialtyFilter, setSpecialtyFilter] = useState<string[]>(
        searchParamsObj.get('specialties')?.split(',') || []
    )
    const [appointmentFeeFilter, setAppointmentFeeFilter] = useState(getAppointmentFeeStateFromParams(searchParamsObj))

    const { data: specialtiesResponse, isPending: isSpecialtiesLoading } = useQuery({
        queryKey: ['specialties'],
        queryFn: () => getSpecialties(),
        staleTime: 5 * 60 * 1000,
    })

    const specialties = Array.isArray(specialtiesResponse) ? specialtiesResponse : specialtiesResponse?.data || []

    const handleFilterChange = useCallback((field: string, value: any, operator?: FilterOperator) => {
        const params = new URLSearchParams(searchParamsObj.toString())

        if (field === 'gender') {
            setGenderFilter(value)
            value ? params.set('gender', value) : params.delete('gender')
        }

        if (field === 'specialties') {
            setSpecialtyFilter(value)
            value?.length > 0 ? params.set('specialties', value.join(',')) : params.delete('specialties')
        }

        if (field === 'appointmentFee') {
            const selectedOperator = operator || 'lte'
            const parsedValue = Number(value)
            const normalizedValue = Number.isNaN(parsedValue) ? 0 : parsedValue

            setAppointmentFeeFilter({ operator: selectedOperator, value: normalizedValue })
            APPOINTMENT_FEE_OPERATORS.forEach((op) => params.delete(`appointmentFee[${op}]`))

            if (normalizedValue !== 0) {
                params.set(`appointmentFee[${selectedOperator}]`, normalizedValue.toString())
            }
        }

        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }, [router, searchParamsObj])

    const handleFilterRemove = useCallback((field: string) => {
        const params = new URLSearchParams(searchParamsObj.toString())

        if (field === 'gender') {
            setGenderFilter('')
            params.delete('gender')
        }

        if (field === 'specialties') {
            setSpecialtyFilter([])
            params.delete('specialties')
        }

        if (field === 'appointmentFee') {
            setAppointmentFeeFilter({ operator: 'lte', value: 0 })
            APPOINTMENT_FEE_OPERATORS.forEach((op) => params.delete(`appointmentFee[${op}]`))
        }

        params.set('page', '1')
        router.push(`?${params.toString()}`)
    }, [router, searchParamsObj])

    const filterConfigs: FilterConfig[] = useMemo(() => [
        {
            type: 'single',
            field: 'gender',
            label: 'Gender',
            options: [
                { value: Gender.MALE, label: 'Male' },
                { value: Gender.FEMALE, label: 'Female' },
                { value: Gender.OTHER, label: 'Other' },
            ],
            value: genderFilter,
        },
        {
            type: 'multi',
            field: 'specialties',
            label: 'Specialties',
            options: specialties.map((specialty) => ({ value: specialty.id, label: specialty.title })),
            values: specialtyFilter,
            isLoading: isSpecialtiesLoading,
        },
        {
            type: 'range',
            field: 'appointmentFee',
            label: 'Appointment Fee',
            operator: appointmentFeeFilter.operator,
            value: appointmentFeeFilter.value,
            minValue: 0,
            maxValue: 10000,
        },
    ], [appointmentFeeFilter, genderFilter, isSpecialtiesLoading, specialties, specialtyFilter])

    return {
        filterConfigs,
        handleFilterChange,
        handleFilterRemove,
    }
}