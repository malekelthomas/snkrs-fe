export interface Sneaker {
   brand: string
   model: string
   sku: string
   release_date: Date
   photos?: string
   site_sizes_prices?: SiteSizePrice
}

export interface SiteSizePrice {
   sites_sizes_prices: Map<SiteSoldOn, SizePrice>
}

export interface SizePrice {
   sizes_prices: Map<string, number>
}

export enum SiteSoldOn {
   STOCKX = 'STOCKX',
   NIKE = 'NIKE',
   ADIDAS = 'ADIDAS',
   PUMA = 'PUMA',
   STADIUMGOODS = 'STADIUMGOODS',
   FLIGHTCLUB = 'FLIGHTCLUB',
}
