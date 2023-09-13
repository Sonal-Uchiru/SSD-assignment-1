import Joi from 'joi';

export const authValidationSchema = Joi.object({
    email: Joi.string().min(3).max(255).email().required().label('Email'),
    password: Joi.string().required().label('Password'),
})
