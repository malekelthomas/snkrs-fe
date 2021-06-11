import { User } from '../model/User'
import { apiWrapper, HTTPMethod } from './API'

const APIGroup = 'users'
export const registerUser = async (user: User): Promise<User> => {
   return apiWrapper(`${APIGroup}/register/`, {
      method: HTTPMethod.POST,
      body: {
         user: user,
      },
   })
}
