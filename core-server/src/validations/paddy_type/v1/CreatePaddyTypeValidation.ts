import Joi from 'joi'

const singlePaddyTypeValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createPaddyTypeValidationSchema = Joi.object({
    items: Joi.array()
        .items(singlePaddyTypeValidationSchema)
        .label('Paddy Types'),
})
