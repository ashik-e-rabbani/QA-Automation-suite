export class CheckoutPage {
    initiate() {
        cy.get('#checkout').click()
    }

    fillUpUserInfo() {
        cy.get('[data-test="firstName"]').type("bbba")
        cy.get('[data-test="lastName"]').type('bbb')
        cy.get('[data-test="postalCode"]').type('123')

    }

    continue() {
        cy.get('[data-test="continue"]').click()
    }
    finishCheckout() {
        cy.get('[data-test="finish"]').click()
    }
  }
  
  export const checkoutPage = new CheckoutPage();
  
