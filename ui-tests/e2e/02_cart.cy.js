import {loginPage} from '../pages/LoginPage'
import {cartPage} from '../pages/CartPage';

describe('Picking products and adding them to Cart', () => {
  before(() => {
    loginPage.visit();
    loginPage.login(Cypress.env('username'),Cypress.env('password'));
    cy.url().should('include', '/inventory.html');
  });

  
  it('Adding lowest and highest priced product', () => {
        cy.addMinMaxPriceProductsToCart();
        cartPage.validateCartItems()

  });
  

  
});
