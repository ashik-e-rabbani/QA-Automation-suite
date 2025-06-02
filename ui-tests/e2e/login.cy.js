import {loginPage} from '../pages/LoginPage'

describe('Login Tests', () => {

    beforeEach("Visit login page", () => {
        loginPage.visit();
    })

    it("should show login form elements", () => {
        loginPage.validateLoginPageUI()
    })

    it("should login successfully with valid credentials", () => {
        loginPage.login(Cypress.env('username'), Cypress.env('password'));
        loginPage.verifySuccessfulLogin()
    })

})
