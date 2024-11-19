'use client';
import TextInput from '@/components/common/TextInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import formSchema, { TypeLogin } from '@/lib/validation/schema-login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

const PageLogin = () => {
  const router = useRouter();
  const form = useForm<TypeLogin>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: TypeLogin) => {
    router.push('/admin/blogs');
    console.log('Form submitted:', data);
  };

  return (
    <main className="flex px-5 md:px-0 max-w-lg min-h-screen items-center mx-auto ">
      <div className="w-full p-4 md:p-8 bg-white border border-gray-200 rounded-lg shadow">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm">Please sign in to your account.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TextInput<TypeLogin> label="Email" name="email" placeholder="your email..." isRequired />
            <TextInput<TypeLogin> label="Password" name="password" placeholder="your password..." isRequired />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default PageLogin;
