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
                slidesPerView: 2,
            },
            1000: {
                slidesPerView: 3,
            },
            1280: {
                spaceBetween: 28,
                slidesPerView: 4.2,
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
                slidesPerView: 1,
            },
            1000: {
                slidesPerView: 2,
            },
            1280: {
                spaceBetween: 47,
                slidesPerView: 3,
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

    const clientsSliderFirst = new Swiper(".clients__slider-first", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        freeModeMomentum: false,
        speed: 5000,
        breakpoints: {
            1280: { spaceBetween: 40 }
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
            1280: { spaceBetween: 40 }
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
    form.addEventListener('submit', (e) => {
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
});


document.querySelectorAll('.config__range').forEach(rangeWrapper => {
  const slider = rangeWrapper.querySelector('input[type="range"]');
  const valueSpan = rangeWrapper.querySelector('.config__range-value');
  const valueText = valueSpan.querySelector('span');
  function updateSlider() {
    const min = +slider.min;
    const max = +slider.max;
    const val = +slider.value;
    const percent = ((val - min) / (max - min)) * 100;
    valueText.textContent = `${val} см`;
    const offset = 0;
    valueSpan.style.left = `calc(${percent}% - ${offset}px)`;
  }
  function updateSlider() {
    const min = +slider.min;
    const max = +slider.max;
    const val = +slider.value;
    const percent = ((val - min) / (max - min)) * 100;
    slider.style.setProperty('--value', val);
    valueText.textContent = `${val} см`;
    valueSpan.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
  }
  slider.addEventListener('input', updateSlider);
  updateSlider(); 
});

document.querySelectorAll('.reviews__slide-show').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.closest('.reviews__slide-image').querySelector('img');
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


document.addEventListener("DOMContentLoaded", () => {
    const AreasItems = document.querySelectorAll(".areas__block-item");
    const AreasImages = document.querySelectorAll(".areas__block-image");
    AreasImages.forEach(img => {
        img.dataset.originalParent = img.parentElement.className;
    });
    function moveImages() {
        if (window.innerWidth < 768) {
            AreasItems.forEach(item => {
                const id = item.dataset.areasItem;
                const img = document.querySelector(`.areas__block-image[data-areas-image="${id}"]`);
                if (img && !item.contains(img)) {
                    item.appendChild(img);
                }
            });
        } else {
            AreasImages.forEach(img => {
                const originalParent = document.querySelector(`.${img.dataset.originalParent}`);
                if (originalParent && !originalParent.contains(img)) {
                    originalParent.appendChild(img);
                }
            });
        }
    }
    window.addEventListener("load", moveImages);
    window.addEventListener("resize", moveImages);
    const secondBlock = Array.from(
        document.querySelectorAll(".areas__block-content:last-of-type .areas__block-item")
    ).map(el => parseInt(el.dataset.areasItem));
    const firstBlock = Array.from(
        document.querySelectorAll(".areas__block-content:first-of-type .areas__block-item")
    ).reverse().map(el => parseInt(el.dataset.areasItem));
    const order = [...secondBlock, ...firstBlock];
    let index = 0;
    const delay = 3000;
    let intervalId;
    function activateById(id) {
        AreasItems.forEach(el => el.classList.remove("active"));
        AreasImages.forEach(el => el.classList.remove("active"));
        document.querySelector(`.areas__block-item[data-areas-item="${id}"]`)?.classList.add("active");
        document.querySelector(`.areas__block-image[data-areas-image="${id}"]`)?.classList.add("active");
    }
    function startInterval() {
        if (window.innerWidth < 768) return;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            activateById(order[index]);
            index = (index + 1) % order.length;
        }, delay);
    }

    activateById(order[index]);
    index = (index + 1) % order.length;

    AreasItems.forEach(item => {
        const title = item.querySelector('.areas__block-title');
        if (!title) return;
        title.addEventListener('click', () => {
            clearInterval(intervalId);
            const id = parseInt(item.dataset.areasItem);
            activateById(id);
            const newIndex = order.indexOf(id);
            if (newIndex !== -1) {
                index = (newIndex + 1) % order.length;
            }
            startInterval();
        });
    });
    startInterval();
    window.addEventListener("resize", () => {
        if (window.innerWidth < 768) {
            clearInterval(intervalId);
        } else {
            startInterval();
        }
    });
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