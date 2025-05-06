import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import blogReducer from './slices/blogSlice';
import studentReducer from './slices/studentSlice';
import trainerReducer from './slices/trainerSlice';
import contactReducer from './slices/contactSlice';
import partnerReducer from './slices/partnerSlice';
import newsletterReducer from './slices/newsletterSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // Only persist auth state
};

const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer,
    students: studentReducer,
    trainers: trainerReducer,
    contact: contactReducer,
    partners: partnerReducer,
    newsletter: newsletterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

export const persistor = persistStore(store);