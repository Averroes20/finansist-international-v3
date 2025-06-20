import { memo, useCallback } from 'react';
import { FieldValues, Path, PathValue, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  className?: string;
  isRequired?: boolean;
  accept?: string;
  multiple?: boolean;
};

const FileInputPDFComponent = <T extends FieldValues>({ name, label, className, accept = 'application/pdf', isRequired = false, multiple = false }: Props<T>) => {
  const { control, setValue } = useFormContext<T>();

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        if (multiple) {
          setValue(name, Array.from(files) as unknown as PathValue<T, Path<T>>, { shouldValidate: true });
        } else {
          setValue(name, (files[0] ?? null) as unknown as PathValue<T, Path<T>>, { shouldValidate: true });
        }
      }
    },
    [multiple, name, setValue]
  );

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel className="text-sm md:text-base font-medium">
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              id={`file-input-${name}`}
              type="file"
              multiple={multiple}
              className="text-sm md:text-base placeholder:text-sm md:placeholder:text-base font-medium"
              accept={accept}
              onChange={(event) => handleFileChange(event)}
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
