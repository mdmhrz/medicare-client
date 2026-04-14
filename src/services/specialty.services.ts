import { httpClient } from "@/lib/axios/httpClient"

export interface Specialty {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    deletedAt: string | null;
}

export const getSpecialties = async () => {
    try {
        console.log("Fetching specialties")
        const response = await httpClient.get<{ success: boolean; message: string; data: Specialty[] }>('/specialties')
        return response.data
    } catch (error) {
        console.log("Error fetching specialties:", error)
        throw error
    }
}
