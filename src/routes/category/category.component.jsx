import "./category.styles.scss"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
//import { CategoriesContext } from "../../contexts/categories.context"
import { useSelector } from "react-redux"
import { selectCategoriesMap } from "../../store/categories/categories.selector"

import ProductCard from "../../components/product-card/product-card.component"

import React from "react"

const Category = () => {
	const { category } = useParams()
	//const { categoriesMap } = useContext(CategoriesContext)
	const categoriesMap = useSelector(selectCategoriesMap)

	const [products, setProducts] = useState(categoriesMap[category])
	console.log(categoriesMap)
	useEffect(() => {
		setProducts(categoriesMap[category])
	}, [category, categoriesMap])

	return (
		<>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			<div className="category-container">
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</>
	)
}

export default Category
