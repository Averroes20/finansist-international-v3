import React from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  className?: string;
};

const FileInputComponent = <T extends FieldValues>({ name, label, className }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="file" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FileInput = React.memo(FileInputComponent) as typeof FileInputComponent;

export default FileInput;
