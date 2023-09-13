import Joi from 'joi'
import { DistrictTypes } from '../../../types/enum/harvest_prediction/DistrictTypes'

export const createHarvestPredictionValidation = Joi.object({
    harvestAmount: Joi.number().required().label('Harvest Amount'),
    searchDate: Joi.date().required().label('Search Date'),
    sownAmount: Joi.number().required().label('Sown Amount'),
    season: Joi.string().required().min(3).max(255).label('Seasons'),
    district: Joi.string().required().min(3).max(255).label('District'),
    total: Joi.number().required().label('Total'),
    kg: Joi.number().required().label('Kg'),
    // TODO: check whether there is a object id max lenght
    cultivationMethod: Joi.string().required().label('Cultivation Method'),
    cultivationMonth: Joi.string().required().label('Cultivation Month'),
    wastageAmount: Joi.number().required().label('Wastage Amount'),
    unitOfLand: Joi.string().required().label('Unit of Land'),
    soilType: Joi.string().label('Soil Type'),
    paddyType: Joi.string().required().label('Paddy Type'),
    districtType: Joi.number()
        .valid(DistrictTypes.Galle, DistrictTypes.Other)
        .required()
        .label('DistrictTypes'),
    divisionalSecretariats: Joi.string()
        .label('Divisional Secretariats'),
    gramaDivision: Joi.string().label('Grama Division'),
})
