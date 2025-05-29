class LogoutPage {
  
    login(username, password) {
      cy.get('#user-name').type(username);
      cy.get('#password').type(password);
      cy.get('#login-button').click();
    }

    doLogout(){
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').should('be.visible');
        cy.get('#logout_sidebar_link').click();
    }
  }
  export const logoutPage =  new LogoutPage();
  