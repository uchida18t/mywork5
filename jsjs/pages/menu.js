'use strict';
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

// メニュー描画
{
  const lTargets = document.querySelectorAll('.menu-list-target');
  for (let i = 0; i < lTargets.length; i++) {
    if (localStorage.getItem('menu_category')) {
      const p = localStorage.getItem('menu_category');
      if (lTargets[i].textContent === p) {
        lTargets[i].classList.add('selected');
      }
    } else {
      lTargets[0].classList.add('selected');
    }
  }

  const ul = document.querySelector('.menu-contents-ul');
  const json = '/mywork5/data/menu.json';
  async function displayMenu() {
    const preData = await fetch(json);
    const data = await preData.json();
    data.forEach(menu => {
      if (localStorage.getItem('menu_category')) {
        const i = localStorage.getItem('menu_category');
        if (menu.category === i) {
          const li = document.createElement('LI');
          li.classList.add('menu-contents-li');
          const p1 = document.createElement('P');
          const p2 = document.createElement('P');
          const img = document.createElement('IMG');
          img.setAttribute('src', menu.img);
          img.setAttribute('alt', menu.name);
          p2.textContent = menu.name;
          ul.appendChild(li);
          li.appendChild(p1);
          li.appendChild(p2);
          p1.appendChild(img);
        }
      } else {
        const li = document.createElement('LI');
        li.classList.add('menu-contents-li');
        const p1 = document.createElement('P');
        const p2 = document.createElement('P');
        const img = document.createElement('IMG');
        img.setAttribute('src', menu.img);
        img.setAttribute('alt', menu.name);
        p2.textContent = menu.name;
        ul.appendChild(li);
        li.appendChild(p1);
        li.appendChild(p2);
        p1.appendChild(img);
      }
    });
    document.querySelectorAll('.menu-contents-li').forEach((li, index) => {
      li.style.animationDelay = index * .1 + 's';
    });
  }
  displayMenu().catch(() => {
    alert('申し訳ございませんが、お使いのブラウザではメニューを表示できません。');
  });

  const all = document.querySelector('.set-all');
  const conf = document.querySelector('.set-conf');
  const bread = document.querySelector('.set-bread');
  const drink = document.querySelector('.set-drink');
  function rm() {
    localStorage.removeItem('menu_category');
    let count = ul.childElementCount;
    if (count > 0) {
      while (count > 0) {
        ul.removeChild(ul.firstElementChild);
        count--;
      }
    }
  }
  function set(i) {
    localStorage.setItem('menu_category', i);
    displayMenu();
  }
  all.addEventListener('click', () => {
    rm();
    displayMenu();
    lTargets.forEach(lt => {
      lt.classList.remove('selected');
    });
    all.classList.add('selected');
  });
  conf.addEventListener('click', () => {
    rm();
    set('CONFECTIONERY');
    lTargets.forEach(lt => {
      lt.classList.remove('selected');
    });
    conf.classList.add('selected');
  });
  bread.addEventListener('click', () => {
    rm();
    set('BREAD');
    lTargets.forEach(lt => {
      lt.classList.remove('selected');
    });
    bread.classList.add('selected');
  });
  drink.addEventListener('click', () => {
    rm();
    set('DRINK');
    lTargets.forEach(lt => {
      lt.classList.remove('selected');
    });
    drink.classList.add('selected');
  });
}