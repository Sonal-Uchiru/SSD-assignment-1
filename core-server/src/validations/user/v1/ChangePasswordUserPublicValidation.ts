import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

export const changePasswordUserPublicValidationSchema = Joi.object({
    email: Joi.string().min(3).max(255).email().required().label('Email'),
    newPassword: passwordComplexity().required().label('New Password'),
})
