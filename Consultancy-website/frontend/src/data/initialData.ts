import { Job, Blog, NewsItem, Testimonial, CountryInfo } from '../types';

export const INITIAL_COUNTRIES: CountryInfo[] = [
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Europe\'s strongest economy offering Opportunity Cards (Chancenkarte), Job Seeker Visas, EU Blue Cards, and tuition-free public universities.',
    benefits: [
      'Tuition-free public universities for international students',
      'EU Blue Card route to Permanent Residency in 21–27 months',
      'High demand for IT, Engineering, Healthcare, and Finance professionals',
      'Strong work-life balance and high social security'
    ],
    visaTypes: [
      { title: 'EU Blue Card', description: 'Fast-track work visa for qualified specialists with a recognized job offer.', duration: 'Up to 4 years (PR eligible in 21 months with B1 German)' },
      { title: 'Opportunity Card (Chancenkarte)', description: 'Points-based visa allowing job seekers to stay and work part-time while searching.', duration: '1 Year' },
      { title: 'Student Visa', description: 'Visa for university studies with 18-month post-study work permit.', duration: 'Course Duration + 18 months Post-Study' }
    ],
    eligibility: [
      'Recognized Bachelor degree or vocational training certificate',
      'Proof of financial resources (Blocked Account ~€11,208/year for students)',
      'Basic to intermediate German (A2-B2) or Fluent English (for English-taught jobs/degrees)',
      'Clean criminal record and valid passport'
    ],
    documents: [
      'Valid Passport & Academic Transcripts',
      'Anabin Degree Equivalency Evaluation',
      'Proof of Health Insurance (Krankenkasse)',
      'Motivation Letter & Updated CV (Europass format)',
      'Proof of Language Proficiency (IELTS / TOEFL / Goethe-Zertifikat)'
    ],
    livingCost: '€850 – €1,200 / month (depending on city)',
    topJobs: ['Software Engineer', 'Data Scientist', 'Mechanical Engineer', 'Nurse/Healthcare Specialist', 'Electrical Engineer'],
    topUniversities: ['Technical University of Munich (TUM)', 'LMU Munich', 'RWTH Aachen University', 'TU Berlin'],
    processingTime: '4 to 12 weeks',
    faqs: [
      { q: 'Can I study in Germany without speaking German?', a: 'Yes! Many Master programs and tech roles are completely taught and conducted in English.' },
      { q: 'What is the Chancenkarte (Opportunity Card)?', a: 'It is a points-based job-search visa launched in 2024 based on qualifications, language skills, age, and German connections.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    description: 'Asia\'s premier financial and technological hub offering Employment Passes (EP), S Passes, world-class living standards, and low tax rates.',
    benefits: [
      'Global corporate hub with competitive tax rates',
      'High safety, clean environment, and strategic location in Asia',
      'Multicultural workplace with English as primary business language',
      'Fast career progression in Fintech, AI, Logistics, and Banking'
    ],
    visaTypes: [
      { title: 'Employment Pass (EP)', description: 'For foreign professionals, managers, and executives earning at least SGD $5,000/month.', duration: '2 Years (Renewable)' },
      { title: 'S Pass', description: 'For mid-level skilled technicians earning at least SGD $3,150/month.', duration: '2 Years (Renewable)' },
      { title: 'Student Pass', description: 'For full-time international students enrolled in approved institutions.', duration: 'Course Duration' }
    ],
    eligibility: [
      'Recognized degree or technical diploma',
      'Relevant work experience matching specialized skill tier',
      'COMPASS points criteria evaluation for Employment Pass applicants'
    ],
    documents: [
      'Valid Passport',
      'Educational Diplomas verified via DataFlow or trusted verification agency',
      'Detailed resume and detailed job offer contract',
      'Passport photo matching ICA guidelines'
    ],
    livingCost: 'SGD $2,200 – $3,800 / month',
    topJobs: ['Fintech Specialist', 'Cloud Systems Engineer', 'Financial Analyst', 'Supply Chain Manager', 'Cybersecurity Lead'],
    topUniversities: ['National University of Singapore (NUS)', 'Nanyang Technological University (NTU)', 'Singapore Management University (SMU)'],
    processingTime: '3 to 8 weeks',
    faqs: [
      { q: 'What is the COMPASS framework in Singapore?', a: 'It is a points-based evaluation system for EP candidates evaluating salary, qualifications, diversity, and support for local employment.' }
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    description: 'High quality of life, excellent wages, and skilled migration pathways through Subclass 189, 190, 482, and 500 Student Visas.',
    benefits: [
      'Subclass 189/190 Direct Permanent Residency points pathways',
      'Post-study work rights up to 4–6 years for university graduates',
      'High minimum wages and Medicare healthcare coverage for residents',
      'Unmatched lifestyle, climate, and vibrant immigrant community'
    ],
    visaTypes: [
      { title: 'Skilled Independent (Subclass 189)', description: 'Points-tested permanent visa for invited workers.', duration: 'Permanent' },
      { title: 'Temporary Skill Shortage (Subclass 482)', description: 'Employer-sponsored work visa for critical skill shortages.', duration: 'Up to 4 Years' },
      { title: 'Student Visa (Subclass 500)', description: 'Allows study with part-time work privileges (48 hours/fortnight).', duration: 'Course Duration + Post Study Work' }
    ],
    eligibility: [
      'Skill Assessment from relevant assessing body (ACS, EA, VETASSESS, TRA)',
      'Minimum 65 points on Australia Points Grid (6.0+ IELTS score)',
      'Age under 45 for General Skilled Migration',
      'Health and Character checks (PCC)'
    ],
    documents: [
      'Skill Assessment Outcome Letter',
      'IELTS / PTE Academic score report',
      'Work Experience reference letters with salary slips',
      'Police Clearance Certificate & Medical Exam'
    ],
    livingCost: 'AUD $1,800 – $2,800 / month',
    topJobs: ['Civil Engineer', 'Registered Nurse', 'Software Developer', 'Aged Care Specialist', 'Mining Operations Manager'],
    topUniversities: ['University of Melbourne', 'University of Sydney', 'Australian National University (ANU)', 'UNSW Sydney'],
    processingTime: '2 to 6 months',
    faqs: [
      { q: 'How many points are needed for Skilled Migration?', a: 'Minimum requirement is 65 points, but competitive invitations often range between 75 to 90 points depending on occupation.' }
    ]
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier destination featuring Skilled Worker Visas, Graduate Route (2-year post study), and global career exposure in London and regional business hubs.',
    benefits: [
      '5-year route to Indefinite Leave to Remain (ILR / PR)',
      '2 to 3 years Graduate Route work permit after studies',
      'World-leading universities and global financial capital',
      'NHS National Health Service access'
    ],
    visaTypes: [
      { title: 'Skilled Worker Visa', description: 'For eligible jobs with an approved UK sponsor employer.', duration: 'Up to 5 Years (ILR eligible)' },
      { title: 'Graduate Visa', description: 'Unsponsored work visa for UK degree graduates.', duration: '2 Years (3 Years for PhD)' },
      { title: 'Student Visa (Tier 4)', description: 'Study at accredited UK universities.', duration: 'Course Duration' }
    ],
    eligibility: [
      'Job offer from UK Home Office licensed sponsor employer',
      'Certificate of Sponsorship (CoS)',
      'English proficiency at B1 level (IELTS UKVI)',
      'Salary meeting mandatory threshold requirements'
    ],
    documents: [
      'Valid Passport & CoS Reference Number',
      'TB Test Certificate (if applicable)',
      'Proof of English Language (IELTS UKVI)',
      'Proof of maintenance funds'
    ],
    livingCost: '£1,000 – £1,800 / month',
    topJobs: ['NHS Medical Specialist', 'DevOps Specialist', 'Financial Accountant', 'Cybersecurity Manager', 'Project Manager'],
    topUniversities: ['University of Oxford', 'University of Cambridge', 'Imperial College London', 'UCL', 'University of Edinburgh'],
    processingTime: '3 to 6 weeks',
    faqs: [
      { q: 'Do I need a sponsor for the Graduate Visa?', a: 'No! The UK Graduate Route is unsponsored and allows you to work at any skill level.' }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    coverImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Immigrant-friendly nation offering Express Entry (FSWP, CEC), Provincial Nominee Programs (PNP), and Post-Graduation Work Permits (PGWP).',
    benefits: [
      'Direct Permanent Residency via Express Entry CRS grid',
      'Provincial Nominee Programs (PNP) for specific in-demand trades & IT',
      '3-Year PGWP for international graduates',
      'Free healthcare and public education for children of residents'
    ],
    visaTypes: [
      { title: 'Express Entry (Federal Skilled Worker)', description: 'Points-based PR pathway for skilled workers worldwide.', duration: 'Permanent Residency' },
      { title: 'Provincial Nominee Program (PNP)', description: 'Province-driven nomination adding 600 CRS points.', duration: 'Permanent Residency' },
      { title: 'Study Permit & PGWP', description: 'Study in designated learning institutions (DLI) followed by PGWP.', duration: 'Study + 3 Year Work Permit' }
    ],
    eligibility: [
      'Educational Credential Assessment (ECA by WES/ICAS)',
      'IELTS General (CLB 7+ for Express Entry)',
      'At least 1 year continuous skilled work experience (NOC/TEER 0,1,2,3)',
      'Proof of funds for settlement'
    ],
    documents: [
      'WES Credential Assessment Report',
      'IELTS General or CELPIP score report',
      'Detailed employment reference letters on company letterhead',
      'Police clearance and IME Medical Report'
    ],
    livingCost: 'CAD $1,600 – $2,600 / month',
    topJobs: ['Cloud Architect', 'Full Stack Developer', 'Registered Nurse', 'Supply Chain Analyst', 'Construction Manager'],
    topUniversities: ['University of Toronto', 'UBC', 'McGill University', 'University of Waterloo', 'University of Alberta'],
    processingTime: '3 to 6 months',
    faqs: [
      { q: 'What is an ECA report?', a: 'ECA (Educational Credential Assessment) evaluates your foreign degree against Canadian education standards.' }
    ]
  },
  {
    id: 'united-states',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    coverImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80',
    description: 'World\'s largest technology and corporate ecosystem offering H-1B, L-1, O-1, EB-1/EB-2 NIW Green Cards, and F-1 OPT / STEM OPT extensions.',
    benefits: [
      'Highest compensation packages and stock grants globally',
      'STEM OPT extension providing 3 years of work eligibility for graduates',
      'Global innovation clusters (Silicon Valley, NYC, Boston, Austin)',
      'Unmatched research facilities and venture capital ecosystem'
    ],
    visaTypes: [
      { title: 'H-1B Specialty Occupation Visa', description: 'Employer-sponsored work visa for high-skilled professionals.', duration: '3 + 3 Years (6 Years total)' },
      { title: 'F-1 Student Visa & OPT / STEM OPT', description: 'Academic study with 12-month OPT + 24-month STEM extension.', duration: 'Course + 3 Years STEM OPT' },
      { title: 'EB-2 NIW / EB-1 Green Card', description: 'Permanent residency for advanced degree holders & extraordinary abilities.', duration: 'Permanent Residency' }
    ],
    eligibility: [
      'U.S. Bachelor / Master or foreign equivalent degree',
      'Job offer in specialty occupation matching field of study',
      'F-1 enrollment at SEVP-certified institution for student visa'
    ],
    documents: [
      'I-20 Form (for Students) or Approved I-797 Petition (for H-1B)',
      'DS-160 Confirmation Page & Interview Appointment Slip',
      'SEVIS Fee Payment Receipt',
      'Degree evaluation certificate and official transcripts'
    ],
    livingCost: 'USD $1,800 – $3,500 / month',
    topJobs: ['Senior Software Architect', 'AI/ML Specialist', 'Biomedical Engineer', 'Investment Banker', 'Product Director'],
    topUniversities: ['MIT', 'Stanford University', 'Harvard University', 'UC Berkeley', 'Columbia University'],
    processingTime: '2 to 8 months',
    faqs: [
      { q: 'How long can STEM graduates work on OPT?', a: 'STEM graduates get 12 months initial OPT plus a 24-month STEM extension, totaling 36 months.' }
    ]
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (React/Node.js)',
    company: 'TechNovation Solutions GmbH',
    country: 'Germany',
    category: 'Information Technology',
    salary: '$75,000 - $92,000 / year',
    employmentType: 'Full-Time',
    experience: '3 - 6 Years',
    education: 'B.Tech / MCA / B.Sc Computer Science',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker'],
    visaSponsorship: true,
    description: 'Join a premier fintech software company in Berlin with full EU Blue Card sponsorship and relocation allowance.',
    requirements: [
      '3+ years of professional full-stack Web development experience',
      'Strong proficiency with modern React and TypeScript',
      'Experience building RESTful APIs in Node.js / Express',
      'English fluency (German language is a bonus but not mandatory)'
    ],
    postedDate: '2026-08-01'
  },
  {
    id: 'job-2',
    title: 'Cloud DevOps & Systems Specialist',
    company: 'AeroGlobal Systems',
    country: 'Singapore',
    category: 'Cloud & Infrastructure',
    salary: 'SGD $7,500 - $9,200 / month',
    employmentType: 'Full-Time',
    experience: '4 - 8 Years',
    education: 'Bachelor Degree in CS / IT / Electrical Eng',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'Linux'],
    visaSponsorship: true,
    description: 'Key engineering role in Singapore managing cloud infrastructure and automated pipelines. Employment Pass sponsorship provided.',
    requirements: [
      'Hands-on experience with AWS cloud deployments & EKS',
      'Proficiency with Infrastructure as Code (Terraform)',
      'Experience setting up multi-region failover and monitoring'
    ],
    postedDate: '2026-08-03'
  },
  {
    id: 'job-3',
    title: 'Registered General Nurse (NHS Acute Care)',
    company: 'Metropolitan NHS Health Trust',
    country: 'United Kingdom',
    category: 'Healthcare & Nursing',
    salary: '£34,000 - £42,000 / year',
    employmentType: 'Full-Time',
    experience: '1 - 5 Years',
    education: 'B.Sc Nursing / Diploma in Nursing',
    skills: ['Acute Patient Care', 'IELTS 7.0 / OET Grade B', 'NMC Registration'],
    visaSponsorship: true,
    description: 'Direct NHS sponsorship with Certificate of Sponsorship (CoS), flight allowance, and initial accommodation support in Manchester.',
    requirements: [
      'Passed OET (Grade B) or IELTS UKVI Academic (Overall 7.0)',
      'CBT exam passed or scheduled',
      'Minimum 12 months acute hospital ward experience'
    ],
    postedDate: '2026-08-05'
  },
  {
    id: 'job-4',
    title: 'Civil & Structural Design Engineer',
    company: 'Apex Infrastructure Group',
    country: 'Australia',
    category: 'Engineering',
    salary: 'AUD $95,000 - $115,000 / year',
    employmentType: 'Full-Time',
    experience: '3 - 7 Years',
    education: 'B.E / B.Tech Civil Engineering',
    skills: ['AutoCAD', 'STAAD Pro', 'Structural Analysis', 'Engineers Australia Assessment'],
    visaSponsorship: true,
    description: 'Participate in major transport and residential bridge projects in Melbourne. Subclass 482 / 186 employer nomination available.',
    requirements: [
      'Degree evaluated by Engineers Australia (CDR pathway eligible)',
      'Proficiency in structural modeling software',
      'A minimum of 3 years active site/design engineering experience'
    ],
    postedDate: '2026-08-08'
  },
  {
    id: 'job-5',
    title: 'Data Analyst & BI Specialist',
    company: 'Maple Leaf Analytics Inc',
    country: 'Canada',
    category: 'Data & Analytics',
    salary: 'CAD $78,000 - $92,000 / year',
    employmentType: 'Full-Time',
    experience: '2 - 5 Years',
    education: 'Bachelor in Statistics / CS / Business Analytics',
    skills: ['SQL', 'Python', 'PowerBI', 'Tableau', 'Data Warehousing'],
    visaSponsorship: true,
    description: 'Data analytics role supporting retail and logistics enterprises in Toronto. LMIA / PNP work permit pathway.',
    requirements: [
      'Strong mastery of SQL queries, data modeling, and PowerBI dashboards',
      'Experience with Python pandas/numpy data cleaning',
      'Good written and spoken English communication'
    ],
    postedDate: '2026-08-09'
  },
  {
    id: 'job-6',
    title: 'AI/ML Solutions Architect',
    company: 'Cognitive Dynamics Corp',
    country: 'United States',
    category: 'Artificial Intelligence',
    salary: '$120,000 - $145,000 / year',
    employmentType: 'Full-Time',
    experience: '4 - 8 Years',
    education: 'Master or PhD in AI / CS / Data Science',
    skills: ['PyTorch', 'Large Language Models', 'FastAPI', 'MLOps', 'Vector DBs'],
    visaSponsorship: true,
    description: 'Pioneering AI team building enterprise LLM workflows in Austin, Texas. H-1B transfer or O-1 / EB-2 NIW guidance provided.',
    requirements: [
      'Master/PhD degree with published research or production ML deployment history',
      'Deep knowledge of transformer models, embeddings, and fine-tuning',
      'Hands-on experience with Python ML ecosystem'
    ],
    postedDate: '2026-08-10'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'Germany Chancenkarte (Opportunity Card) 2026: Complete Guide for Job Seekers',
    slug: 'germany-chancenkarte-opportunity-card-guide',
    excerpt: 'Everything you need to know about points calculation, required documents, blocked accounts, and job search strategies in Germany.',
    content: `Germany introduced the Chancenkarte (Opportunity Card) to make it easier for qualified non-EU professionals to enter Germany and search for employment on site for up to 1 year.

### How the Points System Works
To qualify, candidates must score at least **6 points** based on criteria including:
1. **Qualifications**: Recognition of degree or vocational certificate (up to 4 points).
2. **Work Experience**: 2 to 5 years relevant experience (up to 3 points).
3. **Language Ability**: German skills (A1 to C1) or fluent English (B2/C1) (up to 3 points).
4. **Age**: Candidates under 35 score 2 points; aged 35–40 score 1 point.
5. **Connection to Germany**: Previous study or residency in Germany (1 point).

### Benefits of the Opportunity Card
- Search for a job locally while attending face-to-face interviews.
- Permitted to work up to 20 hours per week in trial employment or part-time jobs.
- Direct conversion into an EU Blue Card or Work Permit once a job contract is signed.

Contact PAR CAREERS AND VISA CONSULTANCY SERVICES (+91 8106023616) to evaluate your Chancenkarte eligibility today!`,
    category: 'Work Visa',
    author: 'PAR Careers Editorial Team',
    date: '2026-08-02',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1527866512907-a35a62a7f6be?auto=format&fit=crop&w=800&q=80',
    tags: ['Germany', 'Opportunity Card', 'Work Visa', 'EU Blue Card'],
    isFeatured: true
  },
  {
    id: 'blog-2',
    title: 'UK Skilled Worker Visa Threshold Changes: What Overseas Professionals Must Know',
    slug: 'uk-skilled-worker-visa-threshold-updates',
    excerpt: 'Detailed breakdown of minimum salary requirements, Certificate of Sponsorship (CoS) allocations, and healthcare exempt roles.',
    content: `The UK Home Office frequently updates salary thresholds and occupation codes for the Skilled Worker Visa route.

### Key Points for Applicants:
- **General Salary Threshold**: Standard roles require meeting updated going rates or general threshold limits.
- **Shortage Occupations & Health & Care**: Healthcare and education roles retain specific discounted thresholds under NHS frameworks.
- **Sponsorship Process**: Employer must issue a valid Certificate of Sponsorship (CoS) before visa application submission.

At PAR CAREERS AND VISA CONSULTANCY SERVICES, our immigration team guides you through verified employer matching and seamless visa processing.`,
    category: 'Immigration Policy',
    author: 'Aravind Jinna',
    date: '2026-08-06',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    tags: ['UK', 'Skilled Worker', 'Immigration', 'Sponsorship'],
    isFeatured: false
  },
  {
    id: 'blog-3',
    title: 'Top 5 Higher Education Destinations in 2026 with 100% Post-Study Work Rights',
    slug: 'top-5-study-abroad-destinations-post-study-work-rights',
    excerpt: 'Compare Australia, Canada, UK, Germany, and USA on tuition costs, PR pathways, and post-graduation stay-back periods.',
    content: `Choosing the right country for higher education requires balancing academic quality with post-graduation career opportunities.

Here is a quick comparison:
1. **Germany**: Virtually zero tuition fees at public universities + 18-month stay-back permit.
2. **Australia**: Extended post-study work rights (Subclass 485) ranging from 2 to 6 years.
3. **Canada**: 3-Year PGWP for eligible university and college graduates.
4. **United Kingdom**: 2-Year unsponsored Graduate Visa for Bachelor/Master degree holders.
5. **United States**: 36-Month STEM OPT period for Science, Tech, Engineering & Math degrees.`,
    category: 'Student Visa',
    author: 'PAR Careers Editorial Team',
    date: '2026-08-08',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    tags: ['Study Abroad', 'Student Visa', 'Scholarships', 'PR Pathways'],
    isFeatured: true
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Germany Launches Express Visa Processing Hubs for Skilled Tech Talent',
    excerpt: 'German consulates announce streamlined processing windows of 3-4 weeks for software, AI, and healthcare professionals.',
    content: 'Germany has accelerated visa processing timelines for candidates possessing pre-approved job contracts and Blue Card eligibility.',
    date: '2026-08-10',
    category: 'Immigration Update',
    source: 'PAR Careers Global Desk'
  },
  {
    id: 'news-2',
    title: 'Australia Invites 15,000 Offshore Candidates in Latest Migration Draw',
    excerpt: 'Subclass 189 & 190 draws prioritize health, education, engineering, and IT sectors with competitive points cut-offs.',
    content: 'Department of Home Affairs Australia released substantial invitations across offshore candidate categories with fast-tracked grants.',
    date: '2026-08-07',
    category: 'Migration Draw',
    source: 'Australian Migration Press'
  },
  {
    id: 'news-3',
    title: 'PAR CAREERS Opens Free Dedicated Guidance Counter for Overseas Students & Job Seekers',
    excerpt: 'Schedule personalized 1-on-1 profile assessment sessions with experienced visa counselors at +91 8106023616.',
    content: 'PAR CAREERS AND VISA CONSULTANCY SERVICES reaffirms its commitment to transparent, ethical overseas guidance by launching free assessment sessions.',
    date: '2026-08-01',
    category: 'Company Update',
    source: 'PAR Careers Announcement'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rajesh Kumar Reddy',
    country: 'Germany',
    service: 'Work Visa & Relocation',
    visaType: 'EU Blue Card',
    rating: 5,
    text: 'PAR CAREERS made my dream of working in Berlin a reality! From degree recognition (Anabin) to mock visa interviews, Mr. Aravind Jinna\'s team guided me transparently with zero hidden costs.',
    year: '2026',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Sravanthi Sharma',
    country: 'United Kingdom',
    service: 'Student Visa & Admission',
    visaType: 'UK Student Visa (Tier 4)',
    rating: 5,
    text: 'I got admitted to University of Birmingham with a £4,000 scholarship. The visa application was approved in just 11 days! Highly recommend PAR CAREERS for ethical counseling.',
    year: '2026',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Venkatesh Rao',
    country: 'Australia',
    service: 'Skilled Migration',
    visaType: 'Subclass 190 Permanent Residency',
    rating: 5,
    text: 'Clear guidelines on ACS Skill Assessment and PTE preparation. Received my PR grant smoothly. PAR CAREERS is the most honest consultancy service.',
    year: '2025',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    verified: true
  }
];
