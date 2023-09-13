import Joi from 'joi'

const singleAggrerianDivisionValidationSchema = Joi.object({
    name: Joi.string().required().min(3).max(255).label('Name'),
    code: Joi.string().min(3).label('Code'),
})

export const createAggrerianDivisionValidationSchema = Joi.object({
    items: Joi.array()
        .items(singleAggrerianDivisionValidationSchema)
        .label('Aggrerian Divisions'),
})
