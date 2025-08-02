import { TUser } from '@utils-types';
import {
  userReducer,
  registerUserThunk,
  loginUserThunk,
  checkUserAuthThunk,
  logoutUserThunk,
  userInitialState,
  updateUserThunk
} from '@slices';

const mockUser: TUser = {
  name: 'Moosya',
  email: 'cute@cat.ru'
};

describe('Проверка правильной настройки и работы userReducer', () => {
  describe('Проверяем registerUserThunk', () => {
    it('Pending стейт', () => {
      const state = userReducer(
        userInitialState,
        registerUserThunk.pending('', { email: '', name: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
    });
    it('Fulfilled стейт', () => {
      const state = userReducer(
        userInitialState,
        registerUserThunk.fulfilled(mockUser, '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = userReducer(
        userInitialState,
        registerUserThunk.rejected(new Error('Error') as any, '', {
          email: '',
          name: '',
          password: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем loginUserThunk', () => {
    it('Pending стейт', () => {
      const state = userReducer(
        userInitialState,
        loginUserThunk.pending('', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
    });
    it('Fulfilled стейт', () => {
      const state = userReducer(
        userInitialState,
        loginUserThunk.fulfilled(mockUser, '', {
          email: '',
          password: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = userReducer(
        userInitialState,
        loginUserThunk.rejected(new Error('Error') as any, '', {
          email: '',
          password: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем checkUserAuthThunk', () => {
    it('Pending стейт', () => {
      const state = userReducer(
        userInitialState,
        checkUserAuthThunk.pending('')
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Fulfilled стейт', () => {
      const state = userReducer(
        userInitialState,
        checkUserAuthThunk.fulfilled(mockUser, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });
    it('Rejected стейт', () => {
      const state = userReducer(
        userInitialState,
        checkUserAuthThunk.rejected(new Error('Error') as any, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('Проверяем logoutUserThunk', () => {
    it('Pending стейт', () => {
      const state = userReducer(userInitialState, logoutUserThunk.pending(''));
      expect(state.isLoading).toBe(true);
    });
    it('Fulfilled стейт', () => {
      const loggedInState = {
        ...userInitialState,
        user: mockUser,
        isAuthenticated: true
      };
      const state = userReducer(
        loggedInState,
        logoutUserThunk.fulfilled(undefined, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
    it('Rejected стейт', () => {
      const state = userReducer(
        userInitialState,
        logoutUserThunk.rejected(new Error('Error') as any, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем updateUserThunk', () => {
    it('Fulfilled стейт', () => {
      const loggedInState = {
        ...userInitialState,
        user: mockUser
      };
      const updatedUser: TUser = {
        name: 'Toochka',
        email: 'little@kitten.ru'
      };
      const state = userReducer(
        loggedInState,
        updateUserThunk.fulfilled(updatedUser, '', updatedUser)
      );
      expect(state.user).toEqual(updatedUser);
    });
  });
});
