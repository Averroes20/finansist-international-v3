'use client';
import TextInput from '@/components/common/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import formSchema, { TypeLogin } from '@/lib/validation/schema-login';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const PageLogin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState('');
  const form = useForm<TypeLogin>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TypeLogin) => {
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      } else {
        router.push('/admin/blogs');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'CredentialsSignin') {
        setMsgError('Invalid email or password');
      } else {
        setMsgError('something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="w-full p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-sm">Please sign in to your account.</p>
        {msgError && <p className="text-base text-black border border-red-700 text-center py-5 bg-red-400 rounded-lg">{msgError}</p>}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <TextInput<TypeLogin> label="Email" name="email" placeholder="your email..." isRequired />
          <div>
            <TextInput<TypeLogin>
              label="Password"
              name="password"
              type="password"
              handleChangePassword={handleShowPassword}
              showPassword={showPassword}
              placeholder="your password..."
              isRequired
            />
          </div>
          <Button type="submit" disabled={loading}>{`${loading ? 'Submit...' : 'Sign In'}`}</Button>
        </form>
      </Form>
    </div>
  );
};

export default PageLogin;
