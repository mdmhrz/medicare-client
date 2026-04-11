import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getDashboardData } from '@/services/dashboard.services';
import AdminDashboardContent from '@/components/modules/Dashboard/AdminDashboardContent';

const AdminDashbaordPage = async () => {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['admin-dashboard-data'],
        queryFn: getDashboardData,
        staleTime: 30 * 1000, // 30 seconds cashed data instead of making new request.
        gcTime: 5 * 60 * 1000 // 5 minutes - Garbage collection time, after this time the cached data will be removed from memory if its not used.
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AdminDashboardContent />
        </HydrationBoundary>
    );
};

export default AdminDashbaordPage;