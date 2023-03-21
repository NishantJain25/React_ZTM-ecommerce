import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"

import { signOutUser } from "../../utils/firebase/firebase.utils"

import {
	NavigationContainer,
	LogoContainer,
	NavLinksContainer,
	NavLink,
} from "./navigation.styles.jsx"

import { useSelector } from "react-redux"

import { selectIsCartOpen } from "../../store/cart/cart.selector"
import { selectCurrentUser } from "../../store/user/user.selector"

const Navigation = () => {
	const currentUser = useSelector(selectCurrentUser)
	//const { currentUser } = useContext(UserContext)
	const isCartOpen = useSelector(selectIsCartOpen)
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
