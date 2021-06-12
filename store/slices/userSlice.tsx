import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserRole } from '../../lib/model/User'

//type for slice state
interface UserState {
    first_name: string
    last_name: string
    email: string
    auth_id: string
    user_role?: UserRole
}

//initial state of ^
const initialState: UserState = {
    first_name:'',
    last_name:'',
    email:'',
    auth_id:'',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state  = {...action.payload}
        },
        clearUser: state => {
            state = {} as UserState
        }
    }
})

export const { setUser, clearUser} = userSlice.actions

export default userSlice.reducer