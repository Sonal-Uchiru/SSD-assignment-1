import Joi from 'joi'

export const updateFarmerFavouriteCategoryValidation = Joi.object({
    categoryId: Joi.string().required().label('Category Id'),
})
