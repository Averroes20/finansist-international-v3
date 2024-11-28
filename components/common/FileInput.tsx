import { memo, useEffect, useState } from 'react';
import { FieldValues, Path, useFormContext, Controller } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import Image from 'next/image';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  className?: string;
  defaultImageUrl?: string;
  isRequired?: boolean;
  accept?: string;
};

const FileInputComponent = <T extends FieldValues>({ name, label, className, defaultImageUrl, isRequired, accept = 'image/*' }: Props<T>) => {
  const { control } = useFormContext<T>();
  const [preview, setPreview] = useState<string | null>(defaultImageUrl || null);

  useEffect(() => {
    setPreview(defaultImageUrl || null);
  }, [defaultImageUrl]);

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className={className}>
          <FormLabel>
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Controller
              control={control}
              name={name}
              render={({ field, fieldState }) => (
                <>
                  {preview && accept === 'image/*' && (
                    <Image src={preview} alt="Image preview" width={200} height={200} className="mb-2  object-cover" />
                  )}

                  <Input
                    type="file"
                    accept={accept}
                    onChange={(event) => {
                      const file = event.target.files?.[0] || null;
                      if (file) {
                        field.onChange(file);

                        const reader = new FileReader();
                        reader.onload = () => setPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        // Kembalikan preview ke default jika tidak ada file yang dipilih
                        setPreview(defaultImageUrl || null);
                      }
                    }}
                  />
                  {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                </>
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const FileInput = memo(FileInputComponent) as typeof FileInputComponent;

export default FileInput;
