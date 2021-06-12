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
import React from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useAppSelector } from '../../hooks'

const UserIcon = () => {
   const user = useAppSelector((state) => state.user)
   return (
      <Popover>
         <PopoverTrigger>
            <Button>
               <AiOutlineUser size="25px" color="black" />
            </Button>
         </PopoverTrigger>
         <PopoverContent>
            <Flex justifyContent="space-evenly">
               <PopoverArrow />
               <PopoverCloseButton />
               {user.auth_id == undefined ||
                  (user.auth_id == '' && (
                     <>
                        <Link href="/login">
                           <Text as="button">Login</Text>
                        </Link>
                        <Divider />
                        <Link href="/register">
                           <Text as="button">Register</Text>
                        </Link>
                     </>
                  ))}

               {user.auth_id.length > 0 && (
                  <Link href="#">
                     <Text as="button">My Orders</Text>
                  </Link>
               )}
            </Flex>
         </PopoverContent>
      </Popover>
   )
}

export default UserIcon
