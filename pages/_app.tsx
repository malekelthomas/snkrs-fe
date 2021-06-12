import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import { supabase } from '../lib/supabase/Supabase'
import { Provider } from 'react-redux'
import { store, persistor } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react'
import Loading from '../components/Loading'

function MyApp({ Component, pageProps }) {
   supabase
   return (
      <ChakraProvider>
         <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
               <Component {...pageProps} />
            </PersistGate>
         </Provider>
      </ChakraProvider>
   )
}

export default MyApp
