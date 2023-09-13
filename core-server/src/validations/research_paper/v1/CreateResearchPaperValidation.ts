import Joi from 'joi'

export const createResearchPaperValidationSchema = Joi.object({
    mediaFileUrl: Joi.string().uri().required().label('Media File URL'),
    topic: Joi.string().min(3).max(255).required().label('Topic'),
    summerizedContent: Joi.string().required().label('Summerized Content'),
    // TODO: validate whether it is a mongo DB object id
    subCategory: Joi.string().required().label('Sub Category'),
})
