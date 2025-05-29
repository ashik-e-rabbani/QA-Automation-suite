import {loginPage} from '../pages/LoginPage'
import {productsPage} from '../pages/ProductsPage';
import{productPricingUtils} from '../support/utils/ProductPricingUtils'

describe('Finding and adding lowest and highest priced product to cart', () => {
  before(() => {
    loginPage.visit();
    //Todo: replace login creds with env var
    loginPage.login('standard_user','secret_sauce');
    cy.url().should('include', '/inventory.html');
  });

  
  
  it('Finding and adding lowest and highest priced product', () => {
    const productNameWithPrice = [];
    productsPage.getAllProducts().each(element => {
        const name = element.find('.inventory_item_name').text().trim();
         const priceText = element.find('.inventory_item_price').text().trim().replace('$', '');
        const price = parseFloat(priceText);
        // cy.log(name+" "+price)
        productNameWithPrice.push({ name, price });
    }).then(()=>{

        let maxAndMinProducts = productPricingUtils.getMinAndMaxPrices(productNameWithPrice);
        // cy.log(maxAndMinProducts)
            for (let key in maxAndMinProducts) {
                cy.log(`I am ${maxAndMinProducts[key].name}`);
                productsPage.clickAddToCart(maxAndMinProducts[key].name,maxAndMinProducts[key].price)
              }

        productsPage.goToCart()

  
    })


  });
  

  
});
