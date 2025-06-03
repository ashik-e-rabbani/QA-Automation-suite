export class ProductsPage {

    getAllProducts() {
        return cy.get('.inventory_item');
    }
    
}

export const productsPage = new ProductsPage();
