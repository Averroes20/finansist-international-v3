import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { FormField, FormItem } from '../ui/form';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
};

const ButtonSwitch = <T extends FieldValues>({ name, label, isRequired }: Props<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Label className="text-sm md:text-base font-medium">
            {label} {isRequired && <span className="text-destructive">*</span>}
          </Label>
          <div className="flex items-center gap-x-4">
            <Label
              htmlFor="airplane-mode"
              className={`${field.value ? 'text-black px-3 py-2 rounded-full' : 'bg-red-600 text-white px-3 py-2 rounded-full'}`}
            >
              Inactive
            </Label>
            <Switch id="airplane-mode" checked={field.value} onCheckedChange={field.onChange} />
            <Label
              htmlFor="airplane-mode"
              className={`${field.value ? 'bg-green-600 text-white px-3 py-2 rounded-full' : 'text-black px-3 py-2 rounded-full'}`}
            >
              Active
            </Label>
          </div>
        </FormItem>
      )}
    />
  );
};

export default ButtonSwitch;
