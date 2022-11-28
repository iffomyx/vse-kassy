import {BasePage} from "./basePage";
import {QuantityInput} from "../components/quantityInput";

export class CartPage extends BasePage {
  constructor() {
    super();

    const quantityInput = new QuantityInput(
      ".js-product-quantity",
      ".js-quantity-minus",
      ".js-quantity-plus"
    );
  }
}
