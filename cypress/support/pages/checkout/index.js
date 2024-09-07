// ações de interação com a página para que não haja duplicidade de código, facilitando a manutenção

const el = require("./elements").ELEMENTS;

class checkout {
  checkout() {
    cy.get(el.checkoutButton)
        .click();
  }

  verifyCheckoutInformation(firstName, lastName, postalCode) {
    cy.get(el.pageTitle)
        .should('be.visible')
        .contains('Checkout: Your Information')

    cy.fixture("user").then((credential) => {
        if(firstName == ""){
            cy.get(el.firstName)
                .clear()
                .should("be.empty");
        } else if (lastName == "") {
            cy.get(el.firstName)
                .type(credential.firstName)
            cy.get(el.lastName)
                .clear()
                .should("be.empty");
        } else if (postalCode == "") {
            cy.get(el.firstName)
                .type(credential.firstName)
            cy.get(el.lastName)
                .type(credential.lastName)
            cy.get(el.postalCode)
                .clear()
                .should("be.empty");
        } else {
            cy.get(el.firstName)
                .type(credential.firstName)
            cy.get(el.lastName)
                .type(credential.lastName)
            cy.get(el.postalCode)
                .type(credential.postalCode)
        }

        cy.get(el.continueButton)
            .should('be.visible')
            .click()
      });
  }

  messageError(messageError) {
    cy.get(el.messageError)
        .should("contain", messageError);
  }

  checkPaymentInformation() {
    cy.get(el.infoTitle)
        .find(el.infoLabel)
        .contains('Payment Information:')
        .parent()
        .find(el.infoValue)
        .should('contain', 'SauceCard #31337');
  }

  checkShippingInformation() {
    cy.get(el.infoTitle)
        .find(el.infoLabel)
        .contains('Shipping Information:')
        .parent()
        .find(el.infoValue)
        .should('contain', 'FREE PONY EXPRESS DELIVERY!');
  }

  checkTotalCost() {
    cy.get(el.subtotalLabel)
        .should('contain', 'Item total: $29.99');
    cy.get(el.taxLabel)
        .should('contain', 'Tax: $2.40');
    cy.get(el.totalLabel)
        .should('contain', 'Total: $32.39');
  }

  finishPurchase() {
    cy.get(el.finishButton)
        .contains('FINISH')
        .should('be.visible')
        .click()
  }

  verifyMsgPurchaseFinished() {
    cy.get(el.pageTitle)
        .should('be.visible')
        .contains('Finish')
    cy.get(el.purchaseCompleteTitle)
        .should('be.visible')
        .contains('THANK YOU FOR YOUR ORDER')
    cy.get(el.purchaseCompleteText)
        .should('be.visible')
        .contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }
}

export default new checkout();