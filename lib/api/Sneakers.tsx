import { Sneaker } from '../model/Sneaker'
import { apiWrapper, HTTPMethod } from './API'

const APIGroup = 'sneakers'

export const getSneakers = async (): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakerCount = async (): Promise<number> => {
   return apiWrapper(`${APIGroup}/retrieve/count`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakerCountByBrand = async (
   brand: string
): Promise<number> => {
   return apiWrapper(`${APIGroup}/brands/${brand}/retrieve/count`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakersWPagination = async (
   page: string
): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/${page}`, {
      method: HTTPMethod.GET,
   })
}

export const getBrands = async (): Promise<string[]> => {
   return apiWrapper(`${APIGroup}/brands/`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakersByBrand = async (brand: string): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/brands/${brand}/`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakersByBrandWPagination = async (
   brand: string,
   page: string
): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}/brands/${brand}/${page}`, {
      method: HTTPMethod.GET,
   })
}

export const getSneakerByModel = async (model: string): Promise<Sneaker[]> => {
   return apiWrapper(`${APIGroup}`, {
      method: HTTPMethod.GET,
      query: { model },
   })
}
