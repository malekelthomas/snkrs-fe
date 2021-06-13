import {
   Popover,
   PopoverTrigger,
   Button,
   PopoverContent,
   PopoverArrow,
   PopoverCloseButton,
   Text,
   Divider,
   Flex,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { clearUser } from '../../store/slices/userSlice'

const UserIcon = () => {
   const user = useAppSelector((state) => state.user)

   const dispatch = useAppDispatch()
   const router = useRouter()
   const logout = () => {
      dispatch(clearUser())
      router.push(`/sneakers/1`)
   }
   return (
      <Popover>
         <PopoverTrigger>
            <Button>
               <AiOutlineUser size="25px" color="black" />
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            {user.auth_id == undefined ||
               (user.auth_id == '' && (
                  <>
                     <Flex justifyContent="space-between">
                        <Link href="/login">
                           <Text as="button" color="black">
                              Login
                           </Text>
                        </Link>
                        <Divider />
                        <Link href="/register">
                           <Text as="button" color="black">
                              Register
                           </Text>
                        </Link>
                     </Flex>
                  </>
               ))}

            {user.auth_id.length > 0 && (
               <>
                  <Link href="#">
                     <Text as="button" color="black">
                        My Orders
                     </Text>
                  </Link>
                  <Text as="button" color="black" onClick={logout}>
                     Logout
                  </Text>
               </>
            )}
         </PopoverContent>
      </Popover>
   )
}

export default UserIcon
