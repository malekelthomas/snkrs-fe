import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Grid, Image } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Menu from '../../../components/menu/menu'
import {
   getBrands,
   getSneakerByModel,
   getSneakerCount,
   getSneakers,
   getSneakersByBrand,
   getSneakersWPagination,
} from '../../../lib/api/Sneakers'
import { Sneaker } from '../../../lib/model/Sneaker'
import {
   formatBrandName,
   formatName,
   shuffleArray,
} from '../../../lib/helpers/helpers'
import SneakerSelector from '../../../components/sneaker/SneakerSelector'
import qs from 'query-string'
import { CartItem } from '../../../lib/model/Cart'
import { useState } from 'react'
import SneakerCard from '../../../components/sneaker/SneakerCard'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { useRouter } from 'next/router'
import PaginateArrows from '../../../components/Pagination'
type Props = {
   sneakers: Sneaker[]
   brands: string[]
   error: string
   page: string
}

const Sneakers: NextPage<Props> = ({ error, sneakers, brands, page }) => {
   if (error) {
      console.error(error)
   }

   shuffleArray(sneakers)
   return (
      <>
         <Menu brands={brands} />
         <PaginateArrows page={page} url={'/sneakers'} />
         <Flex justifyContent="center">
            <Grid templateColumns="repeat(5, 1fr)" gap={5}>
               {sneakers &&
                  sneakers.map((sneaker) => <SneakerCard sneaker={sneaker} />)}
            </Grid>
         </Flex>
      </>
   )
}

export default Sneakers

export const getStaticPaths: GetStaticPaths = async () => {
   let params = []
   let count = await getSneakerCount()
   const pageSize = 40
   let pageNum = 1
   while (count > 0) {
      params.push({
         params: { page: '' + pageNum },
      })
      pageNum += 1
      count -= pageSize
   }

   return {
      paths: params,
      fallback: true,
   }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   // fetch data based on page
   try {
      const sneakers = await getSneakersWPagination(params.page as string)
      const brands = await getBrands()
      return {
         props: {
            sneakers,
            brands,
            page: params.page,
         },
      }
   } catch (err) {
      return {
         props: {
            error: err.message,
            sneakers: null,
            brands: null,
         },
      }
   }
}
