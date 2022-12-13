import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    manufacturer: {
    _id:"",
    name: "",
    regNum: "",
    regCountry: "",
    solanaPubKey: "",
    email: "",
    phoneNum: "",
    address: "",
    auxInfoHash:""
    },
    token:""
}

const manufacturerSlice = createSlice({
    name: "manufacturer",
    initialState,
    reducers: {
        updateManufacturer: (state, action) => {
            state.manufacturer = action.payload
        },
        updateToken: (state, action) => {
            state.token = action.payload
        }
    }
})

export const manufacturerActions = manufacturerSlice.actions
export default manufacturerSlice.reducer
