import { AxiosResponse } from "axios";
import instance from "../configs/axios"
import { TCategoty } from "../common/types/category";

// Get All
export const getCategories = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/categories/`, { params })

        return response;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

// Get one
export const getCategoryById = async (id: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/categories/${id}`)

        return response;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

// Remove
export const removeCategoryById = async (category: TCategoty): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.delete(`/categories/${category._id}`)

        return response;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

// Update
export const updateCategoryById = async (category: TCategoty): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.put(`/categories/${category._id}`, category)

        return response;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

// Create
export const createCategory = async (category: TCategoty): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.post(`/categories`, category)

        return response;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}