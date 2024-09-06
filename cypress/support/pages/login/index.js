// ações de interação com a página para que não haja duplicidade de código, facilitando a manutenção

const el = require("./elements").ELEMENTS;

class login {
  loginPage() {
    cy.visit("/");
  }

  //devido ao Cypress não aceitar digitar uma string vazia, foi necessário ajustar a função para verificar quando é enviado uma string vazia e executar determinadas ações
  loginFields(username, password) {
    if (username == "") {
      cy.get(el.username)
        .clear()
        .should("be.empty");
    } else if (password == "") {
      cy.get(el.password)
        .clear()
        .should("be.empty");
    } else {
      cy.get(el.username)
        .type(username);
      cy.get(el.password)
        .type(password);
    }
  }

  loginSubmit() {
    cy.get(el.loginSubmit)
        .click();
  }

  loginPageSuccess() {
    cy.url()
        .should("include", "/inventory");
  }

  messageError(messageError) {
    cy.get(el.messageError)
        .should("contain", messageError);
  }
}

export default new login();