import Joi from 'joi'
import { createSubCategoryValidationSchema } from '../../subcategory/v1/CreateSubCategoryValidation'

export const createCategoryValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
    iconUrl: Joi.string().uri().label('Icon URL'),
    subCategories: Joi.array()
        .items(createSubCategoryValidationSchema)
        .label('Sub Categories'),
})
