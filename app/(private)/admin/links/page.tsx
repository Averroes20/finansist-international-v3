import { Metadata } from 'next';
import PageLinkSocial from './LinkSocial';

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
