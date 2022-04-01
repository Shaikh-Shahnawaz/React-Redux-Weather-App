import { configureStore } from '@reduxjs/toolkit'
import  weatherSlice  from '../reducers/reducer'


export const store =  configureStore({
  reducer: {
    weather: weatherSlice,
  },
})