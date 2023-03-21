import { Routes, Route } from "react-router-dom"
import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from "../category/category.component"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { setCategories } from "../../store/categories/categories.action"

const Shop = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments()
			dispatch(setCategories(categoriesArray))
		}

		getCategoriesMap()
	}, [])

	return (
		//to-do: refactor with the most recent version of react routes

		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	)
}

export default Shop
