import { configureStore } from "@reduxjs/toolkit";
import manufacturerReducer from "./manufacturerSlice"

const store = configureStore({
    reducer: manufacturerReducer
})

export default store
