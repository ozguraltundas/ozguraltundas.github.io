# Knowledge Board

A build-free English practice game hosted at `/play/` on GitHub Pages.

## Current release

235 questions: R & Data (100), Statistics & Models (100), Genetics & Breeding (25), RNA & Omics (5), Linux & HCC (5). Includes single-choice, multiple-selection and ordering practice with explanations.

Each round selects one question at each point value per category (25 tiles). Selection avoids previously shown questions in each category/value pool until that pool is exhausted. Point values are game weights, not calibrated difficulty estimates. RNA and Linux starter categories repeat each round. Genetics now has five questions per point-value pool and rotates across rounds. Retry missed questions creates a separate round; correct answers earn points, mistakes do not subtract points.

Round progress and question exposure history are stored only in the current browser using localStorage. Devices do not sync. Version 2 starts a new round instead of loading the old 25-question version's saved answers. No account, server, API key or private research data is required.

English communication practice, vocabulary notes and larger starter banks are future work, not part of this release.

## Editing

`questions.js` defines the bank loader. Bank rows in `banks/` contain five pipe-separated fields: question, correct option, two distractors, explanation. Do not include a pipe within a field. The loader rotates correct option positions. `starter.js` also defines an ordering question and a multiple-selection question.

Serve the repository root with `python3 -m http.server 4173` and open `/play/`. Run `node tests/banks.cjs` to validate bank counts, uniqueness and answer keys. No build step is needed.

## Genetics expansion

Twenty added questions connect chromosomes, replication, phased VCFs, meiosis, recombination, crosses, dosage and genomic prediction. Ten are quantitative exercises; ten cover training design, DNN limitations, CV1/CV2/CV0/CV00 matching, LD, effective population size, GBLUP–RR-BLUP equivalence, variance interpretation and selection. Existing question IDs and browser progress remain valid; choose New round to draw from the expanded bank.

Reference reading:
- VCF specification: https://samtools.github.io/hts-specs/VCFv4.4.pdf
- CV scenario implementation (Persa et al.): https://www.mdpi.com/2077-0472/11/10/932
- Training-set optimization comparison: https://pmc.ncbi.nlm.nih.gov/articles/PMC9998580/
- GBLUP equivalence: https://pmc.ncbi.nlm.nih.gov/articles/PMC8495923/
- DNNGP empirical study: https://www.cell.com/article/S167420522200404X/pdf

CV labels are explicitly defined in the question. Claims about TP design or neural networks are conditional, not guarantees. Heritability questions state the model and observational scale.
