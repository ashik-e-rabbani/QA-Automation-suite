import {loginPage} from '../pages/LoginPage'
import {checkoutPage} from '../pages/CheckoutPage'
import {logoutPage} from '../pages/LogoutPage'
let userData;
describe("Logging out",() => {
    before(()=>{
        loginPage.visit();
        loginPage.login(Cypress.env('username'),Cypress.env('password'));
        cy.addMinMaxPriceProductsToCart();
        // Todo use fixture value
        // cy.fixture('users').then((data) => {
        //     userData = data;
        //   });  
        // const { name, email, postalCode } = userData.validUser
        checkoutPage.startCheckout()
        checkoutPage.fillCheckoutForm("Ashik Rabbani", "ashik@rabbani.com", "NSW 1214")
        checkoutPage.clickContinue()
        checkoutPage.validateOrder()
        checkoutPage.finishCheckout()
    })

    it("Logging out", () => {
       logoutPage.doLogout()
       cy.get('[data-test="login-button"]').should('be.visible')
    })

})