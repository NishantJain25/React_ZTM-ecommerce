import { initializeApp } from "firebase/app"
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
	prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//database
export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
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
			})
		} catch (error) {
			console.log("error creating the user", error.message)
		}
	}

	return userDocRef
}
