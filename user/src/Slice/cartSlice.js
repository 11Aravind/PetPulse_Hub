import {createSlice} from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"carts",
    initialState:{
        cartList:[]
    },
    reducers:{
        addToCart:(state,action)=>{
        state.cartList.push(action.payload)
    },
    removeCart:(state,action)=>{
        state.cartList.filter(cart=>cart._id!== action.payload)
    },
    clearCart:(state,action)=>{
        state.cartList=[];
    }
}
})
export const {addToCart,removeCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer