import { Request, Response } from 'express'
import { BaseValidation } from '../validations/BaseValidation'
import { validatorAsync } from '../validations/Validator'
import { authValidationSchema } from '../validations/authentication/v1/AuthValidation'
import UserRepository from '../repositories/UserRepository'
import { passwordVerificationAsync } from '../confirmations/PasswordVerification'
import { AuthUserResponse } from '../types/authentication/v1/AuthUserResponse'
import { HttpStatusCode } from '../types/enum/HttpStatuCodes'
import { MetaData } from '../types/authentication/MetaData'

class AuthenticationService {
    async authAsync(req: Request, res: Response): Promise<Response> {
        try {
            const validation: BaseValidation = await validatorAsync(
                req.body,
                authValidationSchema
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

            const isPasswordValid = await passwordVerificationAsync(
                req.body.password,
                user.password
            )

            if (!isPasswordValid) {
                return res
                    .status(HttpStatusCode.UNAUTHORIZED)
                    .send({ message: 'Invalid credentials' })
            }

            const userToken = await user.generateAuthToken()

            res.status(HttpStatusCode.OK).send(
                new AuthUserResponse(
                    userToken,
                    new MetaData(
                        user.firstName,
                        user.lastName,
                        user.email,
                        user.profilePicture
                    )
                )
            )
        } catch (error) {
            res.status(HttpStatusCode.INTERNAL_SERVER).send({
                message: 'Internal server error',
            })
        }
    }
}

export default new AuthenticationService()
