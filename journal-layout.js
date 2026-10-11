(() => {
 const section = document.querySelector('.literature-section');
 const entries = [];
 const all = document.createElement('button');
 all.type = 'button'; all.className = 'show-all-papers';
 const updateAll = () => {
  const expanded = entries.every(e => e.button.getAttribute('aria-expanded') === 'true');
  all.textContent = expanded ? 'Collapse All' : 'Show All';
  all.setAttribute('aria-expanded', String(expanded));
 };
 section.querySelectorAll('.paper-card').forEach((card, index) => {
  const heading = card.querySelector('h3');
  const authors = card.querySelector('.paper-authors');
  const details = document.createElement('div');
  details.className = 'paper-details'; details.id = 'paper-details-' + index;
  [...card.children].forEach(child => { if (child !== heading && child !== authors) details.append(child); });
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'paper-title-toggle';
  button.setAttribute('aria-controls', details.id);
  while (heading.firstChild) button.append(heading.firstChild);
  heading.append(button); card.append(details);
  const set = open => { details.hidden = !open; button.setAttribute('aria-expanded', String(open)); };
  button.addEventListener('click', () => { set(button.getAttribute('aria-expanded') !== 'true'); updateAll(); });
  set(false); entries.push({button,set});
 });
 all.setAttribute('aria-controls', entries.map(e => e.button.getAttribute('aria-controls')).join(' '));
 all.addEventListener('click', () => { const open = all.getAttribute('aria-expanded') !== 'true'; entries.forEach(e => e.set(open)); updateAll(); });
 section.querySelector('h2').after(all); updateAll();
})();
