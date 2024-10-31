'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formSchema, { TypeLogin } from '@/lib/validation/schema-login';
import { useRouter } from 'next/navigation';

const Login = () => {
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@example.com" {...field} />
                  </FormControl>
                  <FormDescription>We&#39;ll never share your email with anyone else.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormDescription>Make sure it&#39;s at least 6 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default Login;
