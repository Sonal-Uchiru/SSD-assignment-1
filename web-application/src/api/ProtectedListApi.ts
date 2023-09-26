import axios, { AxiosError, AxiosResponse } from 'axios'
import ApiConstants from '../constants/ApiConstants'
import { HttpMethods } from '../types/enums/HttpMethods'
import BrowserLocalStorage from '../utils/localStorage/BrowserLocalStorage'

export const protectedListApiAsync = (
    version: string,
    url: string,
    custom = '',
    includePaginations = false,
    limit = 100,
    offset = 0,
    sort = 'desc'
) => {
    return new Promise<AxiosResponse>((resolve, reject) => {
        let apiUrl = `${ApiConstants.BASE_LOCAL_API_URL}/${version}/${url}/list${custom}`

        if (includePaginations) {
            apiUrl += `?limit=${limit}&offset=${offset}&sort=${sort}`
        }

        const token = BrowserLocalStorage.GetAccessToken()

        axios({
            url: apiUrl,
            method: HttpMethods.Get,
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res: AxiosResponse) => resolve(res))
            .catch((err: AxiosError) => reject(err))
    })
}
