'use server'

import { httpClient } from "@/lib/axios/httpClient"

interface IDoctor {
    id: string;
    name: string;
    email: string;
    specialization: string;
    experience: number;
    rating: number;

}

export const getDoctors = async () => {
    const doctors = await httpClient.get<IDoctor[]>('/doctors')
    return doctors
}