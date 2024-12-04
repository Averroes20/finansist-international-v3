import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@/app/(private)/auth/signup/SignUp'));

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register your account',
};

const Login = () => {
  return <Register />;
};

export default Login;
