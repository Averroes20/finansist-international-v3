import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@/app/(private)/auth/signup/SignUp'));

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your account',
};

const Login = () => {
  return (
    <main className="flex px-5 md:px-0 max-w-lg min-h-screen items-center mx-auto ">
      <Register />
    </main>
  );
};

export default Login;
