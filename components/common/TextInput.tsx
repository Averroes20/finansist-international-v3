import { Eye, EyeClosed } from 'lucide-react';
import { memo } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '@/components/ui/input';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: InputType;
  isRequired?: boolean;
  showPassword?: boolean;
  handleChangePassword?: () => void;
};

type InputType = 'text' | 'password' | 'textarea';

const TextInputComponent = <T extends FieldValues>({
  name,
  label,
  placeholder,
  showPassword,
  disabled = false,
  handleChangePassword,
  className,
  type = 'text',
  isRequired,
}: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const renderInputField = () => {
          if (type === 'textarea') {
            return (
              <textarea
                placeholder={placeholder}
                rows={4}
                disabled={disabled}
                className="text-sm md:text-lg block px-4 py-3 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border rounded-md border-gray-300"
                {...field}
              />
            );
          } else if (type === 'password') {
            return (
              <div className="relative">
                <Input
                  placeholder={placeholder}
                  type={showPassword ? 'text' : 'password'}
                  disabled={disabled}
                  className="text-sm md:text-base"
                  {...field}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer">
                  {showPassword ? <Eye onClick={handleChangePassword} /> : <EyeClosed onClick={handleChangePassword} />}
                </span>
              </div>
            );
          } else {
            return <Input placeholder={placeholder} type={type} disabled={disabled} className="text-sm md:text-base" {...field} />;
          }
        };

        return (
          <FormItem className={className}>
            <FormLabel className="text-base font-medium">
              {label} {isRequired && <span className="text-destructive">*</span>}
            </FormLabel>
            <FormControl>{renderInputField()}</FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

const TextInput = memo(TextInputComponent) as typeof TextInputComponent;

export default TextInput;
