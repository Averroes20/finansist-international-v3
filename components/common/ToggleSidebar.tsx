'use client';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

type Props = {
  className?: string;
};

const ToggleSidebar: React.FC<Props> = ({ className }) => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button
      onClick={toggleSidebar}
      aria-label="Toggle Sidebar"
      variant="ghost"
      className={`${open ? 'h-9 w-9' : 'h-7 w-7'} p-0 rounded-full bg-slate-600 text-white text-lg data-[state=open]:hidden ${className}`}
    >
      <ChevronRight className={`mx-auto ${open ? 'md:rotate-180' : 'md:rotate-0'} transition duration-200 rotate-0`} />
    </Button>
  );
};

export default ToggleSidebar;
