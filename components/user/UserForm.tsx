'use client';
import { roles } from '@/lib/data/categories';
import { type TypeRegister, validationRegister } from '@/lib/validation/schema-register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import DropdownInput from '../common/DropdownInput';
import Modal from '../common/Modal';
import TextInput from '../common/TextInput';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

type Props = {
  onSubmit: (data: TypeRegister) => void;
  title: string;
  description: string;
  trigger: React.ReactNode;
};

const UserForm: React.FC<Props> = ({ onSubmit, title, description, trigger }) => {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<TypeRegister>({
    resolver: zodResolver(validationRegister),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
    },
  });

  const handleSubmit = (data: TypeRegister) => {
    onSubmit(data);
    setOpen(false);
  };

  const handleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Modal
      trigger={trigger}
      title={title}
      description={description}
      open={open}
      onOpenChange={setOpen}
      contentStyle="max-w-[90vw] max-h-[95vh] md:max-w-[50vw] md:max-h-[90vh] overflow-y-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <TextInput<TypeRegister> name="name" placeholder="Enter your name.." label="Name" isRequired />
          <TextInput<TypeRegister> name="email" placeholder="Enter your email.." label="Email" isRequired />
          <TextInput<TypeRegister>
            name="password"
            type="password"
            handleChangePassword={handleShowPassword}
            showPassword={showPassword}
            placeholder="Enter your password.."
            label="Password"
            isRequired
          />
          <DropdownInput<TypeRegister> label="Role" name="role" className="" data={roles} placeholder="Select a role" isRequired />
          <div className="col-span-2 flex justify-center">
            <Button type="submit" className="px-28 text-sm md:text-base">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default UserForm;
