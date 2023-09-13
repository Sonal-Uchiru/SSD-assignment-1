import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

export const changePasswordUserValidationSchema = Joi.object({
    newPassword: passwordComplexity().required().label('New Password'),
    currentPassword: Joi.string().required().label('Current Password'),
})
