import {createSlice} from "@reduxjs/toolkit"
const categorySlice=createSlice({
    name:"categorys",
    initialState:{
        categoryList:[],
        clickedCategory:null
    },
    reducers:{
            fetchAndStoreCategory:(state,action)=>{
                state.categoryList=action.payload;
                // state.categoryList.push(action.payload)
            },
            setCategoryId:(state,action)=>{
                state.clickedCategory=action.payload;
                // state.categoryList.push(action.payload)
            },
    },
})
export const {fetchAndStoreCategory,setCategoryId} =categorySlice.actions;
export default categorySlice.reducer;
