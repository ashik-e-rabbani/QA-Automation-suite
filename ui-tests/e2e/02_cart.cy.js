import {loginPage} from '../pages/LoginPage'
import {cartPage} from '../pages/CartPage';

describe('Finding and adding lowest and highest priced product to cart', () => {
  before(() => {
    loginPage.visit();
    loginPage.login(Cypress.env('username'),Cypress.env('password'));
    cy.url().should('include', '/inventory.html');
  });

  
  it('Finding and adding lowest and highest priced product', () => {
        cy.addMinMaxPriceProductsToCart();
        cartPage.validateCartItems()

  });
  

  
});
