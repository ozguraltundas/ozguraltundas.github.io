(() => {
  'use strict';
  const categories = window.KNOWLEDGE_CATEGORIES;
  const questions = categories.flatMap(category => category.questions.map(q => ({...q, category})));
  const byId = new Map(questions.map(q => [q.id, q]));
  const key = 'ozgur-knowledge-board-v2';
  const $ = id => document.getElementById(id);
  const dialog = $('question-dialog');
  let active = null, order = [], opener = null;
  let seen = [];
  try { const stored = JSON.parse(localStorage.getItem(key + '-seen')); if(Array.isArray(stored)) seen = stored.filter(id => byId.has(id)); } catch {}
  const fresh = () => {
    const ids = categories.flatMap(category => [100,200,300,400,500].map(value => {
      const pool = category.questions.filter(q => q.value === value);
      let available = pool.filter(q => !seen.includes(q.id));
      if(!available.length) { seen = seen.filter(id => !pool.some(q => q.id === id)); available = pool; }
      const q = available[Math.floor(Math.random() * available.length)];
      seen.push(q.id); return q.id;
    }));
    return {ids, answers: {}, retry:false};
  };
  const equal = (a,b) => a.length === b.length && a.every((v,i) => v === b[i]);
  function isCorrect(q, response) {
    if (q.type === 'order') return equal(response, q.options.map((_,i) => i));
    return equal([...response].sort((a,b)=>a-b), [...q.correct].sort((a,b)=>a-b));
  }
  function validResponse(q, response) {
    return Array.isArray(response) && new Set(response).size === response.length && response.every(i => Number.isInteger(i) && i >= 0 && i < q.options.length) && (q.type === 'order' ? response.length === q.options.length : q.type === 'single' ? response.length === 1 : response.length > 0);
  }
  let state = null;
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && Array.isArray(saved.ids) && saved.ids.length && new Set(saved.ids).size === saved.ids.length && saved.ids.every(id=>byId.has(id)) && saved.answers && typeof saved.answers === 'object') {
      state = {ids:saved.ids, answers:{}, retry: saved.retry === true};
      for (const id of saved.ids) if (validResponse(byId.get(id), saved.answers[id])) state.answers[id] = saved.answers[id];
    }
  } catch { /* A missing or invalid save starts a fresh board. */ }
  if(!state) state = fresh();
  function save() {
    try { localStorage.setItem(key, JSON.stringify(state)); localStorage.setItem(key + '-seen', JSON.stringify(seen)); }
    catch { $('save-status').textContent = 'Browser storage is unavailable; you can still play this round.'; }
  }
  function element(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function stats() {
    const answered = state.ids.filter(id=>state.answers[id]);
    const correct = answered.filter(id=>isCorrect(byId.get(id), state.answers[id]));
    const wrong = answered.filter(id=>!isCorrect(byId.get(id), state.answers[id]));
    return {answered,correct,wrong,score:correct.reduce((sum,id)=>sum+byId.get(id).value,0)};
  }
  function render() {
    const result = stats();
    $('score').replaceChildren(document.createTextNode(String(result.score)),element('span','', ' points'));
    $('progress').replaceChildren(document.createTextNode(String(result.answered.length)),element('span','', ` / ${state.ids.length}`));
    $('correct').textContent = result.correct.length;
    $('retry').disabled = !result.wrong.length;
    $('round-label').textContent = state.retry ? `RETRY ROUND · ${state.ids.length} QUESTIONS` : `${questions.length} QUESTIONS · ${state.ids.length} PER ROUND · NO TIMER`;
    $('board').replaceChildren();
    for (const category of categories) {
      if (!category.questions.some(q=>state.ids.includes(q.id))) continue;
      const column = element('div','column');
      const heading = element('div','category-head');
      heading.append(element('span','category-icon',category.icon));
      const label = element('div'); label.append(element('h3','',category.name),element('p','',`${category.questions.length} QUESTIONS`)); heading.append(label); column.append(heading);
      for (const q of category.questions.filter(q=>state.ids.includes(q.id)).sort((a,b)=>a.value-b.value)) {
        const answer = state.answers[q.id];
        const correct = answer && isCorrect(q,answer);
        const button = element('button',`tile${answer ? correct ? ' answered' : ' answered wrong' : ''}`);
        button.type = 'button'; button.dataset.question = q.id;
        const number = element('span','tile-number',String(q.value));
        if(answer) number.append(element('span','tile-label',correct ? 'CORRECT' : 'REVISIT'));
        button.append(number,element('span','tile-arrow',answer ? correct ? '✓' : '↻' : '↗'));
        button.setAttribute('aria-label',`${category.name}, ${q.value} points${answer ? correct ? ', answered correctly, review' : ', answered incorrectly, review' : ''}`);
        button.addEventListener('click',()=>open(q.id,button)); column.append(button);
      }
      $('board').append(column);
    }
    const complete = result.answered.length === state.ids.length;
    $('summary').hidden = !complete;
    if(complete) $('summary').replaceChildren(element('h2','',result.wrong.length ? 'One round closer to understanding.' : 'Board complete. Keep exploring!'),element('p','',`${result.correct.length} correct · ${result.wrong.length} missed · ${result.score} points. ${result.wrong.length ? 'Use “Retry missed questions” to revisit what needs practice.' : 'Start a new round to explore more questions.'}`));
  }
  function shuffle(values) {
    const list = [...values];
    for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}
    if(equal(list,values)) list.push(list.shift());
    return list;
  }
  function open(id,button) {
    active = byId.get(id); opener=button;
    $('question-meta').textContent = active.category.name;
    $('question-type').textContent = active.typeLabel || {single:'Single choice',multiple:'Select all that apply',order:'Put the steps in order'}[active.type];
    $('question-title').textContent = active.text;
    $('question-code').hidden = !active.code;
    $('question-code').firstElementChild.textContent = active.code || '';
    $('question-value').textContent = `${active.value} points`;
    $('question-help').textContent = active.help || (active.type==='multiple' ? 'Select every correct option. Only the complete correct selection earns points.' : active.type==='order' ? 'Use the up and down arrows to put the steps in order.' : 'Choose an option, then check your answer.');
    $('feedback').hidden = true; $('submit').hidden = false; $('next').hidden = true;
    const existing = state.answers[id];
    order = existing ? [...existing] : shuffle(active.options.map((_,i)=>i));
    renderAnswers(existing);
    if(existing) showFeedback(existing);
    dialog.showModal();
  }
  function renderAnswers(existing) {
    $('answers').replaceChildren();
    if(active.type==='order') {
      order.forEach((optionIndex,position)=>{
        const row=element('div','order-row'); row.append(element('span','order-number',String(position+1).padStart(2,'0')),element('span','order-text',active.options[optionIndex]));
        const controls=element('div','order-controls');
        for(const direction of [-1,1]) {
          const button=element('button','',direction<0?'↑':'↓');button.type='button';
          button.setAttribute('aria-label',`${active.options[optionIndex]}: ${direction<0?'up':'down'} — move`);
          button.disabled=!!existing || position+direction<0 || position+direction>=order.length;
          button.addEventListener('click',()=>{[order[position],order[position+direction]]=[order[position+direction],order[position]]; renderAnswers(); $('answers').children[position+direction].querySelector('button:not(:disabled)')?.focus();});
          controls.append(button);
        }
        row.append(controls);$('answers').append(row);
      });
    } else {
      active.options.forEach((option,i)=>{
        const label=element('label','option'); const input=element('input'); input.type=active.type==='multiple'?'checkbox':'radio';input.name='answer';input.value=String(i); input.checked=!!existing?.includes(i);input.disabled=!!existing;
        label.append(input,element('span','',option));$('answers').append(label);
      });
    }
  }
  function showFeedback(response) {
    const correct=isCorrect(active,response);
    $('feedback').className=`feedback${correct?'':' wrong'}`;
    $('feedback').replaceChildren(element('strong','',correct?`Correct! +${active.value} points`:'Not quite. Let’s take a look.'),element('p','',active.explanation));
    const correctOptions=active.type==='order'?active.options:active.correct.map(i=>active.options[i]);
    $('feedback').append(element('p','',`${active.type==='order'?'Correct order':'Correct answer'}: ${correctOptions.join(active.type==='order'?' → ':' · ')}`));
    $('feedback').hidden=false;$('submit').hidden=true;$('next').hidden=false;
  }
  $('question-form').addEventListener('submit',event=>{
    event.preventDefault();if(!active||state.answers[active.id])return;
    const response=active.type==='order'?[...order]:Array.from($('answers').querySelectorAll('input:checked'),input=>Number(input.value));
    if(!response.length){$('question-help').textContent='Select at least one option to continue.';return;}
    state.answers[active.id]=response;save();renderAnswers(response);showFeedback(response);render();$('next').focus();
  });
  $('close-dialog').addEventListener('click',()=>dialog.close());$('next').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{const id=active?.id;active=null;(document.querySelector(`[data-question="${id}"]`)||opener)?.focus();});
  $('retry').addEventListener('click',()=>{const wrong=stats().wrong;if(!wrong.length)return;state={ids:wrong,answers:{},retry:true};save();render();$('board-title').scrollIntoView({block:'start',behavior:'smooth'});});
  $('reset').addEventListener('click',()=>$('reset-dialog').showModal());
  $('cancel-reset').addEventListener('click',()=>$('reset-dialog').close());
  $('confirm-reset').addEventListener('click',()=>{state=fresh();save();render();$('reset-dialog').close();});
  save();
  render();
})();
