import { Outlet } from "react-router-dom"
import Home from "./routes/home/home.component.jsx"
import Navigation from "./routes/navigation/navigation.component.jsx"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
	onAuthStateChangeListener,
	createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils"
import { setCurrentUser } from "./store/user/user.action"

const App = () => {
	const dispatch = useDispatch() //does not update so no use of adding it to the dependency array.

	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user)
			}
			dispatch(setCurrentUser(user))
		})
		return unsubscribe
	}, [])

	return (
		<>
			<Navigation />
			<Outlet />
		</>
	)
}

export default App
