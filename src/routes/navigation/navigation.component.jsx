import { useContext } from "react"
import { Link } from "react-router-dom"
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import "./navigation.styles.scss"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import { UserContext } from "../../contexts/user.context"

const Navigation = () => {
	const { currentUser } = useContext(UserContext)
	const signOutHandler = async () => {
		await signOutUser()
	}
	return (
		<div className="navigation">
			<Link className="logo-container" to="/">
				<CrwnLogo className="logo" />
			</Link>
			<div className="nav-links-container">
				<Link className="nav-link" to="shop">
					SHOP
				</Link>
				{currentUser ? (
					<span className="nav-link" onClick={signOutHandler}>
						SIGN OUT
					</span>
				) : (
					<Link className="nav-link" to="auth">
						SIGN IN
					</Link>
				)}
				<Link className="nav-link" to="shop">
					CONTACT
				</Link>
			</div>
		</div>
	)
}

export default Navigation
