import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  description: string;
};

const HeaderAdmin: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="tracking-tight first:mt-0 text-3xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div>
        <Button onClick={() => signOut({ redirectTo: '/' })} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default HeaderAdmin;
