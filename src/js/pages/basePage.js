import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from "photoswipe";

export class BasePage {
  constructor() {
    this.$header = $(".js-header");
    this.isHeaderFixed = false;

    window.addEventListener("scroll", (e) => {
      if (!this.isHeaderFixed && window.scrollY > 200) {
        this.isHeaderFixed = true;

        this.$header.addClass("k-logo-block--fixed");
        $(document.body).addClass("k-header-fixed");
      }

      if (this.isHeaderFixed && window.scrollY < 200) {
        this.isHeaderFixed = false;

        this.$header.removeClass("k-logo-block--fixed");
        $(document.body).removeClass("k-header-fixed");
      }
    });

    this.initForms();
    this.initSliders();
  }

  initForms() {
    $.validator.addMethod("customName", function(value) {
      const pattern = new RegExp(/^[^0-9_!¡÷?¿\/+=@#$%ˆ&*(){}|~<>;:\[\]]{2,}$/, 'u');

      return pattern.test(value);
    }, $.validator.messages.remote);

    $.validator.addMethod('phoneNumber', function(value) {
      return !/[^\d-()+\s]+/.test(value) && /^\+*[0-9\-()\s]+/.test(value);
    }, "Пожалуйста, введите правильный номер.");

    $.validator.addClassRules("js-name-input", {
      customName: true,
      minlength: 2,
      maxlength: 32,
    });

    $.validator.addClassRules("js-phone-input", {
      phoneNumber: true,
      minlength: 10,
    });

    const form = document.querySelectorAll(".js-form-validation");

    if (form.length > 0) {
      form.forEach((el) => {
        $(el).validate({
          ignore: ":hidden",
          errorElement: "span",
          errorClass: "k-form__field-error",
          errorPlacement(error, element) {
            const parent = element.closest(".js-form-group");

            parent.append(error);
          },
          submitHandler: (form) => {
            form.submit()
          }
        });
      });
    }
  }

  initSliders() {
    if (document.querySelector("#reviewSlider")) {
      const reviewsSlider = new Swiper("#reviewSlider", {
        spaceBetween: 50,
        loop: true,
        autoHeight: true,
        pagination: {
          el: '#reviewSliderPagination',
        },
        navigation: {
          nextEl: '#reviewSliderNext',
          prevEl: '#reviewSliderPrev',
        },
        breakpoints: {
          1200: {
            spaceBetween: 26,
            slidesPerView: 3,
            autoHeight: false
          }
        }
      });
    }

    if (document.querySelector("#certificatesSlider")) {
      const certificatesSlider = new Swiper("#certificatesSlider", {
        spaceBetween: 50,
        pagination: {
          el: '#certificatesSliderPagination',
        },
        navigation: {
          nextEl: '#certificatesSliderNext',
          prevEl: '#certificatesSliderPrev',
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 26,
          }
        }
      });

      const certificatesLightbox = new PhotoSwipeLightbox({
        gallery: "#certificatesSlider",
        children: "a",
        pswpModule: PhotoSwipe,
      });

      certificatesLightbox.init();
    }
  }
}
