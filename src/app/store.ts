import { configureStore, ThunkAction, Action, combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import oppoFormReducer, {initialState as oppoFormInitialState } from '../features/form/redux/formSlice'
import { persistReducer, persistStore } from 'redux-persist'


const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'app',
  ],
  whitelist: [
    'form',
  ],
}

const combinedReducer = combineReducers({
  oppoForm: oppoFormReducer,
})

const initialState = {
  oppoForm: oppoFormInitialState,
}


export const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'auth/logout') {
    return combinedReducer(initialState, action)
  }

  return combinedReducer(state, action)
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

/* export const store = configureStore({
  reducer: {
    oppoForm: oppoFormReducer,
  },
}) */

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      /*
      * some middleware configuration, example: 
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"]
        } 
      */
    })
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch