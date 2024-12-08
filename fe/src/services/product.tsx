import { AxiosResponse } from "axios";
import { TProduct } from "../common/types/product";
import instance from "../configs/axios";

// Get All
export const getProducts = async (params?: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/products/`, { params })

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
export const getProductById = async (id: any): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.get(`/products/${id}`)

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
export const removeProductById = async (product: TProduct): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.delete(`/products/${product._id}`)

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
export const createProduct = async (product: TProduct): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.post(`/products`, product)

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
export const updateProductById = async (product: TProduct): Promise<AxiosResponse<any>> => {
    try {
        const response = await instance.put(`/products/${product._id}`, product)

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