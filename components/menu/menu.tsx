import { useState } from 'react'
import MenuContainer from './menu_container'
import MenuToggle from './menu_toggle'
import Logo from './logo'
import MenuLinks from './menu_links'
import CartIcon from '../cart/cart'

const Menu = (props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   const toggle = () => setIsOpen(!isOpen)
   return (
      <MenuContainer {...props}>
         <Logo w="100px" color={['white', 'white', 'green', 'green']} />
         <MenuToggle toggle={toggle} isOpen={isOpen} />
         <MenuLinks brands={props.brands} isOpen={isOpen} />
         <CartIcon />
      </MenuContainer>
   )
}

export default Menu
