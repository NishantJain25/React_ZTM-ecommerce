import React, { useEffect } from "react"
import SignUpForm from '../../components/sign-up form/sign-up-form.component'
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import { getRedirectResult } from "firebase/auth"

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup()
		const userDocRef = await createUserDocumentFromAuth(response.user)
	}

	return (
		<div>
			<h1>SignIn</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
			<SignUpForm/>
		</div>
	)
}

export default SignIn
