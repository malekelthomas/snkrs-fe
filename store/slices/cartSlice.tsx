import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '../../lib/model/Cart'
import { getIndexOfCartItem } from '../../lib/helpers/helpers'

//type for slice state
interface CartState {
   items: CartItem[]
   subtotal: number
}

//initial state of ^
const initialState: CartState = {
   items: [],
   subtotal: 0,
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action: PayloadAction<CartItem>) => {
         //check if in array already
         let i = getIndexOfCartItem(action.payload, state.items)
         i >= 0
            ? //increase quantity of same item
              (state.items[i].quantity += 1)
            : //add new item
              state.items.push(action.payload)

         state.subtotal += action.payload.price
      },
      removeFromCart: (state, action: PayloadAction<CartItem>) => {
         //check if in array already
         let i = getIndexOfCartItem(action.payload, state.items)
         if (i >= 0) {
            state.subtotal -= action.payload.price * state.items[i].quantity
            state.items.splice(i, 1)
         }
      },
   },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
