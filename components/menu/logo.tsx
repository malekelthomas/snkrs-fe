import React from "react"
import { Box, Text} from "@chakra-ui/react"
import Link from "next/link"

const Logo = (props) => {
    return (
        <Link href="/sneakers">
            <Box as="button" {...props}>
                <Text fontSize="lg" fontWeight="bold">
                    SNKRZ
                </Text>
            </Box>
        </Link>
    )
}

export default Logo