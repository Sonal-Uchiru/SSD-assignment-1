import { AxiosResponse } from 'axios'
import ModelConstants from '../../constants/ModelConstants'
import { HttpMethods } from '../../types/enums/HttpMethods'
import { Versions } from '../../types/enums/Versions'
import { protectedApiAsync } from '../ProtectedApi'
import { protectedListApiAsync } from '../ProtectedListApi'

class CategoryProtectedApi {
    public async getAsync(id: string): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Get,
            Versions.V1,
            `${ModelConstants.CATEGORIES}/${id}/subcategories`
        )
    }

    public async getListAsync(): Promise<AxiosResponse> {
        return await protectedListApiAsync(
            Versions.V1,
            ModelConstants.CATEGORIES
        )
    }
}

export default new CategoryProtectedApi()
