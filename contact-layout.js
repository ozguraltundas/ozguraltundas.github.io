function toggleMenu() {
 const menu = document.getElementById('mobileMenu');
 const open = getComputedStyle(menu).display === 'none';
 menu.style.display = open ? 'flex' : 'none';
 document.querySelector('.hamburger').setAttribute('aria-expanded', String(open));
}
document.addEventListener('keydown', event => {
 if (event.key === 'Escape' && document.querySelector('.hamburger').getAttribute('aria-expanded') === 'true') {
  toggleMenu(); document.querySelector('.hamburger').focus();
 }
});
