import { CheckoutRequest } from '../model/Cart'
import { Order } from '../model/Order'
import { apiWrapper, HTTPMethod } from './API'

const APIGroup = 'checkout'
export const executeCheckout = async (req: CheckoutRequest): Promise<Order> => {
   return apiWrapper(`${APIGroup}/execute/`, {
      method: HTTPMethod.POST,
      body: { ...req },
   })
}
