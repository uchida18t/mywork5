const swiper = new Swiper('.swiper', {
  loop: true,
  speed: 900,
  allowTouchMove: true,
  slidesPerView: 1.15,
  centeredSlides: true,
  autoplay: {
    delay: 4800,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});