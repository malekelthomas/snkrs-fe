import { Badge, Box, Flex, Heading } from '@chakra-ui/layout'
import {Grid,Image} from '@chakra-ui/react'
import {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Sneaker } from '../../../../lib/model/sneaker'
import { getSneakersByBrand } from '../../../../lib/api/sneakers';
import { getBrands } from '../../../../lib/api/sneakers';

type Props =  {
    error: string,
    sneakers: Sneaker[]
    brand: string
}

const SneakersByBrand: NextPage<Props> = ({error, sneakers, brand}) => {

    if (error){
        console.error(error)
    }
    function shuffleArray(array) {
        if (array != null){
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }
    shuffleArray(sneakers)
    function newProduct(product_date:Date): boolean {
        if (product_date == undefined) {
            return false
        }
        let weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate()-30)
        let weekAgoTime = weekAgo.getTime()
        let today = new Date()
        let todayTime = today.getTime()
        let product_dateTime = new Date(product_date).getTime()
        return weekAgoTime <= product_dateTime && product_dateTime <= todayTime
    }
    return (
        <>
        <Flex justifyContent={"center"}>
            <Heading>{brand[0].toUpperCase()+brand.slice(1).toLowerCase()}</Heading>
        </Flex>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {sneakers && sneakers.map(sneaker => (
                <Box  maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Image src={sneaker.photos ? sneaker.photos[0] : ""} alt={sneaker.model}/>
                    <Box p="6">
                        <Box d="flex" alignItems="baseline">
                            {newProduct(sneaker.release_date) && 
                                <Badge borderRadius="full" px="2" colorScheme="red">
                                    New Release
                                </Badge>
                            }
                        </Box>
                    </Box>
                </Box>
        ))}
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