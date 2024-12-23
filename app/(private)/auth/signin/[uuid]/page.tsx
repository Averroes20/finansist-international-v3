import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const PageLogin = dynamic(() => import('./Login'));

type Props = {
  params: { uuid: string };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  if (!params.uuid || params.uuid !== 'z6ByYZ6H8N') {
    return notFound();
  }
  return {
    title: 'Login',
    description: 'Login your account',
  };
};

const Login = () => {
  return (
    <main className="flex px-5 md:px-0 max-w-lg min-h-screen items-center mx-auto ">
      <PageLogin />
    </main>
  );
};

export default Login;
