import { rootReducer, RootState } from '../src/services/store/store';
import {
  userReducer,
  ingredientsReducer,
  orderReducer,
  feedsReducer,
  builderReducer
} from '@slices';

describe('Проверка правильной настройки и работы rootReducer', () => {
  it('Возвращает корректное начальное состояние хранилища при вызове с undefined состоянием', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, unknownAction);

    const expectedState: RootState = {
      user: userReducer(undefined, unknownAction),
      ingredients: ingredientsReducer(undefined, unknownAction),
      orders: orderReducer(undefined, unknownAction),
      feeds: feedsReducer(undefined, unknownAction),
      builder: builderReducer(undefined, unknownAction)
    };
    expect(initialState).toEqual(expectedState);
  });
});
