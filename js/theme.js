/* GLOBAL SETTINGS FOR ALL PAGES */
/* NAVIGATION */
// search form toggle bottom line when input is on focus or not
let navSearchForm = document.querySelector('#nav-search-form');
let navSearchInput = navSearchForm.querySelector('#nav-search-input');
navSearchInput.addEventListener('focus', () => {
    navSearchForm.classList.add('--focus');
}, false)
navSearchInput.addEventListener('blur', () => {
    navSearchForm.classList.remove('--focus');
}, false)
// set mobile menu
let areMobileVarsSet = false;
let isMobileMenu = false
let navMobileWrapper = null;
let navLogo = null;
let navLinks = null;
let navSearch = null;
let navSocials = null;
let navSearchAndSocials = null;
let navLinksWrapper = null;
let navMenuButton = document.getElementById('nav-menu-button');
let isMobileMenuActive = false;
let navWrapper = document.querySelector('.nav__wrapper');
function changeMobileMenu() {
    if (areMobileVarsSet == false) {
        navMobileWrapper = document.querySelector('#nav-mobile-wrapper');
        navLogo = document.querySelector('#nav-logo').cloneNode();
        navLinks = document.querySelector('#nav-links');
        navSearch = document.querySelector('#nav-search');
        navSocials = document.querySelector('#nav-socials');
        navSearchAndSocials = document.querySelectorAll('.nav__searchAndSocials')[0];
        navLinksWrapper = document.querySelectorAll('.nav__linksWrapper')[0];
        areMobileVarsSet = true;
    }
    if (window.innerWidth < 768 && isMobileMenu == false) {
        navMobileWrapper.appendChild(navLogo);
        navMobileWrapper.appendChild(navSearch);
        navMobileWrapper.appendChild(navLinks);
        navMobileWrapper.appendChild(navSocials);
        isMobileMenu = true;
        if (isMobileMenuActive == true) {
            document.body.style.overflow = 'hidden';
        }
    }
    else if (window.innerWidth > 767 && isMobileMenu == true) {
        navSearchAndSocials.appendChild(navSearch);
        navSearchAndSocials.appendChild(navSocials);
        navLinksWrapper.appendChild(navLinks);
        navMobileWrapper.removeChild(navLogo);
        isMobileMenu = false;
        document.body.style.removeProperty('overflow');
    }
}
if (window.innerWidth < 768) {
    changeMobileMenu();
}
window.addEventListener('resize', changeMobileMenu, false);

// toggle menu open close
navMenuButton.addEventListener('click', () => {
    if (isMobileMenuActive == false) {
        navMenuButton.classList.add('is-active');
        navMobileWrapper.style.maxHeight = `calc(100vh - ${navWrapper.clientHeight}px)`;
        document.getElementsByTagName('nav')[0].style.backgroundColor = 'var(--bs-white)';
        document.body.style.overflow = 'hidden';
        navLogo.style.opacity = '1';
        setTimeout(() => {
            navLinks.style.opacity = '1';
        }, 400)
        setTimeout(() => {
            navMobileWrapper.style.overflowY = 'overlay';
        }, 600)
        setTimeout(() => {
            navSearch.style.opacity = '1';
            navSocials.style.opacity = '1';
        }, 800)
        isMobileMenuActive = true;
    }
    else {
        navMenuButton.classList.remove('is-active');
        navMobileWrapper.style.removeProperty('max-height');
        navMobileWrapper.style.removeProperty('overflow-y');
        navSearch.style.removeProperty('opacity');
        document.getElementsByTagName('nav')[0].style.removeProperty('background-color');
        setTimeout(() => { document.body.style.removeProperty('overflow') }, 600);
        navLogo.style.removeProperty('opacity');
        navLinks.style.removeProperty('opacity');
        navSocials.style.removeProperty('opacity');
        isMobileMenuActive = false;
    }
}, false);

// change navigation background on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        document.getElementsByTagName('nav')[0].classList.add('js-scrolled');
    }
    else {
        document.getElementsByTagName('nav')[0].classList.remove('js-scrolled');
    }
}, false);

// add top padding to header tag if there is a class js-add-top-padding
if (document.getElementsByTagName('header')[0].classList.contains('js-add-top-padding')) {
    document.getElementsByTagName('header')[0].style.paddingTop = `${navWrapper.clientHeight}px`;
    window.addEventListener('resize', () => {
        setTimeout(() => {
            document.getElementsByTagName('header')[0].style.paddingTop = `${navWrapper.clientHeight}px`;
        }, 600);
    })
}

/* SETTINGS FOR SINGLE PAGE */
/* SINGLE COMPONENTS ON A PAGE */
// 1. check if there is a specific component on a page
// 2. run action for this component

