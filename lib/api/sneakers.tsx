import { Sneaker } from '../model/sneaker'
import { apiWrapper, HTTPMethod } from './api'

const APIGroup = 'sneakers'

export const getSneakers = async (): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/`, {
      method: HTTPMethod.GET,
   })
}

export const getBrands = async (): Promise<string[]> => {
   return apiWrapper(`${APIGroup}/brands/`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakersByBrand = async (brand: string): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/${brand}`, {
      method: HTTPMethod.GET,
   })
}
