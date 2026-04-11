

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getDoctors } from '@/services/doctor.services';
import DoctorsList from '@/components/modules/Consultation/DoctorsList';

const ConsultationPage = async () => {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['doctors'],
        queryFn: () => getDoctors(),

    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            {/* Doctors List */}
            <DoctorsList></DoctorsList>
        </HydrationBoundary>
    );
};

export default ConsultationPage;