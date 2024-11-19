// Tipe utama untuk layanan
export interface Service {
  title: string;
  icon: string;
  shortDescription: string[];
  details: {
    overview: string;
    extendedServices: string[];
    benefits: {
      title: string;
      items: string[];
    }[];
  };
}

export const services: Service[] = [
  {
    title: 'Accounting and Bookkeeping',
    icon: '/animate/bookkeeping.lottie',
    shortDescription: [
      'Set Up Chart of Accounts',
      'Entry Journal',
      'AP and AR Aging',
      'Inventory Recording',
      'Bank Reconciliation',
      'Financial Statements',
      'Create Invoices and Send Bills',
      'Transaction and Cost Recap',
    ],
    details: {
      overview:
        'We provide professional accounting and bookkeeping services to ensure your financial records are accurate and up-to-date. Our services include bookkeeping, financial statement preparation, and business analysis, helping you make informed financial decisions:',
      extendedServices: [
        'Accurate financial statements to guide business strategy.',
        'Bookkeeping reviews to ensure accurate records.',
        'Business analysis for profitability and efficiency.',
        'Assistance with tax preparation.',
      ],
      benefits: [
        {
          title: '-',
          items: [
            'Set up chart of accounts',
            'Entry journal',
            'Accounts payable and receivable aging',
            'Inventory recording',
            'Transaction archives',
            'Bank reconciliation',
            'Bookkeeping review',
            'Balance sheet',
            'Profit and loss statement',
            'Cash flow management',
            'End-of-year bookkeeping',
          ],
        },
        {
          title: 'Additional Services',
          items: [
            'Create invoices',
            'Send bills',
            'Transaction and cost recap',
            'COGS calculation',
            'Break-even analysis',
            'ROI calculation',
            'Investment/LKPM Report preparation',
          ],
        },
      ],
    },
  },
  {
    title: 'Tax Reporting',
    icon: '/animate/tax-reporting.lottie',
    shortDescription: [
      'Corporate and Personal Tax Reporting',
      'Income Tax Calculation',
      'E-SPT Form Submission',
      'Tax Planning',
      'Fiscal Correction',
      'International Tax Compliance',
      'VAT Management',
      'SP2DK - Tax Audit Assistance',
    ],
    details: {
      overview:
        'Our professional tax services ensure efficient and accurate tax compliance, including corporate and personal tax reporting, income tax calculations, and comprehensive tax planning. Additional support includes fiscal correction, international tax compliance, and more:',
      extendedServices: [
        'Accurate income tax calculations (e.g., Income Tax 21, 22).',
        'Document preparation and compliance for deadlines.',
        'Support with tax audits and SP2DK compliance.',
        'Assistance with VAT, international tax, and fiscal adjustments.',
      ],
      benefits: [
        {
          title: '-',
          items: [
            'Corporate and personal tax reporting',
            'Income tax calculation',
            'Tax bill printing',
            'E-SPT form submission',
            'Withholding tax certificates',
            'Tax planning',
          ],
        },
        {
          title: 'Additional Services',
          items: [
            'Fiscal correction',
            'International tax compliance',
            'VAT (input and output)',
            'SP2DK - Tax audit assistance',
            'DGT-1 form submission',
            'Electronic form handling',
          ],
        },
      ],
    },
  },
  {
    title: 'Payroll',
    icon: '/animate/payroll.lottie',
    shortDescription: [
      'Employee Attendance Tracking',
      'Payroll and Income Tax 21 Calculations',
      'E-SPT Form Submission',
      'Withholding Tax Certificates',
      'Employee Benefits Administration',
      'Bulk Salary Transfers',
      'Monthly Payroll and Tax Recap',
      'Employee Loan and Reimbursement Tracking',
    ],
    details: {
      overview:
        'Our payroll management services include accurate payroll processing, tax compliance, and benefits management to ensure timely employee payments and regulatory compliance:',
      extendedServices: [
        'Attendance and payroll tracking.',
        'Income Tax 21 processing and E-SPT submission.',
        'Benefits management (BPJS, insurance, etc.).',
        'Support for salary transfers and payroll documentation.',
      ],
      benefits: [
        {
          title: '-',
          items: [
            'Employee attendance tracking',
            'Payroll calculations',
            'Income Tax 21 calculation',
            'Tax bill printing',
            'E-SPT form submission',
            'Withholding tax certificates',
            'BPJS, insurance, and benefits management',
          ],
        },
        {
          title: 'Additional Services',
          items: ['Bulk salary transfers', 'Monthly payroll and tax recaps', 'Employee loan and reimbursement tracking'],
        },
      ],
    },
  },
  {
    title: 'CFO Services',
    icon: '/animate/bookkeeping.lottie',
    shortDescription: [
      'Comprehensive Bookkeeping Package',
      'Full Tax Reporting Package',
      'Complete Payroll Package',
      'Financial Strategy and Analysis',
      'Tax Strategy and Planning',
    ],
    details: {
      overview: 'Our CFO Services cover all aspects of your financial management, including:',
      extendedServices: [
        'Everything in bookkeeping, such as journal entries, AP/AR aging, financial statements, and bank reconciliation.',
        'Everything in tax reporting, such as corporate and personal tax filings, income tax calculations, and tax planning.',
        'Everything in payroll, including employee attendance tracking, payroll calculations, and benefits management.',
        'Plus, we provide advanced financial strategy and planning, including long-term financial strategies, budgeting, cash flow control, and tax-efficient strategies for corporate compliance.',
      ],
      benefits: [
        {
          title: '-',
          items: ['All Bookkeeping Basic Pack', 'All Tax Report Basic Pack', 'All Payroll Basic Pack'],
        },
        {
          title: 'Financial Strategy, Planning & Analysis',
          items: [
            'Developing Long-Term Financial Strategies.',
            'Creating Budgets and Financial Forecasts.',
            'Cash Flow Management and Control.',
            'Preparing and Presenting Financial Statements.',
            'Providing and Monitoring Business and Financial Performance.',
          ],
        },
        {
          title: 'Tax Strategy & Planning',
          items: ['Development of tax-efficient strategies', 'Corporate tax compliance oversight'],
        },
      ],
    },
  },
  {
    title: 'Training',
    icon: '/animate/bookkeeping.lottie',
    shortDescription: ['Bookkeeping Basics', 'Tax Fundamentals', 'Payroll Administration'],
    details: {
      overview:
        'We offer specialized training programs in bookkeeping, tax, and payroll management, empowering businesses to manage their financial operations efficiently. Our training includes:',
      extendedServices: [
        'Fundamentals of bookkeeping for accurate financial record management.',
        'Tax compliance training to navigate regulations and minimize errors.',
        'Payroll management to ensure accurate employee compensation and benefits administration.',
      ],
      benefits: [
        {
          title: 'Bookkeeping Training',
          items: [
            'Journal entry',
            'AP and AR Aging',
            'Bank Reconciliation',
            'Make Invoices',
            'Send Bills',
            'Transaction and Cost Recap',
            'Financial statement preparation',
          ],
        },
        {
          title: 'Tax Training',
          items: [
            'Corporate and personal tax reporting',
            'Calculation of Income Taxes',
            'Print Tax Bills',
            'E-SPT Filling Form',
            'Certificate of Withholding Tax',
            'Charging Tax to DGT-1',
          ],
        },
        {
          title: 'Payroll Training',
          items: [
            'Employee Attendance',
            'Payroll Calculations',
            'Calculation of Income Tax 21',
            'Print Tax Bills',
            'E-SPT Filling Form',
            'Certificate of Withholding Tax',
            'Employment BPJS, Insurance, Other Benefits',
          ],
        },
      ],
    },
  },
  {
    title: 'Audit Services',
    icon: '/animate/bookkeeping.lottie',
    shortDescription: [
      'Internal Audit (Company condition report, Financial audit adjustments, Improvement recommendations)',
      'External Audit (Certified Public Accountant report)',
    ],
    details: {
      overview:
        'We provide both internal and external audit services to ensure your business operates efficiently and is in compliance with industry standards:',
      extendedServices: [
        `Internal Audit, which provides an internal auditor's report on the company's current condition, potential risks, and adjusting entries for financial audits, along with actionable recommendations for improvement.`,
        `External Audit, delivering an independent auditor's report signed by a certified Public Accountant to ensure compliance and credibility.`,
      ],
      benefits: [
        {
          title: 'Internal Audit',
          items: [
            `Internal Auditor's report regarding the current condition of the company, accompanied by an explanation of the potential risks that will be faced by the company.`,
            'Adjusting entries (for financial audit engagements)',
            'Recommendations for improvement on audit findings',
          ],
        },
        {
          title: 'External Audit',
          items: [`Independent Auditor's Report signed by a certified Public Accountant`],
        },
      ],
    },
  },
  {
    title: 'Accounting Software',
    icon: '/animate/accounting-software.lottie',
    shortDescription: [
      'Software Installation and Setup',
      'File Migration',
      'Chart of Accounts Transition',
      'Products and Services List Setup',
      'Catch-Up Bookkeeping',
    ],
    details: {
      overview:
        'Our services provides installing and setting up the right accounting software for your business, and additionally catch-up bookkeeping for prior periods. We have various of Software that we can run such as QuickBooks, Xero, Accurate, and other leading platforms. We also assist in migrating from your current system to ensure a smooth transition:',
      extendedServices: [
        'Software installation & setup tailored to your business needs.',
        'Migrate of accounting data without disrupting business operations.',
      ],
      benefits: [
        {
          title: '-',
          items: ['Software installation and setup', 'File migration', 'Chart of accounts setup', 'Product and service list configuration'],
        },
        {
          title: 'Additional Services',
          items: ['Catch-up bookkeeping for prior periods'],
        },
      ],
    },
  },
];
