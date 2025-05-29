import {loginPage} from '../pages/LoginPage'

describe('Login Tests', () => {

    beforeEach("Visit login page", () => {
        loginPage.visit();
    })

    it("should show login form elements", () => {
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




