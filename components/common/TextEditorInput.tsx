import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  className?: string;
  isRequired?: boolean;
};

const modules = {
  toolbar: [
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: '' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link'],
    ['clean'],
  ],

  clipboard: {
    matchVisual: false,
  },
};

const TextEditorInput = <T extends FieldValues>({ name, label, placeholder, className, isRequired }: Props<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel className="text-sm md:text-base font-medium">
            {label} {isRequired && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={field.value}
              onChange={field.onChange}
              style={{ fontSize: '1rem' }}
              className={`w-full text-sm md:text-base font-medium ${className}`}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TextEditorInput;
