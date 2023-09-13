import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'
import { UserRoles } from '../../../types/enum/user/UserRoles'

export const createUserValidationSchema = Joi.object({
    firstName: Joi.string().required().min(3).max(255).label('First Name'),
    lastName: Joi.string().min(3).max(255).required().label('Last Name'),
    email: Joi.string().min(3).max(255).email().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
    role: Joi.number().valid(UserRoles.Farmer, UserRoles.Officer).required().label('Role'),
})
