
class LoginPage {

    visit() {
      cy.visit('/');
    }

    validateLoginPageUI(){
        cy.get('[data-test="username"]').should('be.visible').and('have.attr', 'placeholder', 'Username')
        cy.get('[data-test="password"]').should('be.visible').and('have.attr', 'placeholder', 'Password')
        cy.get('[data-test="login-button"]').should('be.enabled')
    }
  
    login(username, password) {
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);
      cy.get('#login-button').click();
    }

    verifySuccessfulLogin(){
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').should('be.visible');
        cy.get('#react-burger-cross-btn').click()
        cy.get('[data-test="title"]').should('contain','Products')
    }

  }
  
  export const loginPage =  new LoginPage();
  