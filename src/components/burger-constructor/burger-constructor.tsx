import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store/store';
import {
  clearSelectedOrder,
  createOrderThunk
} from '../../services/slices/orderSlice';
import { resetIngredient } from '../../services/slices/builderSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const constructorItems = useSelector((state) => state.builder);

  const { isAuthenticated } = useSelector((state) => state.user);

  const { isLoading: orderRequest, selectedOrder: orderModalData } =
    useSelector((state) => state.orders);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      return navigate('/login');
    }
    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(createOrderThunk(data));
  };

  const closeOrderModal = () => {
    dispatch(clearSelectedOrder());
    dispatch(resetIngredient());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
