import Joi from 'joi'
import { Request } from 'express'
import { BaseValidation } from './BaseValidation'

export const validatorAsync = async (
    data: Request['body'],
    validationSchema: Joi.ObjectSchema
): Promise<BaseValidation> => {
    const baseValidation = new BaseValidation()
    await validationSchema.validateAsync(data).catch((error) => {
        baseValidation.isValid = false
        baseValidation.message = error.details[0].message
    })

    return baseValidation
}
