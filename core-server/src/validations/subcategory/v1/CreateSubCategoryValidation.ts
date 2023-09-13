import Joi from 'joi'

export const createSubCategoryValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
    iconUrl: Joi.string().uri().label('Icon URL'),
})
