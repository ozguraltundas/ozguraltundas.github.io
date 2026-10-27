window.addKnowledgeBank({id:'genetics',name:'Genetics & Breeding',subtitle:'GENES TO POPULATIONS',icon:'⌘',topics:['Genetics foundations']}, `
At a SNP locus, A and G are observed. What are A and G?|Two alleles at that locus|Two chromosomes|Two phenotypes|A SNP is a variable genomic position; A and G are alternative nucleotide alleles at that position.
What happens to a diploid cell by the end of S phase?|DNA content doubles; ploidy remains 2n|Ploidy becomes 4n|Chromosome number halves|Replication produces sister chromatids. DNA content increases from 2C to 4C without adding a chromosome set.
What is the reference for mid-parent heterosis?|The mean of the two parents|Only the better parent|The population maximum|Mid-parent heterosis compares the hybrid with its parental mean. Whether a higher value is desirable depends on the trait.
How do GCA and SCA differ?|GCA is a parent's average combining ability; SCA is a cross-specific deviation|GCA is environmental error; SCA is the parental mean|Both describe only a single parent's phenotype|GCA describes general contribution across crosses; SCA describes a particular cross's deviation from expectations based on general contributions.
Under standard Mendelian assumptions, what F2 genotype ratio follows selfing an Aa F1?|1 AA : 2 Aa : 1 aa|All Aa|3 AA : 1 aa|Each heterozygous parent contributes A or a with equal probability, producing the 1:2:1 genotype ratio.
`);
window.addKnowledgeBank({id:'rna',name:'RNA & Omics',subtitle:'READS TO INSIGHT',icon:'≋',topics:['RNA-seq foundations']}, `
What does a typical FASTQ record contain?|A read sequence and per-base quality scores|Only gene names|Only alignment coordinates|FASTQ stores an identifier, sequence and quality scores; alignment coordinates are not its basic content.
How do sample barcodes and UMIs differ?|Barcodes identify samples; UMIs help distinguish original molecules|UMIs always identify genes|Both are genomic coordinates|Sample barcodes distinguish libraries or samples. UMIs help distinguish molecules and PCR duplicates, although collisions can occur.
Which step normally follows alignment in a simple gene-count RNA-seq workflow?|Assign reads to genes to build a count matrix|Convert all counts to DNA sequences|Discard sample identifiers|Gene-level counting uses alignments and annotations. Quality control is needed throughout the workflow.
What does clipping scaled expression to a fixed interval do?|Moves out-of-range values to the boundaries|Necessarily deletes outlier rows|Proves that the expression is normally distributed|Clipping changes values, not necessarily observations. The interval is an analysis choice, not a universal TWAS requirement.
Which mapping is correct?|GWAS: variant–trait; TWAS: expression–trait; eQTL: variant–expression|GWAS: expression–trait; eQTL: protein–protein|All three only count reads|These are the main association targets. TWAS may use measured or genetically predicted expression; association alone does not prove causality.
`);
window.addKnowledgeBank({id:'linux',name:'Linux & HCC',subtitle:'FILES TO WORKFLOWS',icon:'>_',topics:['Command-line foundations']}, `
Which command prints the current working directory?|pwd|mkdir|head|pwd prints the working directory path; ls lists its contents.
What is the basic difference between cp and mv?|cp copies; mv moves or renames|cp deletes; mv copies|Both only read files|cp preserves the source while creating a copy. mv moves or renames it. Existing destination files require care.
In default Bash globbing, what does *.csv match?|Matching non-hidden names in the current directory|All CSV files recursively|Only hidden files|The wildcard does not automatically traverse subdirectories or include leading dots. Unmatched patterns depend on shell settings.
What is a tabix index used for?|Fast region queries in compatible sorted, bgzip-compressed genomic files|Predicting phenotypes|Changing alleles|The input must have a supported format, coordinate order and suitable compression. A .gz extension alone is not enough.
After a SLURM job leaves the queue, how should success be checked?|Inspect exit status, logs and expected outputs|Assume every missing job succeeded|Only check the job name|Leaving the queue does not establish success. Validate the execution status and the actual analysis output.
`);
// Ordering and multiple-selection practice, while preserving the five-question banks.
Object.assign(window.KNOWLEDGE_CATEGORIES.find(c=>c.id==='rna').questions[2], {
 type:'order', text:'Put this simplified alignment-based RNA-seq workflow in order.',
 options:['Obtain raw FASTQ reads','Assess read quality and clean if needed','Align reads to the reference','Build a gene-level count matrix','Apply appropriate normalization and downstream analysis'],
 explanation:'This is a simplified alignment-based workflow. QC is repeated at multiple stages, and protocol-specific steps such as UMI processing may be needed.'
});
Object.assign(window.KNOWLEDGE_CATEGORIES.find(c=>c.id==='genetics').questions[2], {
 type:'multiple',text:'Which statements about heterosis are correct?',
 options:['Mid-parent heterosis uses the parental mean','Better-parent heterosis uses the better parent for the trait','Positive heterosis is always beneficial','The reference used for a percentage should be stated'],correct:[0,1,3],
 explanation:'MPH uses the parental mean; BPH uses the better parent. The desirable direction depends on the trait, and the reference must be clear.'
});

