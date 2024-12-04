'use client';
import TextInput from '@/components/common/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { register } from '@/lib/action/auth';
import formSchema from '@/lib/validation/schema-register';
import { TypeRegister } from '@/lib/validation/schema-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const SignUp = () => {
  const router = useRouter();
  const [msgError, setMsgError] = useState('');
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
      const result = await register(data);
      if (result.success) {
        router.push('/auth/signin');
      } else {
        setMsgError(result?.error || 'Error Register');
      }
    } catch (error) {
      console.error('Error Register', error);
    }
  };

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
            <TextInput<TypeRegister> label="Password" name="password" placeholder="your password..." isRequired />
            <TextInput<TypeRegister> label="Confirm Password" name="confirmPassword" placeholder="your password..." isRequired />
            <p>
              Already have an account?{' '}
              <a href="/auth/signin" className="text-blue-600 hover:underline">
                Sign In
              </a>
            </p>
            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default SignUp;
