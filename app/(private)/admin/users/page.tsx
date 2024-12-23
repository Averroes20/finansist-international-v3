import { Metadata } from 'next';
import PageUser from './User';

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
