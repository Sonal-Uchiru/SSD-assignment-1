import AppConstants from '../../constants/AppConstants'
import { UserRoles } from '../../types/enums/UserRoles'

export const GetUserRoleByEmail = (email: string) => {
    if (email.endsWith(AppConstants.OFFICER_EMAIL_TEMPLATE)) {
        return UserRoles.Officer
    }

    return UserRoles.Farmer
}
