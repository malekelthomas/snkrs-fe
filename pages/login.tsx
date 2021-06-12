import {
   Box,
   Button,
   FormControl,
   FormHelperText,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { registerUser } from '../lib/api/User'
import { User, UserRole } from '../lib/model/User'
import { supabase } from '../lib/supabase/Supabase'
import { setUser } from '../store/slices/userSlice'

const Login = () => {
   const [show, setShow] = useState(false)
   const handleClick = () => setShow(!show)
   const [error, setError] = useState('')
   const user = useAppSelector((state) => state.user)
   const dispatch = useAppDispatch()

   return (
      <>
         <Box
            justifyContent="center"
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
         >
            <Formik
               initialValues={{
                  email: '',
                  first_name: '',
                  last_name: '',
                  password: '',
               }}
               onSubmit={(values, actions) => {
                  let user: User = {
                     first_name: values.first_name,
                     last_name: values.last_name,
                     user_role: UserRole.Customer,
                     email: values.email,
                  }
                  //register user in supabase
                  supabase.auth
                     .signIn({
                        email: user.email,
                        password: values.password,
                     })
                     .then((res) => {
                        if (res.user) {
                           user.auth_id = res.user.id
                        }
                     })
                     .finally(() => {
                        if (user.auth_id !== undefined) {
                           dispatch(setUser(user))
                           window.location.href = `/sneakers/`
                        }
                     })
                     .catch((e) => {
                        console.log(e)
                        setError(e.error_description)
                     })
               }}
            >
               <Form>
                  <Field name="email">
                     {({ field, form }) => (
                        <FormControl isRequired>
                           <FormLabel htmlFor="email">Email address</FormLabel>
                           <Input {...field} id="email" type="email" />
                           <FormHelperText>
                              We'll never share your email.
                           </FormHelperText>
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
         {error && <div>{error}</div>}
      </>
   )
}

export default Login
