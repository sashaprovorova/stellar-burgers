import { TIngredient } from '@utils-types';
import {
  ingredientsReducer,
  ingredientsInitialState,
  fetchIngredientsThunk
} from '@slices';

const mockIngredients: TIngredient[] = [
  {
    _id: '74k9f54e4e6f55401c123afc',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'image/url',
    image_large: 'image/large/url',
    image_mobile: 'image/mobile/url'
  }
];

describe('Проверка правильной настройки и работы ingredientsReducer', () => {
  describe('Проверяем fetchIngredientsThunk', () => {
    it('Pending стейт', () => {
      const state = ingredientsReducer(
        ingredientsInitialState,
        fetchIngredientsThunk.pending('')
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    it('Fulfilled стейт', () => {
      const state = ingredientsReducer(
        ingredientsInitialState,
        fetchIngredientsThunk.fulfilled(mockIngredients, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.data).toEqual(mockIngredients);
    });
    it('Rejected стейт', () => {
      const state = ingredientsReducer(
        ingredientsInitialState,
        fetchIngredientsThunk.rejected(new Error('Error') as any, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).not.toBeNull();
    });
  });
});
