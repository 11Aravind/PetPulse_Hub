import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: "user",
    initialState: {
        userId:null,
    },
    reducers: { // hear reducers
        fetchAndStore:(state,action)=>{
            state.productList=action.payload;
        }, //this is an action creator
    },
})
export const {fetchAndStore}=userSlice.actions;
export default userSlice.reducer; //here reducer