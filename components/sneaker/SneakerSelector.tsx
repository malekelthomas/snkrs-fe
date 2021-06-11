import { Select } from '@chakra-ui/select'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Sneaker, SiteSoldOn, SizePrice } from '../../lib/model/sneaker'

type Props = {
   sneaker: Sneaker
}
const SneakerSelector: NextPage<Props> = ({ sneaker }) => {
   const [selectedSite, setSelectedSite] = useState<SiteSoldOn>()

   const siteChange = (e: any) => {
      setSelectedSite(e.target.value)
   }

   const sizeChange = (e: any) => {
      let sizePrice = e.target.value.split(' ')
      let size = sizePrice[0].split(':')[1]
      let price = parseFloat(sizePrice[1].split('$')[1])
   }
   return (
      <>
         {sneaker &&
            sneaker.sites_sizes_prices &&
            sneaker.sites_sizes_prices.sites_sizes_prices && (
               <Select onChange={siteChange} placeholder="Select Site">
                  {Object.keys(
                     sneaker.sites_sizes_prices.sites_sizes_prices
                  ).map((key) => (
                     <option value={`${key}`}>{`${key}`}</option>
                  ))}
               </Select>
            )}

         {selectedSite && (
            <Select placeholder="Select Size" onChange={sizeChange}>
               {Object.values(
                  sneaker.sites_sizes_prices.sites_sizes_prices[selectedSite]
               ).map((val: any) =>
                  Object.keys(val).map((size) => (
                     <option>{`Size:${size}  ${new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                     }).format(val[size] / 100)}`}</option>
                  ))
               )}
            </Select>
         )}
      </>
   )
}

export default SneakerSelector
