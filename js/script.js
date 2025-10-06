AOS.init({
	once: true,
    duration: 600,
});
handleHeaderBlocks();
window.addEventListener('resize', handleHeaderBlocks);
function handleHeaderBlocks() {
  const headerContent = document.querySelector('.header__content');
  const mobileBlock = document.querySelector('.header__block-mobile');
  const headerBottomContainer = document.querySelector('.header__bottom .container');
  if (!headerContent || !mobileBlock || !headerBottomContainer) return;
  if (window.innerWidth < 768) {
    if (!headerBottomContainer.contains(mobileBlock)) {
      headerBottomContainer.appendChild(mobileBlock);
    }
  } else {
    if (!headerContent.contains(mobileBlock)) {
      const secondBlock = headerContent.querySelectorAll('.header__block:not(.header__block-mobile)')[0];
      if (secondBlock) {
        headerContent.insertBefore(mobileBlock, secondBlock);
      } else {
        headerContent.appendChild(mobileBlock);
      }
    }
  }
}





document.addEventListener("DOMContentLoaded", function () {
    if (typeof Swiper === "undefined") return;

    let whyledSlider = new Swiper(".whyled__slider", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: ".whyled__slider-next",
            prevEl: ".whyled__slider-prev",
        },
        pagination: {
            el: ".whyled__slider-pagination",
            clickable: true,  
        },
        breakpoints: {
            768: {
                spaceBetween: 28,
                slidesPerView: 5,
            },
        },
    });

    let reviewsSlider = new Swiper(".reviews__slider", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: ".reviews__next",
            prevEl: ".reviews__prev",
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                spaceBetween: 47,
                slidesPerView: 3,
            },
        },
    });

    let ourworksSlider = new Swiper(".ourworks__slider", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 2,
        navigation: {
            nextEl: ".ourworks__slider-next",
            prevEl: ".ourworks__slider-prev",
        },
        pagination: {
            el: ".ourworks__slider-pagination",
            clickable: true,  
        },
        breakpoints: {
            768: {
                spaceBetween: 45,
                slidesPerView: 3,
            },
        },
    });

    let teamSlider = new Swiper(".team__slider", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1.4,
        navigation: {
            nextEl: ".team__slider-next",
            prevEl: ".team__slider-prev",
        },
        pagination: {
            el: ".team__slider-pagination",
            clickable: true,  
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
            },
            768: {
                spaceBetween: 40,
                slidesPerView: 4.2,
            },
        },
    });

    let productionSlider = new Swiper(".production__slider", {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        pagination: {
            el: ".production__slider-pagination",
            clickable: true,  
        },
    });

    if(document.querySelector('.clients__slider-first')){
        const clientsSliderFirst = new Swiper(".clients__slider-first", {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            freeModeMomentum: false,
            speed: 5000,
            breakpoints: {
                768: { spaceBetween: 40 }
            }
        });

        const clientsSliderSecond = new Swiper(".clients__slider-second", {
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            freeMode: true,
            freeModeMomentum: false,
            speed: 5000,
            breakpoints: {
                768: { spaceBetween: 40 }
            }
        });
        function autoScroll(slider, direction = 1, speed = 0.5) {
            let translate = 0;
            let maxTranslate = slider.wrapperEl.scrollWidth / 2;

            function step() {
                translate += speed * direction;
                if (translate > maxTranslate) translate = 0;
                if (translate < 0) translate = maxTranslate;
                slider.setTranslate(-translate);
                requestAnimationFrame(step);
            }

            step();
        }
        autoScroll(clientsSliderFirst, 1, 0.5);
        autoScroll(clientsSliderSecond, -1, 0.5);
    }
});

document.querySelectorAll('.types__selects-btn').forEach(button => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-types');
    document.querySelectorAll('.types__selects-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.types__result').forEach(result => {
      if (result.getAttribute('data-types-result') === type) {
        result.classList.add('active');
      } else {
        result.classList.remove('active');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelectorAll('.stepsled__form')){
        const steps = document.querySelectorAll('.stepsled__line-num');
        const stepsBlocks = document.querySelectorAll('.stepsled__form-block');
        const form = document.querySelector('.stepsled__form');
        let currentStep = 0;

        function showStep(index) {
            if (index < 0 || index >= stepsBlocks.length) return;
            stepsBlocks.forEach((block, i) => {
                const isActive = i === index;
                block.classList.toggle('active', isActive);
                const inputs = block.querySelectorAll('input, select, textarea, button');
                inputs.forEach(input => {
                    input.disabled = !isActive;
                });
            });
            steps.forEach((step, i) => {
                step.classList.toggle('active', i <= index);
            });
            currentStep = index;
        }

        stepsBlocks.forEach((block) => {
            const prevBtn = block.querySelector('.stepsled__form-prev');
            const nextBtn = block.querySelector('.stepsled__form-next');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentStep > 0) {
                        showStep(currentStep - 1);
                    }
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentStep < stepsBlocks.length - 1) {
                        showStep(currentStep + 1);
                    }
                });
            }
        });
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            fetch('send.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(data => {
                showStep(stepsBlocks.length - 1);
            })
            .catch(err => {});
        });
        showStep(0);
    }
});


