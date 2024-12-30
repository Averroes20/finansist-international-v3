import { memo, useCallback } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  className?: string;
  isRequired?: boolean;
  accept?: string;
};

const FileInputPDFComponent = <T extends FieldValues>({ name, label, className, accept, isRequired }: Props<T>) => {
  const { control } = useFormContext<T>();

  const handleFileChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = event.target.files?.[0] || null;
      field.onChange(file); // Langsung mengatur file ke field
    },
    []
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm md:text-base font-medium">
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              id={`file-input-${name}`}
              type="file"
              className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base font-medium"
              accept={accept}
              onChange={(event) => handleFileChange(event, field)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FileInputPDF = memo(FileInputPDFComponent) as typeof FileInputPDFComponent;

export default FileInputPDF;
