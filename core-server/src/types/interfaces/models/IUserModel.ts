import { IBase } from './IBaseModel'
import { UserRoles } from '../../enum/user/UserRoles'

export interface IUser extends IBase {
    [x: string]: any
    firstName: string
    lastName: string
    email: string
    password: string
    mobile: number
    role: UserRoles
    profilePicture: string
}
