/// <reference types="cypress" />

import login from "../support/pages/login"
import product_page from "../support/pages/product-page"
import checkout from "../support/pages/checkout"


describe("login", () => {
  beforeEach(() => {
    login.loginPage();
    cy.fixture("login").then((credential) => {
      login.loginFields(credential.validUsername, credential.validPassword);
      login.loginSubmit();
      login.loginPageSuccess();
    });
  });

  it('finalização da compra com sucesso', () => {      
    // Given que eu tenha adicionado um produto no carrinho
    product_page.isPageCorrect()
    product_page.productCartNotFound()
    product_page.addProductCart()
    product_page.productCartAdded("1")
    product_page.accessCartPage()
    product_page.isCorrectProductCart()

    // When eu informar os dados do comprador
    checkout.checkout()
    checkout.verifyCheckoutInformation()

    // And verificar se as informações antes de finalizar a compra estão corretas
    product_page.isCorrectProductCart()

    // Encontra a seção de Payment Information e verifica o conteúdo relacionado
    checkout.checkPaymentInformation()

    // Encontra a seção de Shipping Information e verifica o conteúdo relacionado
    checkout.checkShippingInformation()

    // Verifica o subtotal, o valor do imposto e o total
    checkout.checkTotalCost()

    // And finalizar a compra
    checkout.finishPurchase()

    // Then a compra será finalizada
    checkout.verifyMsgPurchaseFinished()
  })

  it('finalização da compra sem preencher o primeiro nome do cliente', () => {      
    // Given que eu tenha adicionado um produto no carrinho
    product_page.isPageCorrect()
    product_page.productCartNotFound()
    product_page.addProductCart()
    product_page.productCartAdded("1")
    product_page.accessCartPage()
    product_page.isCorrectProductCart()

    // When eu informar os dados do comprador
    checkout.checkout()
    cy.fixture("user").then((credential) => {
        checkout.verifyCheckoutInformation('', credential.lastName, credential.postalCode)

        checkout.messageError(credential.emptyFirstName)
    });
  })

  it('finalização da compra sem preencher o último nome do cliente', () => {      
    // Given que eu tenha adicionado um produto no carrinho
    product_page.isPageCorrect()
    product_page.productCartNotFound()
    product_page.addProductCart()
    product_page.productCartAdded("1")
    product_page.accessCartPage()
    product_page.isCorrectProductCart()

    // When eu informar os dados do comprador
    checkout.checkout()
    cy.fixture("user").then((credential) => {
        checkout.verifyCheckoutInformation(credential.firstName, '', credential.postalCode)

        checkout.messageError(credential.emptyLastName)
    });
  })

  it('finalização da compra sem preencher código postal do cliente', () => {      
    // Given que eu tenha adicionado um produto no carrinho
    product_page.isPageCorrect()
    product_page.productCartNotFound()
    product_page.addProductCart()
    product_page.productCartAdded("1")
    product_page.accessCartPage()
    product_page.isCorrectProductCart()

    // When eu informar os dados do comprador
    checkout.checkout()
    cy.fixture("user").then((credential) => {
        checkout.verifyCheckoutInformation(credential.firstName, credential.lastName, '')

        checkout.messageError(credential.emptyPostalCode)
    });
  })
});