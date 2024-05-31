import { createSlice } from '@reduxjs/toolkit';
const  visibilitySlice= createSlice({
    name: "navbar",
    initialState: {
        visibility:false,
    },
    reducers: { // hear reducers
        changeVisibility:(state,action)=>{
            state.visibility=action.payload;
        }, //this is an action creator
    },
})
export const {changeVisibility}=visibilitySlice.actions;
export default visibilitySlice.reducer; //here reducer