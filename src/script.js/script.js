

document.addEventListener('DOMContentLoaded', function () {

  const header = document.querySelector('.header-novo-estilo');
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
      header.classList.add('nav-scrolled');
    } else {
      header.classList.remove('nav-scrolled');
    }
  });

  const btnHamburger = document.querySelector('.menu-hamburguer');
  const navPrincipal = document.querySelector('.nav-principal');
  if (btnHamburger && navPrincipal) {
    btnHamburger.addEventListener('click', function () {
      navPrincipal.classList.toggle('ativo');
      // Acessibilidade
      btnHamburger.setAttribute(
        'aria-expanded',
        navPrincipal.classList.contains('ativo')
      );
    });

    navPrincipal.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navPrincipal.classList.remove('ativo');
        btnHamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const cards = document.querySelectorAll('.card-local');
  cards.forEach(card => {
  const carousel = card.querySelector('.carousel-images');
  const prev = card.querySelector('.prev');
  const next = card.querySelector('.next');
  if (!carousel || !prev || !next) return;

  const images = carousel.querySelectorAll('img');
  const imageWidth = images[0] ? images[0].clientWidth : 400;

  // Botões de navegação
  next.addEventListener('click', () => {
    carousel.scrollBy({ left: imageWidth, behavior: 'smooth' });
  });
  prev.addEventListener('click', () => {
    carousel.scrollBy({ left: -imageWidth, behavior: 'smooth' });
  });

  let startX = 0;
  let isDown = false;

  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener('touchend', (e) => {
    if (!isDown) return;
    isDown = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 50; 

    if (Math.abs(diff) > threshold) {
      const direction = diff > 0 ? -1 : 1;
      const currentScroll = carousel.scrollLeft;
      let targetIndex = Math.round(currentScroll / imageWidth) + direction;
      targetIndex = Math.max(0, Math.min(images.length - 1, targetIndex));
      carousel.scrollTo({ left: targetIndex * imageWidth, behavior: 'smooth' });
    } else {
      const currentScroll = carousel.scrollLeft;
      const targetIndex = Math.round(currentScroll / imageWidth);
      carousel.scrollTo({ left: targetIndex * imageWidth, behavior: 'smooth' });
    }
  });
});
});