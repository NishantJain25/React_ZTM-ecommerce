import React from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	modifyCartItemQuantity,
	removeItemFromCart,
} from "../../store/cart/cart.action"
import { selectCartItems } from "../../store/cart/cart.selector"

import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }) => {
	const cartItems = useSelector(selectCartItems)
	const { name, imageUrl, price, quantity } = cartItem
	const dispatch = useDispatch()

	const removeItemHandler = () =>
		dispatch(removeItemFromCart(cartItems, cartItem))

	const addItemHandler = () =>
		dispatch(modifyCartItemQuantity(cartItems, cartItem, "add"))

	const subtractItemHandler = () =>
		quantity === 1
			? dispatch(removeItemFromCart(cartItems, cartItem))
			: dispatch(modifyCartItemQuantity(cartItems, cartItem, "subtract"))

	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={subtractItemHandler}>
					&#10094;
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={addItemHandler}>
					&#10095;
				</div>
			</span>
			<span className="price">{price}</span>
			<div className="remove-button" onClick={removeItemHandler}>
				&#10005;
			</div>
		</div>
	)
}

export default CheckoutItem
