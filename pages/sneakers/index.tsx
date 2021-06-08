import { Badge, Box } from '@chakra-ui/layout'
import {Grid, Image} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { Sneaker } from '../../lib/model/sneaker'
import { getSneakers, getBrands } from '../../lib/api/sneakers';
import { useEffect } from 'react'
import { newProduct, shuffleArray, formatName } from '../../lib/helpers/helpers';
import Menu from '../../components/menu/menu'

type Props =  {
    error: string,
    sneakers: Sneaker[]
    brands: string[]
}

const Sneakers: NextPage<Props> = ({error, sneakers, brands}) => {

    if (error){
        console.error(error)
    }
    
    shuffleArray(sneakers)
    return (
        <>
        <Menu brands={brands} />
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {sneakers && sneakers.map(sneaker => {
                    return (
                    <Box maxW="sm" borderWidth="5px" borderRadius="lg" overflow="hidden">
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
                    )
                })}
            </Grid>
        </>
    )
}

export default Sneakers

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await getSneakers()
        const brands = await getBrands()
        return {
            props: {
                error:null,
                sneakers: res,
                brands: brands
            }
        }
    } catch (err) {
        return {
            props: {
                error: err.message,
                sneakers: null,
                brands: null
            }
        }
    }
}