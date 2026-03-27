import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined in evironment variables")
}

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
            "Content-Type": "application/json"
        }
    })

    return instance;
}


export interface ApiRequestOptions {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}


const httpGet = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().get(endpoint, options);
        return response.data;
    } catch (error) {
        console.log(`Get request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPost = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().post(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Post request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPut = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().put(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Put request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpPatch = async (endpoint: string, data: unknown, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().patch(endpoint, data, options);
        return response.data;
    } catch (error) {
        console.log(`Patch request to ${endpoint} failed: ${error}`);
        throw error;
    }
}

const httpDelete = async (endpoint: string, options?: ApiRequestOptions) => {
    try {
        const response = await axiosInstance().delete(endpoint, options);
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