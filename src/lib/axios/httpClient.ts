import { ApiResponse } from "@/types/api.types";
import axios from "axios"
import { isTokenExpiringSoon } from "../tokenUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in evironment variables")
}

const getCookie = (name: string): string | undefined => {
    if (typeof document === 'undefined') return undefined;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
};

const getAllCookies = (): string => {
    if (typeof document === 'undefined') return '';
    return document.cookie;
};

const axiosInstance = async () => {
    const refreshToken = getCookie("refreshToken");
    const accessToken = getCookie("accessToken");

    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true
    })

    return instance;
}


export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}


const httpGet = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.get<ApiResponse<TData>>(endpoint, options);
        return response.data;
    } catch (error) {
        console.log(`Get request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPost = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.post<ApiResponse<TData>>(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Post request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPut = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.put<ApiResponse<TData>>(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Put request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPatch = async <TData>(endpoint: string, data: unknown, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.patch<ApiResponse<TData>>(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Patch request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpDelete = async <TData>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<TData>> => {
    try {
        const instance = await axiosInstance();
        const response = await instance.delete<ApiResponse<TData>>(endpoint, options);
        return response.data;
    } catch (error) {
        console.log(`Delete request to ${endpoint} failed: ${error}`);
        throw error;
    }
}


export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
    patch: httpPatch
}