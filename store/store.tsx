import { configureStore } from '@reduxjs/toolkit'
import { cartSlice } from './slices/cartSlice'
import { userSlice } from './slices/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userPersistConfig = {
   key: 'user',
   storage,
}

const cartPersistConfig = {
   key: 'cart',
   storage,
}

const userReducer = persistReducer(userPersistConfig, userSlice.reducer)
const cartReducer = persistReducer(cartPersistConfig, cartSlice.reducer)
export const store = configureStore({
   reducer: {
      user: userReducer,
      cart: cartReducer,
   },
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch
