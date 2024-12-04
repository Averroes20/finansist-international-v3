import { ArrowBigLeftDash } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="space-y-5">
        <h1 className="text-5xl font-bold text-[#10376E] font-dosis text-center">404</h1>
        <h3 className="text-3xl font-medium text-[#10376E] font-dosis text-center">
          Page Not Found <br />
        </h3>
        <Link href={'/'} className="flex items-center justify-center gap-2 hover:text-[#10376E]">
          <ArrowBigLeftDash size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
