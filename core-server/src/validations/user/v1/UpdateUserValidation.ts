import Joi from 'joi'

export const updateUserValidationSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(255).label('First Name'),
    lastName: Joi.string().min(3).max(255).required().label('Last Name'),
    mobile: Joi.number().min(8).integer().label('Mobile'),
    profilePicture: Joi.string().uri().label('Profile Picture'),
})
