import {checkoutPage} from '../pages/CheckoutPage'
import { checkoutData } from '../support/utils/DataProviderUtils';


describe("login, adds min & max priced items to cart and completes checkout.",() => {
    before(()=>{
        cy.doLogin();
        cy.addMinMaxPriceProductsToCart();  
    })

    it("Checkout products", () => {
        const { name, email, postalCode } = checkoutData
        checkoutPage.startCheckout()
        checkoutPage.fillCheckoutForm(name, email, postalCode)
        checkoutPage.clickContinue()
        checkoutPage.validateOrder()
        checkoutPage.finishCheckout()
        checkoutPage.verifyOrderSuccessMessage()
    })

})