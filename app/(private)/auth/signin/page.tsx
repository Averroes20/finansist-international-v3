import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageLogin = dynamic(() => import('./Login'));

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login your account',
};

const Login = () => {
  return (
    <main className="flex px-5 md:px-0 max-w-lg min-h-screen items-center mx-auto ">
      <PageLogin />
    </main>
  );
};

export default Login;
