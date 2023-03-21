import { compose, createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import { rootReducer } from "./root-reducer"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"], //since user value is coming from auth state, saving it using redux persist might cause clashes
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
	Boolean
) //middleware will only apply if we are in development mode

const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, composedEnhancers)
export const persistor = persistStore(store)
