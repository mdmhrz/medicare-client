'use client'

import AppointmentBarChart from '@/components/shared/AppointmentBarChart'
import AppointmentPieChart from '@/components/shared/AppointmentPieChart'
import StatsCard from '@/components/shared/StatsCard'
import { getDashboardData } from '@/services/dashboard.services'
import { ApiResponse } from '@/types/api.types'
import { IAdminDashboardData } from '@/types/dashboard.types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AdminDashboardContent = () => {
    const { data: adminDashboardData } = useQuery({
        queryKey: ['admin-dashboard-data'],
        queryFn: getDashboardData,
        refetchOnWindowFocus: true,
    })

    const { data } = (adminDashboardData ||
        {}) as ApiResponse<IAdminDashboardData>

    // Config-driven mapping (clean + scalable)
    const stats = [
        {
            title: 'Appointments',
            value: data?.appointmentCount ?? 0,
            iconName: 'CalendarDays',
            description: 'Total scheduled',
        },
        {
            title: 'Doctors',
            value: data?.doctorCount ?? 0,
            iconName: 'Stethoscope',
            description: 'Registered doctors',
        },
        {
            title: 'Patients',
            value: data?.patientCount ?? 0,
            iconName: 'Users',
            description: 'Total patients',
        },
        {
            title: 'Admins',
            value: data?.adminCount ?? 0,
            iconName: 'Shield',
            description: 'System admins',
        },
        {
            title: 'Super Admins',
            value: data?.superAdminCount ?? 0,
            iconName: 'UserCog',
            description: 'Highest privilege',
        },
        {
            title: 'Users',
            value: data?.userCount ?? 0,
            iconName: 'User',
            description: 'All users',
        },
        {
            title: 'Payments',
            value: data?.paymentCount ?? 0,
            iconName: 'CreditCard',
            description: 'Transactions',
        },
        {
            title: 'Revenue',
            value: data?.totalRevenue ?? 0,
            iconName: 'DollarSign',
            description: 'Total earnings',
        },
    ]

    return (
        <div className='space-y-4'>
            {/* Stats */}
            <section className='space-y-4'>
                <h2 className='text-lg font-semibold'>Statistics</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <StatsCard
                            key={index}
                            title={item.title}
                            value={item.value}
                            iconName={item.iconName}
                            description={item.description}
                        />
                    ))}
                </div>
            </section>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>

                <AppointmentBarChart
                    data={data?.barChartData || []}
                />
                </div>

                <div>
                <AppointmentPieChart
                    data={data?.pieChartData || []}
                />
                </div>
            </section>

        </div>
    )
}

export default AdminDashboardContent