import { createSlice } from '@reduxjs/toolkit';
const productSlice = createSlice({
    name: "products",
    initialState: {
        productList:[],
    },
    reducers: { // hear reducers
        fetchAndStore:(state,action)=>{
            state.productList=action.payload;
        }, //this is an action creator
    },
})
export const {fetchAndStore}=productSlice.actions;
export default productSlice.reducer; //here reducer