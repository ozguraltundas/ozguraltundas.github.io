document.querySelectorAll('.year-categories').forEach(group => {
  const tabs = document.createElement('div');
  tabs.className = 'category-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', group.id.replace('year-', '') + ' categories');
  const items = [...group.querySelectorAll('.accordion-item')];
  const buttons = items.map(item => item.querySelector('.accordion-header'));
  const select = index => {
    items.forEach((item, i) => {
      const button = buttons[i];
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      item.querySelector('.accordion-content').hidden = i !== index;
    });
  };
  items.forEach((item, index) => {
    const button = buttons[index];
    const panel = item.querySelector('.accordion-content');
    button.removeAttribute('aria-expanded');
    button.setAttribute('role', 'tab');
    button.id = panel.id + '-tab';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    panel.tabIndex = 0;
    tabs.append(button);
    button.addEventListener('click', () => select(index));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % buttons.length;
      if (event.key === 'ArrowLeft') next = (index + buttons.length - 1) % buttons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next); buttons[next].focus(); }
    });
  });
  group.prepend(tabs);
  select(0);
});
document.querySelectorAll('.year-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  });
});
