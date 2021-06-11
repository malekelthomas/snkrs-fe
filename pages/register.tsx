import {
   Box,
   Flex,
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
} from '@chakra-ui/react'
import React from 'react'

const Register = () => {
   return (
      <>
         <Flex justifyContent="center">
            <Box>
               <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                  <FormHelperText>We'll never share your email.</FormHelperText>
               </FormControl>
            </Box>
         </Flex>
      </>
   )
}

export default Register
