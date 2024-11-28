interface Career {
  title: string;
  description: string;
  facilities?: string[];
  color: string;
}

export const careers: Career[] = [
  {
    title: 'Internship',
    description: 'Finansist International gives opportunities for students or fresh-graduates to build experience with us in our internship program.',
    facilities: ['Work experience', 'Communicating with clients', 'Establish business relations'],
    color: 'EC5078',
  },
  {
    title: 'Jobs',
    description: 'Finansist International gives opportunities to join with our company. Look forward to opportunities and developments with us!',
    color: 'F7B70D',
  },
  {
    title: 'Partner',
    description:
      'Finansist International opens opportunities to cooperation in order to develop better services. For those of you who interested to grow with us, feel free to contact us!',
    color: '81BDE3',
  },
];
