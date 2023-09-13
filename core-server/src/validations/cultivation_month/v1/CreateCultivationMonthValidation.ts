import Joi from 'joi'

const singleCultivationMonthValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
})

export const createCultivationMonthValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleCultivationMonthValidationSchema)
        .label('Cultivation Months'),
})
