import Joi from 'joi'

const singleSlopeLevelValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createSlopeLevelValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleSlopeLevelValidationSchema)
        .label('Slope Levels'),
})
