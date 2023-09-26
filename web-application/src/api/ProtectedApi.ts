import axios, { AxiosError, AxiosResponse } from 'axios'
import ApiConstants from '../constants/ApiConstants'
import BrowserLocalStorage from '../utils/localStorage/BrowserLocalStorage'

export const protectedApiAsync = (
    method: string,
    version: string,
    url: string,
    data?: JSON
) => {
    return new Promise<AxiosResponse>((resolve, reject) => {
        const token = BrowserLocalStorage.GetAccessToken()

        axios({
            url: `${ApiConstants.BASE_LOCAL_API_URL}/${version}/${url}`,
            method,
            headers: {
                Authorization: 'Bearer ' + token,
            },
            data,
        })
            .then((res: AxiosResponse) => resolve(res))
            .catch((err: AxiosError) => reject(err))
    })
}
