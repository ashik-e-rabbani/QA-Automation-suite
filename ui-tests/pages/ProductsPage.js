export class ProductsPage {
    getAllProducts() {
      return cy.get('.inventory_item');
    }
  
    clickAddToCart(productName,productPrice) {
      cy.contains('.inventory_item', productName)
        .contains('Add to cart')
        .click();
    }
  
    goToCart() {
      cy.get('.shopping_cart_link').click();
    }
  }
  
  export const productsPage = new ProductsPage();
  