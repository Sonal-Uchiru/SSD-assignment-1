import axios, { AxiosError, AxiosResponse } from 'axios'
import ApiConstants from '../constants/ApiConstants'

export const unProtectedApiAsync = (
    method: string,
    version: string,
    url: string,
    data?: JSON
) => {
    return new Promise<AxiosResponse>((resolve, reject) => {
        axios({
            url: `${ApiConstants.BASE_CLOUD_API_URL}/${version}/${ApiConstants.PUBLIC_URL}/${url}`,
            method,
            data,
        })
            .then((res: AxiosResponse) => {
                resolve(res)
            })
            .catch((err: AxiosError) => {
                reject(err)
            })
    })
}
