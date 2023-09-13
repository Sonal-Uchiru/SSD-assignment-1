import Joi from 'joi'

const singleOpeningHourValidationSchema = Joi.object({
    openingTime: Joi.date().required().label('Opening Time'),
    closingTime: Joi.date().label('Closing Time'),
})

export const createOpeningHourValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleOpeningHourValidationSchema)
        .label('Opening Hours'),
})
