import {BasePage} from "./basePage";

export class ProductsPage extends BasePage {
  constructor() {
    super();

    const rangeSlider = $(".js-range-slider");

    if (rangeSlider.length > 0) {
      rangeSlider.ionRangeSlider({
        onStart: function(data) {
          $(".js-range-slide-min").val(data.from)
          $(".js-range-slide-max").val(data.to)
        },
        onChange: function(data) {
          $(".js-range-slide-min").val(data.from)
          $(".js-range-slide-max").val(data.to)
        }
      });
    }
  }
}
