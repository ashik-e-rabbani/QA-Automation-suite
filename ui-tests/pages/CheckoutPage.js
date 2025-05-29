export class CheckoutPage {
    initiate() {
        cy.get('#checkout').click()
    }

    fillUpUserInfo(name, email, postalCode) {
        cy.get('[data-test="firstName"]').type(name)
        cy.get('[data-test="lastName"]').type(email)
        cy.get('[data-test="postalCode"]').type(postalCode)

    }

    continue() {
        cy.get('[data-test="continue"]').click()
    }
    finishCheckout() {
        cy.get('[data-test="finish"]').click()
    }
  }
  
  export const checkoutPage = new CheckoutPage();
  
