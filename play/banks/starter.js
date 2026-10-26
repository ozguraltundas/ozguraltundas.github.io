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
