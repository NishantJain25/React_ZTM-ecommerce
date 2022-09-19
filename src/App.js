import { Outlet } from "react-router-dom"
import Home from "./routes/home/home.component.jsx"
import Navigation from "./routes/navigation/navigation.component.jsx"


const App = () => {
	return (
		<>
			<Navigation />
			<Outlet />
		</>
	)
}

export default App
