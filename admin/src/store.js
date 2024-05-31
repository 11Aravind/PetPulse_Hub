import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from './Slice/visibilitySlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    visibility: navbarReducer,
  },
})