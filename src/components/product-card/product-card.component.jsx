import { useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector"
import { addItemToCart } from "../../store/cart/cart.action"
import "./product-card.styles.scss"
import Button from "../button/button.component"
const ProductCard = ({ product }) => {
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const { name, price, imageUrl } = product

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={`${name}`} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">${price}</span>
			</div>
			<Button buttonType="inverted" onClick={addProductToCart}>
				Add to Cart
			</Button>
		</div>
	)
}

export default ProductCard
