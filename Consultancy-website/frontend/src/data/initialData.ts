import { Job, Blog, NewsItem, Testimonial, CountryInfo } from '../types';

export const INITIAL_COUNTRIES: CountryInfo[] = [
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    coverImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier global hub featuring top education pathways, Skilled Worker Visas, and Graduate Route work permits for healthcare, hospitality, and tech specialists.',
    studyOptions: ['Hotel Management', 'IT (Information Technology)', 'B.Sc Nursing'],
    jobRoles: ['Hotel Management', 'IT', 'B.Sc Nursing'],
    benefits: [
      '5-year route to Indefinite Leave to Remain (ILR / PR)',
      '2 to 3 years Graduate Route unsponsored post-study work permit',
      'High demand for NHS Healthcare, B.Sc Nurses, and Hospitality Leads',
      'Globally recognized British university degrees and NHS healthcare coverage'
    ],
    visaTypes: [
      { title: 'Skilled Worker Visa', description: 'For eligible jobs with an approved UK sponsor employer.', duration: 'Up to 5 Years (ILR eligible)' },
      { title: 'Graduate Visa', description: 'Unsponsored work visa for UK degree graduates.', duration: '2 Years (3 Years for PhD)' },
      { title: 'Student Visa (Tier 4)', description: 'Study B.Sc Nursing, IT, or Hotel Management at accredited UK universities.', duration: 'Course Duration' }
    ],
    eligibility: [
      'Recognized degree or diploma matching target field',
      'English proficiency (IELTS UKVI / PTE Academic / OET for Nursing)',
      'Job offer with Certificate of Sponsorship (CoS) for work visas',
      'Proof of maintenance funds'
    ],
    documents: [
      'Valid Passport & Academic Transcripts',
      'Certificate of Sponsorship (CoS) or University CAS',
      'Proof of English Language (IELTS UKVI / OET)',
      'TB Test Certificate & Financial Statements'
    ],
    livingCost: '£1,000 – £1,800 / month',
    topJobs: ['Hotel Management', 'IT Specialist / DevOps', 'B.Sc Nursing / NHS Acute Care'],
    topUniversities: ['University of Oxford', 'Imperial College London', 'University of Manchester', 'University of Surrey (Hospitality)'],
    processingTime: '3 to 6 weeks',
    faqs: [
      { q: 'What are the top study and job options in the UK?', a: 'Hotel Management, Information Technology (IT), and B.Sc Nursing are the highest in-demand fields in the UK.' },
      { q: 'Do international students get post-study work rights in the UK?', a: 'Yes! The UK Graduate Route offers 2 full years of unsponsored work eligibility.' }
    ]
  },
  {
    id: 'russia',
    name: 'Russia',
    code: 'RU',
    flag: '🇷🇺',
    coverImage: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1200&q=80',
    description: 'Prominent educational and vocational destination offering globally accredited programs in Nursing, Medicine, and Hospitality & Hotel Management with affordable tuition fees.',
    studyOptions: ['Nursing', 'Hotel Management'],
    jobRoles: ['Nursing', 'Hotel Management'],
    benefits: [
      'WHO / NMC recognized Medical & Nursing universities',
      'Affordable tuition fees and low cost of living',
      'Direct hands-on clinical and international hospitality training',
      'English-medium instruction options for international students'
    ],
    visaTypes: [
      { title: 'Student Visa', description: 'For full-time international students enrolled in state-recognized universities.', duration: 'Course Duration (Renewable annually)' },
      { title: 'Work Permit & Specialist Visa', description: 'For qualified professionals in healthcare and hospitality sectors.', duration: '1 to 3 Years' },
      { title: 'Post-Graduation Internship Visa', description: 'Practical clinical training and hotel management residency.', duration: '1 Year' }
    ],
    eligibility: [
      '10+2 / High School completion with Physics, Chemistry, Biology for Nursing',
      'Relevant diploma or degree for Hotel Management applicants',
      'Valid international passport with minimum 18 months validity',
      'Medical fitness and HIV test certificate'
    ],
    documents: [
      'Official Invitation Letter from Ministry of Education / University',
      'Apostilled Academic Certificates and Transcripts',
      'HIV Clearance and Medical Examination Certificate',
      'Valid Passport and Passport Photos'
    ],
    livingCost: '$300 – $600 / month',
    topJobs: ['Nursing / Clinical Specialist', 'Hotel & Resort Management', 'Hospitality Operations Lead'],
    topUniversities: ['Sechenov University', 'Pirogov Russian National Research Medical University', 'Saint Petersburg State University', 'People’s Friendship University (RUDN)'],
    processingTime: '4 to 8 weeks',
    faqs: [
      { q: 'Are Nursing and Medical degrees in Russia recognized globally?', a: 'Yes! Degrees from Russian state universities are recognized by WHO, NMC, and European medical boards.' },
      { q: 'What is the medium of instruction for international students?', a: 'Key programs in Nursing and Hotel Management are offered in English with basic Russian language support.' }
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Europe\'s powerhouse offering world-class pathways in Medicine & Doctors, Nursing, and Aeronautical Engineering with Opportunity Cards and EU Blue Cards.',
    studyOptions: ['Doctors (Medicine / MBBS / Approbation)', 'Nursing', 'Aeronautical Engineering'],
    jobRoles: ['Doctors', 'Nursing', 'Aeronautical Engineering'],
    benefits: [
      'Tuition-free public universities and subsidized medical residencies',
      'Fast-track EU Blue Card & Approbation medical licensing for Doctors',
      'Huge shortage and high compensation for Nurses and Aeronautical Engineers',
      'PR eligibility within 21–27 months on EU Blue Card'
    ],
    visaTypes: [
      { title: 'EU Blue Card', description: 'Fast-track visa for Doctors, Engineers, and qualified specialists with job offers.', duration: 'Up to 4 Years (PR in 21 months)' },
      { title: 'Opportunity Card (Chancenkarte)', description: 'Points-based job seeker visa to search for jobs on-site.', duration: '1 Year' },
      { title: 'Student & Medical Residency Visa', description: 'University study with 18-month stay-back work permit.', duration: 'Course Duration + 18 months Post-Study' }
    ],
    eligibility: [
      'Medical degree (MBBS) / Nursing Diploma / B.Tech Aeronautical Engineering',
      'German Language Proficiency (B2 for Nursing, C1 Fachsprachenprüfung for Doctors)',
      'Defizitbescheid (recognition of professional qualification in Germany)',
      'Clean criminal record and valid passport'
    ],
    documents: [
      'Valid Passport & Academic Transcripts',
      'Defizitbescheid / Degree Recognition Assessment',
      'German Language Certificates (Goethe / Telc B2-C1)',
      'Proof of Financial Resources (Blocked Account ~€11,208 for students)'
    ],
    livingCost: '€850 – €1,200 / month',
    topJobs: ['Doctors / Medical Specialists', 'Registered Nursing Staff', 'Aeronautical & Aerospace Engineers'],
    topUniversities: ['Technical University of Munich (TUM)', 'Heidelberg University (Medicine)', 'RWTH Aachen University (Aeronautical)', 'Charité – Universitätsmedizin Berlin'],
    processingTime: '4 to 12 weeks',
    faqs: [
      { q: 'Can Indian doctors practice in Germany?', a: 'Yes! Doctors undergo the Approbation licensing process and medical German exam (FSP) with full salary during preparatory residencies.' },
      { q: 'What are the top opportunities in Germany?', a: 'Doctors, Nursing professionals, and Aeronautical Engineers are on Germany\'s highest priority shortage occupation list.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    coverImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
    description: 'Asia\'s premier global financial & technological hub with robust career pathways in B.Sc Nursing, ANM/GNM, IT, Hotel Management, and Mechanical Engineering.',
    studyOptions: ['B.Sc Nursing', 'ANM / GNM', 'IT (Information Technology)', 'Hotel Management', 'Mechanical Engineering'],
    jobRoles: ['B.Sc Nursing', 'ANM / GNM', 'IT', 'Hotel Management', 'Mechanical Engineering'],
    benefits: [
      'Premier corporate and healthcare hub with attractive tax rates',
      'Extensive recruitment for B.Sc Nurses, ANM/GNM, and Mechanical Engineers',
      'English as the primary working language with high safety standards',
      'Direct S Pass and Employment Pass sponsorship from licensed employers'
    ],
    visaTypes: [
      { title: 'Employment Pass (EP)', description: 'For foreign professionals, managers, and executives.', duration: '2 Years (Renewable)' },
      { title: 'S Pass', description: 'For mid-level skilled healthcare workers, hotel leads, and technicians.', duration: '2 Years (Renewable)' },
      { title: 'Student Pass / Training Work Permit', description: 'For study and practical paid internships in hospitality & healthcare.', duration: 'Course / Internship Duration' }
    ],
    eligibility: [
      'Nursing Diploma (ANM/GNM) or B.Sc Nursing / Engineering Degree / Hospitality Diploma',
      'SNB (Singapore Nursing Board) eligibility for nursing applicants',
      'Minimum qualifying salary criteria (COMPASS points for EP)',
      'Verified academic diplomas via DataFlow'
    ],
    documents: [
      'Valid Passport & Verified Education Certificates',
      'SNB License (for Nurses) or Professional Portfolio',
      'Formal Job Offer and Employment Contract from Singapore sponsor',
      'ICA standard passport photos'
    ],
    livingCost: 'SGD $2,000 – $3,500 / month',
    topJobs: ['B.Sc Nursing / Staff Nurse', 'ANM / GNM Care Specialist', 'IT Software Engineer', 'Hotel Management Lead', 'Mechanical Engineer'],
    topUniversities: ['National University of Singapore (NUS)', 'Nanyang Technological University (NTU)', 'Singapore Institute of Technology (SIT)', 'PSB Academy'],
    processingTime: '3 to 8 weeks',
    faqs: [
      { q: 'Can ANM/GNM nurses work in Singapore?', a: 'Yes! Singapore recruits ANM, GNM, and B.Sc Nursing graduates into accredited healthcare networks with S Pass sponsorship.' },
      { q: 'What study options are popular in Singapore?', a: 'B.Sc Nursing, ANM/GNM, IT, Hotel Management, and Mechanical Engineering are the top choices.' }
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    coverImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1200&q=80',
    description: 'High standard of living, excellent wages, and direct skilled migration pathways for IT and Hotel Management professionals and university students.',
    studyOptions: ['IT (Information Technology)', 'Hotel Management'],
    jobRoles: ['IT', 'Hotel Management'],
    benefits: [
      'Direct Permanent Residency pathways via Subclass 189/190 points system',
      'Post-study work rights up to 4–6 years for university graduates',
      'Strong hospitality and IT sector wages with Medicare coverage',
      'Subclass 500 Student Visa with authorized part-time work rights'
    ],
    visaTypes: [
      { title: 'Skilled Independent (Subclass 189/190)', description: 'Points-tested permanent residency visa for skilled professionals.', duration: 'Permanent' },
      { title: 'Temporary Skill Shortage (Subclass 482)', description: 'Employer-sponsored work visa in IT and Hospitality.', duration: 'Up to 4 Years' },
      { title: 'Student Visa (Subclass 500)', description: 'Study IT or Hotel Management with part-time work privileges.', duration: 'Course Duration + Post-Study Work' }
    ],
    eligibility: [
      'Skill Assessment from ACS (for IT) or VETASSESS / TRA (for Hotel Management)',
      'Minimum 65 points on Australia Points Grid (IELTS 6.0+ / PTE Academic 50+)',
      'Age under 45 for General Skilled Migration',
      'Health check and Police Clearance Certificate (PCC)'
    ],
    documents: [
      'Skill Assessment Outcome Letter (ACS / VETASSESS)',
      'IELTS / PTE Academic Score Report',
      'Work Experience reference letters with payslips and tax records',
      'PCC and Medical Examination Results'
    ],
    livingCost: 'AUD $1,800 – $2,800 / month',
    topJobs: ['IT Software Developer / Systems Analyst', 'Hotel & Resort General Manager', 'Cloud / Cybersecurity Specialist'],
    topUniversities: ['University of Melbourne', 'University of Sydney', 'UNSW Sydney', 'Blue Mountains International Hotel Management School'],
    processingTime: '2 to 6 months',
    faqs: [
      { q: 'Are IT and Hotel Management on Australia\'s skilled occupation list?', a: 'Yes! Both IT occupations (ANZSCO 2613) and Hotel/Hospitality Managers (ANZSCO 1413) are on active migration lists.' },
      { q: 'Can I study Hotel Management in Australia and get a work visa?', a: 'Yes! Graduating from Australian hospitality and IT programs qualifies you for 485 Post-Study work visas.' }
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai (UAE)',
    code: 'AE',
    flag: '🇦🇪',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'Dynamic global commercial hub offering 100% tax-free salaries, rapid employer-sponsored visas, and extensive career opportunities for Nurses, Crane Machine Operators, and Electricians.',
    studyOptions: ['Nursing', 'Electrical Engineering / Technical Trades', 'Heavy Equipment & Crane Operation'],
    jobRoles: ['Nursing', 'Crane Machine Operator', 'Electrician'],
    benefits: [
      '100% Tax-Free Income with zero personal income tax deductions',
      'Fast visa processing within 2 to 4 weeks with direct employer sponsorship',
      'High hiring demand for Certified Electricians, Crane Operators, and Registered Nurses',
      'World-class living standard, modern infrastructure, and multinational work environment'
    ],
    visaTypes: [
      { title: 'Employment Visa (Green Visa)', description: 'Employer-sponsored work permit for certified technicians, tradesmen, and healthcare staff.', duration: '2 to 3 Years (Renewable)' },
      { title: 'Freelance & Skilled Specialist Visa', description: 'Self-sponsored residency for qualified technical and medical professionals.', duration: '2 to 5 Years' },
      { title: 'Student & Vocational Training Visa', description: 'Study at accredited UAE university campuses and technical training centers.', duration: 'Course Duration' }
    ],
    eligibility: [
      'Relevant trade certificate / ITI / Diploma for Electricians & Crane Operators',
      'B.Sc Nursing / GNM with DHA / MOH / HAAD exam eligibility for nurses',
      'Medical fitness certificate (blood test & chest X-ray in UAE)',
      'Valid passport with minimum 6 months validity'
    ],
    documents: [
      'Attested educational diplomas and trade skill certificates',
      'Valid Passport & recent color passport photos',
      'DHA / MOH Nursing Evaluation Letter (for healthcare applicants)',
      'Medical fitness clearance and police conduct certificate'
    ],
    livingCost: 'AED 3,000 – 5,500 / month',
    topJobs: ['Registered Nurse / DHA Nurse', 'Heavy Crane Machine Operator', 'Master Electrician / MEP Technician', 'Hospitality Operations Lead'],
    topUniversities: ['University of Dubai', 'Middlesex University Dubai', 'Heriot-Watt University Dubai', 'Al Jalila Children’s Speciality Nursing Academy'],
    processingTime: '2 to 4 weeks',
    faqs: [
      { q: 'Is income really 100% tax-free in Dubai?', a: 'Yes! Employees and technical specialists in Dubai and the UAE enjoy 0% income tax on their entire salary.' },
      { q: 'What qualifications are required for Electricians and Crane Operators in Dubai?', a: 'Applicants need relevant trade diplomas (ITI/Polytechnic) or verified equipment operator licenses along with practical experience.' }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    coverImage: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier immigration destination offering Express Entry, Provincial Nominee Programs (PNP), and 3-Year Post-Graduation Work Permits for IT professionals and B.Sc Nurses.',
    studyOptions: ['IT (Information Technology)', 'B.Sc Nursing'],
    jobRoles: ['IT', 'B.Sc Nursing'],
    benefits: [
      'Direct Permanent Residency pathways via Express Entry STEM & Healthcare draws',
      '3-Year Post-Graduation Work Permit (PGWP) for college & university graduates',
      'High priority targeted immigration category for B.Sc Nurses and IT software engineers',
      'Universal healthcare and high quality of life for families'
    ],
    visaTypes: [
      { title: 'Express Entry (Category-Based Draws)', description: 'Targeted federal PR draws for IT specialists and licensed healthcare/nursing professionals.', duration: 'Permanent Residency' },
      { title: 'Study Permit & PGWP', description: 'Study IT or Nursing in designated learning institutions (DLI) followed by 3-year PGWP.', duration: 'Study + 3 Year Work Permit' },
      { title: 'Provincial Nominee Program (PNP)', description: 'Province-specific nominations granting 600 bonus CRS points.', duration: 'Permanent Residency' }
    ],
    eligibility: [
      'ECA (Educational Credential Assessment) by WES/ICAS for foreign degrees',
      'IELTS General (CLB 7+) for Express Entry / IELTS Academic (6.5+) for Student Visa',
      'NNAS (National Nursing Assessment Service) evaluation for B.Sc Nurses',
      'Proof of settlement funds and clean medical examination'
    ],
    documents: [
      'WES / NNAS Credential Assessment Reports',
      'IELTS / CELPIP / PTE Core Language Score Sheet',
      'Employment verification letters on company letterhead with pay slips',
      'Police Clearance Certificate & Upfront Medical Report'
    ],
    livingCost: 'CAD $1,600 – $2,600 / month',
    topJobs: ['IT Software Engineer / Cloud Architect', 'Registered B.Sc Nurse (RN / RPN)', 'Cybersecurity Analyst', 'DevOps Specialist'],
    topUniversities: ['University of Toronto', 'UBC', 'McGill University', 'University of Waterloo (IT)', 'McMaster University (Nursing)'],
    processingTime: '2 to 6 months',
    faqs: [
      { q: 'Are B.Sc Nurses and IT specialists eligible for priority immigration in Canada?', a: 'Yes! Canada conducts targeted Category-Based Express Entry draws for both Healthcare (B.Sc Nurses) and STEM (IT specialists) with significantly lower CRS score cutoffs.' },
      { q: 'How does the post-study work permit (PGWP) work in Canada?', a: 'Graduating from an eligible 2-year post-secondary program at a DLI institution qualifies you for a 3-year open work permit.' }
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
    id: 'job-dubai-1',
    title: 'Heavy Tower / Mobile Crane Operator',
    company: 'Al Futtaim Engineering & Construction',
    country: 'Dubai (UAE)',
    category: 'Technical & Construction',
    salary: 'AED 6,500 - 9,000 / month (Tax-Free)',
    employmentType: 'Full-Time',
    experience: '3 - 8 Years',
    education: 'Heavy Equipment Operator Certification / ITI',
    skills: ['Tower Crane Operation', 'Rigging Safety', 'Heavy Lifting', 'Site Inspection'],
    visaSponsorship: true,
    description: 'Urgent requirement for certified Crane Operators on major commercial high-rise projects in Dubai. Company provides free visa, accommodation, and medical insurance.',
    requirements: [
      'Valid Crane Operator certification or UAE / Gulf driving/operator license',
      'Minimum 3 years experience operating hydraulic or tower cranes',
      'Strict adherence to OSHA / UAE safety regulations'
    ],
    postedDate: '2026-08-11'
  },
  {
    id: 'job-dubai-2',
    title: 'Master Maintenance Electrician / MEP Specialist',
    company: 'Emaar Facilities Management LLC',
    country: 'Dubai (UAE)',
    category: 'Engineering & Maintenance',
    salary: 'AED 5,500 - 8,000 / month (Tax-Free)',
    employmentType: 'Full-Time',
    experience: '2 - 6 Years',
    education: 'Diploma in Electrical Engineering / ITI Electrician',
    skills: ['MEP Systems', 'Switchgear Maintenance', 'Wiring & Circuits', 'Troubleshooting'],
    visaSponsorship: true,
    description: 'Premier facilities management group in Dubai hiring certified electricians. 100% Tax-free salary, employment visa, and flight tickets provided.',
    requirements: [
      'Diploma or ITI in Electrical / Wireman trade',
      'Experience in commercial building electrical maintenance & DB panels',
      'Basic conversational English or Hindi'
    ],
    postedDate: '2026-08-12'
  },
  {
    id: 'job-dubai-3',
    title: 'DHA Registered Staff Nurse (ICU / Emergency)',
    company: 'Aster DM Healthcare Group',
    country: 'Dubai (UAE)',
    category: 'Healthcare & Nursing',
    salary: 'AED 9,000 - 13,000 / month (Tax-Free)',
    employmentType: 'Full-Time',
    experience: '2 - 7 Years',
    education: 'B.Sc Nursing / Post B.Sc / GNM',
    skills: ['DHA License / Eligibility', 'Emergency Care', 'Patient Monitoring', 'ICU Protocol'],
    visaSponsorship: true,
    description: 'Direct recruitment for DHA licensed/eligible nurses in private multi-specialty hospitals in Dubai with full visa and accommodation allowance.',
    requirements: [
      'B.Sc Nursing with DHA exam passed or DHA eligibility letter',
      'Minimum 2 years continuous clinical hospital experience',
      'Good communication skills in English'
    ],
    postedDate: '2026-08-13'
  },
  {
    id: 'job-canada-1',
    title: 'Senior IT Cloud & Full Stack Developer',
    company: 'Maple Leaf Digital Technologies Inc',
    country: 'Canada',
    category: 'Information Technology',
    salary: 'CAD $92,000 - $115,000 / year',
    employmentType: 'Full-Time',
    experience: '3 - 6 Years',
    education: 'B.Tech / B.Sc / Master in Computer Science or IT',
    skills: ['TypeScript', 'React', 'Node.js', 'AWS', 'PostgreSQL', 'Docker'],
    visaSponsorship: true,
    description: 'High-growth technology company in Toronto hiring skilled IT developers. Support for LMIA work permit and Express Entry STEM PR transition provided.',
    requirements: [
      '3+ years full-stack development experience with modern JavaScript / TypeScript',
      'Experience building scalable cloud APIs and databases',
      'English proficiency (IELTS CLB 7+ or equivalent)'
    ],
    postedDate: '2026-08-13'
  },
  {
    id: 'job-canada-2',
    title: 'B.Sc Registered Nurse (Acute & Critical Care)',
    company: 'Ontario Healthcare Health System',
    country: 'Canada',
    category: 'Healthcare & Nursing',
    salary: 'CAD $82,000 - $102,000 / year',
    employmentType: 'Full-Time',
    experience: '2 - 6 Years',
    education: 'B.Sc Nursing',
    skills: ['NNAS Assessment', 'NCLEX-RN / CNO Eligibility', 'Patient Care', 'IELTS Academic 7.0'],
    visaSponsorship: true,
    description: 'Exceptional nursing opportunities across Ontario and Alberta hospitals with Express Entry Healthcare targeted PR draws and relocation assistance.',
    requirements: [
      'B.Sc Nursing graduate with valid clinical experience',
      'NNAS registered or NCLEX-RN ready',
      'Minimum 2 years acute care hospital experience'
    ],
    postedDate: '2026-08-14'
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

Contact PAR CAREERS AND VISA CONSULTANCY SERVICES (+91 8019021039) to evaluate your Chancenkarte eligibility today!`,
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
    excerpt: 'Schedule personalized 1-on-1 profile assessment sessions with experienced visa counselors at +91 8019021039.',
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
