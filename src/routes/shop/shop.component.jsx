import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'


const Shop = () => {

	return (
		//to-do: refactor with the most recent version of react routes

		<Routes>
			<Route index element = {<CategoriesPreview/>} />
			<Route path = ':category' element = {<Category/>} />
		</Routes>
	)
}

export default Shop
