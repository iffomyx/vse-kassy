import {BasePage} from "./basePage";

export class ProductsPage extends BasePage {
  constructor() {
    super();

    $(".js-range-slider").ionRangeSlider({
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
