import React, { useContext } from "react"
import { CartContext } from "../../contexts/cart.context"
import "./checkout-item.styles.scss"

const CheckoutItem = ({ cartItem }) => {
	const { name, imageUrl, price, quantity } = cartItem
	const { modifyCartItemQuantity, removeItemFromCart } = useContext(CartContext)

	const removeItemHandler = () => removeItemFromCart(cartItem)

	const addItemHandler = () => modifyCartItemQuantity(cartItem, "add")

	const subtractItemHandler = () =>
		quantity === 1
			? removeItemFromCart(cartItem)
			: modifyCartItemQuantity(cartItem, "subtract")

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
