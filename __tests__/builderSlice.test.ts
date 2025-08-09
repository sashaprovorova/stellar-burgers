import { TIngredient, TConstructorIngredient } from '@utils-types';
import {
  builderReducer,
  constructorInitialState,
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetIngredient
} from '@slices';

const mockIngredient: TIngredient = {
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
};
describe('Проверка правильной настройки и работы builderReducer', () => {
  describe('Проверяем setBun', () => {
    it('устанавливаем булку', () => {
      const state = builderReducer(
        constructorInitialState,
        setBun(mockIngredient)
      );
    });
  });

  describe('Проверяем addIngredient', () => {
    it('добавляем соус', () => {
      const ingredient = { ...mockIngredient, type: 'sauce' };
      const state = builderReducer(
        constructorInitialState,
        addIngredient(ingredient)
      );
      expect(state.ingredients.length).toBe(1);
      expect(state.ingredients[0]).toMatchObject(ingredient);
      expect(state.ingredients[0]).toHaveProperty('id');
    });
    it('добавляем остальные ингридиенты', () => {
      const ingredient = { ...mockIngredient, type: 'main' };
      const state = builderReducer(
        constructorInitialState,
        addIngredient(ingredient)
      );
      expect(state.ingredients.length).toBe(1);
      expect(state.ingredients[0]).toMatchObject(ingredient);
      expect(state.ingredients[0]).toHaveProperty('id');
    });
    it('добавляем булку', () => {
      const state = builderReducer(
        constructorInitialState,
        addIngredient(mockIngredient)
      );
      expect(state.bun).toMatchObject(mockIngredient);
    });
  });

  describe('Проверяем removeIngredient', () => {
    it('удаляем ингридиент по айди', () => {
      const stateWithIngredients = {
        ...constructorInitialState,
        ingredients: [
          { ...mockIngredient, type: 'main', id: '44l9f54e5e6f53301c123afc' },
          { ...mockIngredient, type: 'main', id: '45l9f74e5e6f59301c188afg' }
        ]
      };

      const state = builderReducer(
        stateWithIngredients,
        removeIngredient('44l9f54e5e6f53301c123afc')
      );

      expect(state.ingredients.length).toBe(1);
      expect(state.ingredients[0].id).toBe('45l9f74e5e6f59301c188afg');
    });
  });

  describe('Проверяем moveIngredient', () => {
    it('меняем местами ингридиенты', () => {
      const salad = {
        ...mockIngredient,
        type: 'main',
        id: '14l9f54e5e6f87301c123afc',
        name: 'Мини-салат Экзо-Плантаго'
      };
      const meat = {
        ...mockIngredient,
        type: 'main',
        id: '25l9f74e5e6679301c188afg',
        name: 'Мясо бессмертных моллюсков Protostomia'
      };

      const starterState = {
        ...constructorInitialState,
        ingredients: [salad, meat]
      };

      const state = builderReducer(
        starterState,
        moveIngredient({ index: 1, upwards: true })
      );

      expect(state.ingredients[0].id).toBe('25l9f74e5e6679301c188afg');
      expect(state.ingredients[1].id).toBe('14l9f54e5e6f87301c123afc');
    });
  });

  describe('Проверяем resetIngredient', () => {
    it('очищаем стейт', () => {
      const givenState = {
        bun: mockIngredient,
        ingredients: [
          { ...mockIngredient, type: 'main', id: '55l9f74e5e6679355c188afg' }
        ]
      };
      const state = builderReducer(givenState, resetIngredient());
      expect(state.bun).toBeNull();
      expect(state.ingredients).toEqual([]);
    });
  });
});
