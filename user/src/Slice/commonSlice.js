import { createSlice } from "@reduxjs/toolkit";
const commonSlice = createSlice({
    name: "common",
    initialState: {
        prvRoute: "/",
        imagePath:"http://localhost:5001/",
    },
    reducers: {
        setRoute: (state, action) => {
            state.prvRoute = action.payload
        },
    }
})
export const {setRoute}=commonSlice.actions;
export default commonSlice.reducer; 