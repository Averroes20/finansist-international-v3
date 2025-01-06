import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageUser = dynamic(() => import('./User'));

export const metadata: Metadata = {
  title: 'User | Finansist International',
};

const Users = () => {
  return (
    <div>
      <PageUser />
    </div>
  );
};

export default Users;
