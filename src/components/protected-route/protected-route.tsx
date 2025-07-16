import { Preloader } from '@ui';
import {
  isAuthCheckedSelector,
  userDataSelector
} from '../../services/selectors/selectors';
import { Navigate, useLocation } from 'react-router';
import { useSelector } from '../../services/store/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userDataSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя , показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    //  если маршрут для авторизованного пользователя, но пользователь неавторизован, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    //  если маршрут для неавторизованного пользователя, но пользователь авторизован при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет, а мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    return <Navigate replace to={from} />;
  }

  return children;
};
