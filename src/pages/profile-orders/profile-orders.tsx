import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { fetchOrdersThunk } from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return (
      <h3 className={`pb-6 text text_type_main-large`}>
        Истории заказов пока нет
      </h3>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
