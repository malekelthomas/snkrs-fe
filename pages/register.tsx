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
import { User, UserRole } from '../lib/model/User'
import { registerUser } from '../lib/api/User'
import { supabase } from '../lib/supabase/Supabase'

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
                     let user = values as User
                     user.user_role = UserRole.Customer
                     //register user in supabase
                     supabase.auth
                        .signUp({
                           email: user.email,
                           password: user.password,
                        })
                        .then((res) => {
                           if (res.user) {
                               //set user authid to id from supabase
                              user.auth_id = res.user.id
                           } else {
                              console.log(
                                 'no user in response from supabase',
                                 res
                              )
                           }
                        })
                        .catch((e) => console.log(e))
                     if (user.auth_id !== '' || user.auth_id == undefined) {
                        registerUser(user)
                           .then((res) => {
                              console.log(res)
                              window.location.href = `/sneakers/`
                           })
                           .catch((e) => console.log(e))
                     }
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