const slides = document.querySelectorAll('.reviews__slide');

slides.forEach((slide, index) => {
  const btn = slide.querySelector('.reviews__slide-show');
  
  btn.addEventListener('click', () => {
    const images = Array.from(document.querySelectorAll('.reviews__slide img')).map(img => ({
      src: img.src,
      type: 'image'
    }));

    Fancybox.show(images, {
      startIndex: index
    });
  });
});



document.querySelectorAll('.faq__item-title').forEach(title => {
    title.addEventListener('click', () => {
        const item = title.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq__item').forEach(el => el.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.stepsled__line-num');
    const stepsBlocks = document.querySelectorAll('.stepsled__form-block');
    const form = document.querySelector('.stepsled__form');
    const formImages = document.querySelectorAll('.stepsled__form-right .stepsled__form-image');
    let currentStep = 0;

    function showStep(index) {
        if (index < 0 || index >= stepsBlocks.length) return;
        stepsBlocks.forEach((block, i) => {
            const isActive = i === index;
            block.classList.toggle('active', isActive);
            const inputs = block.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => {
                input.disabled = !isActive;
            });
        });

        if (steps.length) {
            steps.forEach((step, i) => {
                step.classList.toggle('active', i <= index);
            });
        }
        if (formImages.length) {
            formImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }
        currentStep = index;
    }

    function sendForm() {
        const formData = new FormData(form);
        return fetch('send.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then(() => {
            showStep(stepsBlocks.length - 1);
        })
        .catch(err => {
            console.error(err);
        });
    }

    stepsBlocks.forEach((block, i) => {
        const prevBtn = block.querySelector('.stepsled__form-prev');
        const nextBtn = block.querySelector('.stepsled__form-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentStep > 0) {
                    showStep(currentStep - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (block.querySelector('#name') && block.querySelector('#tel')) {
                    sendForm().then(() => {
                        resetForm();
                    });
                } 
                else if (i === stepsBlocks.length - 1) {
                    resetForm();
                } 
                else {
                    if (currentStep < stepsBlocks.length - 1) {
                        showStep(currentStep + 1);
                    }
                }
            });

        }
    });
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        sendForm();
    });

    function resetForm() {
        form.reset();
        stepsBlocks.forEach(block => {
            block.classList.remove('active');
            const inputs = block.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => input.disabled = true);
            inputs.forEach(input => {
                input.classList.remove('filled');
            });
        });
        steps.forEach(step => step.classList.remove('active'));
        formImages.forEach(img => img.classList.remove('active'));
        showStep(0);
    }


    showStep(0);
});


document.addEventListener('DOMContentLoaded', () => {
    const headerProductsOpenClose = document.querySelectorAll('.header__products-open, .header__products-close');
    const headerProducts = document.querySelector('.header__products');

    headerProductsOpenClose.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            headerProducts.classList.toggle('active');
            document.querySelector('.body').classList.toggle('no-scroll');
        });
    }); 

    const headerBurger = document.querySelectorAll('.header__burger, .header__bottom-close');
    const headerMenu = document.querySelector('.header__bottom');

    headerBurger.forEach(element => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            headerMenu.classList.toggle('active');
            document.querySelector('.body').classList.toggle('no-scroll');
        });
    }); 
  
});




document.querySelectorAll('.stepsled__form-size input').forEach(input => {
  input.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      input.classList.add('filled');
    } else {
      input.classList.remove('filled');
    }
  });
});




document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector(".popup");
    const popupInner = popup.querySelector(".popup__inner");
    const popupCloseBtn = popup.querySelector(".popup__close");
    const popupOpenBtns = document.querySelectorAll(".popup-open");
    popupOpenBtns.forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            popup.classList.add("show");
        });
    });
    popupCloseBtn.addEventListener("click", () => {
        popup.classList.remove("show");
    });
    popup.addEventListener("click", e => {
        if (!popupInner.contains(e.target)) {
            popup.classList.remove("show");
        }
    });
});
