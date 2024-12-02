import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const PageLogin = dynamic(() => import('./Login'));

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login your account',
};

const Login = () => {
  return <PageLogin />;
};

export default Login;
