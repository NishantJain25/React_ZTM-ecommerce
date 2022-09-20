import { initializeApp } from "firebase/app"

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth"

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyD3Uc0jnrs29k514P9gJn09d8wgHcBsp8o",
	authDomain: "crwn-clothing-db-d104d.firebaseapp.com",
	projectId: "crwn-clothing-db-d104d",
	storageBucket: "crwn-clothing-db-d104d.appspot.com",
	messagingSenderId: "561628964066",
	appId: "1:561628964066:web:c5f851b00bd50bee6deabb",
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider() //there can be multiple providers hence instantiated as new class

provider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//database
export const db = getFirestore()

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid) //if user does not exist, google still returns an object with an id and a path that points to where google wants us to create the object
	console.log(userDocRef)

	const userSnapshot = await getDoc(userDocRef) //allows us to check if the instance exists in the database
	console.log(userSnapshot.exists())

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
                ...additionalInfo
			})
		} catch (error) {
			console.log("error creating the user", error.message)
		}
	}

	return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return

	return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if(!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}