import Joi from 'joi'

export const deleteUserValidationSchema = Joi.object({
    password: Joi.string().required().label('Password'),
})
