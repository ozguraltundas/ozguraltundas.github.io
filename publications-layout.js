document.querySelectorAll('.year-categories').forEach(group => {
  const tabs = document.createElement('div');
  tabs.className = 'category-tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', group.id.replace('year-', '') + ' categories');
  const items = [...group.querySelectorAll('.accordion-item')];
  const buttons = items.map(item => item.querySelector('.accordion-header'));
  const allButton = document.createElement('button');
  allButton.type = 'button';
  allButton.className = 'accordion-header';
  allButton.textContent = 'Show All';
  allButton.setAttribute('role', 'tab');
  allButton.id = group.id + '-all-tab';
  allButton.setAttribute('aria-controls', items.map(item => item.querySelector('.accordion-content').id).join(' '));
  const headings = items.map((item, i) => {
    const heading = document.createElement('h3');
    heading.className = 'all-category-heading';
    heading.textContent = buttons[i].textContent;
    item.querySelector('.accordion-content').prepend(heading);
    return heading;
  });
  const select = index => {
    allButton.setAttribute('aria-selected', String(index === -1));
    allButton.tabIndex = index === -1 ? 0 : -1;
    items.forEach((item, i) => {
      const button = buttons[i];
      button.setAttribute('aria-selected', String(i === index));
      button.tabIndex = i === index ? 0 : -1;
      const panel = item.querySelector('.accordion-content');
      panel.hidden = index !== -1 && i !== index;
      panel.setAttribute('aria-labelledby', index === -1 ? allButton.id : button.id);
      headings[i].hidden = index !== -1;
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
      if (event.key === 'ArrowRight') next = index === buttons.length - 1 ? -1 : index + 1;
      if (event.key === 'ArrowLeft') next = index === 0 ? -1 : index - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = buttons.length - 1;
      if (next !== undefined) { event.preventDefault(); select(next); (next === -1 ? allButton : buttons[next]).focus(); }
    });
  });
  tabs.append(allButton);
  allButton.addEventListener('click', () => select(-1));
  allButton.addEventListener('keydown', event => {
    const index = event.key === 'ArrowRight' || event.key === 'Home' ? 0 : event.key === 'ArrowLeft' || event.key === 'End' ? buttons.length - 1 : undefined;
    if (index !== undefined) { event.preventDefault(); select(index); buttons[index].focus(); }
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