// component .bigImgAndSlider
let bigImgAndSlider = document.querySelector('.bigImgAndSlider');
if (bigImgAndSlider) {
    let heading = bigImgAndSlider.querySelector('.bigImgAndSlider__heading');
    let mobileParent = heading.parentNode.parentNode.childNodes[1];
    let desktopParent = heading.parentNode.parentNode.childNodes[3];
    let isMobileChanged = window.innerWidth < 768 ? true : false;
    if (isMobileChanged) {
        mobileParent.insertBefore(heading, mobileParent.childNodes[1]);
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !isMobileChanged) {
            mobileParent.insertBefore(heading, mobileParent.childNodes[1]);
            isMobileChanged = true;
        }
        else if (window.innerWidth > 767 && isMobileChanged) {
            desktopParent.insertBefore(heading, desktopParent.childNodes[1]);
            isMobileChanged = false;
        }
    }, false);
}
// component .headerOne
let headerOne = document.getElementById('headerOne');
if (headerOne) {
    let buttonScrollDownTo = document.getElementById('js-button-scroll-down-to');
    let elementScrollDownTo = document.getElementById('js-scroll-down-to');
    buttonScrollDownTo.addEventListener('click', () => {
        window.scrollTo(0, elementScrollDownTo.offsetTop - navWrapper.clientHeight);
        // window.scrollTo(0, elementScrollDownTo.offsetTop);
    }, false);
    headerOne.getElementsByClassName('headerOne__image')[0].getElementsByClassName('wrapper')[0].style.top = `calc(${navWrapper.clientHeight}px + 1.5rem)`;
    window.addEventListener('resize', () => {
        headerOne.getElementsByClassName('headerOne__image')[0].getElementsByClassName('wrapper')[0].style.top = `calc(${navWrapper.clientHeight}px + 1.5rem)`;
    }, false)
}

// component .cardBigShowup
// steps of card's show hidden information animation
//// 1. get all .cardBigShowup elements if there are on page then run script
//// 2. get cover element
//// 3. foreach .cardBigShowup add eventListener
//// 4. if clicked button then get .hiddenText element
// 5. count left and right for text element
// 6. get height of text element
// 7. put clone of hidden text to hidden dummy container and get min-height for visible .hiddenText element
// 8. get height of a dummy container
// 9. add --active class to element that is showing .hiddenText
// 10. set cover opacity to 1
// 11. set left, right and min-height of .hiddenText
// 12. set opacity to 1 to hidden text
// 13. remove inline left and right to .hiddenText
// 14. set min-height to .hiddenText
// 15. set opacity to 1 to content of .hiddenText

