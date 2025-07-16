import { RootState } from '../store/store';

export const userDataSelector = (state: RootState) => state.user.user;
export const isAuthCheckedSelector = (state: RootState) =>
  state.user.isAuthChecked;
