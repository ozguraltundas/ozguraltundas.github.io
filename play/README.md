# Knowledge Board

Buildless game served at `/play/` on GitHub Pages. Open through a static HTTP server for development, e.g. `python3 -m http.server 4173` from the repository root.

Edit `questions.js` to add content. Each category has five questions with stable IDs, point values, a type (`single`, `multiple`, `order`), question text, options, and explanation. Single/multiple questions use zero-based `correct` indexes. Order questions list options in the correct order; the interface shuffles them. Optional `code` is displayed as text, never executed.

Scoring: fully correct response earns the displayed points; incorrect answers earn zero with no deduction. Answers are locked after submission but remain reviewable. Retrying starts a separate round containing only the previous round's wrong questions, with score reset for that round. New round resets all 25 questions after confirmation.

Progress is local to the browser, stored under `ozgur-knowledge-board-v1`. No login, account connection, analytics, or backend is required. Questions and answers are public source; use fictional or public examples rather than private lab data.

Content references: [R rep](https://stat.ethz.ch/R-manual/R-devel/library/base/html/rep.html), [dplyr filter](https://dplyr.tidyverse.org/reference/filter.html), [tabix](https://www.htslib.org/doc/tabix.html), [SLURM sbatch](https://slurm.schedmd.com/sbatch.html). Use course/research references when extending genetics and statistical modelling questions. Existing ChatGPT answers are not authoritative answer keys.
