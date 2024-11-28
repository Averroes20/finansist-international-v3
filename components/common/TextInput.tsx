import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { memo } from 'react';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  type?: string;
  isRequired?: boolean;
};

const TextInputComponent = <T extends FieldValues>({ name, label, placeholder, className, type, isRequired }: Props<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            {type === 'textarea' ? <Textarea placeholder={placeholder} rows={4} {...field} /> : <Input placeholder={placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TextInput = memo(TextInputComponent) as typeof TextInputComponent;

export default TextInput;
