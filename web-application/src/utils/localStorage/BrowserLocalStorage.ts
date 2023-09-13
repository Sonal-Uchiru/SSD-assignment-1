import AppConstants from '../../constants/AppConstants'
import { UserRoles } from '../../types/enums/UserRoles'
import jwt_decode from 'jwt-decode'

class BrowserLocalStorage {
    public SetAccessToken(token: string) {
        localStorage.setItem(AppConstants.ACCESS_TOKEN_KEY, token)
    }

    public GetAccessToken(): string | null {
        return localStorage.getItem(AppConstants.ACCESS_TOKEN_KEY)
    }

    public RemoveAccessToken() {
        localStorage.removeItem(AppConstants.ACCESS_TOKEN_KEY)
    }

    public GetUserRole(): UserRoles {
        const accessToken = this.GetAccessToken()

        if (accessToken) {
            const decoded: {
                _id: string
                role: UserRoles
                iat: number
                exp: number
            } = jwt_decode(accessToken)

            return decoded.role
        }

        return UserRoles.Unspecified
    }
}

export default new BrowserLocalStorage()
