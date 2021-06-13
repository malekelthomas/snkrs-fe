import { Flex, Box, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const PaginateArrows = ({ page, url }) => {
   const router = useRouter()

   const pageChange = (n) => {
      router.push(`${url}/${+page + n}`)
   }
   return (
      <>
         <Flex
            justifyContent="space-between"
            sx={{ position: 'sticky', top: '300px' }}
         >
            <Box
               onClick={() => {
                  pageChange(-1)
               }}
               bgColor="teal.50"
               as="button"
               sx={{ position: 'sticky', top: '0' }}
            >
               {parseInt(page) !== 1 && (
                  <>
                     <AiOutlineLeft size="30px" />
                     <Text fontSize="xs">Prev</Text>
                  </>
               )}
            </Box>
            <Box
               onClick={() => {
                  pageChange(1)
               }}
               bgColor="teal.50"
               as="button"
               sx={{ position: 'sticky', top: '0' }}
            >
               <AiOutlineRight size="30px" />
               <Text fontSize="xs">Next</Text>
            </Box>
         </Flex>
      </>
   )
}

export default PaginateArrows
