import axios, { AxiosError, AxiosResponse } from 'axios'
import { HttpMethods } from '../../types/enums/HttpMethods'

export class BaseService {
    protected getResultFromService(url: string, data: any = null) {
        return new Promise<AxiosResponse>((resolve, reject) => {
            axios({
                url,
                method: HttpMethods.Post,
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
}
