import { getDoctors } from "@/services/doctor.services";
import { QueryClient } from "@tanstack/react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import DoctorsTable from "@/components/modules/Admin/DoctorsManagement/DoctorsTable";


export default async function DoctorsManagementPage() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['doctors'],
        queryFn: getDoctors,
        staleTime: 1000 * 30 * 60 * 60, // 30 minutes cashed data instead of making new request.
        gcTime: 1000 * 60 * 60 * 6 // 6 hours - Garbage collection time, after this time the cached data will be removed from memory if its not used.
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            {/* Doctors List */}
            <DoctorsTable />
        </HydrationBoundary>
    )
}