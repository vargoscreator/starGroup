if (typeof Swiper !== "undefined") {
    document.querySelectorAll(".using__block").forEach(block => {
        const sliderEl = block.querySelector(".using__slider");
        const paginationEl = block.querySelector(".using__block-pagination");
        const nextBtn = block.querySelector(".using__block-next");
        const prevBtn = block.querySelector(".using__block-prev");

        new Swiper(sliderEl, {
            slidesPerView: 1.4,
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            pagination: {
                el: paginationEl,
                clickable: true,
            },
            breakpoints: {
                480: {
                    slidesPerView: 2,
                },
                1000: {
                    slidesPerView: 2.4,
                },
                1280: {
                    spaceBetween: 28,
                    slidesPerView: 3.1,
                },
            },
        });
    });
}

document.querySelectorAll(".using__block").forEach(block => {
    const title = block.querySelector(".using__block-title");
    const number = block.querySelector(".using__block-number");

    [title, number].forEach(el => {
        if (el) {
            el.addEventListener("click", () => {
                document.querySelectorAll(".using__block.active").forEach(b => b.classList.remove("active"));
                block.classList.add("active");
            });
        }
    });
});
