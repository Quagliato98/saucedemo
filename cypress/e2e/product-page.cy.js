/// <reference types="cypress" />

import login from '../support/pages/login'
import product_page from '../support/pages/product-page'

describe("login", () => {
  beforeEach(() => {
    login.loginPage();
    cy.fixture("login").then((credential) => {
      login.loginFields(credential.validUsername, credential.validPassword);
      login.loginSubmit();
      login.loginPageSuccess();
    });
  });

  it("ordenação em ordem alfabética crescente ao selecionar a opção 'A a Z'", () => {
    // Given que eu tenha acessado a página de produtos
    product_page.isPageCorrect()

    // When eu visualizar o filtro de ordenação dos produtos
    product_page.filter("az")

    // Then visualizarei que eles estarão ordenados de A - Z
    product_page.alphabetOrdenation("az")
  });

  it("ordenação em ordem alfabética decrescente ao selecionar a opção 'Z a A'", () => {
    // Given que eu tenha acessado a página de produtos
    product_page.isPageCorrect()

    // When eu visualizar o filtro de ordenação dos produtos
    product_page.filter("za")

    // Then visualizarei que eles estarão ordenados de Z - A
    product_page.alphabetOrdenation("za")
  });

  it("ordenação de produtos do mais barato ao mais caro", () => {
    // Given que eu tenha acessado a página de produtos
    product_page.isPageCorrect()

    // When eu visualizar o filtro de ordenação dos produtos
    product_page.filter("lohi")

    // Then visualizarei que os produtos do mais barato ao mais caro
    product_page.priceOrdenation("lohi")
  });

  it("ordenação de produtos do mais caro ao mais barato", () => {
    // Given que eu tenha acessado a página de produtos
    product_page.isPageCorrect()

    // When eu visualizar o filtro de ordenação dos produtos
    product_page.filter("hilo")

    // Then visualizarei que os produtos do mais caro ao mais barato
    product_page.priceOrdenation("hilo")
  });
});
