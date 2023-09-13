import Joi from 'joi'

export const createPaddyFieldValidationSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().label('Name'),
    location: Joi.string().required().label('Location'),
    paddyType: Joi.string().required().label('Paddy Type'),
    slopeLevel: Joi.string().required().label('Slope Level'),
    waterIn: Joi.string().required().label('Water In'),
    waterOut: Joi.string().required().label('Water Out'),
    acres: Joi.number().required().label('Acres'),
    mapContent: Joi.required().label('Map Content'),
    irrigatedMapContent: Joi.required().label('Irrigated Map Content'),
    numberOfIrrigations: Joi.number().required().label('Number of Irrigations'),
    spaceBetweenIrrigations: Joi.number().required().label('Space Between Irrigations')
})
