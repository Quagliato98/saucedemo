/// <reference types="cypress" />

import login from '../support/pages/login'

describe("login", () => {
  beforeEach(() => {
    login.loginPage()
  });

  it("login credenciais válidas", () => {
    cy.fixture('login').then((credential) => {
        // Given que eu digite as credenciais corretas
        login.loginFields(credential.validUsername, credential.validPassword)

        // When acionar o botão de login
        login.loginSubmit()

        // Then devo ser redirecionado para a página de produtos
        login.loginPageSuccess()
    })
  });

  it("login com credenciais não existentes no sistema", () => {
    cy.fixture('login').then((credential) => {
      // Given que eu digite as credenciais não existentes no sistema
      login.loginFields(credential.wrongUsername, credential.wrongPassword)

      // When acionar o botão de login
      login.loginSubmit()

      // Then devo visualizar uma mensagem de erro
      login.messageError(credential.errorUserNotFound)
    })
  });

  it("login sem preencher o campo de nome de usuário", () => {
    cy.fixture('login').then((credential) => {
      // Given que eu não preencha o campo de nome de usuário
      login.loginFields('', credential.validPassword)

      // When acionar o botão de login
      login.loginSubmit()

      // Then devo visualizar uma mensagem de erro
      login.messageError(credential.messageErrorUserRequired)
    })
  });

  it("login sem preencher o campo de senha", () => {
    cy.fixture('login').then((credential) => {
      // Given que eu não preencha o campo de senha
      login.loginFields(credential.validUsername, '')

      // When acionar o botão de login
      login.loginSubmit()

      // Then devo visualizar uma mensagem de erro
      login.messageError(credential.messageErrorUserRequired)
    })
  });
});