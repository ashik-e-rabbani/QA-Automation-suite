export class CheckoutPage {
    startCheckout() {
        cy.get('#checkout').click()
    }

    fillCheckoutForm(name, email, postalCode) {
        cy.get('[data-test="firstName"]').type(name)
        cy.get('[data-test="lastName"]').type(email)
        cy.get('[data-test="postalCode"]').type(postalCode)

    }

    clickContinue() {
        cy.get('[data-test="continue"]').click()
    }

    validateOrder(){
        cy.get('[data-test="payment-info-value"]').should('not.be.empty')
        cy.get('[data-test="shipping-info-value"]').should('contain','Free Pony Express Delivery!')
        cy.get('[data-test="total-label"]').should('not.be.empty')
    }

    finishCheckout() {
        cy.get('[data-test="finish"]').click()
    }


    verifyOrderSuccessMessage() {
        cy.get('[data-test="complete-header"]').should('contain','Thanks you for your order!')
    }
  }
  
  export const checkoutPage = new CheckoutPage();
  
