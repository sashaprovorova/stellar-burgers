import { TOrder } from '@utils-types';
import {
  orderReducer,
  orderInitialState,
  fetchOrdersThunk,
  fetchOrdersByNumberThunk,
  createOrderThunk,
  clearSelectedOrder
} from '@slices';

const mockOrder: TOrder = {
  _id: '74c9f84e4e6f29401c123agc',
  status: 'done',
  name: 'Флюоресцентный spicy био-марсианский бургер',
  createdAt: '2025-08-01',
  updatedAt: '2025-08-02',
  number: 77,
  ingredients: [
    'Флюоресцентная булка R2-D3',
    'Биокотлета из марсианской Магнолии',
    'Соус Spicy-X'
  ]
};

describe('Проверка правильной настройки и работы orderReducer', () => {
  describe('Проверяем fetchOrdersThunk', () => {
    it('Pending стейт', () => {
      const state = orderReducer(
        orderInitialState,
        fetchOrdersThunk.pending('')
      );
      expect(state.isLoading).toBe(true);
    });
    it('Fulfilled стейт', () => {
      const mockOrders = [mockOrder];
      const state = orderReducer(
        orderInitialState,
        fetchOrdersThunk.fulfilled(mockOrders, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = orderReducer(
        orderInitialState,
        fetchOrdersThunk.rejected(new Error('Error') as any, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем fetchOrdersByNumberThunk', () => {
    it('Pending стейт', () => {
      const state = orderReducer(
        orderInitialState,
        fetchOrdersByNumberThunk.pending('', 77)
      );
      expect(state.isModalLoading).toBe(true);
    });
    it('Fulfilled стейт', () => {
      const mockOrders = [mockOrder];
      const state = orderReducer(
        orderInitialState,
        fetchOrdersByNumberThunk.fulfilled(mockOrder, '', 77)
      );
      expect(state.isModalLoading).toBe(false);
      expect(state.selectedOrder).toEqual(mockOrder);
      expect(state.error).toBeNull();
    });
    it('Rejected стейт', () => {
      const state = orderReducer(
        orderInitialState,
        fetchOrdersByNumberThunk.rejected(new Error('Error') as any, '', 77)
      );
      expect(state.isModalLoading).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });

  describe('Проверяем createOrderThunk', () => {
    it('Fulfilled стейт', () => {
      const state = orderReducer(
        orderInitialState,
        createOrderThunk.fulfilled(mockOrder, '', mockOrder.ingredients)
      );
      expect(state.selectedOrder).toEqual(mockOrder);
    });
  });

  describe('Проверяем clearSelectedOrder', () => {
    it('Сбрасываем настройки', () => {
      const prefilledState = {
        ...orderInitialState,
        selectedOrder: mockOrder
      };
      const state = orderReducer(prefilledState, clearSelectedOrder());
      expect(state.selectedOrder).toBeNull();
    });
  });
});
