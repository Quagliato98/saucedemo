// elementos da página para que não seja necessário reutilizar várias vezes o mesmo elemento

export const ELEMENTS = {
  productLabel: "[data-test='title']",
  filter: "[data-test='product-sort-container']",
  nameProductItem: "[data-test='inventory-item-name']",
  priceProductItem: "[data-test='inventory-item-price']",
  cartBadge: "[data-test='shopping-cart-badge']",
  productItem: "[data-test='inventory-item']",
  productName: "[data-test='inventory-item-name']",
  productDescription: "[data-test='inventory-item-desc']",
  productPrice: "[data-test='inventory-item-price']",
  addToCartButton: ".pricebar > button",
  accessCartPage: "[data-test='shopping-cart-link']",
  cartPageTitle: "[data-test='title']",
  removeProductCart: 'button[class*=cart_button]'
};