// loading, loaded
{
  const loading = document.getElementById('loading');
  const content = document.getElementById('content');
  const edges = document.querySelectorAll('.edge');
  document.addEventListener('DOMContentLoaded', () => {
    loading.classList.add('loaded');
    content.classList.add('loaded');
    edges.forEach(edge => {
      edge.classList.add('loaded');
    });
  });
}

// スムーズスクロール
{
  const anchors = document.querySelectorAll('.scroll-anchor');
  const targets = document.querySelectorAll('.target');
  for (let i = 0; i < anchors.length; i++) {
    const getRect = targets[i].getBoundingClientRect().top;
    const targetRect = getRect + window.pageYOffset;
    anchors[i].addEventListener('click', () => {
      if (window.innerWidth < 900) {
        window.scrollTo({
          top: targetRect - 74,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({
          top: targetRect - 85,
          behavior: 'smooth'
        });
      }
    });
  }
}

// 見出し固定
{
  const wrappers = document.querySelectorAll('.wrapper');
  const headings = document.querySelectorAll('.wrapper-heading');
  window.addEventListener('scroll', () => {
    for (let i = 0; i < wrappers.length; i++) {
      const wrapper = wrappers[i];
      const wHeight = wrapper.clientHeight * -1;
      const targetRect = wrapper.getBoundingClientRect().top;
      const heading = headings[i];
      if (window.innerWidth < 900) {
        if (
          wHeight + 200 <= targetRect - 74 &&
          targetRect - 74 <= 0
        ) {
          wrapper.classList.add('fixed');
        } else {
          wrapper.classList.remove('fixed');
        }
      } else {
        if (targetRect - 85 <= 0) {
          wrapper.classList.add('fixed');
        } else {
          wrapper.classList.remove('fixed');
        }
        if (
          wHeight + 340 <= targetRect - 85 &&
          targetRect - 85 <= 0
        ) {
          heading.classList.remove('fixed-out');
        } else if (wHeight + 340 > targetRect - 85) {
          heading.classList.add('fixed-out');
        }
      }
    }
  });
}

// スクロール挿入
{
  const scrollFades = document.querySelectorAll('.scroll-fade');
  window.addEventListener('scroll', () => {
    for (let i = 0; i < scrollFades.length; i++) {
      const scrollFade = scrollFades[i];
      const rect = scrollFade.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (window.innerWidth < 900) {
        if (
          scrollFade.clientHeight * -.7 < rect &&
          rect < windowHeight * .7
        ) {
          scrollFade.classList.add('scroll-fade-in');
        } else {
          scrollFade.classList.remove('scroll-fade-in');
        }
      } else {
        if (
          scrollFade.clientHeight * -.88 < rect &&
          rect < windowHeight * .88
        ) {
          scrollFade.classList.add('scroll-fade-in');
        } else {
          scrollFade.classList.remove('scroll-fade-in');
        }
      }
    }
  });
}