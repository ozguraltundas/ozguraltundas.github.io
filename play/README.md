# Knowledge Board

A build-free English practice game hosted at `/play/` on GitHub Pages.

## Current release

215 questions: R & Data (100), Statistics & Models (100), Genetics & Breeding (5), RNA & Omics (5), Linux & HCC (5). Includes single-choice, multiple-selection and ordering practice with explanations.

Each round selects one question at each point value per category (25 tiles). Selection avoids previously shown questions in each category/value pool until that pool is exhausted. Point values are game weights, not calibrated difficulty estimates. The three starter categories repeat each round. Retry missed questions creates a separate round; correct answers earn points, mistakes do not subtract points.

Round progress and question exposure history are stored only in the current browser using localStorage. Devices do not sync. Version 2 starts a new round instead of loading the old 25-question version's saved answers. No account, server, API key or private research data is required.

English communication practice, vocabulary notes and larger starter banks are future work, not part of this release.

## Editing

`questions.js` defines the bank loader. Bank rows in `banks/` contain five pipe-separated fields: question, correct option, two distractors, explanation. Do not include a pipe within a field. The loader rotates correct option positions. `starter.js` also defines an ordering question and a multiple-selection question.

Serve the repository root with `python3 -m http.server 4173` and open `/play/`. Run `node tests/banks.cjs` to validate bank counts, uniqueness and answer keys. No build step is needed.
