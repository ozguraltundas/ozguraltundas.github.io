window.addKnowledgeBank({id:'r',name:'R & Data',subtitle:'THINK THROUGH THE CODE',icon:'R',topics:['Objects & types','Indexing','Filtering','Grouping','Joins','Reshaping','Functions & loops','Missing data','Models in R','Reproducibility']}, String.raw`
What does x <- 5 do?|Assigns 5 to x|Tests equality|Deletes x|Assignment stores a value; == tests equality.
Are myData and myDATA identical names?|No, names are case-sensitive|Yes, case is ignored|Only in functions|Capitalization distinguishes object names in R.
What is the type of c(1, 2, 3)?|numeric|character|data.frame|These literals form an atomic numeric vector.
What happens with c(1, "B73")?|Both elements become character|B73 is discarded|Two columns are created|Atomic vectors use one common type.
What is length(c(2, 2, 5))?|3|2|5|length counts elements, including repeated values.
Why keep "0012" as a character sample ID?|To preserve identity and leading zeros|To increase arithmetic precision|To prevent all joins|An identifier is a label rather than a measurement.
What does str(df) show?|Structure and column types|Only the working directory|Only significant rows|Inspect structure before assuming a table is numeric or a matrix.
How does a data frame differ from a numeric matrix?|Its columns may have different types|It must contain only text|It permits only one column|A matrix has a common atomic type; a data frame can mix types by column.
What does factor(c("low", "high")) represent?|Categories with levels|A continuous measurement|A multiplication operation|Factors encode categorical predictors for modelling.
Why inspect levels(treatment)?|To understand categories and reference coding|To calculate read depth|To force equal sample sizes|Level ordering affects coefficient interpretation under treatment contrasts.
In m[2, 3], what is selected?|Row 2, column 3|Row 3, column 2|All values equal to 2 or 3|Matrix indexing lists the row before the column.
What does m[, "geneA"] select?|The geneA column|The geneA row|Every column except geneA|A blank row index retains all rows.
What does m[1:3, ] select?|The first three rows|The first three columns|Only the diagonal|The position before the comma selects rows.
Why use drop = FALSE for a single matrix column?|To retain a matrix|To remove NA values|To sort values|Without it a one-column result may simplify to a vector.
What does df$genotype extract?|The genotype column|The first row|The number of genotypes|The dollar operator extracts a named component.
For a base data frame, how do df["x"] and df[["x"]] differ?|Data frame versus extracted column|Both always return matrices|The first deletes x|Single brackets preserve the container; double brackets extract its component.
If trait = "height", what does df[[trait]] select?|The height column|A column literally named trait|The final row|A character variable can supply the column name.
Why can column_to_rownames(genotype) fail?|The argument should be a name string such as "genotype"|Only integers can be row names|It cannot accept data frames|This function expects a string, unlike data-masked bare-column arguments.
What does rownames_to_column("sample") do?|Makes row names an explicit sample column|Deletes duplicated samples|Sets sample as the row names|Explicit ID columns simplify validation and joins.
What does m[c(TRUE, FALSE, TRUE), ] select?|Rows 1 and 3|Columns 1 and 3|Only row 2|Logical indexing retains TRUE positions.
What does dplyr::filter(df, x > 1) return?|Rows satisfying the condition|Only the x column|A permanent change to df in place|filter returns a result that must be assigned if it should replace df.
Why is df unchanged after filter(df, x > 1) without assignment?|The result was not saved to df|filter never removes rows|The condition checks names only|Use df <- filter(df, x > 1) to replace the object.
What does filter(genotype %in% c("A", "B")) keep?|Rows labelled A or B|Rows labelled neither|Only rows containing both labels|Membership checks each value against a set.
What does filter(!genotype %in% remove_ids) do?|Excludes listed genotypes|Keeps only listed genotypes|Renames genotypes|The exclamation mark negates membership.
What does filter(df, a > 0, b > 0) require?|Both conditions|At least one condition|Only the first condition|Separate filter conditions combine with AND.
What does a vectorized OR condition mean in filtering?|At least one condition is TRUE for a row|Both conditions must be FALSE|Only the first row is checked|Use element-wise logical operators when filtering vectors of observations.
Why may filter(x > 0) remove an NA row?|Its condition is NA rather than TRUE|NA is greater than zero|NA becomes a positive value|filter retains rows whose condition is TRUE.
What does arrange(df, desc(height)) do?|Sorts rows by decreasing height|Replaces height with ranks|Keeps only the tallest row|Sorting changes order rather than measurements.
What does select(df, genotype, height) do?|Keeps these columns|Keeps rows with these names|Counts unique genotypes|select operates on columns; filter operates on rows.
What does pull(df, genotype) return?|A column vector|A grouped summary|A matrix of all columns|pull extracts a column from a pipeline result.
What does n() count after group_by(genotype)?|Rows in each group|Distinct values in every column|The table's columns|n counts observations within the current group.
Which function counts different genotype labels?|n_distinct(genotype)|nrow(genotype)|ncol(genotype)|Distinct labels and total records are different quantities.
For labels A, A, B, how many distinct values exist?|2|3|1|Repeated A is counted once.
What does group_by(genotype, treatment) define?|Observed genotype-treatment groups|A fitted interaction coefficient|One group per column|Grouping organizes operations but does not fit a statistical model.
What does grouped summarise(mean_height = mean(height)) produce?|A mean per group|All measurements unchanged|Only row names|summarise reduces groups to summary values.
What does grouped mutate(mean_height = mean(height)) usually do?|Repeats each group's mean on its rows|Reduces each group to one row|Deletes grouping columns|mutate normally keeps row count.
Why call ungroup() when grouping is no longer needed?|To avoid unintended grouped operations|To delete every row|To turn factors into numbers|Old groups can change later calculations silently.
What does count(df, genotype) produce?|Rows per genotype|Only unique names|Mean phenotype per genotype|count combines grouping with row counts.
What does distinct(df, genotype, .keep_all = TRUE) retain?|The first row for each genotype|Every replicate|Only genotypes occurring once|Check whether discarding replicate records is actually intended.
Why can a group mean be NA?|Missing inputs were not removed|Repeated IDs are forbidden|Means require three observations|mean propagates NA by default.
What is a left join intended to preserve?|All left-side rows|Only unique right-side rows|Only matched left-side rows|Right-side multiple matches can still expand the result.
Why can a join increase row count?|One key has multiple matches|Joins always append a blank row|Numeric columns are converted to replicates|One-to-many and many-to-many relationships can multiply records.
Why might "OH43" not match "oh43"?|Case differs|They necessarily represent different species|Character keys cannot be joined|Standardize formatting only when it preserves biological identity.
What does anti_join(left, right, by = "id") return?|Unmatched left-side rows|All matched rows|Duplicated right-side rows only|Anti-joins help diagnose missing matches.
What does inner_join retain?|Matching records|Every left-side record|Only unmatched records|An inner join discards unmatched observations.
Why check key uniqueness before joining?|To verify the intended relationship|To force identical phenotypes|To replace every NA with zero|Unexpected duplicates can multiply rows.
How does bind_rows differ from a join?|It stacks records rather than matching keys|It performs regression|It requires matching row order|A join aligns information using key values.
What can str_squish() fix?|Extra whitespace in labels|Biological mislabelling automatically|Incorrect genomic coordinates|Formatting cleanup does not prove sample identity.
Why not combine genotype and phenotype data only by row position?|Sample orders may differ|R forbids equal-size tables|Phenotypes cannot have IDs|Use validated identifiers to avoid mismatching observations.
What should be checked after a join?|Row count, unmatched IDs, and key relationships|Only plot colours|Whether all effects are positive|A successful join can still be biologically wrong.
What does pivot_longer do?|Turns selected columns into name-value rows|Averages replicates automatically|Fits a mixed model|Wide trait columns can become trait and value columns.
What does pivot_wider do?|Spreads keyed values across columns|Always removes NA values|Generates random observations|Each output cell needs a well-defined identifier combination.
What can duplicate keys cause in pivot_wider?|Multiple values per cell or list-columns|New biological replicates|Guaranteed numeric zeros|Resolve duplicates using the design rather than an arbitrary rule.
What can separate() do to "B73 X MO17"?|Split parent labels into columns|Fit random parental effects|Estimate genetic distance|Parsing a string is not a genetic analysis.
Why does clean_names() not fix genotype values?|It cleans column names rather than cell contents|It only accepts numeric matrices|It uppercases every value|Variable names and their stored values are different objects.
What may as.matrix() do to mixed numeric and character columns?|Coerce the whole matrix to character|Always remove text columns|Guarantee a numeric matrix|A matrix uses a common atomic type.
What does t(m) do?|Transposes rows and columns|Sorts all values|Removes duplicated IDs|After transposition, confirm which dimension represents samples.
Why inspect orientation before apply(m, 2, FUN)?|Margin 2 acts on columns|Margin 2 always means genes|apply determines biology from names|The biological meaning depends on matrix orientation.
What does bind_rows(..., .id = "source") add?|An input-source label|New biological replicates|P-values|Source labels help trace combined records.
Why inspect data types after format conversion?|Types or metadata may change|All formats guarantee identical attributes|Only numeric values survive|Conversion success does not guarantee structural equivalence.
What does for (trait in traits) do?|Iterates over vector elements|Iterates over letters in trait|Fits all models in parallel|The loop variable takes one stored value per iteration.
Why prefer seq_along(x) over 1:length(x)?|It handles empty vectors safely|It always uses a GPU|It sorts x|For empty x, 1:length(x) produces 1:0 rather than an empty sequence.
What is rep(c(2, 4), each = 2)?|2, 2, 4, 4|2, 4, 2, 4|4, 8|each repeats individual elements consecutively.
What is rep(c(2, 4), times = 2)?|2, 4, 2, 4|2, 2, 4, 4|2, 4|A scalar times repeats the complete vector.
What does apply(m, 1, mean) calculate?|Row means|Column means|One mean per unique name|Margin 1 is rows and margin 2 is columns.
What does lapply normally return?|A list|Always a numeric matrix|Only the last result|List output can hold different result shapes.
Why collect loop outputs in a list?|To retain each iteration's result|To validate assumptions automatically|Models cannot return tables|Otherwise a reused object may preserve only the last result.
What does return(value) inside a function do?|Exits the function with value|Restarts R|Writes value to disk|Returning an object is different from saving it as a file.
What does set.seed(123) help reproduce?|Random draws from the same procedure|All software versions|Any algorithm's results|A seed controls random generation rather than every computational difference.
Why inspect a function's documented arguments?|Input conventions and defaults differ|To force statistical significance|To repair missing samples|Do not assume all functions accept column names in the same form.
What does is.na(x) return?|Logical missing-value indicators|Only nonmissing values|A sorted vector|The indicators can be counted or used to subset.
What does sum(is.na(x)) count?|Missing elements|Nonmissing elements|Distinct elements|Summing logical values counts TRUE as one.
What is mean(is.na(x)) * 100?|The percentage missing|The mean observed value|The number of samples|A mean of logical indicators is a proportion.
Why does colSums(is.na(df$x)) fail for a vector?|It needs a two-dimensional object|Missing values cannot be counted|The vector is unsorted|Use sum(is.na(df$x)) for one ordinary vector.
What does na.rm = TRUE do in mean()?|Excludes missing inputs from that calculation|Replaces NA with zero|Deletes rows from the original object|It affects the calculation rather than mutating its input.
What is mean(c(NA, NA), na.rm = TRUE)?|NaN|0|1|No observed values remain to average.
What does as.numeric("ZT12") produce?|NA with a warning|12 without warning|A factor level|The text is not a valid numeric literal.
Why is as.numeric(factor(c("10", "20"))) risky?|It returns internal level codes|It always returns 10 and 20|It preserves leading zeros|Convert through character only if the labels truly represent numbers.
What does complete.cases(df) identify?|Rows without missing values in the supplied columns|The largest records|Constant columns|The result depends on which columns you include.
Why not replace every NA with zero?|Missingness differs from a measured zero|R cannot store zero|Every NA is an outlier|A replacement requires a justified interpretation of missingness.
Why model treatment codes as factors for categories?|To avoid imposing a numeric trend|To guarantee normal residuals|To remove the intercept|Codes such as 1, 2, 3 need not imply equal quantitative spacing.
What does model.matrix(~ treatment, df) construct?|A predictor design matrix|A p-value matrix|A genomic relationship matrix|Columns encode model terms using the selected contrasts.
Under treatment coding, what does a treatment coefficient compare?|A level against the reference|A level against every possible model|Only the two extreme observations|Interpretation also depends on interactions and other predictors.
Why is a genotype coefficient not automatically its predicted mean?|It may be a contrast to a reference|It is always a correlation|It has no model interpretation|Predicted means combine the relevant model coefficients.
What are residuals from an ordinary lm fit?|Observed minus fitted responses|Only predictor values|The fitted coefficients|Residuals are estimates of unexplained deviations, not the true errors.
What does predict(model, newdata = test) need?|Compatible predictor information|Test responses as training labels|Only row names|Required variables and supported factor levels must be present.
Why can unseen factor levels cause prediction problems?|Their effects were not estimated in training|R ignores factors|Test size must equal training size|Prediction for new categories needs a suitable model strategy.
What does genotype.as.random = FALSE mean in a SpATS fit?|Genotype is treated as fixed|Genotypes are randomly shuffled|All spatial terms are removed|This concerns model terms, not experimental randomization.
What might an essentially perfect fit warning indicate?|Nearly zero residual variation|Universal predictive validity|Independent test validation|Deterministic toy data can create misleadingly tiny uncertainty estimates.
Why learn centering and scaling from training data only?|To avoid test-information leakage|To maximize training p-values|To equalize all responses|Use those training-derived values when transforming test predictors.
What does getwd() show?|The working directory|The newest output file|The R version|Relative paths are resolved from the working directory.
What does file.path("data", "counts.csv") create?|A path string|The file contents|A directory on disk|Constructing a path does not read or create its target.
Why inspect an output path before saving?|To know where the file will be written|To convert every variable to numeric|To refit the model|A correct filename in the wrong folder still causes workflow confusion.
What does row.names = FALSE avoid in write.csv()?|An extra row-name column|Missing values in the export|All numeric columns|Explicit IDs are clearer than an unintended index column.
How is RDS different from CSV?|It preserves one R object's structure more directly|It is always plain spreadsheet text|CSV preserves every R attribute|CSV is portable text, while RDS retains R-specific structure.
What is a good first check after import?|Names, dimensions, types, and example rows|Only absence of errors|Only the final p-value|Import can succeed despite incorrect separators or inferred types.
Why separate raw inputs from processed outputs?|To preserve a reproducible starting point|To prevent analysis|To ensure normality|Traceable transformations should not overwrite original measurements.
What does sessionInfo() record?|R, platform, and package information|All passwords|Only file creation dates|Environment details help explain computational differences.
Why inspect warnings after a script finishes?|They may reveal coercion or convergence problems|Every warning makes results unusable|Completed scripts cannot be wrong|Warnings require interpretation rather than automatic dismissal.
Why verify IDs and dimensions at the end?|Execution success does not guarantee the intended analysis|R validates all biological assumptions|Only graphs reveal errors|Expected counts and identity checks catch many silent mistakes.
`);
