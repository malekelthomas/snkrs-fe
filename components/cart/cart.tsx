import { Button } from '@chakra-ui/button'
import { Box } from '@chakra-ui/layout'
import {
   Popover,
   PopoverArrow,
   PopoverBody,
   PopoverCloseButton,
   PopoverContent,
   PopoverFooter,
   PopoverHeader,
   PopoverTrigger,
} from '@chakra-ui/popover'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { Image } from '@chakra-ui/image'
import { Flex, Text } from '@chakra-ui/react'
import { Sneaker } from '../../lib/model/Sneaker'
import { formatName } from '../../lib/helpers/helpers'
import { CartItem } from '../../lib/model/Cart'
import { removeFromCart } from '../../store/slices/cartSlice'

const CartIcon = () => {
   const items = useAppSelector((state) => state.cart.items)
   const subtotal = useAppSelector((state) => state.cart.subtotal)
   const dispatch = useAppDispatch()
   const removeItem = (item: CartItem) => {
      dispatch(removeFromCart(item))
   }
   return (
      <Popover>
         <PopoverTrigger>
            <Button>
               <AiOutlineShoppingCart size="25px" color="black" />
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Cart</PopoverHeader>
            <PopoverBody>
               {items && (
                  <Box p="3">
                     {items.map((item) => (
                        <Box d="flex" alignItems="baseline">
                           <Box p="1">
                              <Image
                                 height="30"
                                 width="30"
                                 src={item.photo}
                                 alt={item.model}
                              />
                           </Box>
                           <Box>
                              <Text fontSize="xs">
                                 {' '}
                                 {formatName(item.model)}
                              </Text>
                              <Text fontSize="xs">x{item.quantity}</Text>
                              <Text fontSize="xs">Size: {item.size}</Text>
                           </Box>
                           <Flex flexDirection="column" justifyContent="center">
                              <Box as="button">
                                 <TiDeleteOutline
                                    onClick={() => {
                                       removeItem(item)
                                    }}
                                 />
                              </Box>
                           </Flex>
                        </Box>
                     ))}
                  </Box>
               )}
            </PopoverBody>

            <PopoverFooter>
               <Text>
                  Total:{' '}
                  {new Intl.NumberFormat('en-US', {
                     style: 'currency',
                     currency: 'USD',
                  }).format(subtotal)}
               </Text>
            </PopoverFooter>
         </PopoverContent>
      </Popover>
   )
}

export default CartIcon
