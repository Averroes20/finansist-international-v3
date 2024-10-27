import { icons } from '@/constants/icons';
import { StaticImageData } from 'next/image';

interface Service {
  title: string;
  icon: StaticImageData;
  description: Array<Description | string>;
  moreDetails: MoreDetails;
}

interface MoreDetails {
  moreDesc: string;
  moreServices: string[];
}

interface Description {
  subTitle?: string;
  subDesc?: Array<SubDescription | string>;
}

interface SubDescription {
  subSubTitle?: string;
  subSubDesc?: string[];
}

export const services: Service[] = [
  {
    title: 'Bookkeeping',
    icon: icons.Bookkeeping,
    description: [
      'Set Up Chart of Accounts',
      'Entry journal',
      'AP and AR Aging',
      'Inventory Recording',
      'Transaction archives',
      'Bank reconciliation',
      'Review of bookkeeping',
      'Balance sheet',
      'Profit and loss',
      'Cash flow',
      'End of the year bookkeeping',
      {
        subTitle: 'Additional',
        subDesc: [
          'Make invoices',
          'Send bills',
          'Transaction and cost recap',
          'COGS calculation',
          'BEP analysis',
          'Return on investment',
          'Investment / LKPM Report',
        ],
      },
    ],
    moreDetails: {
      moreDesc:
        'We provide professional accounting and bookkeeping services to ensure your financial records are accurate and up-to-date. These services include bookkeeping and financial statement preparation, and additionally, sales and purchases, business analysis, and LKPM Report. Our expert team will help you make informed financial decisions by providing:',
      moreServices: [
        'Accurate financial statements to guide business strategy.',
        'Review of bookkeeping to ensure proper financial records.',
        'Business analysis to optimize profitability and operational efficiency.',
        'Assist on tax preparation.',
      ],
    },
  },
  {
    title: 'Accounting Software',
    icon: icons.Accounting,
    description: [
      'Installation & Setup Software',
      'Migration of Your Files',
      'Transition to Chart of Accounts',
      'Transition to Products and Services List',
      {
        subTitle: 'Additional',
        subDesc: ['Catch-Up Bookkeeping for Prior Periods'],
      },
    ],
    moreDetails: {
      moreDesc:
        'Our services provides installing and setting up the right accounting software for your business, and additionally catch-up bookkeeping for prior periods. We have various of Software that we can run such as QuickBooks, Xero, Accurate, and other leading platforms. We also assist in migrating from your current system to ensure a smooth transition:',
      moreServices: [
        'Software installation & setup tailored to your business needs.',
        'Migrate of accounting data without disrupting business operations.',
      ],
    },
  },
  {
    title: 'Tax Reporting',
    icon: icons.TaxReport,
    description: [
      'Corporate and Personal Tax Report',
      'Calculation of Income Taxes',
      'Print Tax Bills',
      'E-SPT Filling Form',
      'Certificate of Withholding Tax',
      'Tax Planning',
      {
        subTitle: 'Additional',
        subDesc: [
          'Fiscal Correction',
          'International Tax',
          'Input and Output VAT',
          'SP2DK - Tax Audit Assistance',
          'DGT-1',
          'Electronic Charging',
          'Electronic Forms',
        ],
      },
    ],
    moreDetails: {
      moreDesc:
        'We provide professional tax services to ensure your tax obligations are met efficiently and accurately. These services include corporate and personal tax reporting, income tax calculations, comprehensive tax planning, and additionally fiscal correction, international tax, etc. Our expert team will assist you by providing:',
      moreServices: [
        'Accurate Tax Income 21 [Employee Income], 22 [Import, Export], and other tax calculations.',
        'Tax document review and preparation to meet regulatory deadlines.',
        'SP2DK tax audit assistance to navigate tax audits.',
        'Comprehensive support with fiscal corrections, VAT, international tax, etc.',
      ],
    },
  },
  {
    title: 'Payroll',
    icon: icons.Payroll,
    description: [
      'Employee Attendance',
      'Payroll Calculations',
      'Calculation of Income Tax 21',
      'Print Tax Bills',
      'E-SPT Filling Form',
      'Certificate of Withholding Tax',
      'Employment BPJS, Insurance, Other Benefits',
      {
        subTitle: 'Additional',
        subDesc: ['Bulk Transfer Salary', 'Recap Monthly Payroll and Tax Payroll', 'Recap Employee Loan and Reimburse'],
      },
    ],
    moreDetails: {
      moreDesc:
        'We offer comprehensive payroll management to ensure accurate and timely employee payments, tax compliance, and benefit allocations. Our payroll services include:',
      moreServices: [
        'Employee attendance tracking and payroll calculations.',
        'Income Tax 21 calculations and tax bill printing.',
        'E-SPT form submission and withholding tax certificates.',
        'Management of BPJS, insurance, and other employee benefits.',
        'Additional services such as bulk salary transfers, monthly payroll and tax recaps, and employee loan and reimbursement tracking.',
      ],
    },
  },
  {
    title: 'Training',
    icon: icons.Training,
    description: [
      {
        subTitle: 'Bookkeeping',
        subDesc: [
          'Entry Journal',
          'AP and AR Aging',
          'Bank Reconciliation',
          'Make Invoices',
          'Send Bills',
          'Transaction and Cost Recap',
          'Financial Statement Preparation',
        ],
      },
      {
        subTitle: 'Tax',
        subDesc: [
          'Corporate and Personal Tax Report',
          'Calculation of Income Taxes',
          'Print Tax Bills',
          'E-SPT Filling Form',
          'Certificate of Withholding Tax',
          'Charging Tax to DGT-1',
        ],
      },
      {
        subTitle: 'Payroll',
        subDesc: [
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
    moreDetails: {
      moreDesc:
        'We offer specialized training programs in bookkeeping, tax, and payroll management, empowering businesses to manage their financial operations efficiently. Our training includes:',
      moreServices: [
        'Fundamentals of bookkeeping for accurate financial record management.',
        'Tax compliance training to navigate regulations and minimize errors.',
        'Payroll management to ensure accurate employee compensation and benefits administration.',
      ],
    },
  },
  {
    title: 'CFO Services',
    icon: icons.CFOService,
    description: [
      'All Bookkeeping Basic Pack',
      'All Tax Report Basic Pack',
      'All Payroll Basic Pack',
      {
        subTitle: 'Plus',
        subDesc: [
          {
            subSubTitle: 'Financial Strategy, Planning & Analysis',
            subSubDesc: [
              'Developing Long-Term Financial Strategies.',
              'Creating Budgets and Financial Forecasts.',
              'Cash Flow Management and Control.',
              'Preparing and Presenting Financial Statements.',
              'Providing and Monitoring Business and Financial Performance.',
            ],
          },
          {
            subSubTitle: 'Tax Strategy & Planning',
            subSubDesc: ['Developing Tax-Efficient Strategies.', 'Overseeing Corporate Tax Compliance and Planning.'],
          },
        ],
      },
    ],
    moreDetails: {
      moreDesc: 'Our CFO Services cover all aspects of your financial management, including:',
      moreServices: [
        'Everything in bookkeeping, such as journal entries, AP/AR aging, financial statements, and bank reconciliation.',
        'Everything in tax reporting, such as corporate and personal tax filings, income tax calculations, and tax planning.',
        'Everything in payroll, including employee attendance tracking, payroll calculations, and benefits management.',
        'Plus, we provide advanced financial strategy and planning, including long-term financial strategies, budgeting, cash flow control, and tax-efficient strategies for corporate compliance.',
      ],
    },
  },
  {
    title: 'Audit Services',
    icon: icons.AuditService,
    description: [
      {
        subTitle: 'Internal Audit',
        subDesc: [
          'Internal Auditor’s report regarding the current condition of the company, accompanied by an explanation of the potential risks that will be faced by the company.',
          'Adjusting entries (for financial audit engagements)',
          'Recommendations for improvement on audit findings',
        ],
      },
      {
        subTitle: 'External Audit',
        subDesc: ['Independent Auditor’s Report signed by a certified Public Accountant'],
      },
    ],
    moreDetails: {
      moreDesc:
        'We provide both internal and external audit services to ensure your business operates efficiently and is in compliance with industry standards:',
      moreServices: [
        "Internal Audit, which provides an internal auditor's report on the company's current condition, potential risks, and adjusting entries for financial audits, along with actionable recommendations for improvement.",
        "External Audit, delivering an independent auditor's report signed by a certified Public Accountant to ensure compliance and credibility.",
      ],
    },
  },
];
