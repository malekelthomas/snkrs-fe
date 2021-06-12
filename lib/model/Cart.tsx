export interface CartItem {
   model: string
   size: string
   site: string
   quantity: number
   price: number
   photo?: string
}

export interface CheckoutRequest {
   auth_id: string
   items: CartItem[]
   state: string
   shipping_method: ShippingMethod
   payment_source: string
   carrier: Carrier
}

export enum ShippingMethod {
   NextDay = 'next-day',
   TwoDay = 'two-day',
   ThreeDay = 'three-day',
}

export enum Carrier {
   Fedex = 'fedex',
   USPS = 'usps',
   UPS = 'ups',
}
