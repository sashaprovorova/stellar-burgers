import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/user/userSlice';
import orderReducer from '../slices/orders/orderSlice';
import ingredientsReducer from '../slices/ingredients/ingredientsSlice';
import feedsReducer from '../slices/feeds/feedsSlice';
import builderReducer from '../slices/builder/builderSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
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
