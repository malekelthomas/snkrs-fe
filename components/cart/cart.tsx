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
import { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const CartIcon = () => {
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
            <PopoverBody></PopoverBody>
            <PopoverFooter>Total:</PopoverFooter>
         </PopoverContent>
      </Popover>
   )
}

export default CartIcon
