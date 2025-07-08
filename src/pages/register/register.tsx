import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store/store';
import { registerUserThunk } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const registerError = useSelector((state) => state.user.registerError);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUserThunk({ name: userName, email, password })
      ).unwrap();
      navigate('/profile', { replace: true });
    } catch (error: any) {}
  };

  return (
    <RegisterUI
      errorText={registerError || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
