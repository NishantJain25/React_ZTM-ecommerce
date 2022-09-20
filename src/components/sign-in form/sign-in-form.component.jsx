import React, { useState } from "react"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import { auth } from "../../utils/firebase/firebase.utils"
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"
import "./sign-in-form.styles.scss"

const defaultFormFields = {
	email: "",
	password: "",
}
const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields)
	const { email, password } = formFields

	const signInWithGoogle = async () => {
		const response = await signInWithGooglePopup()
		await createUserDocumentFromAuth(response.user)
	}
	const handleChange = (event) => {
		const { name } = event.target
		setFormFields({ ...formFields, [name]: event.target.value })
	}

	const handleSignIn = () => {
		console.log(auth.curentUser)
	}

	const resetFormFields = () => {
		setFormFields(defaultFormFields)
	}

	const onSubmit = async (event) => {
		event.preventDefault()

		try {
			const response = await signInAuthUserWithEmailAndPassword(email, password)
			console.log(response)
			resetFormFields()
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect password")
					break

				case "auth/user-not-found":
					alert("User not found")
					break

				default:
					console.log(error)
			}
		}
	}
	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<span>Sign in using email and password</span>
			<form onSubmit={onSubmit}>
				<FormInput
					label="Email"
					type="email"
					required
					onChange={handleChange}
					name="email"
					value={email}
				/>
				<FormInput
					label="Password"
					type="password"
					required
					onChange={handleChange}
					name="password"
					value={password}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" onClick={signInWithGoogle} buttonType="google">
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	)
}

export default SignInForm
