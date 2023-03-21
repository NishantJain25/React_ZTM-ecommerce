import { CART_ACTION_TYPES } from "./cart.types"
import { useReducer } from "react"

export const modifyCartItem = (cartItems, productToModify, operation) => {
	return cartItems.map((cartItem) =>
		cartItem.id === productToModify.id
			? operation === "add"
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	)
}

export const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems, productToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}
export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd)
	console.log(newCartItems)
	return {
		type: CART_ACTION_TYPES.SET_CART_ITEMS,
		payload: newCartItems,
	}
}

export const removeItemFromCart = (cartItems, productToRemove) => {
	const newCartItems = removeCartItem(cartItems, productToRemove)
	return {
		type: CART_ACTION_TYPES.SET_CART_ITEMS,
		payload: newCartItems,
	}
}

export const modifyCartItemQuantity = (
	cartItems,
	productToModify,
	operation
) => {
	const newCartItems = modifyCartItem(cartItems, productToModify, operation)
	return {
		type: CART_ACTION_TYPES.SET_CART_ITEMS,
		payload: newCartItems,
	}
}

export const setIsCartOpen = (boolean) => {
	return {
		type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
		payload: boolean,
	}
}
