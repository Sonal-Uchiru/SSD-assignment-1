import Joi from 'joi'

const singleSoilTypeValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createSoilTypeValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleSoilTypeValidationSchema)
        .label('Soil Types'),
})
