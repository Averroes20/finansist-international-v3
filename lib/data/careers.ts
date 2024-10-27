interface Career {
  title: string;
  description: string;
  facilities?: string[];
  form: Form[];
  typeButton: string;
}

export interface Form {
  id: string;
  label: string;
  type: string;
}

export const careers: Career[] = [
  {
    title: 'Internship',
    description: 'Finansist International gives opportunities for students or fresh-graduates to build experience with us in our internship program.',
    facilities: ['Work experience', 'Communicating with clients', 'Establish business relations'],
    form: [
      { id: 'name', label: 'Name', type: 'text' },
      { id: 'currentCollege', label: 'Current College', type: 'text' },
      { id: 'phone', label: 'Telephone No', type: 'number' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'desirablePosition', label: 'Desirable Position', type: 'text' },
      { id: 'message', label: 'Message', type: 'textarea' },
    ],
    typeButton: 'Apply Now',
  },
  {
    title: 'Jobs',
    description: 'Finansist International gives opportunities to join with our company. Look forward to opportunities and developments with us!',
    form: [
      { id: 'name', label: 'Name', type: 'text' },
      { id: 'lastEduction', label: 'Last Eduction', type: 'text' },
      { id: 'phone', label: 'Telephone No', type: 'number' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'desirablePosition', label: 'Desirable Position', type: 'text' },
      { id: 'experienceCertificate', label: 'Expertise Certificate', type: 'textarea' },
      { id: 'message', label: 'Message', type: 'textarea' },
    ],
    typeButton: 'Apply Now',
  },
  {
    title: 'Partner',
    description:
      'Finansist International opens opportunities to cooperation in order to develop better services. For those of you who interested to grow with us, feel free to contact us!',
    form: [
      { id: 'name', label: 'Name', type: 'text' },
      { id: 'companyName', label: 'Company Name', type: 'text' },
      { id: 'phone', label: 'Telephone No', type: 'number' },
      { id: 'email', label: 'Email', type: 'email' },
      { id: 'formOfCooperation', label: 'Form of Cooperation', type: 'text' },
      { id: 'consultationDate', label: 'Consultation Date', type: 'date' },
      { id: 'message', label: 'Message', type: 'textarea' },
    ],
    typeButton: 'Contact Us',
  },
];
