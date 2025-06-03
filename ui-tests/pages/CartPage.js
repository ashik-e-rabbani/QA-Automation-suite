export class CartPage {
  
    clickAddToCart(productName,productPrice) {
      cy.contains('.inventory_item', productName)
        .contains('Add to cart')
        .click();
    }
  
    goToCart() {
      cy.get('.shopping_cart_link').click();
    }

    validatePage(){
      cy.get('[data-test="title"]').should('contain','Your Cart')

    }

    validateCartItems(){
      cy.get('.shopping_cart_badge').should('have.text', '2');

    }

  }
  
  export const cartPage = new CartPage();
  