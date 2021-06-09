import { Box, Flex, Text } from '@chakra-ui/layout';
import {Image} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';
import Menu from '../../../../../components/menu/menu';
import { getBrands, getSneakerByModel, getSneakers, getSneakersByBrand } from '../../../../../lib/api/sneakers';
import { Sneaker } from '../../../../../lib/model/sneaker';
import { formatBrandName, formatName } from '../../../../../lib/helpers/helpers';
import SneakerSelector from '../../../../../components/sneaker/SneakerSelector';



type Props = {
    sneaker:Sneaker;
    brands: string[];
}
const SneakerInfo:NextPage<Props> = ({sneaker, brands}) => {
    return (
        <>
        <Menu brands={brands}/>
            <Flex>
                {sneaker &&
                    <>
                        <Box>
                            <Image src={sneaker.photos ? sneaker.photos[0] : ""} alt={sneaker.model}/>
                            <Text>{sneaker.release_date ? `Release Date: ${sneaker.release_date}` : ""}</Text>
                        </Box>
                        <Box>
                            <Text>{`${formatBrandName(sneaker.brand)} ${formatName(sneaker.model)}`}</Text>
                            <SneakerSelector sneaker={sneaker}/>
                        </Box>

                    </>
                }
                
            </Flex>
        </>
    )
}

export default SneakerInfo


export const getStaticPaths: GetStaticPaths = async () => {
    const brands = await getBrands()
    let params = []
    const paths = brands.map((brand) => {
       getSneakersByBrand(brand)
       .then(sneakers => {
           sneakers.map((sneaker) => {
               params.push(
                {params: {
                    brand: brand,
                    model: encodeURI(sneaker.model)
                }}
                ) 
           })
       }

       )
    })
    
    return {
        paths: params,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {model} = context.params
    try {
        const sneaker = await getSneakerByModel(model as string)
        const brands = await getBrands()
        return {
            props: {
                error:null,
                brands,
                sneaker
            }
        }
    } catch (err) {
        return {
            props: {
                brands: null,
                error: err.message,
                sneaker: null
            }
        }
    }
}