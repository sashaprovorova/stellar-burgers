import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import orderReducer from '../slices/orderSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import feedsReducer from '../slices/feedsSlice';
import builderReducer from '../slices/builderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  user: userReducer,
  ingredients: ingredientsReducer,
  orders: orderReducer,
  feeds: feedsReducer,
  builder: builderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
