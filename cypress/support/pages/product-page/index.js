// ações de interação com a página para que não haja duplicidade de código, facilitando a manutenção

const el = require("./elements").ELEMENTS;

class product_page {
  isPageCorrect() {
    cy.get(el.productLabel)
        .should("be.visible")
        .contains("Products");
  }

  filter(filter) {
    cy.get(el.filter)
        .select(filter)
        .should("have.value", filter);
  }

  alphabetOrdenation(filter) {
    cy.get(el.nameProductItem).then(($products) => {
      // Extração dos nomes dos produtos para serem comparados depois
      const productNames = $products
        .map((index, el) => Cypress.$(el).text().toLowerCase())
        .get();

      let sortedNames;

      /*
        verifica se o filtro selecionado seja "az", então os produtos estão ordenados de maneira crescente, mas
        se o filtro selecionado for "za", então os produtos estão ordenados de maneira decrescente
      */
      if (filter === "az") {
        sortedNames = [...productNames].sort();
      } else if (filter === "za") {
        sortedNames = [...productNames].sort().reverse();
      }

      // Compara o array original com o array ordenado
      expect(productNames).to.deep.equal(sortedNames);
    });
  }

  priceOrdenation(filter) {
    cy.get(el.priceProductItem).then(($prices) => {
      // Extrai os preços, remove o símbolo '$', e transforma em números
      const priceNumbers = $prices
        .map((index, element) => {
          const text = Cypress.$(element).text().trim();
          return parseFloat(text.replace("$", ""));
        })
        .get();

      let isSortedAscending;
      let isSortedDescending;

      /*
        verifica se o filtro selecionado seja "lohi", então os produtos estão ordenados do preço menor pro maior, mas
        se o filtro selecionado for "za", então os produtos estão ordenados do preço maior pro menor
      */
      if (filter === "lohi") {
        isSortedAscending = priceNumbers.every(
          (val, i, arr) => !i || arr[i - 1] <= val
        );
        expect(isSortedAscending).to.be.true;
      } else if (filter === "hilo") {
        isSortedDescending = priceNumbers.every(
          (val, i, arr) => !i || arr[i - 1] >= val
        );
        expect(isSortedDescending).to.be.true;
      }
    });
  }

  productCartNotFound() {
    cy.get(el.cartBadge)
      .should("not.exist")
  }

  productCartAdded(qtd) {
    cy.get(el.cartBadge)
      .should("be.visible")
      .and("have.text", qtd)
  }

  accessCartPage() {
    cy.get(el.accessCartPage)
      .click()
    cy.get(el.cartPageTitle)
      .contains('Your Cart')
  }

  addProductCart() {
    cy.get(el.productItem).then(product => {  
      // Extração do nome do produto, descrição e preço para comparar se foi realmente este produto que foi adicionado ao carrinho
      const productName = product.find(el.productName).first().text();
      const productDescription = product.find(el.productDescription).first().text();
      const productPrice = product.find(el.productPrice).first().text().replace('$', '').trim();

      // Cria o objeto JSON com os dados extraídos
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice
      };

      cy.wrap(productData).as('productData');
    });
    cy.get(el.addToCartButton)
      .contains("ADD TO CART")
      .first()
      .click()
  }

  removeProductCart(){
    cy.get(el.removeProductCart).should('be.visible').first().click()
  }

  isCartEmpty(){
    cy.get(el.removeProductCart).should('not.exist')
  }

  isCorrectProductCart() {
    // verifica se o item que foi adicionado realmente o correto
    cy.get('@productData').then(productData => {
      cy.get(el.productName).contains(productData.name);
      cy.get(el.productDescription).contains(productData.description);
      cy.get(el.productPrice).contains(productData.price);
    });
  }
}

export default new product_page();