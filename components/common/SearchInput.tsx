'use client';
import { X } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, ...props }) => {
  return (
    <div className="relative w-full">
      <Input {...props} value={value} onChange={(e) => onChange(e)} />
      <button
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-50 cursor-pointer p-[1px] bg-gray-600 opacity-50 hover:opacity-100 rounded-full"
        onClick={() => {
          const mockEvent: React.ChangeEvent<HTMLInputElement> = {
            target: { value: '' } as HTMLInputElement,
            nativeEvent: {} as Event,
            currentTarget: {} as HTMLInputElement,
            bubbles: false,
            cancelable: false,
            preventDefault: () => {},
            stopPropagation: () => {},
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            isDefaultPrevented: function (): boolean {
              throw new Error('Function not implemented.');
            },
            isPropagationStopped: function (): boolean {
              throw new Error('Function not implemented.');
            },
            persist: function (): void {
              throw new Error('Function not implemented.');
            },
            timeStamp: 0,
            type: '',
          };
          onChange(mockEvent);
        }}
        type="button"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default SearchInput;
