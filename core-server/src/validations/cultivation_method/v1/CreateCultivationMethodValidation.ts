import Joi from 'joi'

const singleCultivationMethodValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createCultivationMethodValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleCultivationMethodValidationSchema)
        .label('Cultivation Methods'),
})
