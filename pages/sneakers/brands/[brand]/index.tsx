import { Badge, Box, Flex, Heading } from '@chakra-ui/layout'
import {Grid,Image} from '@chakra-ui/react'
import {GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Sneaker } from '../../../../lib/model/sneaker'
import { getSneakersByBrand } from '../../../../lib/api/sneakers';
import { getBrands } from '../../../../lib/api/sneakers';
import { shuffleArray, newProduct, formatName, formatBrandName } from '../../../../lib/helpers/helpers';

type Props =  {
    error: string,
    sneakers: Sneaker[]
    brand: string
}



const SneakersByBrand: NextPage<Props> = ({error, sneakers, brand}) => {

    if (error){
        console.error(error)
    }
    shuffleArray(sneakers)
    return (
        <>
        <Flex justifyContent={"center"}>
            <Heading>{formatBrandName(brand)}</Heading>
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
                        <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                isTruncated
                            >
                                {sneaker.model ? formatName(sneaker.model) : ""}
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