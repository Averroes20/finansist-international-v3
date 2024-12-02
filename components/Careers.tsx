'use client';

import { useLanguage } from '@/context/LanguageProvider';
import { FormIntern, FormJob, FormPatner } from './common/CareerForms';
import { TitleSection } from './ui/typography';

const Careers = () => {
  const { dictionary } = useLanguage();
  const { items, title } = dictionary.career;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (url: string, data: any) => {
    'server only';
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert('Request sent successfully!');
      } else {
        throw new Error(result.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request. Please try again.');
    }
  };

  return (
    <section
      id="career"
      className="relative min-h-screen overflow-hidden mt-10 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(/images/bg-cover-career.webp)` }}
      aria-labelledby="career-title"
    >
      <link rel="preload" href="/images/bg-cover-career.webp" as="image" type="image/webp" media="(min-width: 1px)" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 md:p-0 md:h-[70vh] bg-black bg-opacity-30">
        <TitleSection id="career-title" className="mb-5 text-white">
          {title}
        </TitleSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-screen-lg mx-auto">
          {items.map((item, index) => (
            <article key={index} className="p-4 bg-white rounded-xl flex flex-col h-full shadow-xl">
              <header className="flex-grow">
                <h3
                  className="text-2xl tracking-tight font-bold mb-4 uppercase text-center p-2 border-b-4 w-fit mx-auto"
                  style={{ borderColor: `#${item.color}` }}
                >
                  {item.title}
                </h3>
                <p className="mb-4">{item.description}</p>
                {!!item.facilities && (
                  <>
                    <p className="mb-2">What facilities will you get?</p>
                    <ul className="list-disc list-outside space-y-2 pl-5 mb-4">
                      {item.facilities.map((facility, idx) => (
                        <li key={idx}>{facility}</li>
                      ))}
                    </ul>
                  </>
                )}
              </header>
              {(item.title === 'Partner' || item.title === 'Magang') && (
                <FormPatner colorHeader={item.color} onSubmit={(data) => handleSubmit('/api/send/partnership', data)} />
              )}
              {(item.title === 'Jobs' || item.title === 'Pekerjaan') && (
                <FormJob colorHeader={item.color} onSubmit={(data) => handleSubmit('/api/send/job', data)} />
              )}
              {(item.title === 'Internship' || item.title === 'Mitra') && (
                <FormIntern colorHeader={item.color} onSubmit={(data) => handleSubmit('/api/send/internship', data)} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Careers;
