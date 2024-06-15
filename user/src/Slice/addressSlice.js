import { createSlice } from '@reduxjs/toolkit';
const addressSlice = createSlice({
    name: "address",
    initialState: {
        addressList:[],
    },
    reducers: { // hear reducers
        fetchAndStoreAddress:(state,action)=>{
            state.addressList=action.payload;
        }, //this is an action creator
    },
})
export const {fetchAndStoreAddress}=addressSlice.actions;
export default addressSlice.reducer; //here reducer