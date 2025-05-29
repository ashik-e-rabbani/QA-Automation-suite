import {loginPage} from '../pages/LoginPage'
import {cartPage} from '../pages/CartPage';

describe('Finding and adding lowest and highest priced product to cart', () => {
  before(() => {
    loginPage.visit();
    //Todo: replace login creds with env var
    loginPage.login('standard_user','secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  
  it('Finding and adding lowest and highest priced product', () => {
        cy.addMinMaxPriceProductsToCart();
        cartPage.validateCartItems()

  });
  

  
});
