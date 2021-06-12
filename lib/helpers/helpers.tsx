import { CartItem, ShippingMethod } from '../model/Cart'
import { $enum } from 'ts-enum-util'

export function newProduct(product_date: Date): boolean {
   if (product_date == undefined) {
      return false
   }
   let weekAgo = new Date()
   weekAgo.setDate(weekAgo.getDate() - 30)
   let weekAgoTime = weekAgo.getTime()
   let today = new Date()
   let todayTime = today.getTime()
   let product_dateTime = new Date(product_date).getTime()
   return weekAgoTime <= product_dateTime && product_dateTime <= todayTime
}

export function shuffleArray(array) {
   if (array != null) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         ;[array[i], array[j]] = [array[j], array[i]]
      }
   }
}

export function formatName(name: string): string {
   let splitName = name.split('-')
   let formatted = splitName.join(' ')
   return formatted
}

export function formatBrandName(name: string): string {
   return name[0].toUpperCase() + name.slice(1).toLowerCase()
}

export function getIndexOfCartItem(item: CartItem, array: CartItem[]): number {
   let index = -1
   array.map((el, i) => {
      if (el.model == item.model && el.size == item.size) {
         index = i
      }
   })
   return index
}

export function calculateDeliveryDate(shipping_method: ShippingMethod): string {
   let today = new Date().getDate()
   let deliveryDate = new Date()
   /* switch (shipping_method) {
      case ShippingMethod.NextDay:
         deliveryDate.setDate(today + 1)
         break
      case ShippingMethod.TwoDay:
         deliveryDate.setDate(today + 2)
         break
      case ShippingMethod.ThreeDay:
         deliveryDate.setDate(today + 3)
         break
      default:
         break
   } */

   $enum(ShippingMethod).map((v, k, e, i) => {
      if (v == shipping_method) {
         deliveryDate.setDate(today + i + 1)
      }
   })

   let dtf = new Intl.DateTimeFormat()
   return dtf.format(deliveryDate)
}
