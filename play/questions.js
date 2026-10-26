window.KNOWLEDGE_CATEGORIES = [];
window.addKnowledgeBank = function(meta, rows, extras = []) {
  const questions = rows.trim().split('\n').filter(Boolean).map((line,index) => {
    const fields=line.split('|').map(s=>s.trim());
    if(fields.length!==5) throw new Error(`${meta.id} row ${index+1}: expected five fields`);
    const [text,answer,a,b,explanation]=fields;
    const options=[answer,a,b]; const shift=index%3;
    for(let i=0;i<shift;i++) options.push(options.shift());
    return {id:`${meta.id}-${index+1}`,value:(index%5+1)*100,type:'single',text,options,correct:[options.indexOf(answer)],explanation,topic:meta.topics[Math.min(meta.topics.length-1,Math.floor(index/10))]};
  });
  extras.forEach(q=>questions.push({...q,id:`${meta.id}-${questions.length+1}`}));
  window.KNOWLEDGE_CATEGORIES.push({...meta,questions});
};
