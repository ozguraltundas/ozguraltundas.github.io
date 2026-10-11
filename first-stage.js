(() => {
  const button = document.querySelector('.hamburger');
  const menu = document.getElementById('mobileMenu');
  const setMenu = (open) => {
    menu.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  };
  button.addEventListener('click', () => setMenu(menu.hidden));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) { setMenu(false); button.focus(); }
  });
  window.matchMedia('(min-width: 1201px)').addEventListener('change', () => setMenu(false));
  const navbar = document.querySelector('.navbar');
  const updateScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();
})();
