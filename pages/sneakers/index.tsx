import { Badge, Box } from '@chakra-ui/layout'
import {Grid, Image} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { Sneaker } from '../../lib/model/sneaker'
import { getSneakers } from '../../lib/api/sneakers'
import { useEffect } from 'react'

type Props =  {
    error: string,
    sneakers: Sneaker[]
}

const Sneakers: NextPage<Props> = ({error, sneakers}) => {

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
                                {sneaker.model}
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
        return {
            props: {
                error:null,
                sneakers: res
            }
        }
    } catch (err) {
        return {
            props: {
                error: err.message,
                sneakers: null
            }
        }
    }
}