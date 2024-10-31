import React from 'react';
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
};

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const TextEditorInput = <T extends FieldValues>({ name, label, placeholder, className }: Props<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={field.value}
              onChange={field.onChange}
              className={`w-full ${className}`}
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
