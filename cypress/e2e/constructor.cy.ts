import * as orderFixture from '../fixtures/order.json';

describe('E2E тест конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Отображаем ингредиенты на экране', () => {
    cy.get('[data-cy="ingredient-card"]').should('have.length.at.least', 1);
  });

  describe('Модальное окно с описанием ингредиента', () => {
    it('Открываем по клику на карточку', () => {
      cy.get('[data-cy="ingredient-card"]').first().click();
      cy.get('[data-cy="ingredient-details-name"]').should(
        'have.length.at.least',
        1
      );
    });

    it('Проверяем, что отобразили верный элемент', () => {
      cy.contains(
        '[data-cy="ingredient-card"]',
        'Флюоресцентная булка R2-D3'
      ).click();
      cy.get('[data-cy="ingredient-details-name"]').should(
        'have.text',
        'Флюоресцентная булка R2-D3'
      );
    });

    it('Оставляем открытым после перезагрузки', () => {
      cy.get('[data-cy="ingredient-card"]').first().click();
      cy.reload(true);
      cy.get('[data-cy="ingredient-details-name"]').should(
        'have.length.at.least',
        1
      );
    });

    it('Закрываем при помощи кнопки закрыть', () => {
      cy.get('[data-cy="ingredient-card"]').first().click();
      cy.get('[data-cy="close-modal"]').click();
      cy.wait(300);
      cy.get('[data-cy="ingredient-details-name"]').should('not.exist');
    });

    it('Закрываем при нажатии на оверлей', () => {
      cy.get('[data-cy="ingredient-card"]').first().click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.wait(300);
      cy.get('[data-cy="ingredient-details-name"]').should('not.exist');
    });

    it('Закрываем при нажатии Escape', () => {
      cy.get('[data-cy="ingredient-card"]').first().click();
      cy.get('body').type('{esc}');
      cy.wait(300);
      cy.get('[data-cy="ingredient-details-name"]').should('not.exist');
    });
  });

  describe('Оформление заказа после авторизации', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'FAKE_ACCESS_TOKEN');
      cy.window().then((win) =>
        win.localStorage.setItem('refreshToken', 'FAKE_REFRESH_TOKEN')
      );

      cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
        'getUser'
      );
      cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
        'postOrder'
      );
      cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
      }).as('getIngredients');

      cy.visit('/');
      cy.wait('@getUser');
      cy.wait('@getIngredients');
    });

    it('Собираем бургер и отправляем заказ', () => {
      cy.contains('[data-cy="ingredient-card"]', 'Флюоресцентная булка R2-D3')
        .scrollIntoView()
        .should('be.visible')
        .find('button')
        .click();

      cy.contains('[data-cy="ingredient-card"]', 'Плоды Фалленианского дерева')
        .scrollIntoView()
        .should('be.visible')
        .find('button')
        .click();

      cy.contains('[data-cy="ingredient-card"]', 'Соус фирменный Space Sauce')
        .scrollIntoView()
        .should('be.visible')
        .find('button')
        .click();

      cy.get('[data-cy="constructor-ingredient"]').should(
        'have.length.at.least',
        2
      );
      cy.get('[data-cy="order-button"]').should('be.enabled');

      cy.get('[data-cy="order-button"]').click();
      cy.wait('@postOrder');

      cy.get('[data-cy="order-modal"]').should('be.visible');
      cy.get('[data-cy="order-number"]').should(
        'have.text',
        orderFixture.order.number.toString()
      );

      cy.get('[data-cy="close-modal"]').click();
      cy.get('[data-cy="order-modal"]').should('not.exist');

      cy.get('[data-cy="constructor-ingredient"]').should('have.length', 0);
    });

    afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then((win) => win.localStorage.clear());
    });
  });
});
