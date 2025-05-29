import {loginPage} from '../pages/LoginPage'
import {checkoutPage} from '../pages/CheckoutPage'

let userData;

describe("Checking out items",() => {
    before(()=>{
        loginPage.visit();
        loginPage.login(Cypress.env('username'),Cypress.env('password'));
        cy.addMinMaxPriceProductsToCart();
        cy.fixture('users').then((data) => {
            userData = data;
          });   
    })

    it("Checkout products", () => {
        cy.log(userData)
        const { name, email, postalCode } = userData.validUser
        checkoutPage.initiate()
        checkoutPage.fillUpUserInfo(name, email, postalCode)
        checkoutPage.continue()
        //validate shipping total price etccc
        checkoutPage.finishCheckout()
        //make sure website ekta thanks diche
    })

})