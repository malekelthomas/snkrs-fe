import { Select } from '@chakra-ui/select'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Sneaker, SiteSoldOn, SizePrice } from '../../lib/model/Sneaker'
import { CartItem } from '../../lib/model/Cart'
import { Box, Button, useToast } from '@chakra-ui/react'
import { useAppDispatch } from '../../hooks'
import { addToCart } from '../../store/slices/cartSlice'
import { formatName } from '../../lib/helpers/helpers'

type Props = {
   sneaker: Sneaker
}
const SneakerSelector: NextPage<Props> = ({ sneaker }) => {
   const [selectedSite, setSelectedSite] = useState<SiteSoldOn>()
   const [selectedSize, setSelectedSize] = useState<boolean>(false)
   const [cartItem, setCartItem] = useState<CartItem>()

   const formattedName = formatName(sneaker.model)

   const dispatch = useAppDispatch()
   const toast = useToast()
   const AddToCart = () => {
      let addedCartItem = {
         ...cartItem,
         model: sneaker.model,
         photo: sneaker.photos ? sneaker.photos[0] : '',
         quantity: 1,
      }
      setCartItem(addedCartItem)
      toast({
         title: `Added ${formattedName} to cart`,
         status: "success",
         duration: 50,
         isClosable: true
      })
      dispatch(addToCart(addedCartItem))
   }

   const siteChange = (e: any) => {
      setSelectedSite(e.target.value)
   }

   const sizeChange = (e: any) => {
      if (e.target.value !== '') {
         let sizePrice = e.target.value.split(' ')
         let size = sizePrice[0].split(':')[1]
         let price = parseFloat(sizePrice[1].split('$')[1].replace(/,/g, '')) //split by $, remove commas and parse
         setSelectedSize(true)
         let updatedCartItem = { ...cartItem }
         updatedCartItem.size = size
         updatedCartItem.price = price
         setCartItem(updatedCartItem)
      } else {
         setSelectedSize(false)
      }
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
         {selectedSize && (
            <Box>
               <Button color="white" bgColor="green" onClick={AddToCart}>
                  ADD TO CART
               </Button>
            </Box>
         )}
      </>
   )
}

export default SneakerSelector
