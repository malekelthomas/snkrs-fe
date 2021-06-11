import { Flex } from '@chakra-ui/layout'

const MenuContainer = ({ children, ...props }) => {
   return (
      <Flex
         as="nav"
         align="center"
         justify="space-between"
         wrap="wrap"
         w="100%"
         mb={8}
         p={8}
         bg={['palegoldenrod', 'palegoldenrod', 'transparent', 'transparent']}
         color={['white', 'white', 'palegoldenrod', 'palegoldenrod']}
         {...props}
      >
         {children}
      </Flex>
   )
}

export default MenuContainer
