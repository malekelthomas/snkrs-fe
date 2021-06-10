import { Box, Image, Badge} from "@chakra-ui/react"
import Link from "next/link";
import React from "react"
import { newProduct, formatName } from "../../lib/helpers/helpers"
import { Sneaker } from '../../lib/model/sneaker';



const SneakerCard = ({sneaker}) => {

    return (
        <Link href={`/sneakers/brands/${sneaker.brand}/${encodeURIComponent(sneaker.model)}`}>
            <Box as="button" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
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
        </Link>
    )

}

export default SneakerCard