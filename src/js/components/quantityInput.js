export class QuantityInput {
  constructor(input, minusBtn, plusBtn) {
    this.input = input;
    this.minusBtn = minusBtn;
    this.plusBtn = plusBtn;

    if (this.input && this.minusBtn && this.plusBtn) {
      this.minusBtn.addEventListener("click", () => {
        if (this.input.value > 1) {
          this.input.setAttribute("value", this.input.valueAsNumber - 1);
        }
      });

      this.plusBtn.addEventListener("click", () => {
        this.input.setAttribute("value", this.input.valueAsNumber + 1);
      });
    }
  }
}
