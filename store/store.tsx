import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./slices/cartSlice";
import { userSlice } from './slices/userSlice';


const store =  configureStore({
    reducer:{
        user: userSlice.reducer,
        cart: cartSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch