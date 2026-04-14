import { httpClient } from "@/lib/axios/httpClient"
import { IDoctor } from "@/types/doctor.types"

export const getDoctors = async (params?: {[key: string]: string | string[] | undefined}) => {
    try {

        console.log("Fetching doctors with params:", params)

        const doctors = await httpClient.get<IDoctor[]>('/doctors', { params })
        return doctors
    } catch (error) {
        console.log("Error fetching doctors:", error)
        throw error
    }
}