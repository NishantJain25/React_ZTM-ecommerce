import { initializeApp } from "firebase/app"

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth"

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from "firebase/firestore"

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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey)
	const batch = writeBatch(db)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase())
		batch.set(docRef, object)
	})

	await batch.commit()
	console.log("done")
}

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories")
	const q = query(collectionRef)

	const querySnapshot = await getDocs(q)
	return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
	
}

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfo = {}
) => {
	if (!userAuth) return

	const userDocRef = doc(db, "users", userAuth.uid) //if user does not exist, google still returns an object with an id and a path that points to where google wants us to create the object

	const userSnapshot = await getDoc(userDocRef) //allows us to check if the instance exists in the database

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth
		const createdAt = new Date()
		
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
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
	if (!email || !password) return

	return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
	await signOut(auth)
}

export const onAuthStateChangeListener = (callback) => {
	onAuthStateChanged(auth, callback)
}
