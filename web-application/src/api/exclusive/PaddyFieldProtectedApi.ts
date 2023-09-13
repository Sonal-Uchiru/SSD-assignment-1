import { AxiosResponse } from 'axios'
import ModelConstants from '../../constants/ModelConstants'
import { HttpMethods } from '../../types/enums/HttpMethods'
import { Versions } from '../../types/enums/Versions'
import { protectedApiAsync } from '../ProtectedApi'
import { protectedListApiAsync } from '../ProtectedListApi'

class PaddyFieldProtectedApi {
    public async saveAsync(data: any): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Post,
            Versions.V1,
            ModelConstants.PADDY_FIELDS,
            data
        )
    }
    public async deleteAsync(id: string): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Delete,
            Versions.V1,
            `${ModelConstants.PADDY_FIELDS}/${id}`
        )
    }

    public async getAsync(id: string): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Get,
            Versions.V1,
            `${ModelConstants.PADDY_FIELDS}/${id}`
        )
    }

    public async getListAsync(): Promise<AxiosResponse> {
        return await protectedListApiAsync(
            Versions.V1,
            ModelConstants.PADDY_FIELDS,
            '?filteredByUser=true'
        )
    }
}

export default new PaddyFieldProtectedApi()
