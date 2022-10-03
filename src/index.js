import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import { UserProvider } from "./contexts/user.context"
import { CategoriesProvider } from "./contexts/categories.context"
import { CartProvider } from "./contexts/cart.context"
import "./index.scss"
import reportWebVitals from "./reportWebVitals"

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom"

import Home from "./routes/home/home.component.jsx"
import Authentication from "./routes/authentication/authentication.component.jsx"
import Shop from "./routes/shop/shop.component.jsx"
import Checkout from "./routes/checkout/checkout.component.jsx"

const root = ReactDOM.createRoot(document.getElementById("root"))

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="shop/*" element={<Shop />} />
			<Route path="auth" element={<Authentication />} />
			<Route path="checkout" element={<Checkout />} />
		</Route>
	)
)
root.render(
	<React.StrictMode>
		<UserProvider>
			<CategoriesProvider>
				<CartProvider>
					<RouterProvider router={router} />
				</CartProvider>
			</CategoriesProvider>
		</UserProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
