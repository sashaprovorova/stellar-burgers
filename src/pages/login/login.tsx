import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store/store';
import { loginUserThunk } from '../../services/slices/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { from } = location.state || { from: { pathname: '/' } };
  const loginError = useSelector((state) => state.user.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUserThunk({ email, password }))
      .unwrap()
      .then(() => {
        navigate(from.pathname, { replace: true });
      });
  };

  return (
    <LoginUI
      errorText={loginError?.message}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
