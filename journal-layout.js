(() => {
 const section = document.querySelector('.literature-section');
 const entries = [];
 section.querySelectorAll('.paper-card').forEach((card, index) => {
  const summary = card.querySelector('.paper-summary') || [...card.querySelectorAll('p')].find(p => !p.matches('.paper-authors, .paper-links') && p.textContent.trim().length > 200);
  if (!summary) return;
  summary.classList.add('paper-summary');
  summary.id = 'paper-summary-' + index;
  const button = document.createElement('button');
  button.className = 'reading-toggle';
  button.type = 'button';
  button.setAttribute('aria-controls', summary.id);
  const set = open => {
   summary.classList.toggle('is-collapsed', !open);
   button.setAttribute('aria-expanded', String(open));
   button.textContent = open ? 'Read Less' : 'Read More';
  };
  button.addEventListener('click', () => { set(button.getAttribute('aria-expanded') !== 'true'); updateAll(); });
  summary.after(button);
  set(false);
  entries.push({button, set});
 });
 const all = document.createElement('button');
 all.type = 'button'; all.className = 'show-all-papers';
 const updateAll = () => {
  const expanded = entries.every(e => e.button.getAttribute('aria-expanded') === 'true');
  all.textContent = expanded ? 'Collapse All' : 'Show All';
  all.setAttribute('aria-expanded', String(expanded));
 };
 all.setAttribute('aria-controls', entries.map(e => e.button.getAttribute('aria-controls')).join(' '));
 all.addEventListener('click', () => {
  const open = all.getAttribute('aria-expanded') !== 'true';
  entries.forEach(e => e.set(open)); updateAll();
 });
 section.querySelector('h2').after(all); updateAll();
})();
