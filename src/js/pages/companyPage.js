import {BasePage} from "./basePage";

export class CompanyPage extends BasePage {
  constructor() {
    super();

    this.teamSlider = null;
    this.conferenceSlider = null;

    const teamSliderContainer = document.querySelector(".js-team-slider");
    const conferenceSliderContainer = document.querySelector(".js-conference-slider");
    const sliderDisabledClass = "k-slider--disabled";

    const xlBreakpoint = window.matchMedia('(min-width: 1920px)');

    const breakpointCheck = () => {
      if (xlBreakpoint.matches) {
        if (this.teamSlider) {
          this.teamSlider.destroy(true);
        }

        if (this.conferenceSlider) {
          this.conferenceSlider.destroy(true);
        }

        teamSliderContainer.classList.add(sliderDisabledClass);
        conferenceSliderContainer.classList.add(sliderDisabledClass);
      } else {
        teamSliderContainer.classList.remove(sliderDisabledClass);
        conferenceSliderContainer.classList.remove(sliderDisabledClass);

        this.initTeamSlider();
        this.initConferenceSlider();
      }
    }

    if (teamSliderContainer && conferenceSliderContainer) {
      xlBreakpoint.addEventListener("change", breakpointCheck);
      breakpointCheck();
    }
  }

  initTeamSlider() {
    if (document.querySelector("#teamSlider")) {
      this.teamSlider = new Swiper("#teamSlider", {
        spaceBetween: 50,
        pagination: {
          el: '#teamSliderPagination',
        },
        navigation: {
          nextEl: '#teamSliderNext',
          prevEl: '#teamSliderPrev',
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          }
        }
      });
    }
  }

  initConferenceSlider() {
    if (document.querySelector("#conferenceSlider")) {
      this.conferenceSlider = new Swiper("#conferenceSlider", {
        spaceBetween: 50,
        pagination: {
          el: '#conferenceSliderPagination',
        },
        navigation: {
          nextEl: '#conferenceSliderNext',
          prevEl: '#conferenceSliderPrev',
        },
        breakpoints: {
          576: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
          }
        }
      });
    }
  }
}
