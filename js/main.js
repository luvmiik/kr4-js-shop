const THEME_STORAGE_KEY = 'murakami-theme';

const themeToggle = document.querySelector('.theme-toggle');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  }
}

function initTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    savedTheme = null;
  }
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      console.warn('main.js: localStorage недоступен');
    }
  });
}

initTheme();

const navToggle = document.querySelector('.site-nav__toggle');
const siteNav = document.querySelector('.site-nav');

function closeNav() {
  if (!siteNav) {
    return;
  }
  siteNav.classList.remove('site-nav--open');
  if (navToggle) {
    navToggle.classList.remove('site-nav__toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Открыть меню');
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('site-nav--open');
    navToggle.classList.toggle('site-nav__toggle--open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
  });

  siteNav.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
    }
  });

  const desktopMedia = window.matchMedia('(min-width: 641px)');
  desktopMedia.addEventListener('change', (event) => {
    if (event.matches) {
      closeNav();
    }
  });
}

const successMessage = document.getElementById('success-message');
let successTimer;

function showSuccess(text) {
  if (!successMessage) {
    return;
  }
  successMessage.textContent = text;
  successMessage.hidden = false;
  clearTimeout(successTimer);
  successTimer = setTimeout(() => {
    successMessage.hidden = true;
  }, 5000);
}

const feedbackForm = document.getElementById('feedback-form');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!feedbackForm.checkValidity()) {
      feedbackForm.reportValidity();
      return;
    }
    showSuccess('Сообщение отправлено! Мы ответим вам в течение рабочего дня.');
    feedbackForm.reset();
  });
}

console.log('main.js: страница инициализирована');
