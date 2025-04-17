document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');
  const scrollUpBtn = document.querySelector('.scroll-btn.up');
  const scrollDownBtn = document.querySelector('.scroll-btn.down');
  const scrollButtons = document.querySelector('.scroll-buttons');

  // Відкриття меню
  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    scrollButtons.style.display = 'none'; // Ховаємо стрілки
  });

  // Закриття меню
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    scrollButtons.style.display = 'flex'; // Показуємо стрілки
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

  // 👉 Свайп для закриття мобільного меню
  let touchStartX = 0;
  let touchEndX = 0;

  mobileMenu.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  mobileMenu.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      closeMobileMenu();
    }
  }

  // Показати ще — плавне розгортання
  const items = document.querySelectorAll('.project-item');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const itemsPerClick = 3;
  let currentIndex = 0;

  function showNextItems() {
    const nextItems = Array.from(items).slice(currentIndex, currentIndex + itemsPerClick);

    nextItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 100); // плавне по черзі
    });

    currentIndex += itemsPerClick;

    if (currentIndex >= items.length) {
      loadMoreBtn.style.display = 'none';
    }
  }

  if (loadMoreBtn && items.length > 0) {
    showNextItems();
    loadMoreBtn.addEventListener('click', showNextItems);
  }
});

// Кнопка "вгору" після 10% скролу сторінки
(function () {
  const btn = document.getElementById('to-top');
  const THRESHOLD = 0.10;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollY > pageHeight * THRESHOLD) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
