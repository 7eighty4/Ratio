import type { Topic } from '../types';

export const TOPICS: Topic[] = [
  // --- 1. CONSTITUTIONAL LAW (15 Topics) ---
  {
    id: 'const-01',
    title: 'Basic Structure Doctrine & Judicial Review',
    category: 'constitutional_law',
    difficulty: 'advanced',
    tags: ['Basic Structure', 'Amendments', 'Article 368', 'Kesavananda']
  },
  {
    id: 'const-02',
    title: 'Constitutional Morality vs. Majoritarian Morality',
    category: 'constitutional_law',
    difficulty: 'advanced',
    tags: ['Constitutional Morality', 'Ambedkar', 'Judicial Review']
  },
  {
    id: 'const-03',
    title: 'Article 21 & Procedural vs. Substantive Due Process',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Article 21', 'Due Process', 'Maneka Gandhi']
  },
  {
    id: 'const-04',
    title: 'Article 32 & Constitutional Writ Jurisdiction',
    category: 'constitutional_law',
    difficulty: 'beginner',
    tags: ['Article 32', 'Writs', 'Habeas Corpus', 'PIL']
  },
  {
    id: 'const-05',
    title: 'Federalism: Quasi-Federal Framework & State Autonomy',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Federalism', 'Article 356', 'Seventh Schedule']
  },
  {
    id: 'const-06',
    title: 'Doctrine of Pith and Substance',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Seventh Schedule', 'Legislative Competence']
  },
  {
    id: 'const-07',
    title: 'Doctrine of Eclipse & Severability',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Article 13', 'Pre-constitutional laws', 'Severability']
  },
  {
    id: 'const-08',
    title: 'Directive Principles vs. Fundamental Rights Harmony',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['DPSP', 'Part III', 'Part IV', 'Minerva Mills']
  },
  {
    id: 'const-09',
    title: 'Freedom of Speech & Reasonable Restrictions (Article 19)',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Article 19', 'Free Speech', 'Article 19(2)']
  },
  {
    id: 'const-10',
    title: 'Executive Pardoning Power (Article 72 & Article 161)',
    category: 'constitutional_law',
    difficulty: 'advanced',
    tags: ['Article 72', 'Article 161', 'Pardon', 'Judicial Review']
  },
  {
    id: 'const-11',
    title: 'Preventive Detention & Article 22 Safeguards',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Preventive Detention', 'Article 22', 'Personal Liberty']
  },
  {
    id: 'const-12',
    title: 'Doctrine of Colorable Legislation',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Colorable Legislation', 'Legislative Power']
  },
  {
    id: 'const-13',
    title: 'Uniform Civil Code (Article 44) & Personal Laws Conflict',
    category: 'constitutional_law',
    difficulty: 'advanced',
    tags: ['Article 44', 'UCC', 'Secularism', 'Personal Laws']
  },
  {
    id: 'const-14',
    title: 'Freedom of Religion vs. Public Order & Morality (Articles 25–28)',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Religious Freedom', 'Article 25', 'Essential Religious Practices']
  },
  {
    id: 'const-15',
    title: 'Right to Equality & Affirmative Action (Articles 14, 15, 16)',
    category: 'constitutional_law',
    difficulty: 'intermediate',
    tags: ['Article 14', 'Reservations', 'Creamy Layer', 'Affirmative Action']
  },

  // --- 2. JURISPRUDENCE & LEGAL THEORY (14 Topics) ---
  {
    id: 'juris-01',
    title: 'Natural Law Theory: Lex Iniusta Non Est Lex',
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Natural Law', 'Morality', 'Aquinas', 'Fuller']
  },
  {
    id: 'juris-02',
    title: "H.L.A. Hart's Rule of Recognition & Legal Positivism",
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Legal Positivism', 'Hart', 'Rule of Recognition']
  },
  {
    id: 'juris-03',
    title: "John Austin's Command Theory of Law & Sovereignty",
    category: 'jurisprudence',
    difficulty: 'beginner',
    tags: ['Austin', 'Sovereignty', 'Sanction', 'Command']
  },
  {
    id: 'juris-04',
    title: "Hans Kelsen's Pure Theory of Law & The Grundnorm",
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Kelsen', 'Pure Theory', 'Grundnorm']
  },
  {
    id: 'juris-05',
    title: "Ronald Dworkin's Rights as Trumps & Law as Integrity",
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Dworkin', 'Principles vs Rules', 'Hard Cases']
  },
  {
    id: 'juris-06',
    title: 'American Legal Realism & The Bad Man Theory',
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Legal Realism', 'Holmes', 'Judicial Discretion']
  },
  {
    id: 'juris-07',
    title: 'Sociological School & Law as Social Engineering',
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Sociological School', 'Roscoe Pound', 'Social Engineering']
  },
  {
    id: 'juris-08',
    title: "Savigny's Volksgeist & The Historical School of Law",
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Historical School', 'Savigny', 'Volksgeist']
  },
  {
    id: 'juris-09',
    title: 'Hohfeldian Analysis of Legal Rights and Duties',
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Hohfeld', 'Jural Correlatives', 'Rights & Duties']
  },
  {
    id: 'juris-10',
    title: 'The Hart-Fuller Debate on Law and Morality',
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Hart-Fuller', 'Nazi Law', 'Morality']
  },
  {
    id: 'juris-11',
    title: "John Rawls' Veil of Ignorance & Theory of Justice",
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Rawls', 'Justice', 'Veil of Ignorance']
  },
  {
    id: 'juris-12',
    title: 'Utilitarianism & Jeremy Bentham’s Harm Principle',
    category: 'jurisprudence',
    difficulty: 'beginner',
    tags: ['Bentham', 'Utilitarianism', 'Legislation']
  },
  {
    id: 'juris-13',
    title: 'Feminist Legal Theory & Gendered Legal Structures',
    category: 'jurisprudence',
    difficulty: 'intermediate',
    tags: ['Feminist Jurisprudence', 'Patriarchy', 'Substantive Equality']
  },
  {
    id: 'juris-14',
    title: 'Economic Analysis of Law & Coase Theorem Efficiency',
    category: 'jurisprudence',
    difficulty: 'advanced',
    tags: ['Law & Economics', 'Coase Theorem', 'Efficiency']
  },

  // --- 3. LANDMARK CASES & PRECEDENTS (14 Topics) ---
  {
    id: 'cases-01',
    title: 'Kesavananda Bharati v. State of Kerala (1973)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Kesavananda', 'Basic Structure', '13-Judge Bench']
  },
  {
    id: 'cases-02',
    title: 'Maneka Gandhi v. Union of India (1978)',
    category: 'cases',
    difficulty: 'beginner',
    tags: ['Maneka Gandhi', 'Article 21', 'Procedure']
  },
  {
    id: 'cases-03',
    title: 'Justice K.S. Puttaswamy v. Union of India (2017)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Puttaswamy', 'Privacy', 'Fundamental Right']
  },
  {
    id: 'cases-04',
    title: 'Vishaka v. State of Rajasthan (1997)',
    category: 'cases',
    difficulty: 'beginner',
    tags: ['Vishaka', 'Workplace Safety', 'Judicial Legislation']
  },
  {
    id: 'cases-05',
    title: 'Shreya Singhal v. Union of India (2015)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Shreya Singhal', 'Section 66A', 'Free Speech']
  },
  {
    id: 'cases-06',
    title: 'Navtej Singh Johar v. Union of India (2018)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Navtej Johar', 'Section 377', 'LGBTQ+ Rights']
  },
  {
    id: 'cases-07',
    title: 'ADM Jabalpur v. Shivkant Shukla (1976)',
    category: 'cases',
    difficulty: 'advanced',
    tags: ['ADM Jabalpur', 'Emergency', 'Habeas Corpus']
  },
  {
    id: 'cases-08',
    title: 'Minerva Mills v. Union of India (1980)',
    category: 'cases',
    difficulty: 'advanced',
    tags: ['Minerva Mills', 'Judicial Review', 'Basic Structure']
  },
  {
    id: 'cases-09',
    title: 'Donoghue v. Stevenson (1932)',
    category: 'cases',
    difficulty: 'beginner',
    tags: ['Tort Law', 'Negligence', 'Neighbour Principle']
  },
  {
    id: 'cases-10',
    title: 'R v. Dudley and Stephens (1884)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Criminal Law', 'Necessity Defense', 'Cannibalism']
  },
  {
    id: 'cases-11',
    title: 'Marbury v. Madison (1803)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['US Supreme Court', 'Judicial Review', 'Constitutionalism']
  },
  {
    id: 'cases-12',
    title: 'S.R. Bommai v. Union of India (1994)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['SR Bommai', 'President Rules', 'Article 356', 'Federalism']
  },
  {
    id: 'cases-13',
    title: 'M.C. Mehta v. Union of India (Oleum Gas Leak, 1987)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['MC Mehta', 'Absolute Liability', 'Environmental Protection']
  },
  {
    id: 'cases-14',
    title: 'Shayara Bano v. Union of India (2017)',
    category: 'cases',
    difficulty: 'intermediate',
    tags: ['Triple Talaq', 'Gender Justice', 'Article 14']
  },

  // --- 4. LEGAL HISTORY & EVOLUTION (10 Topics) ---
  {
    id: 'hist-01',
    title: 'The Magna Carta of 1215 & Origins of Due Process',
    category: 'history',
    difficulty: 'beginner',
    tags: ['Magna Carta', 'Rule of Law', 'Feudal History']
  },
  {
    id: 'hist-02',
    title: 'The Code of Hammurabi & Early Codification',
    category: 'history',
    difficulty: 'beginner',
    tags: ['Babylonian Law', 'Eye for an Eye', 'Ancient Codes']
  },
  {
    id: 'hist-03',
    title: 'Regulating Act of 1773 & Supreme Court at Calcutta',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['East India Company', 'Calcutta', 'Warren Hastings']
  },
  {
    id: 'hist-04',
    title: 'Charter Act of 1833 & Macaulay Law Commission',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['Macaulay', 'Codification', 'IPC Origin']
  },
  {
    id: 'hist-05',
    title: 'Government of India Act 1935',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['GoI Act 1935', 'Federal Court', 'Constitutional Blueprint']
  },
  {
    id: 'hist-06',
    title: 'The Constituent Assembly Debates (1946–1949)',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['Constituent Assembly', 'Ambedkar', 'Drafting']
  },
  {
    id: 'hist-07',
    title: 'The Nuremberg Trials (1945–1946)',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['Nuremberg', 'Crimes Against Humanity', 'Intl Criminal Law']
  },
  {
    id: 'hist-08',
    title: 'Abolition of the Jury System in India & Nanavati Case',
    category: 'history',
    difficulty: 'intermediate',
    tags: ['Nanavati', 'Jury Trial', 'Criminal History']
  },
  {
    id: 'hist-09',
    title: 'Corpus Juris Civilis & Roman Law Foundations',
    category: 'history',
    difficulty: 'advanced',
    tags: ['Roman Law', 'Justinian', 'Civil Law Systems']
  },
  {
    id: 'hist-10',
    title: 'English Common Law vs. Continental Civil Law Systems',
    category: 'history',
    difficulty: 'beginner',
    tags: ['Common Law', 'Civil Law', 'Inquisitorial vs Adversarial']
  },

  // --- 5. LOGICAL FALLACIES IN ADVOCACY (10 Topics) ---
  {
    id: 'fallacy-01',
    title: 'The Straw Man Fallacy',
    category: 'logical_fallacies',
    difficulty: 'beginner',
    tags: ['Straw Man', 'Argumentation', 'Misrepresentation']
  },
  {
    id: 'fallacy-02',
    title: 'Argumentum Ad Hominem (Personal Attack)',
    category: 'logical_fallacies',
    difficulty: 'beginner',
    tags: ['Ad Hominem', 'Cross Examination', 'Advocacy']
  },
  {
    id: 'fallacy-03',
    title: 'Slippery Slope Fallacy in Policy Arguments',
    category: 'logical_fallacies',
    difficulty: 'intermediate',
    tags: ['Slippery Slope', 'Precedent', 'Policy Arguments']
  },
  {
    id: 'fallacy-04',
    title: 'Post Hoc Ergo Propter Hoc (False Cause)',
    category: 'logical_fallacies',
    difficulty: 'intermediate',
    tags: ['Causation', 'Evidence', 'False Cause']
  },
  {
    id: 'fallacy-05',
    title: 'Circular Reasoning (Begging the Question)',
    category: 'logical_fallacies',
    difficulty: 'intermediate',
    tags: ['Circular Logic', 'Begging the Question']
  },
  {
    id: 'fallacy-06',
    title: 'False Dilemma / False Dichotomy',
    category: 'logical_fallacies',
    difficulty: 'beginner',
    tags: ['False Dilemma', 'Binary Choice', 'Proportionality']
  },
  {
    id: 'fallacy-07',
    title: 'Argumentum Ad Verecundiam (Appeal to Authority)',
    category: 'logical_fallacies',
    difficulty: 'beginner',
    tags: ['Appeal to Authority', 'Expert Testimony']
  },
  {
    id: 'fallacy-08',
    title: 'Red Herring Fallacy (Ignoratio Elenchi)',
    category: 'logical_fallacies',
    difficulty: 'beginner',
    tags: ['Red Herring', 'Diversion', 'Advocacy']
  },
  {
    id: 'fallacy-09',
    title: 'Argumentum Ad Ignorantiam (Appeal to Ignorance)',
    category: 'logical_fallacies',
    difficulty: 'intermediate',
    tags: ['Burden of Proof', 'Ignorance Fallacy']
  },
  {
    id: 'fallacy-10',
    title: 'Texas Sharpshooter Fallacy in Data & Evidence',
    category: 'logical_fallacies',
    difficulty: 'advanced',
    tags: ['Cherry Picking', 'Statistical Fallacy', 'Evidence']
  },

  // --- 6. LEGAL REASONING & INTERPRETATION (10 Topics) ---
  {
    id: 'reasoning-01',
    title: 'Ratio Decidendi vs. Obiter Dicta',
    category: 'legal_reasoning',
    difficulty: 'intermediate',
    tags: ['Ratio Decidendi', 'Obiter Dicta', 'Precedent']
  },
  {
    id: 'reasoning-02',
    title: 'Stare Decisis & Judicial Precedent (Article 141)',
    category: 'legal_reasoning',
    difficulty: 'beginner',
    tags: ['Stare Decisis', 'Article 141', 'Binding Precedent']
  },
  {
    id: 'reasoning-03',
    title: 'Per Incuriam & Sub Silentio Doctrines',
    category: 'legal_reasoning',
    difficulty: 'advanced',
    tags: ['Per Incuriam', 'Sub Silentio', 'Overruling']
  },
  {
    id: 'reasoning-04',
    title: 'Mischief Rule of Statutory Interpretation (Heydon’s Case)',
    category: 'legal_reasoning',
    difficulty: 'intermediate',
    tags: ['Mischief Rule', 'Statutory Construction', 'Purposive']
  },
  {
    id: 'reasoning-05',
    title: 'Rule of Ejusdem Generis in Statutory Construction',
    category: 'legal_reasoning',
    difficulty: 'intermediate',
    tags: ['Ejusdem Generis', 'General Words', 'Interpretation']
  },
  {
    id: 'reasoning-06',
    title: 'Harmonious Construction Doctrine',
    category: 'legal_reasoning',
    difficulty: 'intermediate',
    tags: ['Harmonious Construction', 'Statutory Interpretation']
  },
  {
    id: 'reasoning-07',
    title: 'Literal Rule vs. Purposive Approach to Legislation',
    category: 'legal_reasoning',
    difficulty: 'beginner',
    tags: ['Plain Meaning Rule', 'Purposive Interpretation']
  },
  {
    id: 'reasoning-08',
    title: 'Noscitur a Sociis (Word Known by its Context)',
    category: 'legal_reasoning',
    difficulty: 'intermediate',
    tags: ['Noscitur a Sociis', 'Contextual Interpretation']
  },
  {
    id: 'reasoning-09',
    title: 'Expressio Unius Est Exclusio Alterius',
    category: 'legal_reasoning',
    difficulty: 'advanced',
    tags: ['Express Mention', 'Exclusion Rule']
  },
  {
    id: 'reasoning-10',
    title: 'Doctrine of Prospective Overruling',
    category: 'legal_reasoning',
    difficulty: 'advanced',
    tags: ['Golaknath', 'Prospective Overruling', 'Precedent']
  },

  // --- 7. STATUTES & LEGISLATION (10 Topics) ---
  {
    id: 'stat-01',
    title: 'Bharatiya Nyaya Sanhita (BNS) vs. Indian Penal Code (IPC)',
    category: 'statutes',
    difficulty: 'intermediate',
    tags: ['BNS', 'IPC', 'Criminal Reform']
  },
  {
    id: 'stat-02',
    title: 'Right to Information Act, 2005 (RTI)',
    category: 'statutes',
    difficulty: 'beginner',
    tags: ['RTI', 'Transparency', 'Public Authority']
  },
  {
    id: 'stat-03',
    title: 'Arbitration and Conciliation Act, 1996 & Commercial ADR',
    category: 'statutes',
    difficulty: 'advanced',
    tags: ['Arbitration', 'ADR', 'Public Policy']
  },
  {
    id: 'stat-04',
    title: 'Insolvency and Bankruptcy Code, 2016 (IBC)',
    category: 'statutes',
    difficulty: 'advanced',
    tags: ['IBC', 'Corporate Resolution', 'NCLT']
  },
  {
    id: 'stat-05',
    title: 'Digital Personal Data Protection Act, 2023 (DPDP)',
    category: 'statutes',
    difficulty: 'intermediate',
    tags: ['DPDP Act', 'Data Privacy', 'Data Fiduciary']
  },
  {
    id: 'stat-06',
    title: 'Information Technology Act, 2000 & Electronic Evidence',
    category: 'statutes',
    difficulty: 'intermediate',
    tags: ['IT Act', 'Section 65B', 'Cyber Crime']
  },
  {
    id: 'stat-07',
    title: 'Consumer Protection Act, 2019 & E-Commerce Rules',
    category: 'statutes',
    difficulty: 'beginner',
    tags: ['Consumer Rights', 'Product Liability', 'E-Commerce']
  },
  {
    id: 'stat-08',
    title: 'Prevention of Money Laundering Act, 2002 (PMLA)',
    category: 'statutes',
    difficulty: 'advanced',
    tags: ['PMLA', 'Financial Crime', 'Bail Conditions']
  },
  {
    id: 'stat-09',
    title: 'Competition Act, 2002 & Anti-Competitive Agreements',
    category: 'statutes',
    difficulty: 'advanced',
    tags: ['CCI', 'Monopoly', 'Cartels', 'Merger Control']
  },
  {
    id: 'stat-10',
    title: 'Protection of Children from Sexual Offences (POCSO) Act',
    category: 'statutes',
    difficulty: 'intermediate',
    tags: ['POCSO', 'Child Safety', 'Strict Liability']
  },

  // --- 8. LEGAL MAXIMS (10 Topics) ---
  {
    id: 'maxim-01',
    title: 'Audi Alteram Partem (Hear the Other Side)',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Audi Alteram Partem', 'Natural Justice', 'Fair Trial']
  },
  {
    id: 'maxim-02',
    title: 'Nemo Judex In Causa Sua (Rule Against Bias)',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Nemo Judex', 'Bias', 'Pecuniary Bias']
  },
  {
    id: 'maxim-03',
    title: 'Res Ipsa Loquitur (The Thing Speaks for Itself)',
    category: 'maxims',
    difficulty: 'intermediate',
    tags: ['Res Ipsa Loquitur', 'Negligence', 'Proof']
  },
  {
    id: 'maxim-04',
    title: 'Ubi Jus Ibi Remedium (Where Right, There Remedy)',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Ubi Jus', 'Remedies', 'Injuria Sine Damno']
  },
  {
    id: 'maxim-05',
    title: 'Actus Non Facit Reum Nisi Mens Sit Rea',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Mens Rea', 'Actus Reus', 'Criminal Intent']
  },
  {
    id: 'maxim-06',
    title: 'Volenti Non Fit Injuria (Defense of Consent)',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Volenti', 'Consent', 'Tort Defense']
  },
  {
    id: 'maxim-07',
    title: 'Ignorantia Juris Non Excusat (Ignorance of Law No Excuse)',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Ignorance of Law', 'Public Notice']
  },
  {
    id: 'maxim-08',
    title: 'Salus Populi Suprema Lex Est (Welfare of People is Supreme Law)',
    category: 'maxims',
    difficulty: 'intermediate',
    tags: ['Salus Populi', 'Public Interest', 'State Necessity']
  },
  {
    id: 'maxim-09',
    title: 'Delegatus Non Potest Delegare (Delegate Cannot Delegate)',
    category: 'maxims',
    difficulty: 'intermediate',
    tags: ['Delegation', 'Subordinate Legislation']
  },
  {
    id: 'maxim-10',
    title: 'Damnum Sine Injuria vs. Injuria Sine Damno',
    category: 'maxims',
    difficulty: 'beginner',
    tags: ['Damnum Sine Injuria', 'Legal Injury', 'Ashby v White']
  },

  // --- 9. CONTRACT LAW (8 Topics) ---
  {
    id: 'contract-01',
    title: 'Doctrine of Frustration (Section 56, Contract Act)',
    category: 'contracts',
    difficulty: 'intermediate',
    tags: ['Frustration', 'Impossibility', 'Force Majeure']
  },
  {
    id: 'contract-02',
    title: 'Standard Form Contracts & Exemption Clauses',
    category: 'contracts',
    difficulty: 'intermediate',
    tags: ['Standard Contracts', 'Unfair Terms', 'Bargaining Power']
  },
  {
    id: 'contract-03',
    title: 'Doctrine of Promissory Estoppel',
    category: 'contracts',
    difficulty: 'advanced',
    tags: ['Promissory Estoppel', 'Equity', 'Motilal Padampat']
  },
  {
    id: 'contract-04',
    title: 'Minor’s Agreement & Void Ab Initio (Mohori Bibee)',
    category: 'contracts',
    difficulty: 'beginner',
    tags: ['Minor Capacity', 'Mohori Bibee', 'Void Contract']
  },
  {
    id: 'contract-05',
    title: 'Anticipatory Breach of Contract & Damages Measurement',
    category: 'contracts',
    difficulty: 'intermediate',
    tags: ['Breach of Contract', 'Damages', 'Hadley v Baxendale']
  },
  {
    id: 'contract-06',
    title: 'Doctrine of Consideration & Privity of Contract',
    category: 'contracts',
    difficulty: 'intermediate',
    tags: ['Consideration', 'Privity', 'Third Party Rights']
  },
  {
    id: 'contract-07',
    title: 'Free Consent: Coercion, Undue Influence & Fraud',
    category: 'contracts',
    difficulty: 'beginner',
    tags: ['Free Consent', 'Coercion', 'Undue Influence', 'Fraud']
  },
  {
    id: 'contract-08',
    title: 'Smart Contracts & E-Contract Enforcement',
    category: 'contracts',
    difficulty: 'advanced',
    tags: ['Smart Contracts', 'Blockchain', 'E-Signatures']
  },

  // --- 10. LAW OF TORTS (8 Topics) ---
  {
    id: 'tort-01',
    title: 'Strict Liability vs. Absolute Liability',
    category: 'torts',
    difficulty: 'intermediate',
    tags: ['Rylands v Fletcher', 'MC Mehta', 'Absolute Liability']
  },
  {
    id: 'tort-02',
    title: 'Vicarious Liability & Course of Employment',
    category: 'torts',
    difficulty: 'beginner',
    tags: ['Vicarious Liability', 'Master & Servant', 'Course of Employment']
  },
  {
    id: 'tort-03',
    title: 'Medical Negligence & The Bolam Test',
    category: 'torts',
    difficulty: 'intermediate',
    tags: ['Medical Negligence', 'Bolam Test', 'Standard of Care']
  },
  {
    id: 'tort-04',
    title: 'Remoteness of Damage & The Wagon Mound Test',
    category: 'torts',
    difficulty: 'intermediate',
    tags: ['Remoteness', 'Wagon Mound', 'Foreseeability']
  },
  {
    id: 'tort-05',
    title: 'Defamation: Libel vs. Slander & Fair Comment Defense',
    category: 'torts',
    difficulty: 'beginner',
    tags: ['Defamation', 'Libel', 'Slander', 'Free Speech']
  },
  {
    id: 'tort-06',
    title: 'Private Nuisance vs. Public Nuisance',
    category: 'torts',
    difficulty: 'beginner',
    tags: ['Nuisance', 'Reasonable Use', 'Injunction']
  },
  {
    id: 'tort-07',
    title: 'Tortious Liability of the State & Sovereign Immunity',
    category: 'torts',
    difficulty: 'advanced',
    tags: ['Sovereign Immunity', 'State Liability', 'Kasturilal']
  },
  {
    id: 'tort-08',
    title: 'Economic Torts: Inducing Breach of Contract',
    category: 'torts',
    difficulty: 'advanced',
    tags: ['Economic Torts', 'Lumley v Gye', 'Commercial Interference']
  },

  // --- 11. CRIMINAL LAW & CRIMINOLOGY (8 Topics) ---
  {
    id: 'crime-01',
    title: "Insanity Defense & The M'Naghten Rules",
    category: 'crimes',
    difficulty: 'intermediate',
    tags: ['Insanity', 'MNaghten', 'Section 84 IPC/BNS']
  },
  {
    id: 'crime-02',
    title: 'Culpable Homicide vs. Murder',
    category: 'crimes',
    difficulty: 'intermediate',
    tags: ['Culpable Homicide', 'Murder', 'Intention']
  },
  {
    id: 'crime-03',
    title: 'Theories of Punishment: Retributive vs. Reformative',
    category: 'crimes',
    difficulty: 'beginner',
    tags: ['Penology', 'Retribution', 'Reformation']
  },
  {
    id: 'crime-04',
    title: 'Death Penalty & Rarest of Rare Cases Doctrine',
    category: 'crimes',
    difficulty: 'advanced',
    tags: ['Capital Punishment', 'Bachan Singh', 'Rarest of Rare']
  },
  {
    id: 'crime-05',
    title: 'Right of Private Defense of Body and Property',
    category: 'crimes',
    difficulty: 'intermediate',
    tags: ['Private Defense', 'Self Defense', 'Proportionality']
  },
  {
    id: 'crime-06',
    title: 'Corporate Criminal Liability & Identification Doctrine',
    category: 'crimes',
    difficulty: 'advanced',
    tags: ['Corporate Crime', 'Alter Ego', 'Financial Fraud']
  },
  {
    id: 'crime-07',
    title: 'Cybercrime: Phishing, Identity Theft & Hacking Liability',
    category: 'crimes',
    difficulty: 'intermediate',
    tags: ['Cyber Crime', 'Hacking', 'Identity Theft']
  },
  {
    id: 'crime-08',
    title: 'White-Collar Crime & Financial Embezzlement',
    category: 'crimes',
    difficulty: 'intermediate',
    tags: ['White Collar Crime', 'Sutherland', 'Embezzlement']
  },

  // --- 12. PROPERTY LAW (6 Topics) ---
  {
    id: 'prop-01',
    title: 'Doctrine of Lis Pendens (Section 52, TPA)',
    category: 'property',
    difficulty: 'intermediate',
    tags: ['Lis Pendens', 'Pending Litigation', 'Property Transfer']
  },
  {
    id: 'prop-02',
    title: 'Rule Against Perpetuity (Section 14, TPA)',
    category: 'property',
    difficulty: 'advanced',
    tags: ['Perpetuity', 'Vested Interest', 'TPA']
  },
  {
    id: 'prop-03',
    title: 'Doctrine of Part Performance (Section 53A, TPA)',
    category: 'property',
    difficulty: 'intermediate',
    tags: ['Part Performance', 'Equity', 'Possession']
  },
  {
    id: 'prop-04',
    title: 'Ostensible Owner & Holding Out (Section 41, TPA)',
    category: 'property',
    difficulty: 'intermediate',
    tags: ['Ostensible Owner', 'Bona Fide Buyer', 'Estoppel']
  },
  {
    id: 'prop-05',
    title: 'Equity of Redemption in Mortgages',
    category: 'property',
    difficulty: 'advanced',
    tags: ['Mortgage', 'Equity of Redemption', 'Clog on Redemption']
  },
  {
    id: 'prop-06',
    title: 'Adverse Possession & Limitation Period Claims',
    category: 'property',
    difficulty: 'intermediate',
    tags: ['Adverse Possession', 'Limitation Act', 'Title']
  },

  // --- 13. ADMINISTRATIVE LAW (6 Topics) ---
  {
    id: 'admin-01',
    title: 'Delegated Legislation & Excessive Delegation',
    category: 'admin_law',
    difficulty: 'intermediate',
    tags: ['Delegated Legislation', 'Parent Act', 'Subordinate']
  },
  {
    id: 'admin-02',
    title: 'Doctrine of Legitimate Expectation',
    category: 'admin_law',
    difficulty: 'advanced',
    tags: ['Legitimate Expectation', 'Administrative Fairness']
  },
  {
    id: 'admin-03',
    title: 'Wednesbury Unreasonableness & Proportionality Test',
    category: 'admin_law',
    difficulty: 'advanced',
    tags: ['Wednesbury', 'Proportionality', 'Judicial Review']
  },
  {
    id: 'admin-04',
    title: 'Ombudsman System: Lokpal & Lokayuktas',
    category: 'admin_law',
    difficulty: 'intermediate',
    tags: ['Ombudsman', 'Lokpal', 'Anti-Corruption']
  },
  {
    id: 'admin-05',
    title: 'Administrative Tribunals & Exclusion of Jurisdiction',
    category: 'admin_law',
    difficulty: 'intermediate',
    tags: ['Tribunals', 'L Chandra Kumar', 'Article 323A']
  },
  {
    id: 'admin-06',
    title: 'Promissory Estoppel Against the State',
    category: 'admin_law',
    difficulty: 'advanced',
    tags: ['Promissory Estoppel', 'State Obligations', 'Public Policy']
  },

  // --- 14. INTERNATIONAL LAW (6 Topics) ---
  {
    id: 'intl-01',
    title: 'Sources of International Law (Article 38, ICJ Statute)',
    category: 'international_law',
    difficulty: 'intermediate',
    tags: ['ICJ Statute', 'Customary Law', 'Treaties']
  },
  {
    id: 'intl-02',
    title: 'State Sovereignty vs. Humanitarian Intervention (R2P)',
    category: 'international_law',
    difficulty: 'advanced',
    tags: ['Sovereignty', 'Humanitarian Intervention', 'R2P']
  },
  {
    id: 'intl-03',
    title: 'Diplomatic Immunity & Vienna Convention',
    category: 'international_law',
    difficulty: 'intermediate',
    tags: ['Diplomatic Immunity', 'Vienna Convention', 'Envoys']
  },
  {
    id: 'intl-04',
    title: 'Law of the Sea (UNCLOS) & Exclusive Economic Zones',
    category: 'international_law',
    difficulty: 'intermediate',
    tags: ['UNCLOS', 'EEZ', 'Maritime Law', 'Territorial Waters']
  },
  {
    id: 'intl-05',
    title: 'International Court of Justice (ICJ) Jurisdiction',
    category: 'international_law',
    difficulty: 'advanced',
    tags: ['ICJ', 'Advisory Opinion', 'Consensual Jurisdiction']
  },
  {
    id: 'intl-06',
    title: 'Use of Force in International Law & UN Article 51 Self-Defense',
    category: 'international_law',
    difficulty: 'advanced',
    tags: ['UN Charter', 'Article 51', 'Self Defense', 'Use of Force']
  },

  // --- 15. HUMAN RIGHTS LAW (5 Topics) ---
  {
    id: 'hr-01',
    title: 'Principle of Non-Refoulement in Refugee Law',
    category: 'human_rights',
    difficulty: 'intermediate',
    tags: ['Refugee Law', 'Non-Refoulement', 'Human Rights']
  },
  {
    id: 'hr-02',
    title: 'Universal Declaration of Human Rights (UDHR) & Binding Covenants',
    category: 'human_rights',
    difficulty: 'beginner',
    tags: ['UDHR', 'ICCPR', 'ICESCR', 'Human Rights']
  },
  {
    id: 'hr-03',
    title: 'Custodial Violence, Torture & D.K. Basu Guidelines',
    category: 'human_rights',
    difficulty: 'intermediate',
    tags: ['Custodial Violence', 'DK Basu', 'Arrest Guidelines']
  },
  {
    id: 'hr-04',
    title: 'Third Generation Human Rights & Right to Healthy Environment',
    category: 'human_rights',
    difficulty: 'intermediate',
    tags: ['Environmental Rights', 'Sustainable Development', 'Human Rights']
  },
  {
    id: 'hr-05',
    title: 'Enforced Disappearances & International Protection Standards',
    category: 'human_rights',
    difficulty: 'advanced',
    tags: ['Human Rights', 'Enforced Disappearance', 'International Norms']
  },

  // --- 16. LEGAL ETHICS & PROFESSIONAL RESPONSIBILITY (5 Topics) ---
  {
    id: 'eth-01',
    title: 'Contempt of Court: Civil vs. Criminal Contempt',
    category: 'ethics',
    difficulty: 'intermediate',
    tags: ['Contempt of Court', 'Scandalizing Court', 'Judicial Authority']
  },
  {
    id: 'eth-02',
    title: 'Advocate’s Duty to Court vs. Duty to Client',
    category: 'ethics',
    difficulty: 'beginner',
    tags: ['Legal Ethics', 'Bar Council Rules', 'Professional Conduct']
  },
  {
    id: 'eth-03',
    title: 'Conflict of Interest & Misconduct in Legal Practice',
    category: 'ethics',
    difficulty: 'intermediate',
    tags: ['Conflict of Interest', 'Professional Misconduct', 'Advocates Act']
  },
  {
    id: 'eth-04',
    title: 'Constitutional Mandate for Free Legal Aid (Article 39A)',
    category: 'ethics',
    difficulty: 'beginner',
    tags: ['Article 39A', 'NALSA', 'Legal Aid', 'Access to Justice']
  },
  {
    id: 'eth-05',
    title: 'Client Confidentiality & Attorney-Client Privilege',
    category: 'ethics',
    difficulty: 'intermediate',
    tags: ['Privileged Communication', 'Section 126 Evidence Act', 'Ethics']
  },

  // --- 17. JUDICIAL INSTITUTIONS & BENCH DYNAMICS (5 Topics) ---
  {
    id: 'inst-01',
    title: 'Supreme Court Collegium System vs. NJAC',
    category: 'institutions',
    difficulty: 'advanced',
    tags: ['Collegium', 'NJAC', 'Judicial Appointments']
  },
  {
    id: 'inst-02',
    title: 'Public Interest Litigation (PIL) & Locus Standi Evolution',
    category: 'institutions',
    difficulty: 'beginner',
    tags: ['PIL', 'Locus Standi', 'PN Bhagwati', 'Judicial Activism']
  },
  {
    id: 'inst-03',
    title: 'Judicial Recusal & Standards of Impartiality',
    category: 'institutions',
    difficulty: 'intermediate',
    tags: ['Judicial Recusal', 'Recusal', 'Nemo Judex', 'Bench Impartiality']
  },
  {
    id: 'inst-04',
    title: 'Master of Roster Power & Roster Allocation Controversy',
    category: 'institutions',
    difficulty: 'advanced',
    tags: ['Master of Roster', 'CJI Power', 'Bench Allocation']
  },
  {
    id: 'inst-05',
    title: 'Special Leave Petitions (SLP under Article 136)',
    category: 'institutions',
    difficulty: 'intermediate',
    tags: ['Article 136', 'SLP', 'Supreme Court Discretionary Power']
  }
];
