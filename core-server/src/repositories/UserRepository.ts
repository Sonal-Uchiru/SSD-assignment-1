import User from '../models/User'
import HashPassword from '../shared/HashPassword'
import { QueryParams } from '../types/QueryParams'
import { IUser } from '../types/interfaces/models/IUserModel'
import { CreateUserCommand } from '../types/user/v1/command/create/CreateUserCommand'
import { ChangePasswordUserCommand } from '../types/user/v1/command/update/ChangePassword/ChangePasswordUserCommand'
import { ChangePasswordUserPublicCommand } from '../types/user/v1/command/update/ChangePassword/ChangePasswordUserPublicCommand'
import { UpdateUserCommand } from '../types/user/v1/command/update/UpdateUserCommand'

class UserRepository {
    async SaveAsync(newUser: CreateUserCommand): Promise<IUser> {
        return await new User({ ...newUser }).save()
    }

    async UpdateAsync(id: string, user: UpdateUserCommand): Promise<IUser> {
        return await User.findByIdAndUpdate(id, {
            $set: {
                ...user,
            },
        })
    }

    async DeleteAsync(id: string): Promise<IUser> {
        return await User.findByIdAndUpdate(id, {
            $set: {
                isDeleted: new Date(),
            },
        })
    }

    async ChangePasswordAsync(
        id: string,
        user: ChangePasswordUserCommand | ChangePasswordUserPublicCommand
    ): Promise<IUser> {
        return await User.findByIdAndUpdate(id, {
            $set: {
                password: await HashPassword.getHashAsync(user.newPassword),
                modifiedUser: id,
            },
        })
    }

    async AnyAsync(id: string): Promise<IUser> {
        return await User.findOne(
            { _id: id, isDeleted: null },
            { isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
    }

    async GetListAsync(queries: QueryParams): Promise<IUser[]> {
        return await User.find(
            {
                isDeleted: null,
            },
            { password: 0, isDeleted: 0, modifiedUser: 0, __v: 0 }
        )
            .limit(queries.limit)
            .skip(queries.offset)
            .sort({ firstName: queries.sort })
    }

    async GetListTotalCountAsync(): Promise<number> {
        return (await User.find({ isDeleted: null }, {_id : 1})).length
    }

    async GetAnyUserByEmailAsync(userEmail: string): Promise<IUser> {
        return await User.findOne({ email: userEmail, isDeleted: null })
    }
}

export default new UserRepository()
