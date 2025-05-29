import {loginPage} from '../pages/LoginPage'
import {checkoutPage} from '../pages/CheckoutPage'


describe("Checking out items",() => {
    before(()=>{
        loginPage.visit();
        loginPage.login(Cypress.env('username'),Cypress.env('password'));
        cy.addMinMaxPriceProductsToCart();
    })

    it("Checkout products", () => {
        checkoutPage.initiate()
        checkoutPage.fillUpUserInfo()
        checkoutPage.continue()
        //validate shipping total price etccc
        checkoutPage.finishCheckout()
        //make sure website ekta thanks diche
    })

})