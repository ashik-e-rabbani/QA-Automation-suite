import {loginPage} from '../pages/LoginPage'

describe('Login Tests', () => {

    beforeEach("Visit login page", () => {
        loginPage.visit();
    })

    it("Should show login form elements", () => {
        loginPage.validateLoginPageUI()
    })

    it("Should login successfully with valid credentials", () => {
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
        loginPage.verifySuccessfulLogin()
    })

})
