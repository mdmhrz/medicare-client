import { httpClient } from "@/lib/axios/httpClient"
import { IDoctor } from "@/types/doctor.types"
import { ICreateDoctorPayload, IUpdateDoctorPayload } from "@/zod/doctor.validation"

export const getDoctors = async (params?: { [key: string]: string | string[] | undefined }) => {
    try {

        console.log("Fetching doctors with params:", params)

        const doctors = await httpClient.get<IDoctor[]>('/doctors', { params })
        return doctors
    } catch (error) {
        console.log("Error fetching doctors:", error)
        throw error
    }
}

export const createDoctor = async (payload: ICreateDoctorPayload) => {
    try {
        console.log("Creating doctor with payload:", payload)
        const response = await httpClient.post('/users/create-doctor', payload)
        return response.data
    } catch (error) {
        console.log("Error creating doctor:", error)
        throw error
    }
}

export const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
    try {
        console.log("Updating doctor with id:", id, "payload:", payload)
        const response = await httpClient.patch(`/doctors/${id}`, payload)
        return response.data
    } catch (error) {
        console.log("Error updating doctor:", error)
        throw error
    }
}

export const deleteDoctor = async (id: string) => {
    try {
        console.log("Deleting doctor with id:", id)
        const response = await httpClient.delete(`/doctors/${id}`)
        return response.data
    } catch (error) {
        console.log("Error deleting doctor:", error)
        throw error
    }
}

export const getDoctorById = async (id: string) => {
    try {
        console.log("Fetching doctor with id:", id)
        const response = await httpClient.get(`/doctors/${id}`)
        console.log("API Response:", response.data)
        // Return the data directly - httpClient might already unwrap the response
        return response.data
    } catch (error) {
        console.error("Error fetching doctor:", error)
        throw error
    }
}