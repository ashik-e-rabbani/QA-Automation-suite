// *********************************************** This example commands.js
// shows you how to create various custom commands and overwrite existing
// commands.
//
// For more comprehensive examples of custom commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command -- Cypress.Commands.add('login', (email,
// password) => { ... })
//
//
// -- This is a child command -- Cypress.Commands.add('drag', { prevSubject:
// 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command -- Cypress.Commands.add('dismiss', { prevSubject:
// 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {loginPage} from '../pages/LoginPage'
import {productPricingUtils} from '../support/utils/ProductPricingUtils'
import {productsPage} from '../pages/ProductsPage';
import {cartPage} from '../pages/CartPage';
import {checkoutPage} from '../pages/CheckoutPage'
import {checkoutData} from '../support/utils/DataProviderUtils';

Cypress.Commands.add('addMinMaxPriceProductsToCart', () => {
        const productNameWithPrice = [];
        productsPage.getAllProducts()
            .each(element => {
                const name = element
                    .find('.inventory_item_name')
                    .text()
                    .trim();
                const priceText = element
                    .find('.inventory_item_price')
                    .text()
                    .trim()
                    .replace('$', '');
                const price = parseFloat(priceText);
                // cy.log(name+" "+price)
                productNameWithPrice.push({name, price});
            })
            .then(() => {

                let maxAndMinProducts = productPricingUtils.getMinAndMaxPrices(productNameWithPrice);
                // cy.log(maxAndMinProducts)
                for (let key in maxAndMinProducts) {
                    cy.log(`I am ${maxAndMinProducts[key].name}`);
                    cartPage.clickAddToCart(maxAndMinProducts[key].name, maxAndMinProducts[key].price)
                }

                cartPage.goToCart()
                cartPage.validatePage()

                for (let key in maxAndMinProducts) {
                    cy.contains('.inventory_item_name', maxAndMinProducts[key].name)
                        .parents('.cart_item_label')
                        .find('.inventory_item_price')
                        .should('have.text', '$' + maxAndMinProducts[key].price);

                }

            })
    });

Cypress.Commands.add('doLogin', () => {
        loginPage.visit();
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
    });

Cypress.Commands.add('doCheckout', () => {
        const {name, email, postalCode} = checkoutData
        checkoutPage.startCheckout()
        checkoutPage.fillCheckoutForm(name, email, postalCode)
        checkoutPage.clickContinue()
        checkoutPage.validateOrder()
        checkoutPage.finishCheckout()
    });
