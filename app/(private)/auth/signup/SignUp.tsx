'use client';
import TextInput from '@/components/common/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { register } from '@/lib/action/auth';
import formSchema from '@/lib/validation/schema-register';
import { TypeRegister } from '@/lib/validation/schema-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const router = useRouter();
  const [msgError, setMsgError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<TypeRegister>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TypeRegister) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('confirmPassword', data.confirmPassword);
      const result = await register(formData);
      if (result.success) {
        router.push('/auth/signin');
      } else {
        setMsgError(result?.error || 'Error Register');
      }
    } catch (error) {
      console.error('Error Register', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  const handleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  return (
    <main className="flex px-5 md:px-0 max-w-lg min-h-screen items-center mx-auto ">
      <div className="w-full p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm">Please sign up to your account.</p>
          {msgError && <p className="text-base text-black border border-red-700 text-center py-5 bg-red-400 rounded-lg">{msgError}</p>}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextInput<TypeRegister> label="Name" name="name" placeholder="your name..." isRequired />
            <TextInput<TypeRegister> label="Email" name="email" placeholder="your email..." isRequired />
            <TextInput<TypeRegister>
              label="Password"
              name="password"
              type="password"
              showPassword={showPassword}
              handleChangePassword={handleShowPassword}
              placeholder="your password..."
              isRequired
            />
            <TextInput<TypeRegister>
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              showPassword={showConfirmPassword}
              handleChangePassword={handleShowConfirmPassword}
              placeholder="your password..."
              isRequired
            />
            <p>
              Already have an account?{' '}
              <a href="/auth/signin" className="text-blue-600 hover:underline">
                Sign In
              </a>
            </p>
            <Button type="submit" disabled={loading}>{`${loading ? 'Submit...' : 'Sign Up'}`}</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignUp;