let cardBigShowupElements = Array.from(document.getElementsByClassName('cardBigShowup'));
if (cardBigShowupElements[0]) {
    console.log('there are cards that have hidden text');
    let coverElement = document.querySelector('.cardBigShowup__cover');
    let dummyElement = document.querySelector('.cardBigShowup__dummy');
    let currentElement = {
        'element': null,
        'cardBigShowup__hiddenText': {
            'element': null,
            'height': null
        },
        'cardBigShowup__text': {
            'offset-left': null,
            'offset-right': null,
            'height': null
        },
        'container': {
            'element': null,
            'padding': null
        }
    };
    window.addEventListener('resize', () => {
        if (currentElement.element) {
            setTimeout(() => {
                currentElement.cardBigShowup__text.style.minHeight = currentElement.cardBigShowup__hiddenText.clientHeight + 'px';
            }, 300)
        }
    }, false);
    cardBigShowupElements.forEach(function (element) {
        element.querySelector('button.btn').addEventListener('click', () => {
            let div = document.createElement('div');
            currentElement['element'] = element;
            currentElement['cardBigShowup__text'] = element.querySelector('.cardBigShowup__text');
            currentElement['cardBigShowup__hiddenText'] = element.querySelector('.cardBigShowup__hiddenText');
            dummyElement.innerHTML = currentElement.cardBigShowup__hiddenText.cloneNode(true).innerHTML;
            currentElement.container.element = currentElement.element.parentNode.parentNode;
            currentElement.container["padding"] = currentElement.element.parentNode.offsetWidth - currentElement.element.appendChild(div).offsetWidth;
            currentElement.element.removeChild(div);
            currentElement.cardBigShowup__text["offset-left"] = currentElement.cardBigShowup__text.closest('.col-12').offsetLeft + 0.5 * currentElement.container.padding;
            currentElement.cardBigShowup__text["offset-right"] = currentElement.cardBigShowup__text.closest('.row').offsetWidth - currentElement.cardBigShowup__text["offset-left"] - currentElement.cardBigShowup__text.offsetWidth;
            currentElement.cardBigShowup__hiddenText.style.left = currentElement.cardBigShowup__text["offset-left"] + 'px';
            currentElement.cardBigShowup__hiddenText.style.right = currentElement.cardBigShowup__text["offset-right"] + 'px';
            currentElement.cardBigShowup__hiddenText.style.minHeight = currentElement.cardBigShowup__text.closest('td').clientHeight + 'px';
            currentElement.cardBigShowup__hiddenText.style.maxHeight = currentElement.cardBigShowup__text.closest('td').clientHeight + 'px';
            coverElement.classList.add('--active');
            currentElement.element.classList.add('--active');
            currentElement.cardBigShowup__hiddenText.style.left = currentElement.container.padding * 0.5 + 'px';
            currentElement.cardBigShowup__hiddenText.style.right = currentElement.container.padding * 0.5 + 'px';
            setTimeout(() => {
                currentElement.cardBigShowup__hiddenText.style.maxHeight = dummyElement.clientHeight + 'px';
                currentElement.cardBigShowup__text.style.minHeight = dummyElement.clientHeight + 'px';
                setTimeout(() => {
                    currentElement.cardBigShowup__hiddenText.style.removeProperty('max-height');
                    currentElement.cardBigShowup__hiddenText.querySelector('.container').style.opacity = '1';
                }, 450);
            }, 450);
            currentElement.element.querySelector('.btn-close').addEventListener('click', () => {
                console.log('clicked on close');
                currentElement.cardBigShowup__hiddenText.querySelector('.container').style.opacity = '0';
                setTimeout(() => {
                    currentElement.cardBigShowup__hiddenText.style.maxHeight = currentElement.cardBigShowup__hiddenText.clientHeight + 'px';
                    setTimeout(() => {
                        currentElement.cardBigShowup__hiddenText.style.maxHeight = '0';
                        currentElement.cardBigShowup__text.style.minHeight = '0';
                        setTimeout(() => {
                            currentElement.cardBigShowup__hiddenText.style.left = currentElement.cardBigShowup__text["offset-left"] + 'px';
                            currentElement.cardBigShowup__hiddenText.style.right = currentElement.cardBigShowup__text["offset-right"] + 'px';
                            setTimeout(() => {
                                currentElement.cardBigShowup__hiddenText.style.opacity = '0';
                                coverElement.classList.remove('--active');
                                setTimeout(()=>{
                                    currentElement.element.classList.remove('--active');
                                    currentElement.cardBigShowup__hiddenText.removeAttribute('style');
                                    for(el of Object.entries(currentElement)){
                                        el[1] = null;
                                    }
                                },300)
                            }, 200)
                        }, 150)
                    }, 300);
                }, 300);
            }, false);


            // console.log(currentElement.cardBigShowup__hiddenText.cloneNode);
            console.log(dummyElement);
            console.log(currentElement);
            console.log(currentElement.cardBigShowup__text.offsetLeft);
            console.log('left: ' + currentElement.cardBigShowup__text["offset-left"]);
            console.log('right: ' + currentElement.cardBigShowup__text["offset-right"]);
            console.log(currentElement.cardBigShowup__hiddenText.height);
            console.log(currentElement.container);
            // console.log(element);
            // console.log(currentElement);
            // console.log('click');
        })


    });
}



/* SLIDERS */
// 1. check if there is a specific slider on a page
// 2. set slider object and set settings
if (document.querySelector('.header__swiper')) {

    const swiper = new Swiper('.header__swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        // spaceBetween: 0,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: true,
        },
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        // And if we need scrollbar
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        // },
    });
}
if (document.querySelector('.bigImgAndSlider__swiper')) {

    const swiper = new Swiper('.bigImgAndSlider__swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        // spaceBetween: 0,
        grabCursor: true,
        keyboard: {
            enabled: false,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
    });
}
if (document.querySelector('.filmSlider__swiper')) {

    const swiper = new Swiper('.filmSlider__swiper', {
        // Optional parameters
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        // spaceBetween: 0,
        grabCursor: true,
        keyboard: {
            enabled: false,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
    });
}
if (document.querySelector('.gallerySlider')) {

    // let lightbox = new SimpleLightbox('.gallerySlider__swiper a', {
    //     disableScroll: true
    // });
    const swiper = new Swiper('.gallerySlider__swiper', {
        // Optional parameters
        slidesPerView: '1',
        centeredSlides: true,
        loop: true,
        // spaceBetween: 0,
        grabCursor: false,
        keyboard: {
            enabled: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: true,
        },
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            slideShadows: true,
        },
        speed: 400,
        // Navigation arrows
        navigation: {
            nextEl: '.next',
            prevEl: '.prev',
        },
        on: {
            init: function () {
                setTimeout(() => {
                    let lightbox = new SimpleLightbox('.gallerySlider__swiper a', {
                        disableScroll: true,
                        uniqueImages: false,
                        showCounter: false
                    });
                }, 600);
            },
        }
    });
    // swiper.on('beforeLoopFix', function () {
    //     let lightboxGallerySlider = new SimpleLightbox('.gallerySlider__swiper a', { 
    //         disableScroll: true
    //      });
    //   });
}