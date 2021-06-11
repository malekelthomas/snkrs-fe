import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import { supabase } from '../lib/supabase/Supabase'

function MyApp({ Component, pageProps }) {
   supabase
   return (
      <ChakraProvider>
         <Component {...pageProps} />
      </ChakraProvider>
   )
}

export default MyApp
