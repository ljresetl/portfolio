document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');
  const scrollUpBtn = document.querySelector('.scroll-btn.up');
  const scrollDownBtn = document.querySelector('.scroll-btn.down');

  // Відкриття меню
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });

  // Закриття меню
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  closeBtn.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);

  // Закриття меню при кліку на посилання + прокрутка
  menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      closeMobileMenu();
    });
  });

  // Прокрутка вгору
  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Прокрутка вниз
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }
});
