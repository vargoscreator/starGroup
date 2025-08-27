if (typeof Swiper !== "undefined") {
    const thumbsSwiper = new Swiper(".project__left-thumbs", {
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: {
            480: {
                spaceBetween: 20,
            },
        },
    });
    const mainSwiper = new Swiper(".project__slider", {
        spaceBetween: 10,
        slidesPerView: 1,
        navigation: {
            nextEl: ".project__slider-next",
            prevEl: ".project__slider-prev",
        },
        thumbs: {
            swiper: thumbsSwiper,
        },
        breakpoints: {
            480: {
                spaceBetween: 20,
            },
        },
    });
}

document.querySelectorAll('.project__review-show').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.project__review-image').querySelector('img');
    if (img) {
      Fancybox.show([
        {
          src: img.src,
          type: "image"
        }
      ]);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const videoWrapper = document.querySelector(".project__video-video");
    const video = videoWrapper.querySelector("video");
    const playBtn = videoWrapper.querySelector(".project__video-play");
    video.pause();
    playBtn.addEventListener("click", () => {
        video.play();
        video.setAttribute("controls", "controls");
        videoWrapper.classList.add("video-played");
        playBtn.style.display = "none";
    });
});
