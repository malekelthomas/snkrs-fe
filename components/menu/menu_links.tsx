import { Box, Stack, Text } from '@chakra-ui/layout'
import Link from 'next/link'
import React from 'react'
import { formatBrandName } from '../../lib/helpers/helpers'
import CartIcon from '../cart/cart'
import UserIcon from '../user/User'

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
   return <Link href={to}>{children}</Link>
}

const MenuLinks = ({ isOpen, brands }) => {
   return (
      <Box
         display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
         flexBasis={{ base: '100%', md: 'auto' }}
      >
         <Stack
            spacing={8}
            align="center"
            justify={['center', 'space-between', 'flex-end', 'flex-end']}
            direction={['column', 'row', 'row', 'row']}
            pt={[4, 4, 0, 0]}
         >
            {brands &&
               brands.map((brand, i) => {
                  let route = `/sneakers/brands/${brand}/page/1`
                  return (
                     <MenuItem
                        to={route}
                        isLast={i + 1 == brands.length ? true : false}
                     >
                        {formatBrandName(brand)}
                     </MenuItem>
                  )
               })}
               <UserIcon />
               <CartIcon />
         </Stack>
      </Box>
   )
}

export default MenuLinks
