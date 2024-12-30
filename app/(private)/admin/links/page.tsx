import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageLinkSocial = dynamic(() => import('./LinkSocial'));

export const metadata: Metadata = {
  title: 'Link Social | Finansist International',
};

const LinkSocials = () => {
  return (
    <div>
      <PageLinkSocial />
    </div>
  );
};

export default LinkSocials;
