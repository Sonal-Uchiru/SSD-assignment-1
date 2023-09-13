import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISelectField } from '../../types/selectFields/SelectFieldTypes'

// Define the state type
interface SelectFieldsState {
    loading: boolean
    error: string | null
    soilTypeSelectField: ISelectField[]
    waterInOutLocationSelectField: ISelectField[]
    locationSelectField: ISelectField[]
    slopeLevelSelectField: ISelectField[]
    paddyTypeSelectField: ISelectField[]
    cultivationMonthSelectField: ISelectField[]
    cultivationMethodSelectField: ISelectField[]
    openingHourSelectField: ISelectField[]
    agrarianDivisionSelectField: ISelectField[]
}

const initialState: SelectFieldsState = {
    error: null,
    loading: false,
    soilTypeSelectField: [],
    waterInOutLocationSelectField: [],
    locationSelectField: [],
    slopeLevelSelectField: [],
    paddyTypeSelectField: [],
    cultivationMonthSelectField: [],
    cultivationMethodSelectField: [],
    openingHourSelectField: [],
    agrarianDivisionSelectField: [],
}

const selectfieldSlice = createSlice({
    name: 'selectFields',
    initialState,
    reducers: {
        getSelectFieldStart: (state) => {
            state.loading = true
            state.error = null
        },
        getSoilTypeSelectFieldSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.soilTypeSelectField = action.payload
        },

        getWaterInOutLocationSelectFieldsSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.waterInOutLocationSelectField = action.payload
        },
        getLocationSelectFieldSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.locationSelectField = action.payload
        },
        getSlopeLevelSelectFieldSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.slopeLevelSelectField = action.payload
        },
        getPaddyTypeSelectFieldSuccess: (state, action: PayloadAction<any>) => {
            state.loading = false
            state.paddyTypeSelectField = action.payload
        },
        getCultivationMonthSelectFieldSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.cultivationMonthSelectField = action.payload
        },
        getCultivationMethodSelectFieldSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.cultivationMethodSelectField = action.payload
        },
        getOpeningHourSelectFieldSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.openingHourSelectField = action.payload
        },
        getAgrarianDivisionSelectFieldSuccess: (
            state,
            action: PayloadAction<any>
        ) => {
            state.loading = false
            state.agrarianDivisionSelectField = action.payload
        },

        getSelectFieldFailure: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

// Export the actions
export const {
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
} = selectfieldSlice.actions

// Export the reducer
export default selectfieldSlice.reducer
