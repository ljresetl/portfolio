document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Мобільне меню
  // -------------------------------
  const burgerBtn = document.querySelector('.burger-menu');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const menuLinks = document.querySelectorAll('.mobile-menu-link');
  const scrollButtons = document.querySelector('.scroll-buttons');
  const scrollUpBtn = document.querySelector('.scroll-btn.up');
  const scrollDownBtn = document.querySelector('.scroll-btn.down');

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (scrollButtons) scrollButtons.style.display = 'flex';
  }

  burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    mobileMenuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (scrollButtons) scrollButtons.style.display = 'none';
  });

  closeBtn.addEventListener('click', closeMobileMenu);
  mobileMenuOverlay.addEventListener('click', closeMobileMenu);

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

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', () => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
  }

  // Свайп для закриття мобільного меню
  let touchStartX = 0;
  let touchEndX = 0;

  mobileMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  mobileMenu.addEventListener('touchend', (e) => {
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

  // -------------------------------
  // Показати ще (проєкти)
  // -------------------------------
  const items = document.querySelectorAll('.project-item');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const itemsPerClick = 4;
  let currentIndex = 0;

  function showNextItems() {
    const nextItems = Array.from(items).slice(currentIndex, currentIndex + itemsPerClick);
    nextItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 100);
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

  // -------------------------------
  // Кнопка скрол вправо/вліво
  // -------------------------------
  const scrollContainer = document.getElementById('projects-container');
  const scrollBtn = document.getElementById('scrollNextBtn');

  if (scrollContainer && scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const scrollAmount = scrollContainer.offsetWidth * 0.1;
      if (scrollContainer.scrollLeft + scrollAmount >= scrollContainer.scrollWidth - scrollAmount) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  }

  // -------------------------------
  // Кнопка "вгору" (20% скролу)
  // -------------------------------
  const toTopBtn = document.getElementById('to-top');
  const THRESHOLD = 0.20;

  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollY > pageHeight * THRESHOLD) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -------------------------------
  // Показ резюме зверху поверх сайту
  // -------------------------------
  const resume = document.getElementById('resume');
  const resumeLinks = document.querySelectorAll('.show-resume');

  function outsideClickListener(e) {
    if (resume && !resume.contains(e.target)) {
      resume.style.display = 'none';
      document.removeEventListener('mousedown', outsideClickListener);
    }
  }

  if (resume && !resume.querySelector('.close-resume')) {
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.className = 'close-resume';
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '10px',
      right: '20px',
      fontSize: '24px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#333',
      zIndex: 10000,
    });
    resume.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
      resume.style.display = 'none';
      document.removeEventListener('mousedown', outsideClickListener);
    });
  }

  if (resume && resumeLinks.length > 0) {
    resumeLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        resume.style.display = 'block';
        resume.scrollTop = 0;

        setTimeout(() => {
          document.addEventListener('mousedown', outsideClickListener);
        }, 0);

        // Закриваємо мобільне меню, якщо відкрито
        closeMobileMenu?.();
      });
    });
  }

  // -------------------------------
  // Модальне вікно зворотного зв'язку
  // -------------------------------
  const modalOverlay = document.querySelector('.modal-overlay');
  const openModalBtn = document.querySelector('.one-button');
  const closeModalBtn = document.querySelector('.modal-close');

  if (modalOverlay && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });

    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (event) => {
      if (event.target === modalOverlay) {
        modalOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // -------------------------------
  // Обробка форми зворотного зв'язку
  // -------------------------------
  const form = document.querySelector('.modal-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const privacyCheckbox = form.querySelector('#user-privacy');
      if (!privacyCheckbox || !privacyCheckbox.checked) {
        alert('Будь ласка, прийміть умови Приватної політики перед відправкою.');
        privacyCheckbox?.focus();
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          alert('Дякуємо! Ваші дані надіслані.');
          form.reset();
          if (modalOverlay) {
            modalOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        } else {
          alert('Виникла помилка при відправці форми. Спробуйте пізніше.');
        }
      } catch (error) {
        alert('Помилка мережі. Спробуйте пізніше.');
      }
    });
  }
});
