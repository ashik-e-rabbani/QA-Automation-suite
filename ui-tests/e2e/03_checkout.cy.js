import {checkoutPage} from '../pages/CheckoutPage'
import {checkoutData} from '../support/utils/DataProviderUtils';

describe("Complete checkout with min & max priced items", () => {
    before(() => {
        cy.doLogin();
        cy.addMinMaxPriceProductsToCart();
    })

    it("Successfully completes the checkout process", () => {
        const {name, email, postalCode} = checkoutData
        checkoutPage.startCheckout()
        checkoutPage.fillCheckoutForm(name, email, postalCode)
        checkoutPage.clickContinue()
        checkoutPage.validateOrder()
        checkoutPage.finishCheckout()
        checkoutPage.verifyOrderSuccessMessage()
    })

})