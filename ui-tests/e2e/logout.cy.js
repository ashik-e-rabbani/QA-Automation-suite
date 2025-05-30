import {logoutPage} from '../pages/LogoutPage'

describe("Logging out",() => {
    before(()=>{
        cy.doLogin();
        cy.addMinMaxPriceProductsToCart();
        cy.doCheckout();
    })

    it("Logging out", () => {
       logoutPage.doLogout()
       cy.get('[data-test="login-button"]').should('be.visible')
    })

})