import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { passwordVerificationAsync } from '../confirmations/PasswordVerification'
import { decode } from '../jwt/TokenDecode'
import UserRepository from '../repositories/UserRepository'
import { QueryParams } from '../types/QueryParams'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { CreateUserCommand } from '../types/user/v1/command/create/CreateUserCommand'
import { CreateUserResponse } from '../types/user/v1/command/create/CreateUserResponse'
import { DeleteUserResponse } from '../types/user/v1/command/delete/DeleteUserResponse'
import { ChangePasswordUserCommand } from '../types/user/v1/command/update/ChangePassword/ChangePasswordUserCommand'
import { UpdateUserCommand } from '../types/user/v1/command/update/UpdateUserCommand'
import { UpdateUserResponse } from '../types/user/v1/command/update/UpdateUserResponse'
import { ListUsersResponse } from '../types/user/v1/query/ListUsersResponse'
import { UsersResponse } from '../types/user/v1/query/UserResponse'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { changePasswordUserValidationSchema } from '../validations/user/v1/ChangePasswordUserValidation'
import { createUserValidationSchema } from '../validations/user/v1/CreateUserValidation'
import { deleteUserValidationSchema } from '../validations/user/v1/DeleteUserValidation'
import { updateUserValidationSchema } from '../validations/user/v1/UpdateUserValidation'
import { changePasswordUserPublicValidationSchema } from '../validations/user/v1/ChangePasswordUserPublicValidation'
import { ChangePasswordUserPublicCommand } from '../types/user/v1/command/update/ChangePassword/ChangePasswordUserPublicCommand'

class UserService {
    async saveUserAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                createUserValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const user = await UserRepository.GetAnyUserByEmailAsync(
                req.body.email
            )

            if (user) {
                return res
                    .status(HttpStatusCode.CONFLICT)
                    .send({ message: 'Email already exists' })
            }

            const newUser = new CreateUserCommand(
                req.body.firstName,
                req.body.lastName,
                req.body.email,
                req.body.password,
                req.body.role
            )

            const content = await UserRepository.SaveAsync(newUser)
            if (content)
                res.status(HttpStatusCode.CREATED).send(
                    new CreateUserResponse(content._id)
                )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getUserAsync(req: Request, res: Response): Promise<Response> {
        try {
            // TODO: change user id to user since we are decoding the user
            const userId: JwtPayload = await decode(req)

            const user = await UserRepository.AnyAsync(userId._id)

            if (!user) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'User not found' })
            }

            user.password = undefined

            res.status(HttpStatusCode.OK).send(new UsersResponse(user))
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async getUserListAsync(req: Request, res: Response): Promise<Response> {
        try {
            const params: QueryParams = new QueryParams(
                Number(req.query.limit),
                Number(req.query.offset),
                String(req.query.sort)
            )

            const content = await UserRepository.GetListAsync(params)

            if (content) {
                const totalCount = await UserRepository.GetListTotalCountAsync()

                return res
                    .status(HttpStatusCode.OK)
                    .send(
                        new ListUsersResponse(
                            content,
                            content.length,
                            totalCount
                        )
                    )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async updateUserAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                updateUserValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const userId: JwtPayload = await decode(req)

            const user = await UserRepository.AnyAsync(userId._id)

            if (!user) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'User not found' })
            }

            const updatedUser: UpdateUserCommand = new UpdateUserCommand(
                req.body.firstName,
                req.body.lastName,
                req.body.mobile,
                req.body.profilePicture,
                userId._id
            )

            const content = await UserRepository.UpdateAsync(
                userId._id,
                updatedUser
            )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateUserResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async deleteUserAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                deleteUserValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const userId: JwtPayload = await decode(req)

            const user = await UserRepository.AnyAsync(userId._id)

            if (!user) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'User not found' })
            }

            const isPasswordValid = await passwordVerificationAsync(
                req.body.password,
                user.password
            )

            if (!isPasswordValid) {
                return res
                    .status(HttpStatusCode.UNAUTHORIZED)
                    .send({ message: 'Invalid credentials' })
            }

            const content = await UserRepository.DeleteAsync(userId._id)

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new DeleteUserResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async changePasswordUserAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                changePasswordUserValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const userId: JwtPayload = await decode(req)

            const user = await UserRepository.AnyAsync(userId._id)

            if (!user) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'User not found' })
            }

            const updatedUser: ChangePasswordUserCommand =
                new ChangePasswordUserCommand(
                    req.body.newPassword,
                    req.body.currentPassword
                )

            const isPasswordValid = await passwordVerificationAsync(
                updatedUser.currentPassword,
                user.password
            )

            if (!isPasswordValid) {
                return res
                    .status(HttpStatusCode.UNAUTHORIZED)
                    .send({ message: 'Invalid credentials' })
            }

            const content = await UserRepository.ChangePasswordAsync(
                userId._id,
                updatedUser
            )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateUserResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }

    async changePasswordUserPublicAsync(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                changePasswordUserPublicValidationSchema
            )

            if (!validation.isValid) {
                return res
                    .status(HttpStatusCode.BAD_REQUEST)
                    .send({ message: validation.message })
            }

            const user = await UserRepository.GetAnyUserByEmailAsync(
                req.body.email
            )

            if (!user) {
                return res
                    .status(HttpStatusCode.NOT_FOUND)
                    .send({ message: 'User not found' })
            }

            const updatedUser: ChangePasswordUserPublicCommand =
                new ChangePasswordUserPublicCommand(
                    req.body.email,
                    req.body.newPassword
                )

            const content = await UserRepository.ChangePasswordAsync(
                user._id,
                updatedUser
            )

            if (content) {
                res.status(HttpStatusCode.OK).send(
                    new UpdateUserResponse(content._id)
                )
            }
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }
}

export default new UserService()
