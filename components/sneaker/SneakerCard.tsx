import { Box, Image, Badge, Flex } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { newProduct, formatName } from '../../lib/helpers/helpers'
import { Sneaker } from '../../lib/model/Sneaker'
import SneakerSelector from './SneakerSelector'
import { useState } from 'react'

const SneakerCard = ({ sneaker }) => {
   const [show, setShow] = useState<boolean>(false)

   return (
      <Link
         href={`/sneakers/brands/${sneaker.brand}/${encodeURIComponent(
            sneaker.model
         )}`}
         passHref={true}
      >
         <Box
            as="button"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
         >
            <Image
               src={sneaker.photos ? sneaker.photos[0] : ''}
               alt={sneaker.model}
            />
            <Box id="sneaker-card-info">
               <Flex justifyContent="center">
                  {newProduct(sneaker.release_date) && (
                     <Badge
                        borderRadius="full"
                        colorScheme="red"
                        fontSize="x-small"
                     >
                        New
                     </Badge>
                  )}
               </Flex>

               <Box
                  mt="1"
                  fontWeight="semibold"
                  as="p"
                  lineHeight="tight"
                  fontSize="xs"
               >
                  {sneaker.model ? formatName(sneaker.model) : ''}
               </Box>
            </Box>
         </Box>
      </Link>
   )
}

export default SneakerCard
