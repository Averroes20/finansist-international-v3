import { Metadata } from 'next';
import { Fragment } from 'react';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login your account',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
