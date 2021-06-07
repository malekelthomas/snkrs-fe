import { Badge, Box } from '@chakra-ui/layout'
import {Grid,Image} from '@chakra-ui/react'
import {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Sneaker } from '../../../lib/model/sneaker'
import { getSneakersByBrand } from '../../../lib/api/sneakers';
import { getBrands } from '../../../lib/api/sneakers';

type Props =  {
    error: string,
    sneakers: Sneaker[]
    brand: string
}

const SneakersByBrand: NextPage<Props> = ({error, sneakers, brand}) => {

    if (error){
        console.error(error)
    }
    function newProduct(date:Date): boolean {
        let weekAgo = new Date()
        date.setDate(weekAgo.getDate()-12)
        let today = new Date()
        return date >= weekAgo && date <= today
    }
    return (
        <>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {sneakers.map(sneaker => {
                <Box  maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image src={sneaker.photos ? sneaker.photos[0] : ""} alt={sneaker.model}/>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            {newProduct(sneaker.release_date) && 
                                <Badge borderRadius="full" px="2" colorScheme="red">
                                    New
                                </Badge>
                            }
                        </Box>
                    </Box>
                </Box>
        })}
        </Grid>
        </>
    )
}

export default SneakersByBrand

export const getStaticPaths: GetStaticPaths = async () => {
    const brands = await getBrands()
    const paths = brands.map((brand) => {
        return { params: {brand}}
    })
    
    return {
        paths,
        fallback: true
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const {brand} = context.params
    try {
        const res = await getSneakersByBrand(brand as string)
        return {
            props: {
                error:null,
                brand,
                sneakers: res
            }
        }
    } catch (err) {
        return {
            props: {
                brand: null,
                error: err.message,
                sneakers: null
            }
        }
    }
}