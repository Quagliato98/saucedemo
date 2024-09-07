/// <reference types="cypress" />

import login from "../support/pages/login"
import product_page from "../support/pages/product-page"

describe("login", () => {
  beforeEach(() => {
    login.loginPage();
    cy.fixture("login").then((credential) => {
      login.loginFields(credential.validUsername, credential.validPassword);
      login.loginSubmit();
      login.loginPageSuccess();
    });
  });

  context("visualização de produtos", () => {
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
  })

  context("adição de produtos do carrinho", () => {
    it("adição de um produto no carrinho", () => {
      // Given que eu não tenha nenhum produto adicionado no carrinho
      product_page.productCartNotFound()
      
      // When eu adicionar um produto no carrinho
      product_page.addProductCart()

      // Then visualizarei que o produto foi adicionado no carrinho
      product_page.productCartAdded("1")
      product_page.accessCartPage()
      product_page.isCorrectProductCart()
    })

    it("adição de mais de um produto no carrinho", () => {
      // Given que eu não tenha nenhum produto adicionado no carrinho
      product_page.productCartNotFound()

      // When eu adicionar mais de produto no carrinho
      product_page.addProductCart()
      product_page.addProductCart()
      // Then visualizarei que os produtos foram adicionados no carrinho
      product_page.productCartAdded("2")
      product_page.accessCartPage()
      product_page.isCorrectProductCart()
    })
  })

  context("remoção de produtos do carrinho", () => {
    it('remover um produto do carrinho', () => {
      // Given que eu não tenha nenhum produto adicionado no carrinho
      product_page.productCartNotFound()

      // And adicionar um produto no carrinho
      product_page.addProductCart()
      product_page.productCartAdded("1")
      product_page.accessCartPage()
      product_page.isCorrectProductCart()

      // When remover este produto do carrinho
      product_page.removeProductCart()
      
      // Then o produto será removido com sucesso
      product_page.isCartEmpty()
    })

    it('remover mais de um produto do carrinho', () => {
      // Given que eu não tenha nenhum produto adicionado no carrinho
      product_page.productCartNotFound()
  
      // And adicionar mais de um produto no carrinho
      product_page.addProductCart()
      product_page.addProductCart()
      product_page.productCartAdded("2")
      product_page.accessCartPage()
      product_page.isCorrectProductCart()
  
      // When remover estes produtos do carrinho
      product_page.removeProductCart()
      product_page.removeProductCart()

      // Then os produtos serão removidos com sucesso
      product_page.isCartEmpty()
      })
  })
});