const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const loaderScreen = document.getElementById('loader-screen');
const loaderProgress = document.getElementById('loader-progress');

const applyTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('narvada-theme', theme);
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }
};

const savedTheme = localStorage.getItem('narveda-theme');
applyTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

if (loaderScreen && loaderProgress) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 16 + 4;
    if (progress >= 100) {
      progress = 100;
      loaderProgress.style.width = '100%';
      clearInterval(interval);
      setTimeout(() => {
        loaderScreen.classList.add('hidden');
        setTimeout(() => loaderScreen.remove(), 500);
      }, 350);
    } else {
      loaderProgress.style.width = `${progress}%`;
    }
  }, 120);
}

const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}

const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealItems.forEach((el) => observer.observe(el));

const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => b.classList.remove('active'));
    panels.forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.add('active');
  });
});
