import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserRole } from '../../lib/model/User'

//type for slice state
interface UserState {
   first_name: string
   last_name: string
   email: string
   auth_id?: string
   user_role?: UserRole
}

//initial state of ^
const initialState: UserState = {
   first_name: '',
   last_name: '',
   email: '',
   auth_id: '',
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<User>) => {
         console.log(action.payload)
         state.auth_id = action.payload.auth_id
         state.email = action.payload.email
         state.first_name = action.payload.first_name
         state.last_name = action.payload.last_name
         state.user_role = action.payload.user_role
      },
      clearUser: (state) => {
         state = {} as UserState
      },
   },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
