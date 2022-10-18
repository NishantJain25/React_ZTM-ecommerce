import { createContext, useEffect, useReducer } from "react"
import {
	onAuthStateChangeListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils"

//actual value you wanna access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
})

//instead of using useState for setting the current user (which is much easier in this case) we use reducer just as a demonstration of how it is used. Easier to scale using reducers.
//to revert back to normal context delete all reducer code and uncomment useState.
export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
}

const userReducer = (state, action) => {
	console.log("dispatched")
	console.log(action)
	const { type, payload } = action
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			}

		default:
			throw new Error(`Unhandled type ${type}`)
	}
}

const INITIAL_STATE = {
	currentUser: null,
}
export const UserProvider = ({ children }) => {
	//const [currentUser, setCurrentUser] = useState(null)

	const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
	console.log(currentUser)

	const setCurrentUser = (user) => {
		dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
	}

	const value = { currentUser, setCurrentUser }
	useEffect(() => {
		const unsubscribe = onAuthStateChangeListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user)
			}
			setCurrentUser(user)
		})
		return unsubscribe
	}, [])
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
