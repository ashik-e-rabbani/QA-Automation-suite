import {logoutPage} from '../pages/LogoutPage'

describe("User logged out after completing checkout",() => {
    before(()=>{
        cy.doLogin();
        cy.addMinMaxPriceProductsToCart();
        cy.doCheckout()
    })

    it("Logs the user out and returns to login screen", () => {
       logoutPage.doLogout()
       cy.get('[data-test="login-button"]').should('be.visible')
    })

})