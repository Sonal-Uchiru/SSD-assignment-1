import { AxiosResponse } from 'axios'
import { unProtectedApiAsync } from '../../UnProtectedApi'
import { HttpMethods } from '../../../types/enums/HttpMethods'
import { Versions } from '../../../types/enums/Versions'
import ModelConstants from '../../../constants/ModelConstants'

class UserUnprotectedApi {
    public async registrationAsync(data: any): Promise<AxiosResponse> {
        return await unProtectedApiAsync(
            HttpMethods.Post,
            Versions.V1,
            ModelConstants.USERS,
            data
        )
    }
}

export default new UserUnprotectedApi()