// Twenty linked genetics and genomic-selection practice questions.
window.KNOWLEDGE_CATEGORIES.find(c => c.id === "genetics").questions.push(...[
  {
    "id": "genetics-6",
    "value": 100,
    "type": "single",
    "text": "A diploid maize cell (2n = 20) completes S phase but has not divided. At one SNP its genotype was A/G. Which counts and genotype are now correct?",
    "options": [
      "40 chromosomes, 40 chromatids; tetraploid",
      "20 chromosomes, 40 chromatids; still A/G",
      "20 chromosomes, 20 chromatids; now A/A",
      "40 chromosomes, 80 chromatids; now G/G"
    ],
    "explanation": "Step 1: Each of the 20 chromosomes replicates its DNA. Step 2: Each now consists of two sister chromatids, giving 40 chromatids. The sisters have not separated, so there are still 20 chromosomes and two chromosome sets. At this locus there are two physical A copies and two G copies, but the diploid genotype remains A/G; replication is not a change to tetraploidy.",
    "topic": "Calculation practice",
    "correct": [
      1
    ]
  },
  {
    "id": "genetics-7",
    "value": 200,
    "type": "single",
    "text": "After normal meiosis I in maize, but before sister chromatids separate in meiosis II, how many chromosomes and chromatids are in EACH daughter cell?",
    "options": [
      "20 chromosomes and 40 chromatids; diploid",
      "10 chromosomes and 10 chromatids; diploid",
      "10 chromosomes and 20 chromatids; haploid",
      "20 chromosomes and 20 chromatids; haploid"
    ],
    "explanation": "Homologous chromosomes separate in meiosis I. Each daughter receives one chromosome from each of the 10 pairs: n = 10. Each chromosome still has two sister chromatids, so there are 20 chromatids. Haploid describes the number of chromosome sets, not whether DNA has been replicated. Sister chromatids separate at anaphase II.",
    "topic": "Calculation practice",
    "correct": [
      2
    ]
  },
  {
    "id": "genetics-8",
    "value": 300,
    "type": "single",
    "text": "These SNPs on chromosome 3 are phased in the same phase block. With normal segregation and no crossing over or mutation, which four haploid meiotic products are expected?",
    "options": [
      "Two A–C and two G–T",
      "One each of A–C, A–T, G–C and G–T",
      "Four A–G products",
      "Two A–T and two G–C"
    ],
    "explanation": "Read the same side of each vertical bar down the two rows. The first homolog carries SNP 1 = A and SNP 2 = T; the second carries G and C. Replication makes two sister copies of each. Without recombination the four products contain two A–T and two G–C copies of chromosome 3, respectively. Each maize product also contains the other nine chromosome types.",
    "topic": "Calculation practice",
    "correct": [
      3
    ],
    "code": "SNP    REF  ALT  GT\nSNP 1   A    G   0|1\nSNP 2   C    T   1|0"
  },
  {
    "id": "genetics-9",
    "value": 400,
    "type": "single",
    "text": "Parent 1 and Parent 2 are crossed. No crossing over occurs between these SNPs. What fraction of offspring inherits G–C from Parent 1, and what are its unphased genotypes?",
    "options": [
      "50%; SNP 1 = 0/1, SNP 2 = 0/0",
      "25%; SNP 1 = 1/1, SNP 2 = 0/0",
      "50%; the offspring is haploid",
      "100%; SNP 1 = 0/1, SNP 2 = 0/1"
    ],
    "explanation": "Parent 1 produces A–T or G–C gametes with equal probability. Parent 2 produces only A–C at these loci. G–C + A–C gives G/A at SNP 1 and C/C at SNP 2. Thus 50% are expected to have 0/1 and 0/0. A gamete from each parent restores diploidy; the offspring is not haploid. These are expected proportions over many offspring.",
    "topic": "Calculation practice",
    "correct": [
      0
    ],
    "code": "SNP    REF ALT   Parent 1   Parent 2\nSNP 1   A   G      0|1        0|0\nSNP 2   C   T      1|0        0|0\nWithin each parent, both SNPs share a phase block."
  },
  {
    "id": "genetics-10",
    "value": 500,
    "type": "single",
    "text": "The recombination fraction is 20%, with equally frequent reciprocal recombinant gametes. In this cross, what proportion of offspring inherits G–T from Parent 1, and what are its unphased VCF genotypes?",
    "options": [
      "20%; 0/1 at both SNPs",
      "25%; 0/1 at SNP 1 and 0/0 at SNP 2",
      "10%; 0/1 at both SNPs",
      "10%; 1/1 at both SNPs"
    ],
    "explanation": "Parent 1 has A–T and G–C parental haplotypes. The recombinant types are A–C and G–T. Together they make up 20% of its gametes; equal reciprocal frequencies give 10% each. Parent 2 always contributes A–C. The target union G–T + A–C produces G/A and T/C, both heterozygous. The 20% is a recombinant gamete fraction across many meioses, not a claim that every meiosis has four equally likely haplotypes.",
    "topic": "Calculation practice",
    "correct": [
      2
    ],
    "code": "Parent 1: A–T / G–C\nParent 2: A–C / A–C\nSNP 1: REF=A, ALT=G\nSNP 2: REF=C, ALT=T\nAssume no mutation, segregation distortion or survival differences."
  },
  {
    "id": "genetics-11",
    "value": 100,
    "type": "single",
    "text": "A breeder produces 200 offspring from this testcross. How many are EXPECTED to inherit the G–T haplotype from Parent 1?",
    "options": [
      "Exactly 20 in every experiment",
      "20 on average, with sampling variation",
      "40 on average",
      "50 on average"
    ],
    "explanation": "G–T is one of two equally frequent recombinant types: its probability is 0.20 / 2 = 0.10. The expected count is 200 × 0.10 = 20. A finite family need not contain exactly 20 such offspring. The other recombinant type, A–C, also has expected count 20; the parental types each have expected count 80.",
    "topic": "Calculation practice",
    "correct": [
      1
    ],
    "code": "Parent 1: A–T / G–C\nParent 2: A–C / A–C\nRecombination fraction = 0.20\nReciprocal recombinant types are equally frequent.\nAssume equal transmission and offspring survival."
  },
  {
    "id": "genetics-12",
    "value": 200,
    "type": "single",
    "text": "A diploid YyZz plant is crossed with yyzz. The loci assort independently, with no segregation distortion or viability differences. What proportion of offspring is expected to be YyZz?",
    "options": [
      "100%, because the parent has both dominant alleles",
      "50%, because there are two loci",
      "12.5%, because DNA replicates",
      "25%, because the YZ gamete has probability 1/4"
    ],
    "explanation": "The YyZz parent produces YZ, Yz, yZ and yz gametes at 25% each under independent assortment. The yyzz parent contributes only yz. YZ + yz gives YyZz with probability 1/4. Four letters describe two loci with two allele copies each, not tetraploidy. The equal four-way distribution does not apply to the earlier linked-locus example with recombination fraction 20%.",
    "topic": "Calculation practice",
    "correct": [
      3
    ]
  },
  {
    "id": "genetics-13",
    "value": 300,
    "type": "single",
    "text": "Using ALT-allele dosage for a biallelic SNP, convert these diploid genotypes to a numerical marker row in the SAME order.",
    "options": [
      "0, 1, 1, 2",
      "0, 1, 0, 1",
      "0, 2, 2, 4",
      "2, 1, 1, 0"
    ],
    "explanation": "Count copies of ALT = G, not the number of digits or the phase separator. A/A has zero G copies; A/G and G/A each have one; G/G has two. Thus the uncentered row is 0, 1, 1, 2. The vertical bar contains phase information, but simple additive dosage discards that ordering. Missing calls require a separate policy; they are not automatically zero.",
    "topic": "Calculation practice",
    "correct": [
      0
    ],
    "code": "REF=A, ALT=G\nGT:  0/0    0|1    1|0    1/1"
  },
  {
    "id": "genetics-14",
    "value": 400,
    "type": "single",
    "text": "In the stated single-environment additive GBLUP model, what is the estimated observation-level genomic heritability?",
    "options": [
      "0.40",
      "1.50",
      "0.60",
      "0.24"
    ],
    "explanation": "Under this model the phenotype variance is additive variance plus residual variance: 6 + 4 = 10. The ratio is h_g² = 6/10 = 0.60. This interpretation assumes the genomic relationship matrix is normalized to an appropriate additive-variance scale. It is not automatically an entry-mean heritability across environments; extra variance components and averaging change that denominator.",
    "topic": "Calculation practice",
    "correct": [
      2
    ],
    "code": "y = fixed effects + additive genetic value + residual\nEstimated additive variance = 6\nEstimated residual variance = 4\nNo additional random components; normalized genomic relationship matrix."
  },
  {
    "id": "genetics-15",
    "value": 500,
    "type": "single",
    "text": "For this illustrative additive model, calculate the centered marker contribution to the GEBV. The intercept is excluded.",
    "options": [
      "0.70",
      "0.30",
      "−0.30",
      "1.00"
    ],
    "explanation": "Center each dosage by 2p: [2−1, 1−0.5, 0−1] = [1, 0.5, −1]. Multiply by the corresponding effects and sum: 1×0.4 + 0.5×(−0.2) + (−1)×0 = 0.30. Allele-frequency centering and effect coding must use the same allele convention. An intercept would be added for a phenotype prediction, but it is excluded here.",
    "topic": "Calculation practice",
    "correct": [
      1
    ],
    "code": "ALT dosages:             [2,    1,     0]\nTraining ALT frequencies: [0.50, 0.25,  0.50]\nMarker effects:           [0.40, −0.20, 0.00]\nCentered contribution = sum[(dosage − 2p) × effect]"
  },
  {
    "id": "genetics-16",
    "value": 100,
    "type": "single",
    "text": "A breeding program can phenotype only 200 training lines, and target candidates have genotypes but no phenotypes. Which training-population strategy is most defensible?",
    "options": [
      "Maximize phenotypic extremes alone, regardless of candidate relationships",
      "Select only the 200 most nearly identical relatives",
      "Use target-aware genomic design balancing candidate coverage and redundancy, with reliable relevant phenotypes",
      "Use the target candidates’ withheld phenotypes to choose the training subset"
    ],
    "explanation": "Target-aware methods can exploit genomic relationships while covering the candidate genetic space and avoiding excessive redundancy. CDmean targets prediction reliability; PEVmean targets prediction error variance under a model. No strategy universally maximizes accuracy: trait architecture, phenotype quality, environment and target relatedness matter. Maximum phenotypic divergence alone is not a general optimum, and using held-out target phenotypes during selection leaks information.",
    "topic": "Genomic prediction",
    "correct": [
      2
    ]
  },
  {
    "id": "genetics-17",
    "value": 200,
    "type": "single",
    "text": "You have 600 breeding lines and 40,000 SNPs. What is a primary statistical challenge for a high-capacity deep neural network compared with regularized linear baselines?",
    "options": [
      "Many adjustable parameters relative to independent lines create substantial overfitting risk",
      "GBLUP can use only one SNP at a time",
      "Neural networks cannot represent nonlinear effects",
      "Any neural network must outperform a linear model if training error is lower"
    ],
    "explanation": "The large-p, small-n setting provides limited independent information for fitting a flexible model. A DNN may fit noise or family structure and generalize poorly. Regularization, architecture and training size matter; DNNs are not inherently unusable and can be competitive. Compare against GBLUP or Bayesian ridge using the same deployment-relevant splits, with tuning confined to training data.",
    "topic": "Genomic prediction",
    "correct": [
      0
    ]
  },
  {
    "id": "genetics-18",
    "value": 300,
    "type": "order",
    "text": "Match each prediction target to its cross-validation scenario. Place the descriptions in the four slots below, using the CV1/CV2/CV0/CV00 convention of Persa et al. (2021).",
    "options": [
      "Predict new genotypes in environments represented in training",
      "Predict missing cells for genotypes observed in other training environments, with the target environment represented",
      "Predict previously tested genotypes in an entirely held-out environment",
      "Predict entirely new genotypes in an entirely held-out environment"
    ],
    "explanation": "Slot 1 = CV1: new genotypes, observed environments. Slot 2 = CV2: partially tested genotypes, observed environments. Slot 3 = CV0: tested genotypes, new environments. Slot 4 = CV00: new genotypes, new environments. These labels follow the convention specified in this question; papers can use different names. A withheld outcome is never allowed in training, and new-environment prediction requires a model able to support that target.",
    "topic": "Validation scenarios",
    "code": "MATCHING SLOTS\n1 → CV1\n2 → CV2\n3 → CV0\n4 → CV00\n\n“Observed” means represented by phenotypes in training.\n“New genotype” means no phenotype for it is in training.",
    "typeLabel": "Match four scenarios",
    "help": "Use the arrows to match the four descriptions to slots 1–4 above. The full matching earns points."
  },
  {
    "id": "genetics-19",
    "value": 400,
    "type": "single",
    "text": "A line has phenotype records in E1 and E2. You hide its E3 record, while E3 records for other lines remain in training. Under the CV convention used here, what are you testing?",
    "options": [
      "CV1: a genotype with no phenotype in any training environment",
      "CV0: an environment with no training phenotypes",
      "CV00: both genotype and environment unseen",
      "CV2: prediction of a missing genotype-by-environment cell for a partially tested line"
    ],
    "explanation": "This is CV2 because the genotype has training phenotypes elsewhere and the target environment is represented by other lines. The model can borrow information across environments and related lines. It does not directly establish accuracy for completely unphenotyped candidates (CV1). Hiding individual plot records while retaining the same line-by-environment mean can still leak the target information.",
    "topic": "Validation scenarios",
    "correct": [
      3
    ]
  },
  {
    "id": "genetics-20",
    "value": 500,
    "type": "single",
    "text": "Why does faster LD decay generally call for denser SNP coverage when predicting from markers that tag causal variants?",
    "options": [
      "Each marker reliably tags a shorter surrounding genomic region",
      "Faster decay guarantees that every SNP is causal",
      "LD decay changes diploid plants into haploid plants",
      "A smaller marker panel always removes more phenotypic noise"
    ],
    "explanation": "When marker–causal-variant associations decay over shorter distances, wider gaps are more likely to miss useful tagging. Denser coverage can help, but performance also depends on allele frequencies, sample size, genetic architecture and relationships between training and target sets. Additional nearly redundant markers may add little after useful coverage is reached.",
    "topic": "LD and marker density",
    "correct": [
      0
    ]
  },
  {
    "id": "genetics-21",
    "value": 100,
    "type": "single",
    "text": "Other conditions equal, how does a smaller historical effective population size often affect LD and the marker density needed to tag the genome?",
    "options": [
      "It always eliminates LD and requires every nucleotide to be genotyped",
      "It tends to produce more extensive LD, so fewer well-distributed markers may provide comparable tagging",
      "It guarantees perfect genomic predictions with one marker",
      "It means the current trial contains fewer rows than columns"
    ],
    "explanation": "Smaller historical effective population size generally increases drift-generated LD and reduces the number of independently segregating chromosome segments. More extensive LD can permit useful coverage with fewer markers than in a large-Ne population with rapid LD decay. This is conditional, not a universal marker-count rule: recombination, mating system, allele frequencies, demography and training-target relationships also matter. Ne is not simply the number of lines in the trial.",
    "topic": "LD and marker density",
    "correct": [
      1
    ]
  },
  {
    "id": "genetics-22",
    "value": 200,
    "type": "single",
    "text": "Under matching additive models, what is the mathematical relationship between RR-BLUP marker effects and GBLUP genomic values?",
    "options": [
      "They agree only when all markers have identical observed genotypes",
      "GBLUP always predicts dominance while RR-BLUP predicts only additive effects",
      "They can give the same GEBVs when the relationship matrix and variance scaling correspond to the same marker model",
      "Their GEBVs must differ because one uses markers and the other uses relationships"
    ],
    "explanation": "Let M be the same centered marker matrix and marker effects have covariance Iσ_b². Then g = Mb has covariance MMᵀσ_b². If G = MMᵀ/c, choose σ_g² = cσ_b² to obtain the same covariance model. With matching fixed effects, residual model, data and variance assumptions, the BLUPs of genomic values are equivalent. Different marker weighting, centering or variance choices can break that equivalence.",
    "topic": "GBLUP and RR-BLUP",
    "correct": [
      2
    ],
    "code": "RR-BLUP: y = Xβ + Mb + e\nGBLUP:   y = Xβ + g + e\nX: fixed-effect design; M: centered marker matrix"
  },
  {
    "id": "genetics-23",
    "value": 300,
    "type": "single",
    "text": "Why is σ_a²/(σ_a² + σ_e²) not automatically the appropriate heritability for entry means across a balanced multi-environment trial?",
    "options": [
      "Heritability is always equal to prediction correlation",
      "REML cannot estimate more than one variance component",
      "Environmental replication multiplies the genetic variance by the number of plots",
      "The entry-mean denominator must reflect G×E variation and the averaging of residual noise"
    ],
    "explanation": "For a simplified balanced model with independent G×E effects across E environments and r independent replicates per environment, entry-mean h² may be σ_a² / [σ_a² + σ_a×E²/E + σ_e²/(Er)]. This requires the stated covariance and design assumptions; unbalanced trials or correlated effects need appropriate alternatives. Always specify the observational scale, variance components and genomic relationship scaling.",
    "topic": "Variance and heritability",
    "correct": [
      3
    ]
  },
  {
    "id": "genetics-24",
    "value": 400,
    "type": "single",
    "text": "You want to predict completely new breeding lines. Which evaluation most directly matches that goal and avoids the stated leakage?",
    "options": [
      "Keep all records of a line together in an outer genotype holdout; fit preprocessing and tune models within training data",
      "Randomly split plot rows while the same lines remain on both sides",
      "Select SNPs using all phenotypes before cross-validation",
      "Tune until performance on the final held-out candidates is highest"
    ],
    "explanation": "A genotype-level holdout tests lines with no training phenotypes, rather than additional records of already observed lines. Phenotype-based marker selection and tuning must stay inside training folds. Family-level or forward-cycle holdouts may be needed when the real target is unrelated families or future breeding cycles. Good random-row performance alone does not establish performance for these targets.",
    "topic": "Validation and leakage",
    "correct": [
      0
    ]
  },
  {
    "id": "genetics-25",
    "value": 500,
    "type": "multiple",
    "text": "A SNP lies in a drought-related QTL interval and contributes to a high predicted breeding value. Which statements are justified? Select all that apply.",
    "options": [
      "The SNP may tag a linked causal variant rather than be causal itself",
      "ALT must be the favorable allele because it differs from REF",
      "Evidence from relevant independent trials is needed to assess performance in the target breeding setting",
      "A GEBV is an additive genetic prediction under the fitted model, not a guarantee of an individual field phenotype"
    ],
    "explanation": "A QTL interval can contain multiple variants, and association or a prediction coefficient alone does not establish molecular causality. REF/ALT is a sequence convention, not a favorable/unfavorable label. The sign and interpretation of an effect depend on coding, trait direction and the population. GEBVs can support selection, but environment, nonadditive effects and uncertainty still affect field performance.",
    "topic": "From markers to selection",
    "correct": [
      0,
      2,
      3
    ]
  }
]);
