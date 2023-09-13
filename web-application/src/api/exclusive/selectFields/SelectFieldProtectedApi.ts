import { AxiosResponse } from 'axios'
import { protectedApiAsync } from '../../ProtectedApi'
import { HttpMethods } from '../../../types/enums/HttpMethods'
import { Versions } from '../../../types/enums/Versions'

class SelectFieldProtectedApi {
    public async getSelectFieldsAsync(
        urlPrefix: string
    ): Promise<AxiosResponse> {
        return await protectedApiAsync(
            HttpMethods.Get,
            Versions.V1,
            `${urlPrefix}/list`
        )
    }
}

export default new SelectFieldProtectedApi()
