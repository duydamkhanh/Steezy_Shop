import { TAuth } from "../common/types/auth";
import instance from "../configs/axios";


const register = async (data: TAuth) => {
    try {
        const res = await instance.post('/auth/register', data);

        return res;
    } catch (error) {
        return {
            data: null,
            status: 500,
            statusText: error,
            headers: {},
            config: {} as any,
        }
    }
}

const login = async (data: TAuth) => {
    try {
        const res = await instance.post('/auth/login', data);

        return res;
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

export { register, login }