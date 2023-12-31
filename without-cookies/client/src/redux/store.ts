import { configureStore } from '@reduxjs/toolkit'

import authSlice from './features/auth/authSlice'
import apiSlice from './features/api/apiSlice'

const store = configureStore({

    devTools: process.env.NODE_ENV !== 'production',

    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware)
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;


