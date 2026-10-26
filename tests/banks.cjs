const assert = require('node:assert/strict');
global.window = global;
require('../play/questions.js');
for (const file of ['r','statistics','starter']) require('../play/banks/'+file+'.js');
const all = KNOWLEDGE_CATEGORIES.flatMap(c=>c.questions);
assert.equal(all.length,215);
assert.equal(new Set(all.map(q=>q.id)).size,215);
assert.equal(new Set(all.map(q=>q.text)).size,215);
for (const c of KNOWLEDGE_CATEGORIES) {
 assert.equal(c.questions.length,['r','stats'].includes(c.id)?100:5);
 for(const value of [100,200,300,400,500]) assert.ok(c.questions.some(q=>q.value===value));
 for(const q of c.questions) {
  assert.ok(q.text && q.explanation);
  assert.equal(new Set(q.options).size,q.options.length);
  assert.ok(q.options.every(s=>typeof s==='string' && s.length));
  if(q.type!=='order') assert.ok(q.correct.length && q.correct.every(i=>i>=0 && i<q.options.length));
 }
}
console.log('PASS: 215 unique questions; category counts, options and answer keys valid.');
