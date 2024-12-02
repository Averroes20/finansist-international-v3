'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await signOut({
      redirect: false,
      callbackUrl: '/auth/signin',
    });

    document.cookie = 'next-auth.session-token=; Max-Age=0; path=/';
    document.cookie = 'next-auth.csrf-token=; Max-Age=0; path=/';

    router.push('/auth/signin');
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      Logout
    </Button>
  );
}
