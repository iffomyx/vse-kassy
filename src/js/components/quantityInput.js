export class QuantityInput {
  constructor(inputSelector, minusBtnSelector, plusBtnSelector) {
    this.input = $(inputSelector);
    this.minusBtn = $(minusBtnSelector);
    this.plusBtn = $(plusBtnSelector);

    this.minusBtn.on("click", () => {
      if (this.input.val() > 1) {
        this.input.attr("value", parseInt(this.input.val()) - 1);
      }
    });

    this.plusBtn.on("click", () => this.input.attr("value", parseInt(this.input.val()) + 1));
  }
}
