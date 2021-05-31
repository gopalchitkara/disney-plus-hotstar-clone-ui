import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import watchlistReducer from './watchlistSlice'
import currentlyWatchingReducer from './currentlyWatchingSlice'
import notificationReducer from './notficationSlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        watchlist: watchlistReducer,
        currentlyWatching: currentlyWatchingReducer,
        notification: notificationReducer,
    },
})