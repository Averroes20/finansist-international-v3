'use client';

import { TypeEditUser, validationEditUser } from '@/lib/validation/schema-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../common/Modal';
import { Form } from '../ui/form';
import TextInput from '../common/TextInput';
import DropdownInput from '../common/DropdownInput';
import { roles } from '@/lib/data/categories';
import { Button } from '../ui/button';

type Props = {
  data: TypeEditUser;
  onSubmit: (data: TypeEditUser) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const UserFormEdit: React.FC<Props> = ({ data, onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TypeEditUser>({
    resolver: zodResolver(validationEditUser),
    defaultValues: data || {
      name: '',
      email: '',
      role: '',
    },
  });

  const handleSubmit = (data: TypeEditUser) => {
    onSubmit(data);
    setOpen(false);
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  return (
    <Modal trigger={trigger} title={title} description={description} open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput<TypeEditUser> name="name" placeholder="Enter your name.." label="Name" isRequired />
          <TextInput<TypeEditUser> name="email" placeholder="Enter your email.." label="Email" isRequired />
          <DropdownInput<TypeEditUser> label="Role" name="role" className="" data={roles} placeholder="Select a role" isRequired />
          <div className="col-span-2 flex justify-center">
            <Button type="submit" className="px-28">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default UserFormEdit;
