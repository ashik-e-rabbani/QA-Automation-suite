import {loginPage} from '../pages/LoginPage'
import {checkoutPage} from '../pages/CheckoutPage'

let userData;

describe("Checking out items",() => {
    before(()=>{
        loginPage.visit();
        //Todo: replace login creds with env var
        loginPage.login('standard_user','secret_sauce');
        cy.addMinMaxPriceProductsToCart();
        cy.fixture('users').then((data) => {
            userData = data;
          });   
    })

    it("Checkout products", () => {
        cy.log(userData)
        const { name, email, postalCode } = userData.validUser
        checkoutPage.startCheckout()
        checkoutPage.fillCheckoutForm(name, email, postalCode)
        checkoutPage.clickContinue()
        checkoutPage.validateOrder()
        checkoutPage.finishCheckout()
        checkoutPage.verifyOrderSuccessMessage()
    })

})