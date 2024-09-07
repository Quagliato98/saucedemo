// elementos da página para que não seja necessário reutilizar várias vezes o mesmo elemento

export const ELEMENTS = {
  checkoutButton: "a[class*='checkout_button']",
  pageTitle: ".subheader",
  firstName: "[data-test='firstName']",
  lastName: "[data-test='lastName']",
  postalCode: "[data-test='postalCode']",
  continueButton: "input[class*=cart_button][value=CONTINUE]",
  infoTitle: ".summary_info",
  infoLabel: ".summary_info_label",
  infoValue: ".summary_value_label",
  subtotalLabel: ".summary_subtotal_label",
  taxLabel: ".summary_tax_label",
  totalLabel: ".summary_total_label",
  finishButton: "a[class*=cart_button]",
  purchaseCompleteTitle: ".complete-header",
  purchaseCompleteText: ".complete-text",
  messageError: "[data-test='error']"
};