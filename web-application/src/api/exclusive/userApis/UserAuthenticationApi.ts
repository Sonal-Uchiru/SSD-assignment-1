import { AxiosResponse } from 'axios'
import { authApiAsync } from '../../AuthApi'

class UserAuthenticationApi {
    public async loginAsync(data: any): Promise<AxiosResponse> {
        return await authApiAsync(data)
    }
}

export default new UserAuthenticationApi()
