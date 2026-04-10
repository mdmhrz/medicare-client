/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { getDoctors } from '@/app/(commonLayout)/consultation/doctor/_actions';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const DoctorsList = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getDoctors()
    });

    console.log(data);

    if (isLoading) return <Loading></Loading>;
    if (!data?.data) return <div>No doctors found</div>;

    return (
        <div>
            Doctors list
            {(data.data as any[]).map((doctor: any) => (
                <div key={doctor.id}>
                    {doctor.name}
                </div>
            ))}
        </div>
    );
};

export default DoctorsList;