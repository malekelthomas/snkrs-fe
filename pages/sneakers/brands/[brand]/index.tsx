import { Badge, Box, Flex, Heading } from '@chakra-ui/layout'
import { Grid, Image } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Sneaker } from '../../../../lib/model/sneaker'
import { getSneakersByBrand } from '../../../../lib/api/sneakers'
import { getBrands } from '../../../../lib/api/sneakers'
import {
   shuffleArray,
   newProduct,
   formatName,
   formatBrandName,
} from '../../../../lib/helpers/helpers'
import Menu from '../../../../components/menu/menu'
import SneakerCard from '../../../../components/sneaker/SneakerCard'

type Props = {
   error: string
   sneakers: Sneaker[]
   brand: string
   brands: string[]
}

const SneakersByBrand: NextPage<Props> = ({
   error,
   sneakers,
   brand,
   brands,
}) => {
   if (error) {
      console.error(error)
   }
   shuffleArray(sneakers)
   return (
      <>
         <Menu brands={brands} />
         <Flex justifyContent={'center'}>
            <Heading>{formatBrandName(brand)}</Heading>
         </Flex>
         <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {sneakers &&
               sneakers.map((sneaker: Sneaker) => (
                  <SneakerCard sneaker={sneaker} />
               ))}
         </Grid>
      </>
   )
}

export default SneakersByBrand

export const getStaticPaths: GetStaticPaths = async () => {
   const brands = await getBrands()
   const paths = brands.map((brand) => {
      return { params: { brand } }
   })

   return {
      paths,
      fallback: true,
   }
}
export const getStaticProps: GetStaticProps = async (context) => {
   const { brand } = context.params
   try {
      const sneakers = await getSneakersByBrand(brand as string)
      const brands = await getBrands()
      return {
         props: {
            error: null,
            brand,
            brands,
            sneakers,
         },
      }
   } catch (err) {
      return {
         props: {
            brand: null,
            error: err.message,
            sneakers: null,
         },
      }
   }
}
