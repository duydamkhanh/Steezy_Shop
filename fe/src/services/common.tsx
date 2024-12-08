import { AxiosResponse } from "axios";
import instance from "../configs/axios";
import moment from "moment-timezone";

export const remove = async (endPoint: string, params: any): Promise<AxiosResponse<any>> => {
    try {
        
        const result = await instance.delete(`${endPoint}/${params._id}`)

        if(result.status !== 200) {
            return result
        }
        
        return result
            

    } catch (error) {
        console.error(error);

        return {
            data: null,
            status: 500,
            statusText: 'Internal Server Error',
            headers: {},
            config: {} as any,
        }
    }
}

export const convertTimestampToGMT7 = (timestamp: string) => {
    const time = moment(timestamp).tz('Asia/Bangkok').format('DD-MM-YYYY | HH:mm:ss');
    
    return time;
}