import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  RootState,
  useDispatch,
  useSelector
} from '../../services/store/store';
import { fetchFeedsThunk } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeedsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!data.orders.length) {
    return (
      <h3 className={`pb-6 text text_type_main-large`}>Заказов пока нет</h3>
    );
  }

  return (
    <FeedUI
      orders={data.orders}
      handleGetFeeds={() => dispatch(fetchFeedsThunk())}
    />
  );
};
