import { memo, useEffect, useState, useCallback } from 'react';
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
  const [preview, setPreview] = useState<string | null>(defaultImageUrl ?? null);

  useEffect(() => {
    setPreview(defaultImageUrl ?? null);
  }, [defaultImageUrl]);

  const handleFileChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        field.onChange(file);

        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(defaultImageUrl ?? null);
      }
    },
    [defaultImageUrl]
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
            <Controller
              control={control}
              name={name}
              render={({ field, fieldState }) => (
                <>
                  {preview ? (
                    accept === 'image/*' && (
                      <div onClick={() => document.getElementById(`file-input-${name}`)?.click()} className="cursor-pointer flex">
                        <Image src={preview} alt="Image preview" width={1000} height={1000} className="w-[150px] h-[150px] mb-2 object-cover" />
                        <div className="ml-4 flex flex-col justify-center">
                          <p className="text-sm text-gray-500">Max size: 3MB</p>
                          <p className="text-sm text-gray-500">Resolution: 1024x1024</p>
                          <p className="text-sm text-gray-500">Supported formats: .jpg, .jpeg, .png, .webp</p>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex flex-row">
                      <div
                        onClick={() => document.getElementById(`file-input-${name}`)?.click()}
                        className="mb-2 w-[150px] h-[150px] border border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-gray-500">No file selected</span>
                      </div>
                      <div className="ml-4 flex flex-col justify-center">
                        <p className="text-sm text-gray-500">Max size: 3MB</p>
                        <p className="text-sm text-gray-500">Resolution: 1024x1024</p>
                        <p className="text-sm text-gray-500">Supported formats: .jpg, .jpeg, .png, .webp</p>
                      </div>
                    </div>
                  )}

                  <Input
                    id={`file-input-${name}`}
                    type="file"
                    className="text-sm md:text-base lg:text-lg hidden"
                    accept={accept}
                    onChange={(event) => handleFileChange(event, field)}
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
