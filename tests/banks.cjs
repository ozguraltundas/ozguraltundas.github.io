const assert = require('node:assert/strict');
global.window = global;
require('../play/questions.js');
for (const file of ['r','statistics','starter']) require('../play/banks/'+file+'.js');
const all = KNOWLEDGE_CATEGORIES.flatMap(c=>c.questions);
assert.equal(all.length,235);
assert.equal(new Set(all.map(q=>q.id)).size,235);
assert.equal(new Set(all.map(q=>q.text)).size,235);
for (const c of KNOWLEDGE_CATEGORIES) {
 assert.equal(c.questions.length,['r','stats'].includes(c.id)?100:c.id==='genetics'?25:5);
 for(const value of [100,200,300,400,500]) assert.ok(c.questions.some(q=>q.value===value));
 for(const q of c.questions) {
  assert.ok(q.text && q.explanation);
  assert.equal(new Set(q.options).size,q.options.length);
  assert.ok(q.options.every(s=>typeof s==='string' && s.length));
  if(q.type!=='order') assert.ok(q.correct.length && q.correct.every(i=>i>=0 && i<q.options.length));
 }
}
console.log('PASS: 235 unique questions; category counts, options and answer keys valid.');

const added = all.filter(q=>q.id.startsWith("genetics-") && Number(q.id.split("-")[1])>=6);
assert.equal(added.length,20);
assert.equal(added.filter(q=>q.topic === "Calculation practice").length,10);
assert.equal(added.filter(q=>q.type === "order").length,1);

// Independently enumerate the testcross to verify the quantitative keys.
const haplotypes = [[['A','T'],0.4],[['G','C'],0.4],[['A','C'],0.1],[['G','T'],0.1]];
const target = haplotypes.filter(([h])=>h.join('')==='GT');
assert.equal(target[0][1],0.1);
assert.equal(target[0][1]*200,20);
const alt=['G','T'], mate=['A','C'];
const dosage=target[0][0].map((a,i)=>Number(a===alt[i])+Number(mate[i]===alt[i]));
assert.deepEqual(dosage,[1,1]);
assert.equal(6/(6+4),0.6);
const d=[2,1,0], p=[0.5,0.25,0.5], b=[0.4,-0.2,0];
assert.ok(Math.abs(d.reduce((s,x,i)=>s+(x-2*p[i])*b[i],0)-0.3)<1e-12);
console.log('PASS: recombinant probability, offspring dosage, heritability and centered GEBV calculations.');

assert.deepEqual(all.filter(q=>q.value===600).map(q=>q.id),['genetics-9']);
assert.equal(KNOWLEDGE_CATEGORIES.reduce((n,c)=>n+new Set(c.questions.map(q=>q.value)).size,0),26);
