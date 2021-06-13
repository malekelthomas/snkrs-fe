import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Grid, Heading, Image } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import Menu from '../../../../../../components/menu/menu'
import {
   getBrands,
   getSneakerByModel,
   getSneakerCountByBrand,
   getSneakers,
   getSneakersByBrand,
   getSneakersByBrandWPagination,
   getSneakersWPagination,
} from '../../../../../../lib/api/Sneakers'
import { Sneaker } from '..../../../lib/model/Sneaker'
import {
   formatBrandName,
   formatName,
   shuffleArray,
} from '../../../../../../lib/helpers/helpers'
import SneakerSelector from '../../../../../../components/sneaker/SneakerSelector'
import qs from 'query-string'
import { CartItem } from '../../../../../../lib/model/Cart'
import { useState } from 'react'
import SneakerCard from '../../../../../../components/sneaker/SneakerCard'
import PaginateArrows from '../../../../../../components/Pagination'

type Props = {
   error: string
   sneakers: Sneaker[]
   brand: string
   brands: string[]
   page: string
}

const SneakersByBrand: NextPage<Props> = ({
   error,
   sneakers,
   brand,
   brands,
   page,
}) => {
   if (error) {
      console.error(error)
   }
   return (
      <>
         <Menu brands={brands} />
         <Flex justifyContent={'center'}>
            <Heading>{brand ? formatBrandName(brand) : ''}</Heading>
         </Flex>
         <PaginateArrows page={page} url={`/sneakers/brands/${brand}/page`} />
         <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {sneakers &&
               sneakers.map((sneaker: Sneaker) => {
                  if (sneaker.model !== undefined) {
                     return <SneakerCard sneaker={sneaker} />
                  }
               })}
         </Grid>
      </>
   )
}

export default SneakersByBrand

export const getStaticPaths: GetStaticPaths = async () => {
   const brands = await getBrands()

   let params = []
   brands.map(async (brand) => {
      let count = await getSneakerCountByBrand(brand)
      let pageNum = 1
      while (count > 0) {
         params.push({
            params: {
               brand: brand,
               page: pageNum,
            },
         })
         pageNum += 1
         count -= 20
      }
   })

   return {
      paths: params,
      fallback: true,
   }
}

export const getStaticProps: GetStaticProps = async (context) => {
   const { brand, page } = context.params
   try {
      const sneakers = await getSneakersByBrandWPagination(
         brand as string,
         page as string
      )
      console.log(sneakers)
      const brands = await getBrands()
      return {
         props: {
            error: null,
            brand,
            brands,
            sneakers,
            page,
         },
      }
   } catch (err) {
      return {
         props: {
            brands: null,
            brand: null,
            error: err.message,
            sneakers: null,
         },
      }
   }
}
