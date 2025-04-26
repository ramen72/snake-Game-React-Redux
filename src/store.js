import { configureStore } from '@reduxjs/toolkit'
import snakeReducer from './features/snakeSlice/snakeSlice'

export default configureStore({
  reducer: {
    snakeSlice : snakeReducer,
  },
})