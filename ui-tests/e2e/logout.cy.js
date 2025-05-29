import {loginPage} from '../pages/LoginPage'
import {checkoutPage} from '../pages/CheckoutPage'
import {logoutPage} from '../pages/LogoutPage'

describe("Logging out",() => {
    before(()=>{
        loginPage.visit();
        //Todo: replace login creds with env var
        loginPage.login('standard_user','secret_sauce');
        cy.addMinMaxPriceProductsToCart();
        checkoutPage.initiate()
        checkoutPage.fillUpUserInfo()
        checkoutPage.continue()
        checkoutPage.finishCheckout()
    })

    it("Logging out", () => {
       logoutPage.initiate()
       cy.get('[data-test="login-button"]').should('be.visible')
    })

})