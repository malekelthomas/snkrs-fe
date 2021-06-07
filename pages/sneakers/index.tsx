import { Badge, Box } from '@chakra-ui/layout'
import {Grid, GridItem, Image} from '@chakra-ui/react'
import moment from 'moment'
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
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(()=>{
        shuffleArray(sneakers)
    },[])
    
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