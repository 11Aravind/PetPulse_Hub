import {createSlice} from "@reduxjs/toolkit"
const categorySlice=createSlice({
    name:"categorys",
    initialState:{
        categoryList:[],
    },
    reducers:{
            fetchAndStoreCategory:(state,action)=>{
                state.categoryList=action.payload;
                // state.categoryList.push(action.payload)
            },
    },
})
export const {fetchAndStoreCategory} =categorySlice.actions;
export default categorySlice.reducer;
