import { TFeedsResponse } from '@api';
import { feedsReducer, fetchFeedsThunk, feedsInitialState } from '@slices';

const mockFeeds: TFeedsResponse = {
  success: true,
  orders: [
    {
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
    }
  ],
  total: 22890,
  totalToday: 156
};
describe('Проверка правильной настройки и работы feedsReducer', () => {
  describe('Проверяем fetchFeedsThunk', () => {
    it('Pending стейт', () => {
      const state = feedsReducer(
        feedsInitialState,
        fetchFeedsThunk.pending('')
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Fulfilled стейт', () => {
      const state = feedsReducer(
        feedsInitialState,
        fetchFeedsThunk.fulfilled(mockFeeds, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockFeeds);
    });
    it('Rejected стейт', () => {
      const state = feedsReducer(
        feedsInitialState,
        fetchFeedsThunk.rejected(new Error('Error') as any, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });
});
