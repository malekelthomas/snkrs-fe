import {
   Box,
   Button,
   Flex,
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { User } from '../lib/model/User'
import { registerUser } from '../lib/api/User'

const Register = () => {
   const [show, setShow] = React.useState(false)
   const handleClick = () => setShow(!show)

   return (
      <>
         <Flex justifyContent="center">
            <Box justifyContent="center">
               <Formik
                  initialValues={{
                     email: '',
                     first_name: '',
                     last_name: '',
                     password: '',
                  }}
                  onSubmit={(values, actions) => {
                     registerUser(values as User)
                        .then((res) => console.log(res))
                        .catch((e) => console.log(e))
                  }}
               >
                  <Form>
                     <Field name="email">
                        {({ field, form }) => (
                           <FormControl isRequired>
                              <FormLabel htmlFor="email">
                                 Email address
                              </FormLabel>
                              <Input {...field} id="email" type="email" />
                              <FormHelperText>
                                 We'll never share your email.
                              </FormHelperText>
                           </FormControl>
                        )}
                     </Field>
                     <Field name="first_name">
                        {({ field, form }) => (
                           <FormControl id="first_name" isRequired>
                              <FormLabel>First Name</FormLabel>
                              <Input {...field} id="first_name" />
                           </FormControl>
                        )}
                     </Field>
                     <Field name="last_name">
                        {({ field, form }) => (
                           <FormControl id="last__name" isRequired>
                              <FormLabel>Last Name</FormLabel>
                              <Input {...field} id="last__name" />
                           </FormControl>
                        )}
                     </Field>
                     <Field name="password">
                        {({ field, form }) => (
                           <FormControl id="password" isRequired>
                              <FormLabel>Password</FormLabel>
                              <InputGroup size="md">
                                 <Input
                                    {...field}
                                    pr="4.5rem"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Enter password"
                                 />
                                 <InputRightElement width="4.5rem">
                                    <Button
                                       h="1.75rem"
                                       size="sm"
                                       onClick={handleClick}
                                    >
                                       {show ? 'Hide' : 'Show'}
                                    </Button>
                                 </InputRightElement>
                              </InputGroup>
                           </FormControl>
                        )}
                     </Field>
                     <Button type="submit">Submit</Button>
                  </Form>
               </Formik>
            </Box>
         </Flex>
      </>
   )
}

export default Register
