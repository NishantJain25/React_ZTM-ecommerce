import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { signOutUser } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../contexts/user.context"
import { CartContext } from "../../contexts/cart.context"

import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLink,
} from "./navigation.styles.jsx"

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const { isCartOpen, setIsCartOpen } = useContext(CartContext)
	const signOutHandler = async () => {
		await signOutUser()
	}
	return (
		<NavigationContainer>
			<LogoContainer to="/">
				<CrwnLogo className="logo" />
			</LogoContainer>
			<NavLinksContainer>
				<NavLink to="shop">SHOP</NavLink>
				<NavLink to="shop">CONTACT</NavLink>
				{currentUser ? (
					<NavLink as="span" onClick={signOutHandler}>
						SIGN OUT
					</NavLink>
				) : (
					<NavLink to="auth">SIGN IN</NavLink>
				)}
				<CartIcon />
			</NavLinksContainer>
			{isCartOpen && <CartDropdown />}
		</NavigationContainer>
	)
}

export default Navigation
