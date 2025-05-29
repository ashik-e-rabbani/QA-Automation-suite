import {loginPage} from '../pages/LoginPage'

describe.skip('Login Tests', () => {

    beforeEach("Visit login page", () => {
        loginPage.visit();
    })

    it("should display username, password, and login button", () => {
        loginPage.validateLoginPageUI()
    })

    it("should login successfully with valid credentials", () => {
        //Todo
        // Apply user pass from .env
        // LoginPage.login(Cypress.env('username'), Cypress.env('password'));
        loginPage.login('standard_user','secret_sauce');
        loginPage.verifySuccessfulLogin()
    })


})




