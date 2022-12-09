import {BasePage} from "./basePage";
import {QuantityInput} from "../components/quantityInput";

export class CartPage extends BasePage {
  constructor() {
    super();

    const products = document.querySelectorAll(".k-cart-section__product");

    if (products.length > 0) {
      products.forEach((product) => {
        const quantityInput = new QuantityInput(
          product.querySelector(".js-product-quantity"),
          product.querySelector(".js-quantity-minus"),
          product.querySelector(".js-quantity-plus")
        );
      });
    }
  }
}
