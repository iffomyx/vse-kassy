import {BasePage} from "./basePage";
import PhotoSwipeLightbox from "photoswipe/lightbox";

const discountPriceClass = "k-discount-section--discount-prices";

export class ProductCardPage extends BasePage {
  constructor() {
    super();

    this.$quantityInput = $(".js-product-quantity");
    this.$quantityMinusBtn = $(".js-quantity-minus");
    this.$quantityPlusBtn = $(".js-quantity-plus");

    this.$sectionEl = $(".js-discount-section");
    this.$serviceCheckboxes = $(".js-service-checkbox");
    this.$totalFullPriceEl = $(".js-full-price");
    this.$totalTotalPriceEl = $(".js-total-price");

    this.requiredToDiscount = $('.js-service-checkbox[data-required-for-discount="true"]').length;
    this.requiredCheckboxChecked = $('.js-service-checkbox[data-required-for-discount="true"]:checked').length;
    this.productPrice = parseInt($(".js-product-price").text().split(" ").join(""));
    this.discountActive = true;

    this.$quantityMinusBtn.on("click", (e) => {
      if (this.$quantityInput.val() > 1) {
        this.$quantityInput.val(+this.$quantityInput.val() - 1)
      }
    });
    this.$quantityPlusBtn.on("click", () => this.$quantityInput.val(+this.$quantityInput.val() + 1));
    this.$serviceCheckboxes.on("change", (e) => this.onCheckboxChange(e));

    this.initImagesSlider();
    this.calculateTotalsPrice();
  }

  onCheckboxChange(e) {
    $(`[data-icon-for="${e.target.id}"]`).toggle();

    if (e.target.dataset.requiredForDiscount) {
      e.target.checked ? this.requiredCheckboxChecked++ : this.requiredCheckboxChecked--;
    }

    if (this.requiredToDiscount === this.requiredCheckboxChecked) {
      this.discountActive = true;
      this.$sectionEl.addClass(discountPriceClass);
    } else {
      this.discountActive = false;
      this.$sectionEl.removeClass(discountPriceClass);
    }

    this.calculateTotalsPrice();
  }

  calculateTotalsPrice() {
    let fullTotal = this.productPrice;
    let discountTotal = this.productPrice;
    const checkedServicesInputs = document.querySelectorAll(".js-service-checkbox:checked");

    checkedServicesInputs.forEach((input) => {
      fullTotal += parseInt(input.dataset.fullPrice);
      discountTotal += parseInt(input.dataset.discountPrice);
    });

    this.$totalTotalPriceEl.text(this.discountActive ? discountTotal : fullTotal);
    this.$totalFullPriceEl.text(fullTotal);
  }

  initImagesSlider() {
    if (document.querySelector("#imagesSlider")) {
      const imagesSlider = new Swiper("#imagesSlider", {
        spaceBetween: 50,
        navigation: {
          nextEl: "#imagesSliderNext",
          prevEl: "#imagesSliderPrev"
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 24,
          }
        }
      });

      const imagesLightbox = new PhotoSwipeLightbox({
        gallery: "#productImages",
        children: "a",
        pswpModule: () => import('photoswipe'),
      });

      imagesLightbox.init();
    }
  }
}
