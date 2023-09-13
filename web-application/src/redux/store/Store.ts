import { configureStore } from '@reduxjs/toolkit'
import selectFieldReducers from '../selectFields/SelectFieldReducersRedux'

export const store = configureStore({
    reducer: {
        selectFields: selectFieldReducers,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
