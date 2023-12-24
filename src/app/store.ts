import { configureStore, PayloadAction, Tuple } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { thunk, ThunkDispatch } from 'redux-thunk';
import { combineReducers } from 'redux';
import applicationReducer from '../features/application/applicationSlice';
import authReducer from '../features/auth/authSlice';
import navigationReducer from '../features/navigation/navigationSlice';

const reducers = {
    application: applicationReducer,
    auth: authReducer,
    navigation: navigationReducer
};

const rootReducers = combineReducers({ ...reducers });

type AppState = ReturnType<typeof rootReducers>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedDispatch<T> = ThunkDispatch<T, any, PayloadAction>;

export const useAppDispatch = () => useDispatch<TypedDispatch<AppState>>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const store = configureStore({
    reducer: rootReducers,
    middleware: () => new Tuple(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
