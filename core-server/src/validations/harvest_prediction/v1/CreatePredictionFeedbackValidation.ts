import Joi from 'joi'

export const createPredictionFeedbackValidation = Joi.object({
    actualHarvestedAmount: Joi.number().required().label('Actual Harvest Amount'),
    actualKgAmount: Joi.number().required().label('Actual Kg Amount')
})
