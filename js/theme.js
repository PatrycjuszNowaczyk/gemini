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
        if(isMobileMenuActive == true){
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
        setTimeout(()=>{
            navLinks.style.opacity = '1';
        },400)
        setTimeout(()=>{
            navMobileWrapper.style.overflowY = 'overlay';
        },600)
        setTimeout(()=>{
            navSearch.style.opacity = '1';
            navSocials.style.opacity = '1';
        },800)
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
window.addEventListener('scroll', ()=> {
    if(window.pageYOffset > 50){
        document.getElementsByTagName('nav')[0].classList.add('js-scrolled');
    }
    else{
        document.getElementsByTagName('nav')[0].classList.remove('js-scrolled');
    }
}, false);

// add top padding to header if there is a class js-add-top-padding
if(document.getElementsByTagName('header')[0].classList.contains('js-add-top-padding')){
    document.getElementsByTagName('header')[0].style.paddingTop = `${navWrapper.clientHeight}px`;
    window.addEventListener('resize', ()=> {
        setTimeout(()=>{
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
