import {
    getSelectFieldStart,
    getAgrarianDivisionSelectFieldSuccess,
    getCultivationMethodSelectFieldSuccess,
    getCultivationMonthSelectFieldSuccess,
    getLocationSelectFieldSuccess,
    getOpeningHourSelectFieldSuccess,
    getPaddyTypeSelectFieldSuccess,
    getSlopeLevelSelectFieldSuccess,
    getSoilTypeSelectFieldSuccess,
    getWaterInOutLocationSelectFieldsSuccess,
    getSelectFieldFailure,
} from './SelectFieldReducersRedux'
import { AppDispatch } from '../store/Store'
import SelectFieldProtectedApi from '../../api/exclusive/selectFields/SelectFieldProtectedApi'
import ModelConstants from '../../constants/ModelConstants'

export const getSoilTypeSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.SOIL_TYPES
            )
            dispatch(getSoilTypeSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getAgrarianDivisionSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.AGRERIAN_DIVISIONS
            )
            dispatch(getAgrarianDivisionSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getCultivationMethodSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.CULTIVATION_METHODS
            )
            dispatch(getCultivationMethodSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getCultivationMonthSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.CULTIVATION_MONTHS
            )
            dispatch(getCultivationMonthSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getLocationSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.LOCATIONS
            )
            dispatch(getLocationSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getOpeningHourSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.OPENING_HOURS
            )
            dispatch(getOpeningHourSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getSlopeLevelSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.SLOPE_LEVELS
            )
            dispatch(getSlopeLevelSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getWaterInOutLocationSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.WATER_IN_OUT_LOCATIONS
            )
            dispatch(getWaterInOutLocationSelectFieldsSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}

export const getPaddyTypeSelectFields = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(getSelectFieldStart())
            const { data } = await SelectFieldProtectedApi.getSelectFieldsAsync(
                ModelConstants.PADDY_TYPES
            )
            dispatch(getPaddyTypeSelectFieldSuccess(data.items))
        } catch (error: any) {
            dispatch(getSelectFieldFailure(error?.message))
        }
    }
}
