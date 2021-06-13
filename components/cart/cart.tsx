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
import { Flex, Text, useToast } from '@chakra-ui/react'
import { Sneaker } from '../../lib/model/Sneaker'
import { formatName, calculateDeliveryDate } from '../../lib/helpers/helpers'
import {
   CartItem,
   CheckoutRequest,
   ShippingMethod,
   Carrier,
} from '../../lib/model/Cart'
import { removeFromCart } from '../../store/slices/cartSlice'
import { v4 as uuidv4 } from 'uuid'
import { executeCheckout } from '../../lib/api/Checkout'
import { Order } from '../../lib/model/Order'

const CartIcon = () => {
   const items = useAppSelector((state) => state.cart.items)
   const subtotal = useAppSelector((state) => state.cart.subtotal)
   const dispatch = useAppDispatch()
   const user = useAppSelector((state) => state.user)
   const toast = useToast()

   const removeItem = (item: CartItem) => {
      dispatch(removeFromCart(item))
   }

   const [order, setOrder] = useState<Order>()
   const [popOverOpen, setPopOverOpen] = useState<boolean>(false)

   const checkout = () => {
      let cr: CheckoutRequest = {
         auth_id: user.auth_id,
         items: items,
         state: 'NY',
         shipping_method: ShippingMethod.NextDay,
         carrier: Carrier.USPS,
         payment_source: uuidv4(),
      }
      console.log(cr)
      if (user.auth_id == undefined || user.auth_id == '') {
         toast({
            title: `Please login or register an account to checkout`,
            status: 'warning',
            duration: 1500,
            isClosable: true,
         })
      } else {
         executeCheckout(cr)
            .then((res) => {
               console.log(res)
               setOrder(res)
            })
            .catch((e) => {
               toast({
                  title: `Error`,
                  description: `Something went wrong while processing your order.\n${e}`,
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
               })
            })
            .finally(() => {
               let deliveryDate = calculateDeliveryDate(cr.shipping_method)
               toast({
                  title: `Your order was succesfully placed`,
                  description: `It should arrive by ${deliveryDate}`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true,
               })
            })
      }
   }

   const toggle = () => {
      setPopOverOpen(!popOverOpen)
   }
   return (
      <Popover isOpen={popOverOpen} closeOnBlur={true}>
         <PopoverTrigger>
            <Button onClick={toggle}>
               <AiOutlineShoppingCart size="25px" color="black" />
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton onClick={toggle} />
            <PopoverHeader>Cart</PopoverHeader>
            <PopoverBody>
               <Flex justifyContent="space-evenly">
                  {items && (
                     <Box p="3">
                        {items.map((item, i) => {
                           if (i <= 4) {
                              return (
                                 <Link
                                    href={`/sneakers/brands/${item.brand}/${item.model}`}
                                    passHref={true}
                                 >
                                    <Box
                                       as="button"
                                       d="flex"
                                       alignItems="baseline"
                                       onClick={toggle}
                                    >
                                       <Box p="1">
                                          <Image
                                             height="30"
                                             width="30"
                                             src={item.photo}
                                             alt={item.model}
                                          />
                                       </Box>
                                       <Box color="black">
                                          <Text fontSize="xs">
                                             {' '}
                                             {formatName(item.model)}
                                          </Text>
                                          <Text fontSize="xs">
                                             x{item.quantity}
                                          </Text>
                                          <Text fontSize="xs">
                                             Size: {item.size}
                                          </Text>
                                       </Box>
                                       <Flex
                                          flexDirection="column"
                                          justifyContent="center"
                                       >
                                          <Box as="button">
                                             <TiDeleteOutline
                                                onClick={() => {
                                                   removeItem(item)
                                                }}
                                             />
                                          </Box>
                                       </Flex>
                                    </Box>
                                 </Link>
                              )
                           }
                        })}
                     </Box>
                  )}
               </Flex>
            </PopoverBody>

            <PopoverFooter>
               <Flex justifyContent="space-evenly">
                  <Text color="black">
                     Total:{' '}
                     {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                     }).format(subtotal)}
                  </Text>
                  {items && (
                     <Button
                        color="white"
                        bgColor="teal.400"
                        onClick={checkout}
                     >
                        BUY NOW
                     </Button>
                  )}
               </Flex>
            </PopoverFooter>
         </PopoverContent>
      </Popover>
   )
}

export default CartIcon
