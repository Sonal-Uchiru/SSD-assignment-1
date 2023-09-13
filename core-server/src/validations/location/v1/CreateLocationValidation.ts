import Joi from 'joi'

const singleLocationValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createLocationValidationSchema = Joi.object({
    items: Joi.array().items(singleLocationValidationSchema).label('Locations'),
})
