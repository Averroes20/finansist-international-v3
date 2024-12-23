import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { MultiSelect } from '../ui/multi-select';

type MultiSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
};

const MultiSelectInput = <T extends FieldValues>({ name, label, options, placeholder, className, isRequired }: MultiSelectFieldProps<T>) => {
  const { control } = useFormContext<T>();
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
            <MultiSelect
              className="w-full text-sm md:text-base font-medium"
              options={options}
              onValueChange={field.onChange}
              defaultValue={field.value}
              placeholder={placeholder}
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectInput;
