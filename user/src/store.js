import {configureStore } from "@reduxjs/toolkit"
import productSlice from "./Slice/productSlice"
import categorySlice from "./Slice/categorySlice"
import cartSlice from "./Slice/cartSlice"
import userSlice from "./Slice/userSlice"
import commonSlice from "./Slice/commonSlice"
export const store=configureStore({
    reducer:{
        products:productSlice, // sliceName: sliceFile
        categorys:categorySlice,
        carts:cartSlice,
        user:userSlice,
        common:commonSlice
    },
})